import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '*.smoke.spec.mjs',
  workers: 1,
  timeout: 90000,
  reporter: 'list',
});
