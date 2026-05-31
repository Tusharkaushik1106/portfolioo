"use client";

import { motion, useScroll, useTransform } from "motion/react";

/**
 * Two repeating doodle rails pinned to the page edges that drift slowly
 * with the scroll position — adds depth without competing with content.
 * Generic decorative motion; the SVG itself lives in /public/doodle-rail.svg.
 */
export default function ParallaxRails() {
  const { scrollYProgress } = useScroll();
  // left rail drifts up, right rail drifts down — opposite directions
  // amplifies the sense of depth even though both use the same texture.
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ y: leftY }}
        className="doodle-rail pointer-events-none absolute -inset-y-[20%] left-0 hidden w-12 opacity-70 lg:block"
      />
      <motion.div
        aria-hidden
        style={{ y: rightY }}
        className="doodle-rail pointer-events-none absolute -inset-y-[20%] right-0 hidden w-12 opacity-70 lg:block"
      />
    </>
  );
}
