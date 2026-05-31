import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler is heavy in dev mode — disabled to keep the dev server fast.
  // Re-enable for production builds if you want the runtime perf gains.
  reactCompiler: false,
  // Next 16 requires image qualities to be allow-listed; 95 is used by the hero.
  images: {
    qualities: [75, 95],
  },
};

export default nextConfig;
