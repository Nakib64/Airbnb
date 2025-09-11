import type { NextConfig } from "next";
import i18n from "./next-i18next.config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: i18n.i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        pathname: "/**", // allow all image paths
      },
    ],
  },
};

export default nextConfig;

