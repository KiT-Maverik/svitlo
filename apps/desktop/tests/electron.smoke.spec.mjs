import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const require = createRequire(import.meta.url);

test('cold-start desktop opens its packaged Playground lesson without remote access', async () => {
  test.setTimeout(90000);
  const env = { ...process.env };
  delete env.SVITLO_DESKTOP_DEV_URL;
  delete env.ELECTRON_RUN_AS_NODE;
  const app = await electron.launch({
    executablePath: require('electron'),
    args: ['.'],
    cwd: root,
    env,
  });
  try {
    const page = await app.firstWindow();
    await page.route(/^https?:\/\//, route => route.abort());
    await expect(page.locator('#learning-content')).toBeVisible({ timeout: 30000 });
    const steps = page.locator('nav').filter({ has: page.locator('button[aria-current="step"]') });
    await expect(steps).toHaveCount(1);
    await steps.locator('button').last().click();
    await expect(page.getByText('Як поширюється світло в прозорому однорідному середовищі?')).toBeVisible();
    await expect(page.getByText('Could not open the packaged lesson')).toHaveCount(0);
    await page.getByRole('button', { name: 'Профіль' }).click();
    await page.getByRole('menuitem', { name: 'Швидкі налаштування' }).click();
    await page.getByRole('combobox', { name: 'Мова інтерфейсу' }).click();
    await page.getByRole('option', { name: 'English' }).click();
    await expect(page).toHaveURL(/^svitlo:\/\/app\/en\/lesson\/uk\//);
    await expect(page.getByRole('heading', { name: 'Як рухається світло' })).toBeVisible();
    await page.getByRole('button', { name: 'Profile' }).click();
    await page.getByRole('menuitem', { name: 'Quick settings' }).click();
    await page.getByRole('combobox', { name: 'Lesson language' }).click();
    await page.getByRole('option', { name: 'English' }).click();
    await expect(page).toHaveURL(/^svitlo:\/\/app\/en\/lesson\/en\//);
    await expect(page.getByRole('heading', { name: 'How Light Travels' })).toBeVisible();
    await page.reload();
    await expect(page.locator('#learning-content')).toBeVisible();
    expect(page.url()).toMatch(/^svitlo:\/\/app\/en\/lesson\/en\//);
  } finally {
    await app.close();
  }
});
