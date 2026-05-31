"use client";

import { motion } from "motion/react";

/**
 * The user's 7 cream sketch graphics scattered down the page gutters (behind
 * content, between the stamp rails and the centred column). One of each, spread
 * across the full height on alternating sides so they punctuate the margins
 * without crowding. Each fades/drifts in as it scrolls into view. The PNGs carry
 * a dark backing that matches the canvas, so they read as loose margin doodles.
 */

type Item = {
  src: string;
  side: "left" | "right";
  top: string; // vertical position as % of the page
  size: number; // px
  rotate: number;
};

// hand-placed so they never sit at the same height on both sides at once
const ITEMS: Item[] = [
  { src: "/graphics/g-key.png", side: "left", top: "9%", size: 76, rotate: -10 },
  { src: "/graphics/g-potion.png", side: "right", top: "20%", size: 84, rotate: 8 },
  { src: "/graphics/g-book.png", side: "left", top: "38%", size: 80, rotate: 7 },
  { src: "/graphics/g-cage.png", side: "right", top: "50%", size: 88, rotate: -6 },
  { src: "/graphics/g-dagger.png", side: "left", top: "66%", size: 78, rotate: 12 },
  { src: "/graphics/g-bag.png", side: "right", top: "78%", size: 82, rotate: -9 },
  { src: "/graphics/g-candle.png", side: "left", top: "90%", size: 80, rotate: 5 },
];

export default function GraphicsScatter() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
      {/* luminance key: brightness -> alpha, so the dark PNG backing drops out
          and only the cream linework remains (no visible box). */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="luma-key" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0.34 0.34 0.34 0 0"
            />
            <feComponentTransfer>
              <feFuncA type="linear" slope="3.2" intercept="-0.55" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {ITEMS.map((it, i) => (
        <motion.img
          // eslint-disable-next-line @next/next/no-img-element
          key={it.src}
          src={it.src}
          alt=""
          width={it.size}
          height={it.size}
          style={{
            top: it.top,
            [it.side]: "clamp(8px, 4vw, 70px)",
            width: it.size,
            height: "auto",
            filter: "url(#luma-key)",
          }}
          className="absolute opacity-80"
          initial={{ opacity: 0, y: 24, rotate: it.rotate - 6, scale: 0.85 }}
          whileInView={{ opacity: 0.8, y: 0, rotate: it.rotate, scale: 1 }}
          viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
          transition={{ type: "spring", stiffness: 120, damping: 16, delay: (i % 3) * 0.05 }}
        />
      ))}
    </div>
  );
}
