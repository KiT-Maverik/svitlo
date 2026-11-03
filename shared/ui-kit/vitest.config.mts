import { fileURLToPath } from 'node:url';
import { defineConfig, configDefaults } from 'vitest/config';
export default defineConfig({
  resolve: {
    alias: { '#utils': fileURLToPath(new URL('./src/utils', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.unit.spec.ts', 'src/**/*.unit.spec.tsx'],
    exclude: [...configDefaults.exclude, 'src/components/widgets/questions/**'],
    setupFiles: ['./src/testing/setup.ts'],
    restoreMocks: true,
    clearMocks: true,
    css: true,
  },
});
