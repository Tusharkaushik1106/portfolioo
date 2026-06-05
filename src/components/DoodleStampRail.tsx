"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Vertical seal-stamp rails pinned to the left & right page edges — a repeating
 * column of the user's own orange ink-stamp icons (public/icons/stamp-*.png).
 * The rail is clipped to exactly the page height (inset-y-0 + overflow-hidden,
 * so it never adds phantom scroll) and renders enough tiles to fill any page
 * length. Each side drifts slowly with scroll in opposite directions for depth.
 */

const ICONS = [
  "/icons/stamp-1.png",
  "/icons/stamp-2.png",
  "/icons/stamp-3.png",
  "/icons/stamp-4.png",
  "/icons/stamp-5.png",
  "/icons/stamp-6.png",
  "/icons/stamp-7.png",
  "/icons/stamp-8.png",
];

// tile (h-14 = 56px) + column gap (10px). Used to compute how many tiles fill.
const STEP = 66;
const DRIFT = 60; // px of parallax travel over the full scroll

function Stamp({ index }: { index: number }) {
  const src = ICONS[index % ICONS.length];
  const tilt = ((index * 7) % 5) - 2; // -2..2 deg, hand-stamped feel
  const ink = 0.82 + ((index * 13) % 16) / 100; // 0.82–0.98 ink density
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      className="h-12 w-12 rounded-[7px] object-cover sm:h-14 sm:w-14"
      style={{ transform: `rotate(${tilt * 1.4}deg)`, opacity: ink }}
    />
  );
}

function Column({ count }: { count: number }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      {Array.from({ length: count }, (_, i) => (
        <Stamp key={i} index={i} />
      ))}
    </div>
  );
}

function Rail({ side }: { side: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(24);

  // Measure the page height the rail spans, render enough tiles to fill it
  // (plus the parallax travel + a buffer) so it always reaches the bottom.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () =>
      setCount(Math.ceil((el.clientHeight + DRIFT * 2) / STEP) + 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll();
  // left drifts up, right drifts down — opposite directions for depth
  const range = side === "left" ? [-DRIFT, DRIFT] : [DRIFT, -DRIFT];
  const y = useTransform(scrollYProgress, [0, 1], range);

  // Fade the very top & bottom edges so a partially-clipped tile dissolves into
  // the canvas instead of hard-cutting (the parallax always lands a partial tile
  // at one edge).
  const fade =
    "linear-gradient(to bottom, transparent 0, #000 56px, #000 calc(100% - 56px), transparent 100%)";

  return (
    <div
      ref={ref}
      aria-hidden
      style={{ maskImage: fade, WebkitMaskImage: fade }}
      className={`pointer-events-none absolute inset-y-0 z-0 hidden overflow-hidden lg:block ${
        side === "left" ? "left-1" : "right-1"
      }`}
    >
      {/* the column is taller than the rail and drifts within the clip window */}
      <motion.div style={{ y, marginTop: -DRIFT, willChange: "transform" }}>
        <Column count={count} />
      </motion.div>
    </div>
  );
}

export default function DoodleStampRail() {
  return (
    <>
      <Rail side="left" />
      <Rail side="right" />
    </>
  );
}
