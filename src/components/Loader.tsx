"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * First-load overlay — a "boarding pass / passport" loader that lives in the
 * same scrapbook world as the rest of the site (coral ink on warm charcoal,
 * a dashed compass ring with the story-thread pulse bead riding its edge, the
 * hand-script signature drawing itself on, and a perforated ticket progress
 * bar with a live 00→100 counter). When the page is ready it lifts away like a
 * turning page to reveal the site.
 *
 * Shows once per tab session (sessionStorage) and honours reduced-motion.
 */

const RING_R = 54;
const RING_C = 2 * Math.PI * RING_R; // ≈ 339.29
const MIN_MS = 2100; // floor so the animation always lands, even on a warm cache

export default function Loader() {
  const pathname = usePathname();
  // null = undecided (SSR/first paint), true/false once we've checked the env
  const [show, setShow] = useState<boolean | null>(null);
  const progress = useMotionValue(0); // 0 → 100
  const barWidth = useTransform(progress, (v) => `${v}%`);

  // ring + bead derived from progress
  const p = useTransform(progress, [0, 100], [0, 1]);
  const dashoffset = useTransform(p, (v) => RING_C * (1 - v));
  const beadAngle = useTransform(p, (v) => -Math.PI / 2 + v * 2 * Math.PI);
  const beadX = useTransform(beadAngle, (a) => 70 + RING_R * Math.cos(a));
  const beadY = useTransform(beadAngle, (a) => 70 + RING_R * Math.sin(a));
  const beadOpacity = useTransform(p, [0, 0.04, 0.99, 1], [0, 1, 1, 0]);

  const [count, setCount] = useState(0);

  // decide whether to render at all
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("tk-loaded") === "1";
    const onAdmin = pathname?.startsWith("/keystatic"); // admin manages its own UI
    // client-only env (matchMedia/sessionStorage) must be read post-mount to
    // avoid a hydration mismatch — one-shot decision, not a cascading render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(!reduce && !seen && !onAdmin);
  }, [pathname]);

  // run the progress animation + dismissal once we've decided to show
  useEffect(() => {
    if (show !== true) return;
    document.documentElement.style.overflow = "hidden"; // lock scroll while loading
    const start = performance.now();

    const unsub = progress.on("change", (v) => setCount(Math.round(v)));

    // ease most of the way up, then let the page-ready signal finish it
    const controls = animate(progress, 88, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });

    let dismissed = false;
    const finish = () => {
      if (dismissed) return;
      dismissed = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      window.setTimeout(() => {
        animate(progress, 100, { duration: 0.45, ease: [0.22, 1, 0.36, 1] });
        window.setTimeout(() => {
          sessionStorage.setItem("tk-loaded", "1");
          setShow(false);
        }, 480);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => {
      controls.stop();
      unsub();
      window.removeEventListener("load", finish);
      document.documentElement.style.overflow = "";
    };
  }, [show, progress]);

  return (
    <AnimatePresence onExitComplete={() => (document.documentElement.style.overflow = "")}>
      {show === true && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-ink"
          style={{
            // faint coral graph grid + paper grain, echoing .graph on dark ink
            backgroundImage:
              "linear-gradient(rgba(227,83,66,0.07) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(227,83,66,0.07) 1px, transparent 1px)," +
              "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "32px 32px, 32px 32px, 4px 4px",
          }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-6%",
            scale: 1.04,
            filter: "blur(10px)",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* vignette so the centre pops */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* "DEPARTING" passport stamp — thumps in, rotated, like the icon rail */}
          <motion.div
            aria-hidden
            className="absolute font-mono"
            style={{ top: "20%", right: "14%", rotate: "-14deg" }}
            initial={{ opacity: 0, scale: 2.4 }}
            animate={{ opacity: [0, 0, 0.85], scale: [2.4, 2.4, 1] }}
            transition={{ duration: 0.5, times: [0, 0.6, 1], delay: 0.9, ease: "backOut" }}
          >
            <div className="rounded-md border-[3px] border-coral/70 px-3 py-1.5 text-coral/80">
              <div className="text-[10px] font-bold tracking-[0.35em]">DEPARTING</div>
              <div className="mt-0.5 text-center text-[8px] tracking-[0.2em] opacity-70">
                NEW DELHI · GMT+5:30
              </div>
            </div>
          </motion.div>

          {/* compass ring + signature */}
          <div className="relative">
            <svg width="220" height="220" viewBox="0 0 140 140" className="overflow-visible">
              {/* dotted guide track — the "not yet reached" path */}
              <circle
                cx="70"
                cy="70"
                r={RING_R}
                fill="none"
                stroke="var(--coral)"
                strokeWidth="2"
                strokeDasharray="2 9"
                strokeLinecap="round"
                opacity="0.22"
              />
              {/* slow-spinning outer tick ring for a compass feel */}
              <motion.circle
                cx="70"
                cy="70"
                r={RING_R + 9}
                fill="none"
                stroke="var(--coral)"
                strokeWidth="1.5"
                strokeDasharray="1 13"
                strokeLinecap="round"
                opacity="0.35"
                style={{ transformOrigin: "70px 70px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              {/* the drawn-in progress arc (coral thread) */}
              <motion.circle
                cx="70"
                cy="70"
                r={RING_R}
                fill="none"
                stroke="var(--coral)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                style={{ strokeDashoffset: dashoffset, transformOrigin: "70px 70px", rotate: -90 }}
              />
              {/* glowing bead riding the leading edge — the story-pulse motif */}
              <motion.circle
                r="6"
                fill="var(--coral)"
                stroke="var(--paper-white)"
                strokeWidth="2.5"
                style={{ cx: beadX, cy: beadY, opacity: beadOpacity }}
              />
            </svg>

            {/* signature draws on inside the ring (clip-path wipe, like the hero) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="font-script font-semibold text-coral"
                style={{ fontSize: "44px", lineHeight: 1 }}
                initial={{ clipPath: "inset(0 100% -20% 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% -20% 0)", opacity: 1 }}
                transition={{
                  clipPath: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 },
                  opacity: { duration: 0.2, delay: 0.25 },
                }}
              >
                Tushar
              </motion.span>
            </div>
          </div>

          {/* label + perforated ticket progress */}
          <motion.div
            className="relative z-10 mt-9 flex w-[260px] flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex w-full items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.28em] text-paper/55">
              <span>Loading portfolio</span>
              <span className="tabular-nums text-coral">{String(count).padStart(2, "0")}%</span>
            </div>

            {/* the ticket: coral fill on a perforated cream track */}
            <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-paper/10">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-coral"
                style={{ width: barWidth }}
              />
              {/* perforation ticks over the bar */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent 0 18px, rgba(33,33,33,0.55) 18px 20px)",
                }}
              />
            </div>

            <div className="mt-3 font-hand text-[15px] text-paper/40">
              packing the suitcase…
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
