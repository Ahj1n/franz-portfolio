import type { CSSProperties } from "react";
import { AnimatedHero, AnimatedNav } from "@/components/AnimatedHero";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillItem } from "@/components/SkillItem";
import type { GitHubStats as GitHubStatsType } from "@/lib/github";
import { getGitHubStats } from "@/lib/github";
import { GitHubStats } from "@/components/GitHubStats";

/* ─────────────────────────────────────────────
   Shared styles
───────────────────────────────────────────── */
const container: CSSProperties = {
  maxWidth: 680,
  margin: "0 auto",
  padding: "0 1.5rem",
};

const sectionLabel: CSSProperties = {
  fontFamily: "var(--font-code)",
  fontSize: "0.7rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "2.5rem",
};

const divider: CSSProperties = {
  border: "none",
  borderTop: "1px solid var(--border)",
  margin: "0",
};

const decorativeNumber: CSSProperties = {
  position: "absolute",
  top: "-0.4em",
  left: "-0.02em",
  fontFamily: "var(--font-body)",
  fontWeight: 700,
  fontSize: "clamp(8rem, 18vw, 14rem)",
  color: "rgba(255,255,255,0.025)",
  lineHeight: 1,
  userSelect: "none",
  pointerEvents: "none",
};

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const projects = [
  {
    name: "Echo",
    year: "2026",
    tagline: "Voice Reflection App",
    description:
      "A journaling companion that turns your mood into a personalized creative prompt. Records voice memos, analyses tone, and surfaces patterns over time.",
    stack: ["React", "TypeScript", "Swift", "Python"],
    href: "https://github.com/Ahj1n/echo.git",
  },
  {
    name: "Portfolio",
    year: "2026",
    tagline: "This site",
    description:
      "Minimal personal portfolio. Built with Next.js and TypeScript.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    href: "#",
  },
];

const skills = [
  "TypeScript", "React", "Next.js", "Python",
  "Swift", "Java", "Node.js", "AWS",
  "Docker", "Three.js", "Unity", "Git",
];

/* ─────────────────────────────────────────────
   Projects
───────────────────────────────────────────── */
function Projects() {
  return (
    <section id="projects" style={{ padding: "5rem 0" }}>
      <div style={container}>

        <div style={{ position: "relative", marginBottom: "2.5rem" }}>
          <span style={decorativeNumber} aria-hidden>01</span>
          <p style={{ ...sectionLabel, marginBottom: 0 }}>Projects</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {projects.map((p, i) => (
            <div key={p.name}>
              {i > 0 && <hr style={divider} />}
              <RevealOnScroll delay={i * 0.08} variant="wipe">
                <ProjectCard>
                <article style={{ padding: "2.2rem 0" }}>

                  {/* Title row */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "0.4rem",
                    gap: "1rem",
                  }}>
                    <h3 style={{
                      fontWeight: 600,
                      fontSize: "1.15rem",
                      color: "var(--text)",
                      letterSpacing: "-0.01em",
                    }}>
                      {p.name}
                      <span style={{
                        fontWeight: 400,
                        fontSize: "0.85rem",
                        color: "var(--muted)",
                        marginLeft: "0.75rem",
                      }}>
                        {p.tagline}
                      </span>
                    </h3>
                    <span style={{
                      fontFamily: "var(--font-code)",
                      fontSize: "0.72rem",
                      color: "#444",
                      flexShrink: 0,
                    }}>
                      {p.year}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: "0.93rem",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}>
                    {p.description}
                  </p>

                  {/* Stack + link row */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                  }}>
                    <div style={{
                      display: "flex",
                      gap: "0.6rem",
                      flexWrap: "wrap",
                    }}>
                      {p.stack.map(tech => (
                        <span key={tech} style={{
                          fontFamily: "var(--font-code)",
                          fontSize: "0.68rem",
                          letterSpacing: "0.04em",
                          color: "#555",
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: 3,
                          padding: "2px 7px",
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    {p.href !== "#" && (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline"
                        style={{
                          fontFamily: "var(--font-code)",
                          fontSize: "0.72rem",
                          letterSpacing: "0.06em",
                          flexShrink: 0,
                        }}
                      >
                        GitHub →
                      </a>
                    )}
                  </div>

                </article>
                </ProjectCard>
              </RevealOnScroll>
            </div>
          ))}

          {/* Coming soon */}
          <hr style={divider} />
          <p style={{
            fontFamily: "var(--font-code)",
            fontSize: "0.75rem",
            color: "#333",
            letterSpacing: "0.06em",
            padding: "1.8rem 0",
          }}>
            More in progress —
          </p>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   About + Skills
───────────────────────────────────────────── */
function About({ stats }: { stats: GitHubStatsType }) {
  const bioParagraphs = [
    {
      text: "I\u2019m Franz — 22, Filipino-Canadian, based in Toronto. I study Computer Programming & Analysis at Seneca Polytechnic, graduating April 2026.",
      color: "#aaa",
    },
    {
      text: "I draw, paint, build games, and write code. I snowboard, play basketball and volleyball, and spend too much time watching anime.",
      color: "#888",
    },
    {
      text: "Right now I\u2019m figuring out what kind of creator I want to be. Growing intentionally.",
      color: "#666",
    },
  ];

  return (
    <section id="about" style={{ padding: "5rem 0" }}>
      <div style={container}>

        <div style={{ position: "relative", marginBottom: "2.5rem" }}>
          <span style={decorativeNumber} aria-hidden>02</span>
          <p style={{ ...sectionLabel, marginBottom: 0 }}>About</p>
        </div>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
          alignItems: "start",
        }}>

          {/* Bio */}
          <div style={{ flex: "1 1 300px" }}>
            {bioParagraphs.map((para, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <p style={{
                  fontSize: "1rem",
                  color: para.color,
                  lineHeight: 1.85,
                  marginBottom: i < bioParagraphs.length - 1 ? "1.1rem" : 0,
                }}>
                  {para.text}
                </p>
              </RevealOnScroll>
            ))}
          </div>

          {/* Skills */}
          <div style={{ minWidth: 0, flex: "0 0 auto" }}>
            <p style={{
              fontFamily: "var(--font-code)",
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1rem",
            }}>
              Stack
            </p>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
            }}>
              {skills.map(skill => (
                <SkillItem key={skill} skill={skill} />
              ))}
            </div>
          </div>

        </div>

        <GitHubStats stats={stats} />

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Contact
───────────────────────────────────────────── */
function Contact() {
  const links = [
    { label: "Email",     href: "mailto:balitefranz1212@gmail.com",      display: "balitefranz1212@gmail.com" },
    { label: "Phone",     href: "tel:4379886787",                         display: "437 988 6787" },
    { label: "Instagram", href: "https://instagram.com/franz.balite",     display: "@franz.balite" },
    { label: "GitHub",    href: "https://github.com/Ahj1n",               display: "github.com/Ahj1n" },
    { label: "LinkedIn",  href: "https://www.linkedin.com/in/franz-balite-a65199193/",  display: "linkedin.com/in/franz-balite" },
  ];

  return (
    <section id="contact" style={{ padding: "5rem 0 4rem" }}>
      <div style={container}>

        <div style={{ position: "relative", marginBottom: "2.5rem" }}>
          <span style={decorativeNumber} aria-hidden>03</span>
          <p style={{ ...sectionLabel, marginBottom: 0 }}>Contact</p>
        </div>

        <h2 style={{
          fontWeight: 600,
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          letterSpacing: "-0.02em",
          color: "var(--text)",
          lineHeight: 1.2,
          marginBottom: "2.8rem",
        }}>
          Let&apos;s work together.
        </h2>

        <RevealOnScroll>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") || link.href.startsWith("tel:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") || link.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "0.7rem",
                  color: "var(--accent)",
                  letterSpacing: "0.06em",
                  minWidth: 60,
                }}>
                  {link.label}
                </span>
                <span
                  className="link-underline"
                  style={{
                    fontFamily: "var(--font-code)",
                    fontSize: "0.82rem",
                    color: "var(--muted)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {link.display}
                </span>
              </a>
            ))}
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "2rem 0",
    }}>
      <div style={{
        ...container,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{
          fontFamily: "var(--font-code)",
          fontSize: "0.68rem",
          color: "#333",
          letterSpacing: "0.06em",
        }}>
          Franz © 2026
        </span>
        <span style={{
          fontFamily: "var(--font-code)",
          fontSize: "0.68rem",
          color: "#2a2a2a",
          letterSpacing: "0.04em",
        }}>
          Toronto
        </span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default async function Home() {
  const githubStats = await getGitHubStats();
  return (
    <>
      <AnimatedNav />
      <main id="main-content">
        <AnimatedHero />
        <hr style={divider} />
        <Projects />
        <hr style={divider} />
        <About stats={githubStats} />
        <hr style={divider} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
