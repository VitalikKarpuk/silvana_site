import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // our own blog cover art includes SVGs; serve them sandboxed (no scripts)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
