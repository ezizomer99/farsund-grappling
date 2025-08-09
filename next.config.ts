import type { NextConfig } from "next";
 import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

 if (process.env.NODE_ENV === 'development') {
   setupDevPlatform();
 }

export default nextConfig;
