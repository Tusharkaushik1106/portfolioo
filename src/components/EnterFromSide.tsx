"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Side = "left" | "right" | "bottom";

/**
 * Spring-eased entrance that slides + blurs in from a chosen side as the
 * element enters the viewport. Pair with ScrollFloat for parallax depth.
 */
export default function EnterFromSide({
  children,
  from,
  delay = 0,
}: {
  children: ReactNode;
  from: Side;
  delay?: number;
}) {
  const offset =
    from === "left"
      ? { x: -80, y: 0 }
      : from === "right"
      ? { x: 80, y: 0 }
      : { x: 0, y: 60 };

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(6px)", ...offset }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 110,
          damping: 18,
          mass: 0.7,
          delay,
        },
      }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}
