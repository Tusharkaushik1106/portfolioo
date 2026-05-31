"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Live, animated text layer for the hero — sits over the (text-free) notebook
 * image so the lettering can actually animate (the baked-in version can't).
 * Positions are % of the image and sizes are container-query units (cqw) so the
 * whole layer scales 1:1 with the image at any width.
 *
 * Calibrate POS against the text-free hero art once it's in place.
 */

// when the cover has flipped away and the page is revealed
const REVEAL = 1.7;

// positions as % of the image box — tune to match the art
const POS = {
  signature: { left: "11.5%", top: "12%" },
  role: { left: "12.5%", top: "27.5%" },
  headline: { left: "12.5%", top: "35%" },
  location: { left: "12.5%", top: "49%" },
  beliefs: { left: "13%", top: "57%" },
  note1: { left: "17%", top: "66%", width: "13%", rotate: -3 },
  note2: { left: "31%", top: "65.5%", width: "13%", rotate: 1 },
  note3: { left: "45.5%", top: "66.5%", width: "13%", rotate: 3 },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function AnimatedHeroText() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-30"
      style={{ containerType: "inline-size" }}
    >
      {/* signature — draws on with a left→right wipe */}
      <motion.div
        className="absolute font-script font-semibold leading-none text-coral"
        style={{ ...POS.signature, fontSize: "8.5cqw" }}
        initial={{ clipPath: "inset(0 100% -10% 0)", opacity: 0 }}
        animate={{ clipPath: "inset(0 0% -10% 0)", opacity: 1 }}
        transition={{
          clipPath: { duration: 1, ease, delay: REVEAL },
          opacity: { duration: 0.2, delay: REVEAL },
        }}
      >
        Tushar
      </motion.div>

      {/* role — rolls between the two titles */}
      <RoleCycle />

      {/* headline — word-by-word reveal */}
      <div
        className="absolute font-serif font-bold leading-[1.05] text-coral"
        style={{ ...POS.headline, fontSize: "4.4cqw" }}
      >
        {["Software", "should"].map((w, i) => (
          <Word key={w} delay={REVEAL + 0.7 + i * 0.12}>
            {w}{" "}
          </Word>
        ))}
        <br />
        {["feel", "effortless"].map((w, i) => (
          <Word key={w} delay={REVEAL + 0.95 + i * 0.12}>
            {w}{" "}
          </Word>
        ))}
      </div>

      {/* location */}
      <motion.div
        className="absolute font-mono uppercase text-coral/80"
        style={{ ...POS.location, fontSize: "1.35cqw", letterSpacing: "0.12em" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: REVEAL + 1.3 }}
      >
        New Delhi&nbsp;•&nbsp;GMT +5:30
      </motion.div>

      {/* "3 things I strongly believe in" */}
      <motion.div
        className="absolute font-serif italic text-coral"
        style={{ ...POS.beliefs, fontSize: "1.5cqw" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: REVEAL + 1.5 }}
      >
        3 things I strongly believe in
      </motion.div>

      {/* belief notes — pop in, staggered */}
      <NoteText pos={POS.note1} delay={REVEAL + 1.7}>
        Build with curiosity.
      </NoteText>
      <NoteText pos={POS.note2} delay={REVEAL + 1.85}>
        Solve with empathy.
      </NoteText>
      <NoteText pos={POS.note3} delay={REVEAL + 2.0}>
        Impact that lasts.
      </NoteText>
    </div>
  );
}

const TITLES = ["Product Developer", "Software Engineer"];

/** Role line that rolls between the two titles on a loop. */
function RoleCycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % TITLES.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="absolute overflow-hidden font-serif text-ink/85"
      style={{
        ...POS.role,
        fontSize: "2.7cqw",
        height: "3.4cqw",
        letterSpacing: "0.04em",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          className="leading-[3.4cqw]"
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        >
          {TITLES[i]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Word({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: "0.6cqw" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
    >
      {children}
    </motion.span>
  );
}

function NoteText({
  pos,
  delay,
  children,
}: {
  pos: { left: string; top: string; width: string; rotate: number };
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute font-hand leading-tight text-ink"
      style={{
        left: pos.left,
        top: pos.top,
        width: pos.width,
        fontSize: "1.9cqw",
        rotate: `${pos.rotate}deg`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 16, delay }}
    >
      {children}
    </motion.div>
  );
}
