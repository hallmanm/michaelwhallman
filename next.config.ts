import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
    silenceDeprecations: ["import", "global-builtin", "color-functions", "mixed-decls", "if-no-args"],
    quietDeps: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
