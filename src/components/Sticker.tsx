"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";

type StickerProps = {
  children: ReactNode;
  /** baseline rotation in deg (the "loose" angle the card sits at) */
  rotate?: number;
  /** max tilt amplitude in deg on hover */
  tilt?: number;
  /** how far the card lifts on hover (px) */
  lift?: number;
  className?: string;
  style?: MotionStyle;
};

const spring = { type: "spring" as const, stiffness: 220, damping: 20, mass: 0.8 };

/**
 * 3D-tilt card that follows the cursor on hover and lifts with a spring.
 * Generic motion pattern — applied to any card-shaped child.
 */
export default function Sticker({
  children,
  rotate = 0,
  tilt = 8,
  lift = 10,
  className = "",
  style,
}: StickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  // raw cursor offset in [-0.5, 0.5]
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  // spring-smoothed
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  // map to rotation (X flipped — moving cursor up tilts top toward you)
  const rotateX = useTransform(sy, [-0.5, 0.5], [tilt, -tilt]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-tilt, tilt]);
  const translateZ = useMotionValue(0);
  const z = useSpring(translateZ, spring);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    px.set(x);
    py.set(y);
  };
  const onPointerEnter = () => translateZ.set(lift);
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
    translateZ.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`sticker ${className}`}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{
        rotate,
        rotateX,
        rotateY,
        z, // translateZ via 3d transform
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
