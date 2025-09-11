import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,

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



export default (nextConfig);

