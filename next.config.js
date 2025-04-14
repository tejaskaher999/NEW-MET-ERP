/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // Disable persistent caching in development to avoid these errors
    if (dev) {
      config.cache = false;
    }
    return config;
  },
}

module.exports = nextConfig