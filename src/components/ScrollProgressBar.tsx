"use client";
import { motion, useScroll } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "var(--accent)",
        scaleX: scrollYProgress,
        transformOrigin: "left",
        zIndex: 9999,
      }}
    />
  );
}
