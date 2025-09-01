
import type {NextConfig} from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '')

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: isGithubActions ? `/${repo}` : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      }
    ]
  },
  transpilePackages: ['next-themes'],
};

export default nextConfig;
