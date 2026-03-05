"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",     label: "" },
  { id: "projects", label: "01" },
  { id: "about",    label: "02" },
  { id: "contact",  label: "03" },
] as const;

export function SectionCounter() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    // Collect section elements in order
    const sectionEls: Array<{ id: string; el: Element }> = [];
    SECTIONS.forEach(({ id }) => {
      const el = id === "hero"
        ? document.querySelector("main > section")
        : document.getElementById(id);
      if (el) sectionEls.push({ id, el });
    });

    const onScroll = () => {
      // The active section is the last one whose top is at or above 45% of the viewport
      const trigger = window.innerHeight * 0.45;
      let current = sectionEls[0]?.id ?? "hero";
      for (const { id, el } of sectionEls) {
        if (el.getBoundingClientRect().top <= trigger) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set correct state on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="section-counter"
      aria-hidden
      style={{
        position: "fixed",
        right: "1.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <motion.div
            key={id}
            animate={{ opacity: isActive ? 1 : 0.18 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              color: isActive ? "var(--accent)" : "#e8e8e8",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <motion.div
              animate={{ width: isActive ? 12 : 4, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                height: 1,
                background: "var(--accent)",
                borderRadius: 1,
              }}
            />
            {label}
          </motion.div>
        );
      })}
    </div>
  );
}
