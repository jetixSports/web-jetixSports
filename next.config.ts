import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
 images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '6060',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
