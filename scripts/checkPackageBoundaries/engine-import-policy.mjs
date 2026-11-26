/** Repository-only Engine import policy. Runtime reachability is separately checked by esbuild. */
const buildContextPath = 'shared/engine/configurators/_shared__configurators/buildContext.ts';
const localAssetPaths = [
  'shared/engine/configurators/contentBlocks/_shared__contentBlocks/validateLocalAssets/',
  'shared/engine/configurators/contentBlocks/defineCode/',
  'shared/engine/configurators/contentBlocks/defineMarkdown/',
];

/** The sole Build Context Node exception is the exact AsyncLocalStorage owner. */
export function isAllowedEngineImport(sourcePath, specifier) {
  if (specifier.startsWith('.') || specifier.startsWith('#') || specifier === 'zod') return true;
  if (sourcePath === buildContextPath) return specifier === 'node:async_hooks';
  if (sourcePath.startsWith('shared/engine/utils/generators/'))
    return specifier.startsWith('node:') || specifier === 'esbuild';
  return localAssetPaths.some(prefix => sourcePath.startsWith(prefix)) && specifier.startsWith('node:');
}
