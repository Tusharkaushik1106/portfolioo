"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A small coral disc that trails the real cursor with spring lag.
 * Grows when hovering links/buttons (group sensing via :hover detection).
 * Hidden on touch / coarse-pointer devices.
 */
export default function SpringCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 360, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 360, damping: 28, mass: 0.4 });

  const [enabled, setEnabled] = useState(false);
  const [grown, setGrown] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    // Disable on touch / fine pointer absent
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      // sense whether the cursor is over an interactive element
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest("a, button, [data-cursor='grow']");
      setGrown(interactive);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = grown ? 44 : 14;
  const scale = pressed ? 0.85 : 1;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          scale,
          backgroundColor: grown ? "rgba(227,83,66,0.18)" : "rgb(227,83,66)",
          borderColor: "rgb(227,83,66)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
        className="rounded-full border-2 mix-blend-screen"
      />
    </motion.div>
  );
}
