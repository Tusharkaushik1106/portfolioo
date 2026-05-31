"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

/**
 * Drives a Lenis smooth-scroll instance from a single RAF loop. All scroll
 * positions read by motion's useScroll continue to work because Lenis
 * still writes to document.scrollingElement.scrollTop.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,        // 0–1; lower = smoother, higher = snappier
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
