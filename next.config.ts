import type { NextConfig } from "next";
import i18n from "./next-i18next.config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: i18n.i18n, // include i18n config
  images: {
    domains: ["i.ibb.co.com"], // ✅ allow ImgBB images
  },
};

export default nextConfig;
