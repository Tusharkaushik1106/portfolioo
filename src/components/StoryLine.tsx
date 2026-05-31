"use client";

import { useEffect, useRef } from "react";

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Scroll-driven storyline overlay. Renders an absolutely-positioned SVG that
 * spans the whole `.page` container (must be its parent), computes a smooth
 * cubic path connecting every `[data-anchor]` section head, and "draws" it via
 * the stroke-dashoffset trick as you scroll. A coral pulse rides the leading
 * edge; numbered markers light up when the line reaches them.
 *
 * Authoring API — add to any section head you want as a waypoint (min 2):
 *   data-anchor="left" | "right" | "center"
 *   data-chapter="01"
 *   data-chapter-label="Work"
 */
export default function StoryLine() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const page = wrap.parentElement;
    if (!page) return;

    const svg = wrap.querySelector("svg") as SVGSVGElement;
    const pathBg = svg.querySelector("#story-bg") as SVGPathElement;
    const pathFg = svg.querySelector("#story-fg") as SVGPathElement;
    const markersG = svg.querySelector("#story-markers") as SVGGElement;
    const pulse = svg.querySelector("#story-pulse") as SVGCircleElement;

    let totalLen = 0;
    let firstY = 0;
    let lastY = 0;
    let markers: { el: SVGGElement; len: number }[] = [];
    let raf = 0;

    const sideFactor = (a?: string) =>
      a === "left" ? 0.07 : a === "right" ? 0.93 : 0.5;

    // Binary search for the path length whose point sits at a given Y.
    const lengthAtY = (targetY: number) => {
      let lo = 0;
      let hi = totalLen;
      let best = 0;
      for (let i = 0; i < 20; i++) {
        const mid = (lo + hi) / 2;
        const pt = pathFg.getPointAtLength(mid);
        if (pt.y < targetY) {
          best = mid;
          lo = mid;
        } else {
          hi = mid;
        }
      }
      return best;
    };

    const build = () => {
      const pageW = page.offsetWidth;
      const pageH = page.offsetHeight;
      const pageRect = page.getBoundingClientRect();

      svg.setAttribute("viewBox", `0 0 ${pageW} ${pageH}`);

      const nodes = Array.from(
        page.querySelectorAll<HTMLElement>("[data-anchor]"),
      );
      if (nodes.length < 2) {
        pathBg.setAttribute("d", "");
        pathFg.setAttribute("d", "");
        markersG.innerHTML = "";
        pulse.style.opacity = "0";
        totalLen = 0;
        return;
      }

      const points = nodes.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: pageW * sideFactor(el.dataset.anchor),
          y: r.top - pageRect.top + r.height / 2,
          el,
        };
      });

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const dy = p1.y - p0.y;
        d += ` C ${p0.x} ${p0.y + dy * 0.55}, ${p1.x} ${p1.y - dy * 0.55}, ${p1.x} ${p1.y}`;
      }
      pathBg.setAttribute("d", d);
      pathFg.setAttribute("d", d);

      totalLen = pathFg.getTotalLength();
      pathFg.style.strokeDasharray = String(totalLen);
      pathFg.style.strokeDashoffset = String(totalLen);

      firstY = points[0].y;
      lastY = points[points.length - 1].y;

      console.log(
        "[storyline] pageW",
        pageW,
        "pageH",
        pageH,
        "ys",
        points.map((p) => Math.round(p.y)),
      );

      // Build numbered markers on the curve.
      markersG.innerHTML = "";
      const size = 34;
      markers = points.map((p) => {
        const len = lengthAtY(p.y);
        const g = document.createElementNS(SVG_NS, "g");
        g.setAttribute("class", "story-marker");

        const rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttribute("class", "story-marker__rect");
        rect.setAttribute("x", String(p.x - size / 2));
        rect.setAttribute("y", String(p.y - size / 2));
        rect.setAttribute("width", String(size));
        rect.setAttribute("height", String(size));
        rect.setAttribute("rx", "9");
        g.appendChild(rect);

        const num = document.createElementNS(SVG_NS, "text");
        num.setAttribute("class", "story-marker__num");
        num.setAttribute("x", String(p.x));
        num.setAttribute("y", String(p.y + 1));
        num.setAttribute("text-anchor", "middle");
        num.setAttribute("dominant-baseline", "central");
        num.setAttribute("font-size", "13");
        num.textContent = p.el.dataset.chapter || "";
        g.appendChild(num);

        const labelText = p.el.dataset.chapterLabel;
        if (labelText) {
          const right = p.el.dataset.anchor !== "right";
          const label = document.createElementNS(SVG_NS, "text");
          label.setAttribute("class", "story-marker__label");
          label.setAttribute("x", String(p.x + (right ? 1 : -1) * (size / 2 + 12)));
          label.setAttribute("y", String(p.y + 1));
          label.setAttribute("text-anchor", right ? "start" : "end");
          label.setAttribute("dominant-baseline", "central");
          label.setAttribute("font-size", "21");
          label.textContent = labelText;
          g.appendChild(label);
        }

        markersG.appendChild(g);
        return { el: g, len };
      });

      onScroll();
    };

    const onScroll = () => {
      if (!totalLen) return;
      const pageRect = page.getBoundingClientRect();
      // Viewport "read line" mapped into page coordinates.
      const midInPage = window.innerHeight * 0.55 - pageRect.top;
      const span = lastY - firstY;
      let p = span > 0 ? (midInPage - firstY) / span : 0;
      p = Math.max(0, Math.min(1, p));

      const drawLen = totalLen * p;
      pathFg.style.strokeDashoffset = String(totalLen - drawLen);

      if (drawLen > 1) {
        const pt = pathFg.getPointAtLength(drawLen);
        pulse.setAttribute("cx", String(pt.x));
        pulse.setAttribute("cy", String(pt.y));
        pulse.style.opacity = "1";
      } else {
        pulse.style.opacity = "0";
      }

      for (const m of markers) {
        m.el.classList.toggle("is-active", drawLen >= m.len - 2);
      }
    };

    const onScrollRaf = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        onScroll();
      });
    };

    let rebuildTimer = 0;
    const rebuild = () => {
      window.clearTimeout(rebuildTimer);
      rebuildTimer = window.setTimeout(build, 80);
    };

    build();
    const settle = window.setTimeout(build, 400);
    if (document.fonts?.ready) document.fonts.ready.then(build).catch(() => {});

    window.addEventListener("scroll", onScrollRaf, { passive: true });
    window.addEventListener("resize", rebuild);
    const ro = new ResizeObserver(rebuild);
    ro.observe(page);
    const onToggle = () => rebuild();
    document.addEventListener("toggle", onToggle, true);

    return () => {
      window.removeEventListener("scroll", onScrollRaf);
      window.removeEventListener("resize", rebuild);
      ro.disconnect();
      document.removeEventListener("toggle", onToggle, true);
      window.clearTimeout(settle);
      window.clearTimeout(rebuildTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="story-wrap" aria-hidden ref={wrapRef}>
      <svg className="story-svg" preserveAspectRatio="none" xmlns={SVG_NS}>
        <path id="story-bg" d="" />
        <path id="story-fg" d="" />
        <g id="story-markers" />
        <circle id="story-pulse" cx="0" cy="0" r="8" />
      </svg>
    </div>
  );
}
