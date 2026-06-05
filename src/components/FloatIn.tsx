"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type Side = "left" | "right" | "bottom";

/**
 * Scroll-linked float-in (notebook/portfolio style): as the element travels
 * from the bottom of the viewport up to the centre, it rises, scales, un-rotates
 * and fades in — scrubbed continuously against scroll position (not a one-shot),
 * so the cards feel like they settle into the page as you scroll, then drift
 * with a touch of parallax. Spring-smoothed for a buttery feel.
 */
export default function FloatIn({
  children,
  from = "bottom",
  /** baseline tilt the card starts rotated at, in degrees */
  rotate = 4,
  className = "",
}: {
  children: ReactNode;
  from?: Side;
  rotate?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.5,
  });

  const dx = from === "left" ? -70 : from === "right" ? 70 : 0;
  const dy = from === "bottom" ? 90 : 40;

  const opacity = useTransform(p, [0, 0.55, 1], [0, 0.9, 1]);
  const y = useTransform(p, [0, 1], [dy, 0]);
  const x = useTransform(p, [0, 1], [dx, 0]);
  const scale = useTransform(p, [0, 1], [0.9, 1]);
  const rotateZ = useTransform(p, [0, 1], [rotate, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, y, scale, rotate: rotateZ, willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
