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
  // Configure for very large file uploads
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb', // Set to a very high value (maximum allowed by Next.js)
    },
    // Disable body parsing for API routes that handle file uploads
    api: {
      bodyParser: {
        sizeLimit: '100mb'
      }
    }
  },
  // Disable static page generation caching
  generateEtags: false,
  // Disable static optimization
  output: 'standalone',
  // Disable static page generation
  reactStrictMode: true,
  // Disable static optimization
  swcMinify: true,
  // Disable static optimization
  compress: true,
  // Disable static optimization
  poweredByHeader: false,
  // Disable static optimization
  optimizeFonts: true,
  // Disable static optimization
  productionBrowserSourceMaps: true,
  // Disable static optimization
  compiler: {
    removeConsole: false,
  },
  // Disable static optimization
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable static optimization
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add cache control headers to API routes
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
