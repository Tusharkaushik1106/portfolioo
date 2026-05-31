"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type ScrollFloatProps = {
  children: ReactNode;
  /** how much the element drifts on scroll, in px */
  amount?: number;
  /** direction sign: -1 floats up, +1 floats down */
  direction?: -1 | 1;
  className?: string;
};

/**
 * Wraps a child so it drifts vertically by `amount * direction` px as it
 * moves through the viewport. Using different amounts on neighbouring
 * cards creates real parallax depth in the scroll feel.
 */
export default function ScrollFloat({
  children,
  amount = 60,
  direction = -1,
  className,
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  // 0 = element just enters viewport bottom, 1 = element just exits top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [amount * direction * -1, amount * direction]
  );
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
