/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // This will make Next.js more tolerant of hydration mismatches
    optimizeFonts: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig 