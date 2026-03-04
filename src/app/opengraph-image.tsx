import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Franz — Creative Developer & Artist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#0d0d0d",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Accent rule */}
        <div
          style={{
            width: 48,
            height: 3,
            background: "#00d4ff",
            borderRadius: 2,
            marginBottom: 40,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 112,
            fontWeight: 700,
            color: "#e8e8e8",
            lineHeight: 1,
            letterSpacing: "-2px",
            marginBottom: 32,
          }}
        >
          Franz
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#666",
            letterSpacing: "0px",
          }}
        >
          Creative developer, artist, and builder.
        </div>

        {/* Domain — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 72,
            right: 96,
            fontSize: 22,
            color: "#333",
            letterSpacing: "2px",
            fontFamily: "monospace",
          }}
        >
          franz.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
