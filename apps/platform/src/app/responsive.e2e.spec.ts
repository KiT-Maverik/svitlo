import { expect, test } from '@playwright/test';

test('phone-sized platform navigation reaches the catalog without page-level horizontal overflow', async ({ page }) => {
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Головна навігація' });
  await expect(navigation).toBeVisible();

  // The small-screen nav scrolls within its own strip; the document must not overflow.
  const materials = navigation.getByRole('link', { name: 'Навчальні матеріали' });
  await materials.scrollIntoViewIfNeeded();
  await materials.click();
  await expect(page).toHaveURL(/\/materials$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Навчальні матеріали' })).toBeVisible();

  const widths = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(widths.document).toBeLessThanOrEqual(widths.viewport + 1);
});
