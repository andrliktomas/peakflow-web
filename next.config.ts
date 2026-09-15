import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves the site as pre-rendered static files.
  output: "export",
  // Emits /sluzby/index.html rather than /sluzby.html, so paths resolve the
  // same way locally, on Cloudflare Pages and behind any other static host.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
