import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['scenes/**/*.unit.spec.ts', 'scenes/**/*.unit.spec.tsx'],
    restoreMocks: true,
    clearMocks: true,
  },
});
