import type { MetadataRoute } from "next";

import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const publicDisallow = ["/cart/", "/checkout/", "/wishlist/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "Googlebot",
          "Google-Extended",
          "Bingbot",
        ],
        allow: "/",
        disallow: publicDisallow,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: publicDisallow,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
