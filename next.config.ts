import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'], // Add the domain here
  },
  eslint:{
    ignoreDuringBuilds: true, 
  },
  typescript:{
    ignoreBuildErrors: true,
  }
  /* config options here */
};

export default nextConfig;
