import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  transpilePackages: ['@svitlo/ui-kit'],
  partialPrefetching: true,
};

export default nextConfig;
