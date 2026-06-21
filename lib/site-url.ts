// Canonical site URL for metadata, OG tags, and the sitemap.
// Resolution order:
//   1. NEXT_PUBLIC_SITE_URL  — set this to a custom domain when you have one
//   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's stable production domain (auto)
//   3. localhost — local dev fallback
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}
