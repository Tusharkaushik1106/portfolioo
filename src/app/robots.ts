import type { MetadataRoute } from "next";

// Keep the public site crawlable, but keep the admin and API endpoints out of
// search engines entirely (defence in depth alongside the X-Robots-Tag header).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/keystatic", "/api/"],
    },
  };
}
