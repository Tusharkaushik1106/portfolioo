"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Rotates a child by `range` degrees as it scrolls through the viewport.
 * Combine with ScrollFloat for compound parallax (drift + rotate).
 */
export default function ScrollRotate({
  children,
  /** total degrees of rotation across the scroll range */
  range = 6,
  /** sign for direction */
  direction = 1,
  className,
}: {
  children: ReactNode;
  range?: number;
  direction?: -1 | 1;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [(-range / 2) * direction, (range / 2) * direction]
  );
  return (
    <motion.div ref={ref} style={{ rotate }} className={className}>
      {children}
    </motion.div>
  );
}
