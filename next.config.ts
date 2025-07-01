import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images: {
    // or for newer Next.js versions:
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3005', // leave empty if using default ports (80 for http, 443 for https)
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3005', // leave empty if using default ports (80 for http, 443 for https)
        pathname: '/**',
      },
    ],
  },};

export default nextConfig;
