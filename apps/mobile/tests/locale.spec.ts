import { test, expect } from '@playwright/test';

test('supported RTL lesson locale sets document direction', async ({ page }) => {
  await page.goto('/');
  const catalog = await page.evaluate(async () => {
    const response = await fetch('/data/lesson-index.json');
    return response.json() as Promise<{ lessons: { id: string; languages: string[] }[] }>;
  });
  const supported = catalog.lessons.find(lesson => lesson.languages.includes('ar'));
  test.skip(!supported, 'The selected textbook has no Arabic lesson');
  await page.goto('/ar/lesson/ar/' + supported!.id);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('#learning-content')).toBeVisible();
});

test('local flags are packaged with mobile UI', async ({ page }) => {
  const response = await page.request.get('/flags/ua.svg');
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toContain('<svg');
});
