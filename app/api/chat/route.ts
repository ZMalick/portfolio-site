import { createGroq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { SYSTEM_PROMPT } from "@/content/corpus";
import { checkRateLimit } from "@/lib/ratelimit";

// Node runtime (NOT edge) — edge's ~30s cap cuts off streaming; Node allows ~60s.
export const runtime = "nodejs";
export const maxDuration = 60;

// ~2,000 tokens ≈ ~8,000 chars. Reject longer user input server-side.
const MAX_INPUT_CHARS = 8_000;
// Keep cost bounded — only the most recent turns are sent to the model.
const MAX_HISTORY_MESSAGES = 12;

// Llama 3.3 70B on Groq's free tier (see decisions/log.md). Fast inference,
// generous free limits, no billing. The corpus is small, so no caching layer.
const MODEL = "llama-3.3-70b-versatile";

function latestUserText(messages: UIMessage[]): string {
  const last = [...messages].reverse().find((m) => m.role === "user");
  if (!last) return "";
  return last.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join(" ");
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "anonymous";
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

  if (latestUserText(messages).length > MAX_INPUT_CHARS) {
    return Response.json(
      { error: "That message is too long. Please shorten it." },
      { status: 413 },
    );
  }

  const trimmed = messages.slice(-MAX_HISTORY_MESSAGES);
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
