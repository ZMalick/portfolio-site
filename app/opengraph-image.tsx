import { ImageResponse } from "next/og";

// Dynamic Open Graph / Twitter card image. Next wires this file to both
// og:image and twitter:image automatically (1200×630). Mirrors the site's
// near-black canvas + single lime accent, no external font fetch so the
// build can't fail on a font CDN hiccup.
export const alt =
  "Zaid Malick — AI Engineer building agentic systems. Agent orchestration, RAG, and eval-first development.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0c",
          padding: 80,
          color: "#ececee",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#85858f",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              backgroundColor: "#c9f24d",
            }}
          />
          AI Engineer · Forward Deployed Engineer
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -2,
              maxWidth: 960,
            }}
          >
            AI Engineer building agentic systems that ship.
          </div>
          <div style={{ fontSize: 32, color: "#9a9aa4", maxWidth: 880 }}>
            Agent orchestration, RAG, and eval-first development.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 30,
            borderTop: "1px solid #232329",
            paddingTop: 32,
          }}
        >
          <div style={{ fontWeight: 700, color: "#ececee" }}>Zaid Malick</div>
          <div style={{ color: "#c9f24d" }}>Ask my portfolio →</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
