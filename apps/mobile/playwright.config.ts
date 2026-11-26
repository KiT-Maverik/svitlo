import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { ...devices['Pixel 7'], baseURL: 'http://127.0.0.1:5174' },
  webServer: {
    command: 'npm run app:start --workspace @svitlo/mobile',
    url: 'http://127.0.0.1:5174',
    cwd: '../..',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
