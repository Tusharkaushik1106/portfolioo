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
    rotateX: -128,
    // stay fully opaque through most of the swing, then fall away as the cover
    // tips back past vertical — reads as a real cover lifting, not a crossfade
    opacity: [1, 1, 1, 0],
    transition: {
      rotateX: { duration: 1.15, ease: [0.7, 0, 0.16, 1] as const, delay: OPEN },
      opacity: { duration: 1.15, times: [0, 0.6, 0.84, 1], delay: OPEN },
    },
  },
};

// the shadow the lifting cover casts onto the page beneath it
const shadowVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: [0, 0.55, 0.4, 0],
    transition: { duration: 1.15, times: [0, 0.35, 0.7, 1], delay: OPEN },
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

        {/* shadow the lifting cover casts on the page (sweeps off as it opens) */}
        <motion.div
          aria-hidden
          initial="closed"
          animate="open"
          variants={shadowVariants}
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,12,6,0.85) 0%, rgba(20,12,6,0.35) 45%, rgba(20,12,6,0) 80%)",
          }}
        />

        {/* designed cover that flips up over the top binding to reveal the art.
            The artwork (binding, florals, mountains, seal) is baked into
            /herosection/cover.png — object-fill keeps every edge element flush
            (cover is 3:2, the book frame is ~1.38:1, so we squeeze ~8% width,
            which is imperceptible on this art and avoids cropping the binding). */}
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
          className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl"
        >
          <Image
            src="/herosection/cover.png"
            alt=""
            fill
            priority
            quality={95}
            sizes="(min-width: 1024px) 64vw, (min-width: 640px) 88vw, 100vw"
            className="object-fill"
          />
          {/* glossy sheen sweep across the cover as it lifts */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.30), rgba(255,255,255,0) 42%)",
            }}
          />
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
            prev. @prepairo
            <br />
            @koncepts
          </p>
          <div className="mt-3 border-t border-ink/5 pt-2 flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-green">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green"></span>
            </span>
            open to work
          </div>
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
