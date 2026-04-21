import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // If you are deploying as a Static Site on Render, uncomment the line below:
  // output: 'export', 
  
  images: {
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