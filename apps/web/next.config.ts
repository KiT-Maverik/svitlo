import type { NextConfig } from 'next';
import { readFileSync } from 'node:fs';

if (!process.env.SVITLO_TEXTBOOK) {
  throw new Error('SVITLO_TEXTBOOK must explicitly select a content package for the Web build.');
}
const selection = JSON.parse(
  readFileSync(new URL('./src/generated/selectedTextbook.json', import.meta.url), 'utf8'),
) as {
  name: string;
  hasScenes: boolean;
};
const requested = process.env.SVITLO_TEXTBOOK.startsWith('@svitlo/')
  ? process.env.SVITLO_TEXTBOOK
  : '@svitlo/' + process.env.SVITLO_TEXTBOOK;
if (selection.name !== requested) {
  throw new Error('Stale Web content selection: run prepare-textbook.mjs for ' + requested);
}
const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: selection.hasScenes ? ['@svitlo/ui-kit', selection.name] : ['@svitlo/ui-kit'],
  serverExternalPackages: ['@svitlo/engine', 'esbuild'],
  partialPrefetching: true,
};

export default nextConfig;
