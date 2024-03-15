/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.myanimelist.net'],
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
