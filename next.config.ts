// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_BUILD_TIME: String(Date.now()),
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
