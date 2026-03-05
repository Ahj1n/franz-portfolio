"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Variant = "fade" | "wipe";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function getInitial(variant: Variant) {
  if (variant === "wipe") return { clipPath: "inset(0 100% 0 0)", opacity: 0 };
  return { opacity: 0, y: 20 };
}

function getAnimate(variant: Variant, isInView: boolean) {
  if (!isInView) return {};
  if (variant === "wipe") return { clipPath: "inset(0 0% 0 0)", opacity: 1 };
  return { opacity: 1, y: 0 };
}

export function RevealOnScroll({
  children,
  delay = 0,
  className,
  style,
  variant = "fade",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  variant?: Variant;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={getInitial(variant)}
      animate={getAnimate(variant, isInView)}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
