import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';
import { resolve, join } from 'node:path';
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));

test('packaged Linux executable opens the lesson with zero external network', async () => {
  test.setTimeout(90000);
  const candidates = readdirSync(join(root, 'out')).filter(name => /^Svitlo-linux-(x64|arm64)$/.test(name));
  expect(candidates).toHaveLength(1);
  const executablePath = join(root, 'out', candidates[0], 'svitlo');
  if (process.platform !== 'linux') test.skip(true, 'Run the packaged smoke test on Linux');
  expect(existsSync(executablePath)).toBeTruthy();
  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE;
  delete env.SVITLO_DESKTOP_DEV_URL;
  const app = await electron.launch({ executablePath, cwd: root, env });
  try {
    expect(await app.evaluate(({ app }) => app.isPackaged)).toBe(true);
    const page = await app.firstWindow();
    await page.route(/^https?:\/\//, route => route.abort());
    await expect(page.locator('#learning-content')).toBeVisible({ timeout: 30000 });
    await expect(page.locator('#learning-content').getByRole('heading', { name: 'Як рухається світло' })).toBeVisible();
    await page.reload();
    await expect(page.locator('#learning-content')).toBeVisible();
    expect(page.url()).toMatch(/^svitlo:\/\/app\/uk\/lesson\//);
  } finally {
    await app.close();
  }
});
