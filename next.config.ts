import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler is heavy in dev mode — disabled to keep the dev server fast.
  // Re-enable for production builds if you want the runtime perf gains.
  reactCompiler: false,
  // Next 16 requires image qualities to be allow-listed; 95 is used by the hero.
  images: {
    qualities: [75, 95, 100],
  },
  // Bundle the Keystatic content into the serverless functions so the reader
  // can read it at runtime on Vercel (otherwise projects/posts can vanish after
  // an ISR re-render because the content files aren't traced).
  outputFileTracingIncludes: {
    "/": ["./content/**/*"],
    "/blogs": ["./content/**/*"],
    "/blogs/[slug]": ["./content/**/*"],
  },
};

export default nextConfig;
