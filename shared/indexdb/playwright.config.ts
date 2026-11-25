import { defineConfig, devices } from '@playwright/test';

const port = process.env.PLAYWRIGHT_DB_PORT ?? '3107';

export default defineConfig({
  testDir: './testing',
  testMatch: '**/controllers.e2e.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: { baseURL: `http://127.0.0.1:${port}`, trace: 'retain-on-failure' },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(process.env.PLAYWRIGHT_CHANNEL === 'chrome' ? { channel: 'chrome' as const } : {}),
      },
    },
  ],
  webServer: {
    command: 'node testing/db-browser-server.mjs',
    url: `http://127.0.0.1:${port}/db-browser-harness`,
    reuseExistingServer: false,
    timeout: 120_000,
    env: { PLAYWRIGHT_DB_PORT: port },
  },
});
