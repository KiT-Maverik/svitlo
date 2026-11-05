import { expect, test } from '@playwright/test';
test('root redirects to the default locale', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/en-US$/);
  await expect(page.getByRole('heading', { name: 'Geography' })).toBeVisible();
});
for (const [locale, title, direction] of [
  ['uk-UA', 'Географія', 'ltr'],
  ['ar-SA', 'الجغرافيا', 'rtl'],
  ['he-IL', 'גאוגרפיה', 'rtl'],
  ['ur-PK', 'جغرافیہ', 'rtl'],
] as const) {
  test(`localized shell: ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.getByRole('heading', { name: title })).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('dir', direction);
  });
}
test('unknown locale does not receive a fake translation', async ({ page }) => {
  const response = await page.goto('/unknown-xx');
  expect(response?.status()).toBe(404);
});
