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

  // Security headers applied to every response. CSP here is intentionally
  // conservative — it locks down framing/base-uri/plugins (clickjacking +
  // injection) without restricting script/style/img, so the animated site and
  // the Keystatic admin keep working.
  async headers() {
    const baseline = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
      {
        key: "Content-Security-Policy",
        value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'",
      },
    ];
    return [
      { source: "/:path*", headers: baseline },
      // Never let the admin surface into search results.
      {
        source: "/keystatic/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
