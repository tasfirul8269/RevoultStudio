/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Disable all caching
  generateEtags: false,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: false,
  // Disable static optimization to prevent caching
  output: 'standalone',
  // Disable static generation
  experimental: {
    serverActions: true,
    optimizeCss: false,
    optimizePackageImports: [],
    scrollRestoration: false,
    optimizeFonts: false,
  },
  // Disable static page generation
  generateBuildId: () => 'build',
  // Disable static optimization
  trailingSlash: true,
  // Disable static optimization
  swcMinify: false,
};

// Disable caching for all responses
const withNoCache = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    async headers() {
      return [
        {
          // Apply these headers to all routes
          source: '/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
            },
            {
              key: 'Pragma',
              value: 'no-cache',
            },
            {
              key: 'Expires',
              value: '0',
            },
            {
              key: 'Surrogate-Control',
              value: 'no-store',
            },
          ],
        },
      ];
    },
  });
};

module.exports = withNoCache(nextConfig);
