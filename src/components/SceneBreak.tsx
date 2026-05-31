"use client";

import Image from "next/image";
import { motion } from "motion/react";

/**
 * Quiet illustration break between sections — one of the user's red line-art
 * scenes, centered with breathing room and an optional handwritten caption.
 * The artwork's dark backing matches the canvas (lighten blend drops it), so
 * only the line-work shows. Fades + drifts up as it scrolls into view.
 */
export default function SceneBreak({
  src,
  alt,
  width,
  height,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
}) {
  return (
    <motion.figure
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 220px, 45vw"
        className="h-auto w-[150px] opacity-90 sm:w-[200px]"
      />
      {caption ? (
        <figcaption className="mt-3 font-hand text-base text-coral/70">
          {caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
