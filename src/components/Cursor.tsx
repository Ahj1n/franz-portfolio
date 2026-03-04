"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function Cursor() {
  // Start off-screen so the dot never flashes at (0,0) on mount
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    // Hide the native cursor and track mouse position
    document.body.style.cursor = "none";
    const update = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", update);
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", update);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        aria-hidden
        className="custom-cursor"
        style={{
          position: "fixed",
          left: mouseX,
          top: mouseY,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "var(--accent)",
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <motion.div
        aria-hidden
        className="custom-cursor"
        style={{
          position: "fixed",
          left: springX,
          top: springY,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid rgba(0,212,255,0.28)",
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
    </>
  );
}
