"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Global tap/click effect: every pointer-down anywhere spawns a small burst of
 * coral strokes that pop outward and fade at the cursor. Pure decoration —
 * fixed overlay, pointer-events-none, so it never blocks interaction.
 */

type Burst = { id: number; x: number; y: number };

const STROKES = 6;
const LIFE = 600; // ms before a burst is cleaned up

let counter = 0;
// deterministic per-burst/stroke jitter so SSR/CSR don't disagree (no Math.random in render)
const rand = (a: number, b: number) => {
  const t = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return t - Math.floor(t); // 0..1
};

export default function ClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const id = ++counter;
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(
        () => setBursts((b) => b.filter((x) => x.id !== id)),
        LIFE,
      );
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {bursts.map((b) => (
          <Burst key={b.id} {...b} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Burst({ id, x, y }: Burst) {
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {Array.from({ length: STROKES }, (_, i) => {
        const angle = (360 / STROKES) * i + (rand(id, i) - 0.5) * 26;
        const dist = 14 + rand(id, i + 9) * 12; // how far it flies out
        const len = 18 + rand(id, i + 3) * 8; // stroke length
        const flip = rand(id, i + 5) > 0.5 ? 1 : -1;
        const coral = rand(id, i + 7) > 0.5 ? "#e35342" : "#f86c69";
        return (
          <span
            key={i}
            className="absolute left-0 top-0"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <motion.span
              className="absolute"
              style={{ left: -4, transformOrigin: "center bottom" }}
              initial={{ y: -4, opacity: 0, scaleY: 0.4 }}
              animate={{ y: -4 - dist, opacity: [0, 1, 1, 0], scaleY: 1 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.3, 1] }}
            >
              <svg width="8" height={len} viewBox={`0 0 8 ${len}`} fill="none">
                <path
                  d={`M4 ${len} C ${4 - flip * 2} ${len * 0.6}, ${4 + flip * 2} ${len * 0.35}, 4 1`}
                  stroke={coral}
                  strokeWidth="3.4"
                  strokeLinecap="round"
                />
              </svg>
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}
