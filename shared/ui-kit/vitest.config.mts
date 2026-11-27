import { fileURLToPath } from 'node:url';
import { defineConfig, configDefaults } from 'vitest/config';
export default defineConfig({
  resolve: {
    alias: {
      '#utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '#widgets': fileURLToPath(new URL('./src/components/widgets', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: [
      'src/**/*.unit.spec.ts',
      'src/**/*.unit.spec.tsx',
      'src/utils/assessmentMethods.spec.ts',
      'scripts/generateLocales/generateLocales.spec.ts',
      'data/definitions/assessmentMethods/assessmentMethodTaxonomy.spec.ts',
      'data/definitions/educationStandards/catalog.spec.ts',
    ],
    exclude: [...configDefaults.exclude],
    setupFiles: ['./src/testing/setup.ts'],
    restoreMocks: true,
    clearMocks: true,
    css: true,
  },
});
