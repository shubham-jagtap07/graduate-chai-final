/** @type {import('next').NextConfig} */
// Resolve safe environment values to avoid Invalid URL during SSR
const RAW_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const SAFE_APP_URL = !RAW_APP_URL || RAW_APP_URL === 'null' || RAW_APP_URL === 'undefined'
  ? 'http://localhost:3000'
  : RAW_APP_URL;

const RAW_BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
const SAFE_BACKEND_URL = !RAW_BACKEND_URL || RAW_BACKEND_URL === 'null' || RAW_BACKEND_URL === 'undefined'
  ? 'http://localhost:5001'
  : RAW_BACKEND_URL;

const nextConfig = {
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_APP_URL: SAFE_APP_URL,
    NEXT_PUBLIC_BACKEND_URL: SAFE_BACKEND_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "graduatechai.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "graduatechai.in",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "share.google",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gtbackend-1-pnnq.onrender.com",
        port: "",
        pathname: "/**",
      },
      // Allow local dev images served from the Next.js app itself
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${SAFE_BACKEND_URL}/api/:path*`,
      },
    ];
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;

