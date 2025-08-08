// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/.well-known/:path*',
        destination: '/404'
      },
      {
        source: '/system/assets/:path*',
        destination: '/404'
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'off'
          }
        ]
      }
    ];
  }
};