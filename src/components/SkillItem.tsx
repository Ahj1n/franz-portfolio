"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "X#$%&?@!01アクンエイ";

export function SkillItem({ skill }: { skill: string }) {
  const [display, setDisplay] = useState(skill);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startScramble = () => {
    setHovered(true);
    let frame = 0;
    let locked = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frame++;
      if (frame % 2 === 0 && locked < skill.length) locked++;

      if (locked >= skill.length) {
        setDisplay(skill);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }

      const scrambled = skill
        .slice(locked)
        .split("")
        .map(() => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
        .join("");
      setDisplay(skill.slice(0, locked) + scrambled);
    }, 40);
  };

  const stopScramble = () => {
    setHovered(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplay(skill);
  };

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return (
    <motion.span
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
      animate={{ x: hovered ? 6 : 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{
        fontFamily: "var(--font-code)",
        fontSize: "0.75rem",
        letterSpacing: "0.03em",
        color: hovered ? "var(--accent)" : "#555",
        transition: "color 0.15s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
      }}
    >
      <motion.span
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        style={{ color: "var(--accent)" }}
      >
        _
      </motion.span>
      {/* Fixed width prevents layout reflow during scramble */}
      <span style={{ display: "inline-block", width: `${skill.length}ch` }}>
        {display}
      </span>
    </motion.span>
  );
}
