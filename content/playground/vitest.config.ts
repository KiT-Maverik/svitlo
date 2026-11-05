import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
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
