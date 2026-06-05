"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Sticker from "./Sticker";

type Decor = "corners" | "pin";

type PhotoItem = {
  src: string;
  alt: string;
  caption: string;
  rotate?: number;
  badge?: React.ReactNode;
  tape?: TapeKind;
  decor?: Decor;
  imgClass?: string;
  aspect?: string;
};

const PHOTOS: PhotoItem[] = [
  {
    src: "/scrapebook/photos/first-intern.jpg",
    alt: "DRDO Solid State Physics Laboratory training certificate",
    caption: "first internship ✦ DRDO",
    rotate: -2.5,
    tape: "coral-center",
    decor: "pin",
    badge: (
      <>
        1st
        <br />
        intern
      </>
    ),
  },
  {
    src: "/scrapebook/photos/first-hackathon.jpg",
    alt: "Team holding certificates after first hackathon win",
    caption: "1st hackathon win 🏆",
    rotate: 2,
    tape: "blue-right",
  },
  {
    src: "/scrapebook/photos/jnu-hackathon.jpg",
    alt: "JNU hackathon win",
    caption: "JNU hackathon — won 🏆",
    rotate: -2,
    tape: "center",
    decor: "pin",
  },
  {
    src: "/scrapebook/photos/gym.jpg",
    alt: "At the gym",
    caption: "we go gym 🏋️",
    rotate: 2.5,
    decor: "corners",
    aspect: "aspect-[3/4]",
    imgClass: "object-top",
  },
  {
    src: "/scrapebook/photos/pitch.jpg",
    alt: "Pitching the project to judges at a fest",
    caption: "pitching with the goats 🐐",
    rotate: -2,
    tape: "left",
    decor: "corners",
  },
  {
    src: "/scrapebook/photos/strava.jpg",
    alt: "Strava run — 25.23 km",
    caption: "first 25km run",
    rotate: 2,
    tape: "green-left",
    aspect: "aspect-[3/4]",
    imgClass: "object-contain bg-black",
  },
];

/** Compact scrapbook page — fits one viewport, photos + hand-drawn decorations. */
export default function MementoBoard() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="graph relative -rotate-[0.5deg] rounded-[14px] p-5 shadow-[0_36px_90px_-24px_rgba(0,0,0,0.75)] sm:p-8">
        {/* corner tapes holding the page down */}
        <PageTape className="-left-4 -top-3 -rotate-[24deg]" />
        <PageTape className="-right-4 -top-3 rotate-[24deg]" />
        <PageTape className="-bottom-3 -left-4 rotate-[24deg]" />
        <PageTape className="-bottom-3 -right-4 -rotate-[24deg]" />

        <Doodles />

        <p className="relative mb-4 text-center font-hand text-xl text-coral">
          a few good memories ♡
        </p>

        {/* two rows: 4 photos on top, [photo · tied-pair · photo] below */}
        <div className="grid grid-cols-2 items-start gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-6">
          <Cell delay={0.05}>
            <PhotoCard {...PHOTOS[0]} />
          </Cell>
          <Cell delay={0.11}>
            <PhotoCard {...PHOTOS[1]} />
          </Cell>
          <Cell delay={0.17}>
            <PhotoCard {...PHOTOS[2]} />
          </Cell>
          <Cell delay={0.23}>
            <PhotoCard {...PHOTOS[3]} />
          </Cell>

          <Cell delay={0.29}>
            <PhotoCard {...PHOTOS[4]} />
          </Cell>
          <Cell delay={0.35} className="sm:col-span-2">
            <TiedPair />
          </Cell>
          <Cell delay={0.41}>
            <PhotoCard {...PHOTOS[5]} />
          </Cell>
        </div>
      </div>
    </div>
  );
}

function Cell({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22, scale: 0.95, filter: "blur(5px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { type: "spring", stiffness: 130, damping: 16, mass: 0.7, delay },
      }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

function PhotoCard({ rotate = 0, decor, ...p }: PhotoItem) {
  return (
    <Sticker rotate={rotate} tilt={10} lift={12} className="polaroid relative w-full">
      {p.tape && <Tape kind={p.tape} />}
      {decor === "pin" && <Pin />}
      <Photo {...p} corners={decor === "corners"} />
    </Sticker>
  );
}

function Photo({
  src,
  alt,
  caption,
  badge,
  corners,
  imgClass = "",
  aspect = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  caption?: string;
  badge?: React.ReactNode;
  corners?: boolean;
  imgClass?: string;
  aspect?: string;
}) {
  return (
    <div className="relative">
      <div className={`relative ${aspect} w-full overflow-hidden bg-ink/10`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 240px, 45vw"
          className={`object-cover ${imgClass}`}
        />
        {corners && (
          <>
            <PhotoCorner className="left-0 top-0" />
            <PhotoCorner className="right-0 top-0 rotate-90" />
            <PhotoCorner className="bottom-0 right-0 rotate-180" />
            <PhotoCorner className="bottom-0 left-0 -rotate-90" />
          </>
        )}
      </div>
      {caption && (
        <p className="pt-2.5 text-center font-hand text-[14px] leading-tight text-ink/85">
          {caption}
        </p>
      )}
      {badge && (
        <span className="absolute -right-3 -top-3 z-20 grid size-11 -rotate-12 place-items-center rounded-full bg-coral text-center font-display text-[10px] uppercase leading-none text-paper-white shadow-md">
          {badge}
        </span>
      )}
    </div>
  );
}

/** Two event polaroids overlapped and tied with a ribbon bow. */
function TiedPair() {
  return (
    <div className="relative mx-auto h-full max-w-md">
      <div className="relative flex items-start justify-center">
        <div className="polaroid relative z-0 w-1/2 -rotate-[5deg]">
          <Photo
            src="/scrapebook/photos/event1.jpg"
            alt="With the crew at the event"
            aspect="aspect-[4/5]"
          />
        </div>
        <div className="polaroid relative z-0 -ml-5 w-1/2 rotate-[5deg]">
          <Photo
            src="/scrapebook/photos/event3.jpg"
            alt="Late-night session at the event"
            aspect="aspect-[4/5]"
          />
        </div>
        <Bow className="absolute left-1/2 top-0 z-10 -translate-x-1/2 drop-shadow" />
      </div>
      <p className="mt-2 text-center font-hand text-lg text-ink/90">
        2× events organised
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- decorations */

type TapeKind =
  | "center"
  | "left"
  | "right"
  | "coral-center"
  | "blue-right"
  | "green-left";

function Tape({ kind }: { kind: TapeKind }) {
  const place: Record<TapeKind, string> = {
    center: "left-1/2 -translate-x-1/2 -rotate-3 bg-paper-white/35",
    left: "left-2 -rotate-[18deg] bg-paper-white/35",
    right: "right-2 rotate-[18deg] bg-paper-white/35",
    "coral-center": "left-1/2 -translate-x-1/2 -rotate-3 bg-coral/30",
    "blue-right": "right-2 rotate-[18deg] bg-blue/25",
    "green-left": "left-2 -rotate-[16deg] bg-green/30",
  };
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -top-2.5 z-20 h-5 w-16 shadow-sm ${place[kind]}`}
    />
  );
}

function Pin() {
  return (
    <span aria-hidden className="absolute -top-2.5 left-1/2 z-20 -translate-x-1/2">
      <span className="block size-4 rounded-full bg-coral shadow-[0_2px_3px_rgba(0,0,0,0.4)] ring-2 ring-coral-soft/70" />
      <span className="absolute left-1/2 top-1 size-1.5 -translate-x-1/2 rounded-full bg-paper-white/80" />
    </span>
  );
}

function PageTape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 h-7 w-24 bg-paper-white/45 shadow-sm ${className}`}
    />
  );
}

function PhotoCorner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 size-4 bg-ink/55 ${className}`}
      style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
    />
  );
}

/** Scattered hand-drawn doodles in the page margins. */
function Doodles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[14px]">
      <Sparkle className="absolute left-3 top-12 size-8 text-coral sm:left-5" />
      <Sparkle className="absolute right-6 top-20 size-4 text-blue" />
      <Star className="absolute left-1/2 top-2 size-5 text-green" />
      <Heart className="absolute bottom-16 left-2 size-7 text-coral sm:left-4" />
      <Asterisk className="absolute right-4 bottom-20 size-7 text-coral/80" />
      <Star className="absolute right-1/3 top-8 size-4 text-coral/70" />
      <Sparkle className="absolute bottom-8 left-1/3 size-4 text-coral/70" />
    </div>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c.7 6.2 5.1 10.6 12 12-6.9 1.4-11.3 5.8-12 12-.7-6.2-5.1-10.6-12-12C6.9 10.6 11.3 6.2 12 0Z" />
    </svg>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 1l2.9 7.6L23 9.3l-6 5.3 1.9 8L12 18.6 5.1 22.6 7 14.6l-6-5.3 8.1-.7L12 1z" />
    </svg>
  );
}

function Heart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 21s-7.5-4.7-10-9.3C.4 8 2.3 4.2 6 4.2c2.3 0 3.7 1.4 4.6 2.7l1.4 2 1.4-2c.9-1.3 2.3-2.7 4.6-2.7 3.7 0 5.6 3.8 4 7.5C19.5 16.3 12 21 12 21z" />
    </svg>
  );
}

function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9" />
    </svg>
  );
}

function Bow({ className = "" }: { className?: string }) {
  const ribbon = "#e08a63"; // coral-soft
  const knot = "#c96f4a"; // coral
  return (
    <svg width="64" height="42" viewBox="0 0 72 46" fill="none" className={className} aria-hidden>
      {/* tails */}
      <path d="M34 22 L24 45" stroke={knot} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M38 22 L48 45" stroke={knot} strokeWidth="3.5" strokeLinecap="round" />
      {/* left loop */}
      <path d="M36 21 L9 9 L9 33 Z" fill={ribbon} />
      {/* right loop */}
      <path d="M36 21 L63 9 L63 33 Z" fill={ribbon} />
      {/* center knot */}
      <circle cx="36" cy="21" r="6" fill={knot} />
    </svg>
  );
}
