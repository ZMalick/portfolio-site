import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Per-IP rate limit for the public chat endpoint. Degrades gracefully:
// with no Upstash creds (local dev, or before they're provisioned) it allows
// all requests rather than hard-failing — production must set the env vars.
const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      // 10 requests per minute per IP
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      prefix: "portfolio:chat",
      analytics: false,
    })
  : null;

export const rateLimitEnabled = hasUpstash;

// Make a misconfiguration loud: fail-open is fine for local dev, but in
// production a missing Upstash config silently removes abuse protection.
if (!hasUpstash && process.env.NODE_ENV === "production") {
  console.warn(
    "[ratelimit] Upstash is NOT configured — the public /api/chat endpoint is unprotected by rate limiting.",
  );
}

export async function checkRateLimit(identifier: string): Promise<{
  success: boolean;
  remaining: number;
  limit: number;
  reset: number;
}> {
  if (!ratelimit) {
    return { success: true, remaining: Infinity, limit: 0, reset: 0 };
  }
  const { success, remaining, limit, reset } = await ratelimit.limit(identifier);
  return { success, remaining, limit, reset };
}
