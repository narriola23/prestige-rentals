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
                      // SEO cutover: permanently redirect the old onrender.com host to the
                      // custom domain so ranking signal consolidates on one canonical origin.
                      // Conditioned on the public Host header, so internal health checks
                      // (which don't carry this host) are unaffected.
                      {
                              source: '/:path*',
                              has: [{ type: 'host', value: 'prestige-rentals.onrender.com' }],
                              destination: 'https://prestigerentalshouston.com/:path*',
                              permanent: true,
                      },
                      { source: '/book', destination: '/availability', permanent: true },
                      { source: '/book/success', destination: '/', permanent: true },
              ];
      },
};

module.exports = nextConfig;
