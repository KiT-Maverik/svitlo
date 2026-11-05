import { fileURLToPath, URL } from 'node:url';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.unit.spec.ts', 'src/**/*.unit.spec.tsx'],
    exclude: [...configDefaults.exclude, 'src/components/widgets/questions/**'],
    setupFiles: ['./src/testing/setup.ts'],
    restoreMocks: true,
    clearMocks: true,
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      include: ['src/components/scenes/**/*.tsx', 'src/components/scenes/**/*.ts'],
      exclude: ['**/*.unit.spec.ts', '**/*.unit.spec.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    },
  },
});
