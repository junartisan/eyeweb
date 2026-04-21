import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // CRITICAL: This creates the 'out' folder for static hosting
  images: {
    unoptimized: true, // REQUIRED for static export if using next/image
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.eyewebmaster.com',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'api.eyewebmaster.com',
      },
      {
        protocol: 'http',
        hostname: 'www.eyewebmaster.com',
        pathname: '/**',
      },    
      {
        protocol: 'https', 
        hostname: 'www.eyewebmaster.com',
        pathname: '/**',
      },    
    ],
  },
};

export default nextConfig;