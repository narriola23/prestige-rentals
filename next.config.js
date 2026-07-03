const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
              domains: ['picsum.photos'],
              unoptimized: true,
      },
      experimental: {
              serverComponentsExternalPackages: ['pg'],
      },
      webpack: (config) => {
              config.resolve.alias['@'] = path.resolve(__dirname);
              return config;
      },
      async redirects() {
              return [
                      { source: '/book', destination: '/availability', permanent: true },
                      { source: '/book/success', destination: '/', permanent: true },
              ];
      },
};

module.exports = nextConfig;
