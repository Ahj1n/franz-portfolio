import type { CSSProperties } from "react";
import Link from "next/link";

const container: CSSProperties = {
  maxWidth: 680,
  margin: "0 auto",
  padding: "0 1.5rem",
};

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
    }}>
      <div style={container}>
        <p style={{
          fontFamily: "var(--font-code)",
          fontSize: "0.7rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#333",
          marginBottom: "2rem",
        }}>
          404
        </p>
        <h1 style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: "clamp(2rem, 6vw, 4rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#e8e8e8",
          marginBottom: "1rem",
        }}>
          Nothing here.
        </h1>
        <p style={{
          fontSize: "1rem",
          color: "#555",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
        }}>
          That page doesn&apos;t exist. Maybe it moved, maybe it never did.
        </p>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "0.78rem",
            letterSpacing: "0.1em",
            color: "var(--accent)",
            textTransform: "uppercase",
            borderBottom: "1px solid var(--accent)",
            paddingBottom: 2,
          }}
        >
          ← Home
        </Link>
      </div>
    </main>
  );
}
