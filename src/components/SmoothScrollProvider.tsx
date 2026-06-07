"use client";

import Lenis from "lenis";
import { cancelFrame, frame } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/**
 * Smooth scroll driven by Lenis, but stepped from Framer Motion's single frame
 * loop (instead of its own RAF). This keeps Lenis's smoothed scroll position and
 * every motion `useScroll`/`useTransform` value updating in the SAME tick — no
 * one-frame desync, so scroll-linked animation stays jitter-free and buttery.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    // the Keystatic admin manages its own scrolling — don't hijack it
    if (pathname?.startsWith("/keystatic")) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // honour reduced-motion — native scroll, no smoothing

    const lenis = new Lenis({
      lerp: 0.1, // smoothing factor — lower = silkier, higher = snappier
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: true, // smoother momentum on trackpads / touch
    });

    // step Lenis from Motion's frameloop (shared RAF) every frame
    const update = (data: { timestamp: number }) => lenis.raf(data.timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
