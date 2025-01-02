/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.pdf$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/pdfs/[name][ext]'
        }
      });
    }
    return config;
  },
  // Add support for static file serving
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig