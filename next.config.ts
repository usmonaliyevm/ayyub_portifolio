import type { NextConfig } from "next";

/* GitHub Pages: sayt https://usmonaliyevm.github.io/ayyub_portifolio ostida turadi,
   shuning uchun basePath env orqali beriladi (lokalda bo'sh). */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
