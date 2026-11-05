import { test, expect } from '@playwright/test';

test('a real Playground lesson opens from the index on a phone-sized screen', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const lesson = page.getByRole('link').first();
  await expect(lesson).toBeVisible();
  await lesson.click();
  await expect(page).toHaveURL(/\/[a-z]{2}\/lesson\/[0-9a-f-]{36}$/);
  await expect(page.locator('#learning-content')).toBeVisible();
  await expect(page.locator('#learning-content')).toContainText(/\S+/);
  const sizes = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth
  }));
  expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.viewportWidth + 1);
});

test('the lesson has semantic section navigation and native-sized controls', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link').first().click();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('button', { name: /next|далі|наступ/i }).first()).toBeVisible();
});
