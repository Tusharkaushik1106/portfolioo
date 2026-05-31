"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin coral bar pinned to the top of the viewport that fills with scroll
 * progress. Smoothed by a spring so it lags slightly behind raw scroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.6,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-coral"
    />
  );
}
