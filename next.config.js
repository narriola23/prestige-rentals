/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
          domains: ['picsum.photos'],
          unoptimized: true,
    },
    experimental: {
          serverComponentsExternalPackages: ['pg'],
    },
};

module.exports = nextConfig;
