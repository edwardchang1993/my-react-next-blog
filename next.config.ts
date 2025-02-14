import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pic.sopili.net",
        port: "",
        pathname: "/pub/emoji/**",
      },
    ],
  },
};

export default nextConfig;
