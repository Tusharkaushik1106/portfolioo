"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** delay in seconds before the element animates in */
  delay?: number;
  /** how far the element travels in from below (px) */
  y?: number;
  className?: string;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.6 },
  },
};

/** Reveal a single element with a spring as it scrolls into view. */
export default function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(4px)" },
        shown: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            type: "spring",
            stiffness: 120,
            damping: 18,
            mass: 0.6,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers RevealItem children as the group enters view. */
export function RevealGroup({
  children,
  stagger = 0.08,
  className,
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
