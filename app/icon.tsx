import { ImageResponse } from "next/og";

// Dynamic favicon — a lime "Z" mark on the site's near-black canvas. Same
// ImageResponse approach as the OG image, so there's no binary asset to ship.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c9f24d",
          color: "#0a0a0c",
          fontSize: 24,
          fontWeight: 700,
          fontFamily: "sans-serif",
          borderRadius: 7,
        }}
      >
        Z
      </div>
    ),
    { ...size },
  );
}
