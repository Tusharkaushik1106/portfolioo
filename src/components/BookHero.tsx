"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Sticker from "./Sticker";
import AnimatedHeroText from "./AnimatedHeroText";

/**
 * Flip to `true` once /herosection/hero.png is the TEXT-FREE art (notebook +
 * illustration + blank notes, no lettering). The live animated text then renders
 * on top. While `false`, the baked-text image is shown as-is.
 */
const LIVE_TEXT = false;

/**
 * Hero — the user's generated notebook spread (public/herosection/hero.png),
 * presented as an opening book:
 *  1. the closed notebook rises up from the bottom,
 *  2. a cream cover flips up & back over the top binding, revealing the art,
 *  3. the spread settles and breathes with a slow idle float (+ cursor tilt).
 */

const RISE = 0.55;
const OPEN = RISE + 0.05;
const REVEALED = OPEN + 1.0; // cover fully out of the way

const coverVariants = {
  closed: { rotateX: 0, opacity: 1 },
  open: {
    rotateX: -118,
    opacity: [1, 1, 0],
    transition: {
      rotateX: { duration: 0.95, ease: [0.66, 0, 0.2, 1] as const, delay: OPEN },
      opacity: { duration: 0.95, times: [0, 0.7, 1], delay: OPEN },
    },
  },
};

export default function BookHero() {
  return (
    <motion.div
      className="relative mx-auto w-full px-2"
      style={{ perspective: 1700 }}
      // rise up from below and settle into place
      initial={{ opacity: 0, y: 150, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: RISE, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* slow idle float once the book has opened — keeps it alive */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          delay: REVEALED,
        }}
      >
        {/* the spread image (cursor-tilt via Sticker). The image already has its
            own coral notebook border baked in and its dark margin was cropped
            off, so it fills the element edge-to-edge — no extra board/ribbon
            needed (those were framing the margin into a visible black band). */}
        <Sticker tilt={3} lift={6} className="relative z-10 overflow-hidden rounded-2xl">
          <Image
            src="/herosection/hero.png"
            alt="Tushar — Product Developer. Software should feel effortless."
            width={1405}
            height={1020}
            priority
            quality={95}
            sizes="(min-width: 1024px) 64vw, (min-width: 640px) 88vw, 100vw"
            className="block h-auto w-full"
          />
          {/* realism: original procedural paper grain + fibre + edge wear */}
          <PaperTexture />
          {/* live animated text (only when the art is text-free) */}
          {LIVE_TEXT && <AnimatedHeroText />}
        </Sticker>

        {/* cream cover that flips up over the top binding to reveal the art */}
        <motion.div
          aria-hidden
          initial="closed"
          animate="open"
          variants={coverVariants}
          style={{
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            zIndex: 40,
          }}
          className="paper absolute inset-0 overflow-hidden rounded-xl shadow-2xl ring-4 ring-coral"
        >
          {/* spiral binding along the top */}
          <span
            aria-hidden
            className="absolute inset-x-6 top-2.5 h-3.5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 8px 7px, var(--ink) 4px, transparent 5px)",
              backgroundSize: "30px 14px",
              backgroundRepeat: "repeat-x",
            }}
          />
          {/* sheen sweep */}
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.25), rgba(255,255,255,0) 45%)",
            }}
          />
          <div className="flex h-full w-full items-center justify-center">
            <p className="font-hand text-4xl text-coral/80">my notebook ✦</p>
          </div>
        </motion.div>

        {/* attached note card at top-right — drops in after the book opens */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: -8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotate: 8, scale: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 14, delay: REVEALED + 0.2 }}
          className="sticker absolute -right-3 -top-7 z-50 w-40 origin-top-right bg-paper-white px-3 py-3 text-left sm:-right-8"
        >
          <span className="tape -top-2 left-1/2 h-3 w-12 -translate-x-1/2 rotate-2" />
          <p className="font-hand text-[15px] leading-snug text-ink">
            Product Dev Intern
            <br />@ PrepAiro →
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Original procedural paper texture laid over the hero image so it reads like a
 * real printed/aged notebook page rather than a flat render. All generated with
 * SVG turbulence — no external (copyrighted) texture assets:
 *  • fine grain (paper tooth)        — multiply, low opacity
 *  • coarse fibre / blotches         — overlay, very low opacity
 *  • soft vignette + edge wear       — inset shadow for depth
 */
function PaperTexture() {
  return (
    <>
      {/* fine paper grain */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 h-full w-full mix-blend-multiply"
        style={{ opacity: 0.14 }}
      >
        <filter id="paper-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-grain)" />
      </svg>

      {/* vignette + edge wear for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
        style={{
          boxShadow:
            "inset 0 0 70px rgba(58,38,24,0.18), inset 0 0 14px rgba(58,38,24,0.14)",
        }}
      />
    </>
  );
}
