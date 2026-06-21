import { createGroq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { SYSTEM_PROMPT } from "@/content/corpus";
import { checkRateLimit } from "@/lib/ratelimit";

// Node runtime (NOT edge) — edge's ~30s cap cuts off streaming; Node allows ~60s.
export const runtime = "nodejs";
export const maxDuration = 60;

// Cost guards. Per-message cap (~2,000 tokens ≈ 8k chars) AND an aggregate cap
// across the turns actually sent to the model (prevents cost-exhaustion via many
// large messages, not just one).
const MAX_INPUT_CHARS = 8_000;
const MAX_TOTAL_CHARS = 24_000;
// Keep cost bounded — only the most recent turns are sent to the model.
const MAX_HISTORY_MESSAGES = 12;
const ALLOWED_ROLES = new Set(["user", "assistant", "system"]);

// Llama 3.3 70B on Groq's free tier (see decisions/log.md). Fast inference,
// generous free limits, no billing. The corpus is small, so no caching layer.
const MODEL = "llama-3.3-70b-versatile";

function textChars(m: UIMessage): number {
  return (m.parts ?? []).reduce(
    (n, p) => n + (p.type === "text" ? (p.text?.length ?? 0) : 0),
    0,
  );
}

function clientIp(req: Request): string {
  // On Vercel, x-real-ip is the platform-verified client IP and is not
  // client-spoofable. Prefer it; never key the rate limit on the
  // client-controlled leftmost X-Forwarded-For. Fall back to the rightmost
  // (closest-hop) XFF value only when x-real-ip is absent (local dev).
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const hops = fwd.split(",").map((p) => p.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1]!;
  }
  return "anonymous";
}

export async function POST(req: Request) {
  // Graceful degradation when the key isn't configured yet (e.g. before the
  // first deploy with secrets). Keeps the site shippable; chat reconnects once set.
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "The assistant isn't connected yet. Reach Zaid at zaidmalick6@gmail.com." },
      { status: 503 },
    );
  }

  // Per-IP rate limit (no-op locally without Upstash creds).
  const { success } = await checkRateLimit(clientIp(req));
  if (!success) {
    return Response.json(
      { error: "Too many requests — give it a minute and try again." },
      { status: 429 },
    );
  }

  let body: { messages?: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  // Validate shape: every message must have a known role and a parts array.
  if (!messages.every((m) => m && ALLOWED_ROLES.has(m.role) && Array.isArray(m.parts))) {
    return Response.json({ error: "Malformed messages." }, { status: 400 });
  }

  const trimmed = messages.slice(-MAX_HISTORY_MESSAGES);

  // Cap both per-message and aggregate size of what's actually sent to the model.
  const tooBig =
    trimmed.some((m) => textChars(m) > MAX_INPUT_CHARS) ||
    trimmed.reduce((n, m) => n + textChars(m), 0) > MAX_TOTAL_CHARS;
  if (tooBig) {
    return Response.json(
      { error: "That input is too long. Please shorten it." },
      { status: 413 },
    );
  }

  const groq = createGroq({ apiKey });

  try {
    const modelMessages = await convertToModelMessages(trimmed);
    const result = streamText({
      model: groq(MODEL),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      maxOutputTokens: 1024,
      abortSignal: req.signal,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("chat route error:", err);
    return Response.json(
      { error: "Something went wrong generating a reply." },
      { status: 500 },
    );
  }
}
