import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@xyflow/react"],
  async redirects() {
    return [
      { source: "/l1",         destination: "/flow/l1",         permanent: true },
      { source: "/l2",         destination: "/flow/l2",         permanent: true },
      { source: "/l3",         destination: "/flow/l3",         permanent: true },
      { source: "/comparison", destination: "/flow/comparison", permanent: true },
      { source: "/demo",       destination: "/flow/demo",       permanent: true },
    ];
  },
};

export default nextConfig;
