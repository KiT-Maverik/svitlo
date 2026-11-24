import { fileURLToPath } from 'node:url';

import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      // Scene unit tests load authored TSX through Vite. The published UI Kit
      // CommonJS bundle requires CSS Modules, which plain Node cannot parse.
      // The UI Kit's private #imports otherwise resolve through package.json
      // into dist/ even after the public entrypoint is mapped to source.
      // Keep all of these in Vite's source transform, including CSS Modules.
      // Production builds still resolve the published package exports.
      '@svitlo/ui-kit': fileURLToPath(new URL('../../shared/ui-kit/src/index.ts', import.meta.url)),
      '#layout': fileURLToPath(new URL('../../shared/ui-kit/src/components/layout', import.meta.url)),
      '#widgets': fileURLToPath(new URL('../../shared/ui-kit/src/components/widgets', import.meta.url)),
      '#testing': fileURLToPath(new URL('../../shared/ui-kit/src/testing', import.meta.url)),
      '#types': fileURLToPath(new URL('../../shared/ui-kit/src/types', import.meta.url)),
      '#utils': fileURLToPath(new URL('../../shared/ui-kit/src/utils', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['scenes/**/*.unit.spec.ts', 'scenes/**/*.unit.spec.tsx'],
    exclude: configDefaults.exclude,
    restoreMocks: true,
    clearMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      include: ['scenes/**/*.tsx', 'scenes/**/*.ts'],
      exclude: ['**/*.unit.spec.ts', '**/*.unit.spec.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    },
  },
});
