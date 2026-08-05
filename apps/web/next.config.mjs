/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/tripo/:path*',
        destination: 'https://api.tripo3d.ai/v2/openapi/:path*',
      },
    ];
  },
};

export default nextConfig;
