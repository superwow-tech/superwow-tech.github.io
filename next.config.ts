import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // unoptimized: true - Removed to enable Next.js Image Optimization
  },
};

export default nextConfig;