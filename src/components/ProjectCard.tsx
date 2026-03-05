"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function ProjectCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || shouldReduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateX.set(((rect.height / 2 - y) / (rect.height / 2)) * 6);
    rotateY.set(((x - rect.width / 2) / (rect.width / 2)) * 6);
  }

  function handleMouseLeave() {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: 800,
        transformStyle: "preserve-3d",
        rotateX: shouldReduceMotion ? 0 : springRotateX,
        rotateY: shouldReduceMotion ? 0 : springRotateY,
        boxShadow: hovered ? "0 8px 40px rgba(0, 212, 255, 0.12)" : "none",
        transition: "box-shadow 0.2s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
