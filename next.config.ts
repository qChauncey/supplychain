import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow @xyflow/react to be transpiled correctly
  transpilePackages: ["@xyflow/react"],
};

export default nextConfig;
