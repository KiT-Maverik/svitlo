import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      // Scene unit tests load authored TSX through Vite. The published UI Kit
      // CommonJS bundle requires CSS Modules, which plain Node cannot parse.
      // Only the test runner uses source; production hosts use package exports.
      '@svitlo/ui-kit': fileURLToPath(new URL('../../shared/ui-kit/src/index.ts', import.meta.url)),
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
