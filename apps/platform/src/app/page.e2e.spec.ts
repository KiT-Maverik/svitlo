import { expect, test } from '@playwright/test';

test('the academy landing page links to learning materials', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Світло Academy — NextGen Learning');
  await expect(page.getByRole('heading', { level: 1, name: /Світло\s*Academy/ })).toBeVisible();
  await page.getByRole('link', { name: /Відкрити навчальні матеріали/ }).click();
  await expect(page).toHaveURL(/\/materials$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Навчальні матеріали' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Математика' })).toBeVisible();
  await expect(page.getByText('Посилання з’явиться після публікації')).toBeVisible();
});

test('team cards have the requested text with a separate ellipsis line', async ({ page }) => {
  await page.goto('/team');
  await expect(page.getByRole('heading', { level: 1, name: 'Наша команда' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Микола' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Марія' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Мія' })).toBeVisible();
  await expect(page.locator('.team-card__ellipsis')).toHaveText('...');
  await expect(page.getByText('Одним словом — безробітний.')).toBeVisible();
});

test('hall of fame uses a justified inline flow and nonbreaking flag-name pairs', async ({ page }) => {
  await page.goto('/hall-of-fame');
  await expect(page.locator('.hall-entry')).toHaveCount(18);
  await expect(page.locator('.hall-names')).toHaveCSS('text-align', 'justify');
  await expect(page.locator('.hall-entry').first()).toHaveCSS('white-space', 'nowrap');
  await expect(page.getByText('Усі імена вище — вигадані демонстраційні приклади.', { exact: false })).toBeVisible();
});

test('scholarships are marked as proposals, not active applications', async ({ page }) => {
  await page.goto('/scholarships');
  await expect(page.locator('.scholarship-card')).toHaveCount(6);
  await expect(page.getByRole('heading', { name: 'Рукавичка' })).toBeVisible();
  await expect(page.getByText('Програми на етапі розробки.')).toBeVisible();
});

test('sponsor category tabs work with pointer and keyboard', async ({ page }) => {
  await page.goto('/sponsors');
  const patrons = page.getByRole('tab', { name: 'Меценати' });
  const organizations = page.getByRole('tab', { name: 'Організації' });
  const media = page.getByRole('tab', { name: 'Медіа' });
  await expect(patrons).toHaveAttribute('aria-selected', 'true');
  await organizations.click();
  await expect(page.getByRole('tabpanel')).toContainText('Партнерства, що створюють можливості');
  await organizations.press('ArrowRight');
  await expect(media).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('Медіапартнери', { ignoreCase: true });
});
