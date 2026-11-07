import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { ...devices['Pixel 7'], baseURL: 'http://127.0.0.1:5173' },
  webServer: {
    command: 'npm run app:start:dev --workspace @svitlo/mobile',
    url: 'http://127.0.0.1:5173',
    cwd: '../..',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
