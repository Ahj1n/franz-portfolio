"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const container: CSSProperties = {
  maxWidth: 680,
  margin: "0 auto",
  padding: "0 1.5rem",
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  } as const;
}

const SCRAMBLE_CHARS = "X#$%&?@!0123456789アクンエイ";
const TARGET = "Franz";

/* Typewriter — types out text after a delay, blinking cursor fades when done */
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setCursorVisible(true);
      let i = 0;
      intervalRef.current = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => setCursorVisible(false), 700);
        }
      }, 38);
    }, delay * 1000);

    return () => {
      clearTimeout(startTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  return (
    <>
      {displayed || "\u00A0"}
      {cursorVisible && (
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={{ color: "var(--accent)", marginLeft: 1 }}
        >
          |
        </motion.span>
      )}
    </>
  );
}

function ScrambleText() {
  const [display, setDisplay] = useState(TARGET);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lockedRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    lockedRef.current = 0;

    intervalRef.current = setInterval(() => {
      frame += 1;

      if (frame % 3 === 0 && lockedRef.current < TARGET.length) {
        lockedRef.current += 1;
      }

      const locked = lockedRef.current;

      if (locked >= TARGET.length) {
        setDisplay(TARGET);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }

      const scrambled = TARGET.slice(locked)
        .split("")
        .map(() => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
        .join("");

      setDisplay(TARGET.slice(0, locked) + scrambled);
    }, 60);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return <>{display}</>;
}

export function AnimatedHero() {
  return (
    <section style={{ padding: "7rem 0 6rem" }}>
      <div style={container}>

        {/* Name */}
        <motion.h1
          {...fadeUp(0)}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "clamp(3.4rem, 9vw, 6.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #ffffff 40%, var(--accent) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <ScrambleText />
        </motion.h1>

        {/* Accent rule */}
        <div style={{ margin: "1.4rem 0 1.6rem" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 36 }}
            transition={{ duration: 0.55, delay: 0.12, ease }}
            style={{
              height: 2,
              background: "var(--accent)",
              borderRadius: 1,
            }}
          />
        </div>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.24)}
          style={{
            fontSize: "1.1rem",
            color: "var(--muted)",
            lineHeight: 1.7,
            maxWidth: 440,
            marginBottom: "0.5rem",
          }}
        >
          <TypewriterText text="Creative developer, artist, and builder." delay={1.3} />
          <br />
          Based in Toronto.
        </motion.p>

        {/* Education */}
        <motion.p
          {...fadeUp(0.36)}
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "0.78rem",
            color: "#444",
            letterSpacing: "0.04em",
            marginBottom: "3rem",
          }}
        >
          Computer Programming &amp; Analysis — Seneca Polytechnic, &apos;26
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.48)}
          style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
        >
          <a
            href="#projects"
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              color: "var(--accent)",
              textTransform: "uppercase",
              borderBottom: "1px solid var(--accent)",
              paddingBottom: 2,
              transition: "opacity 0.15s ease",
            }}
          >
            View work ↓
          </a>
          <a
            href="#contact"
            className="link-accent"
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              color: "var(--muted)",
              textTransform: "uppercase",
              transition: "color 0.15s ease",
            }}
          >
            Contact →
          </a>
        </motion.div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Nav with active section indicator
───────────────────────────────────────────── */
const linkStyle: CSSProperties = {
  fontFamily: "var(--font-code)",
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  // color and transition are handled by the .link-accent CSS class
  display: "flex",
  alignItems: "center",
  gap: "0.3rem",
};

const navContainer: CSSProperties = {
  maxWidth: 680,
  margin: "0 auto",
  padding: "0 1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 58,
};

export function AnimatedNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sections = ["projects", "about", "contact"];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      borderBottom: "1px solid var(--border)",
      background: "rgba(13,13,13,0.88)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    }}>
      <div style={navContainer}>
        <a href="#" style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "0.95rem",
          color: "var(--text)",
          letterSpacing: "0.02em",
        }}>
          Franz
        </a>

        <div style={{ display: "flex", gap: "1.75rem" }}>
          {sections.map((id) => {
            const label = id.charAt(0).toUpperCase() + id.slice(1);
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className="link-accent"
                style={linkStyle}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="dot"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: "var(--accent)", lineHeight: 1 }}
                    >
                      •
                    </motion.span>
                  )}
                </AnimatePresence>
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
