import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'competition-green.vercel.app',
        pathname: '/api/media/**',
      },
    ],
  },
}

export default withPayload(nextConfig)
