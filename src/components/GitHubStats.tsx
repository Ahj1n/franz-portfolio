import type { CSSProperties } from "react";
import type { GitHubStats } from "@/lib/github";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const labelStyle: CSSProperties = {
  fontFamily: "var(--font-code)",
  fontSize: "0.7rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "1.2rem",
  display: "inline-block",
};

function StatRow({ value, label }: { value: number | null; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
      <span
        style={{
          fontFamily: "var(--font-code)",
          fontSize: "1.05rem",
          color: "var(--text)",
          minWidth: "2.5rem",
          textAlign: "right",
          display: "inline-block",
        }}
      >
        {value ?? "—"}
      </span>
      <span
        style={{
          fontFamily: "var(--font-code)",
          fontSize: "0.78rem",
          color: "#444",
          letterSpacing: "0.03em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function GitHubStats({ stats }: { stats: GitHubStats }) {
  const year = new Date().getFullYear();
  return (
    <RevealOnScroll delay={0.3}>
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "1.8rem",
          marginTop: "2rem",
        }}
      >
        <a
          href="https://github.com/Ahj1n"
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent"
          style={labelStyle}
        >
          GitHub ↗
        </a>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <StatRow value={stats.commitsThisYear} label={`commits in ${year}`} />
          <StatRow value={stats.commitsLastYear} label={`commits in ${year - 1}`} />
          <StatRow value={stats.longestStreak} label={`day longest streak in ${year}`} />
          <StatRow value={stats.publicRepos} label="public repos" />
        </div>
      </div>
    </RevealOnScroll>
  );
}
