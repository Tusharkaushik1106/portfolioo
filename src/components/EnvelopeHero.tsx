"use client";

import { motion } from "motion/react";
import Sticker from "./Sticker";

const flapVariants = {
  closed: { rotateX: 0, y: 0 },
  open: {
    rotateX: -120,
    y: -10,
    transition: { type: "spring" as const, stiffness: 80, damping: 14, delay: 0.4 },
  },
};

const noteVariants = {
  hidden: { opacity: 0, y: -20, rotate: -8, scale: 0.9 },
  shown: {
    opacity: 1,
    y: 0,
    rotate: 8,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 160, damping: 14, delay: 0.9 },
  },
};

/**
 * Layered envelope hero: a coral back-sheet with a "flap" that folds open on
 * mount, a paper postcard with the greeting, an attached note card at the
 * corner, and a handwritten signature that fades in last.
 */
export default function EnvelopeHero() {
  return (
    <div className="relative mx-auto max-w-2xl px-2" style={{ perspective: 1200 }}>
      {/* back coral paper, peeks out behind */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-x-3 inset-y-2 -bottom-2 rounded bg-coral shadow-lg"
      />

      {/* envelope flap — folds up and over on mount */}
      <motion.div
        aria-hidden
        initial="closed"
        animate="open"
        variants={flapVariants}
        style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
        className="absolute left-3 right-3 -top-1 z-30 h-20 origin-top"
      >
        <div
          className="h-full w-full"
          style={{
            background: "var(--paper)",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            boxShadow: "0 -2px 6px rgba(0,0,0,0.25)",
          }}
        />
      </motion.div>

      {/* foreground postcard with cursor tilt */}
      <Sticker tilt={4} lift={6} className="paper relative z-20 px-8 py-10 text-center sm:px-12">
        <span className="tape -top-3 left-10 -rotate-6" />
        <span className="tape -top-3 right-10 rotate-6" />
        <p
          className="font-serif text-[18px] font-light text-coral"
          style={{ letterSpacing: "-0.4px" }}
        >
          New Delhi
        </p>
        <p className="mt-6 font-serif text-xl text-ink/65 sm:text-2xl">
          Hey, I&apos;m
        </p>

        {/* name + hand-drawn underline + sparkles */}
        <div className="relative mx-auto mt-1 w-fit">
          <Sparkle className="absolute -right-5 -top-2 size-6 text-coral sm:-right-8" />
          <Sparkle className="absolute -left-4 bottom-3 size-4 text-coral/70 sm:-left-7" />
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.7 }}
            className="font-hand text-[3.5rem] font-bold leading-[0.9] text-coral sm:text-7xl"
          >
            Tushar Kaushik
          </motion.h1>
          <Underline className="absolute -bottom-3 left-0 w-full text-coral" />
        </div>

        <p className="mx-auto mt-7 max-w-xl font-serif text-lg text-ink sm:text-xl">
          Product Developer &amp; Full Stack Engineer
        </p>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink/70">
          B.Tech student building AI-powered developer tools, production web
          platforms, and cross-model AI systems with a focus on scalable UX,
          automation, and developer productivity.
        </p>

        {/* tech-stack tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["TypeScript", "Next.js / React", "Python", "AI · LLMs"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink/15 bg-paper-white/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink/70"
            >
              {t}
            </span>
          ))}
        </div>

        {/* open-to-work stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -24 }}
          animate={{ opacity: 1, scale: 1, rotate: -12 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 1.4 }}
          className="absolute bottom-5 left-3 z-30 grid size-20 place-items-center rounded-full border-2 border-dashed border-green/70 bg-green/10 text-center font-mono text-[10px] font-bold uppercase leading-tight tracking-wide text-green sm:left-5"
        >
          open
          <br />
          to work
        </motion.div>
      </Sticker>

      {/* attached note card at top-right — drops in slightly tilted */}
      <motion.div
        initial="hidden"
        animate="shown"
        variants={noteVariants}
        className="sticker absolute -right-4 -top-6 z-40 w-40 origin-top-right bg-paper-white px-3 py-3 text-left sm:-right-10"
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
    </div>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 1.5 }}
    >
      <path d="M12 0c.7 6.2 5.1 10.6 12 12-6.9 1.4-11.3 5.8-12 12-.7-6.2-5.1-10.6-12-12C6.9 10.6 11.3 6.2 12 0Z" />
    </motion.svg>
  );
}

function Underline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 26" fill="none" className={className} aria-hidden preserveAspectRatio="none">
      <motion.path
        d="M6 15 C 80 5, 170 6, 314 12"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.05 }}
      />
      <motion.path
        d="M26 22 C 100 14, 200 14, 298 19"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 1.3 }}
      />
    </svg>
  );
}
