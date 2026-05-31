"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Next.js `template` re-mounts on route change, so wrapping children in a
 * motion node here gives a clean enter animation for every navigation.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring", stiffness: 110, damping: 20, mass: 0.7 },
      }}
      exit={{ opacity: 0, y: -16, filter: "blur(6px)", transition: { duration: 0.25 } }}
    >
      {children}
    </motion.div>
  );
}
