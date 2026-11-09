import type { NextConfig } from 'next';
import catalog from './textbooks.json';

const id = process.env.SVITLO_TEXTBOOK ?? 'playground';
const selection = catalog[id as keyof typeof catalog];
if (!selection) throw new Error(`Unknown SVITLO_TEXTBOOK "${id}"`);

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  transpilePackages: ['@svitlo/ui-kit', selection.package],
  serverExternalPackages: ['@svitlo/engine', 'esbuild'],
  partialPrefetching: true,
};

export default nextConfig;
