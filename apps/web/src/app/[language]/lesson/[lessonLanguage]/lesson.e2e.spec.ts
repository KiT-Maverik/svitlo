import { expect, test } from '@playwright/test';

const id = '11111111-1111-4111-8111-00000000011c';

test('Lesson renders selected content Scene and a separately published Quiz', async ({ page }) => {
  await page.goto('/uk/lesson/uk/' + id);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('heading', { name: 'Контрольний урок', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Контрольна інтерактивна сцена' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Контрольна інтерактивна сцена' })).toBeVisible();
  const next = page
    .getByRole('navigation', { name: 'Нижня навігація навчання' })
    .getByRole('button', { name: 'Далі →', exact: true });
  await next.click();
  await expect(page.getByText('Контрольний навчальний вміст')).toBeVisible();
  await next.click();
  await expect(page.getByText('Яка відповідь правильна?')).toBeVisible();
  await expect(page.getByRole('radio')).toHaveCount(2);
});

test('localized published JSON selects the corresponding Scene props', async ({ page }) => {
  const root = '/data/lessons/c/' + id + '/';
  const [baseResponse, enResponse] = await Promise.all([
    page.request.get(root + 'base.json'),
    page.request.get(root + 'en.json'),
  ]);
  expect(baseResponse.ok()).toBe(true);
  expect(enResponse.ok()).toBe(true);
  const base = await baseResponse.json();
  const json = await enResponse.json();
  expect(base.type).toBe('lesson');
  expect(base.params.languages).toContain('en');
  expect(base.section.map((section: { type: string }) => section.type)).toEqual(['content', 'practice', 'quiz']);
  expect(json.locale.title).toBe('Controlled Lesson');
  expect(json.section[0].locale.title).toBe('Explore');
  await page.goto('/uk/lesson/en/' + id);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  await expect(page.locator('#learning-content [lang="en-US"]').first()).toBeVisible();
  await expect(page.getByRole('img', { name: 'Controlled interactive scene' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Controlled interactive scene' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Controlled Lesson', exact: true })).toBeVisible();
});

test('interface language selection leaves the Lesson language unchanged', async ({ page }) => {
  await page.goto('/uk/lesson/uk/' + id);
  await page.getByRole('button', { name: 'Відкрити налаштування' }).click();
  await expect(page.getByRole('heading', { name: 'Швидкі налаштування' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Мова інтерфейсу' }).click();
  await page.getByRole('option', { name: 'English' }).click();
  await expect(page).toHaveURL('/en/lesson/uk/' + id);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  await expect(page.getByRole('heading', { name: 'Контрольний урок', exact: true, level: 1 })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Top learning navigation' })).toBeVisible();
});

test('Lesson language selection leaves the interface language unchanged', async ({ page }) => {
  await page.goto('/uk/lesson/uk/' + id);
  await page.getByRole('button', { name: 'Відкрити налаштування' }).click();
  await page.getByRole('combobox', { name: 'Мова уроку' }).click();
  await page.getByRole('option', { name: 'English' }).click();
  await expect(page).toHaveURL('/uk/lesson/en/' + id);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  await expect(page.locator('#learning-content [lang="en-US"]').first()).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('heading', { name: 'Controlled Lesson' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Верхня навігація навчання' })).toBeVisible();
});

test('mobile Quick Settings fits the content width and closes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 720 });
  await page.goto('/uk/lesson/uk/' + id);
  await page.getByRole('button', { name: 'Відкрити налаштування' }).click();
  const settings = page.getByRole('complementary', { name: 'Швидкі налаштування' });
  await expect(settings.getByRole('heading', { name: 'Швидкі налаштування' })).toBeVisible();
  const box = await settings.boundingBox();
  expect(Math.round(box?.width ?? 0)).toBeGreaterThanOrEqual(389);
  await settings.getByRole('button', { name: 'Закрити панель налаштувань' }).click();
  await expect(settings).not.toBeInViewport();
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.getByRole('button', { name: 'Відкрити налаштування' }).click();
  await expect(settings.getByRole('button', { name: 'Закрити панель налаштувань' })).toBeHidden();
});

test('RTL interface and RTL content remain independent', async ({ page }) => {
  await page.goto('/ar/lesson/en/' + id);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar-SA');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('#learning-content [lang="en-US"]').first()).toHaveAttribute('dir', 'ltr');
  await page.goto('/uk/lesson/ar/' + id);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('#learning-content [lang="ar-SA"]').first()).toHaveAttribute('dir', 'rtl');
  await page.goto('/qm/lesson/qm/' + id);
  await expect(page.locator('html')).toHaveAttribute('lang', 'crh-Latn-UA');
});

test('legacy Lesson URLs preserve locale and query', async ({ page }) => {
  await page.goto('/uk/lesson/' + id + '?ref=example');
  await expect(page).toHaveURL('/uk/lesson/uk/' + id + '?ref=example');
});

test('unsupported and removed Lesson routes return 404', async ({ request }) => {
  for (const path of [
    '/topics/light',
    '/topics/demo',
    '/lesson/' + id,
    '/xx/lesson/uk/' + id,
    '/uk/lesson/xx/' + id,
    '/xx/lesson/' + id,
  ])
    expect((await request.get(path, { maxRedirects: 0 })).status()).toBe(404);
});

test('Quick Settings toggles actual theme colors and persists', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.setItem('mui-mode', 'light'));
  await page.goto('/uk/lesson/uk/' + id);
  const html = page.locator('html');
  const surface = page.locator('#learning-content:visible').first().locator('..').locator('..');
  const background = () => surface.evaluate(node => getComputedStyle(node).backgroundColor);
  await expect(html).toHaveAttribute('data-light', '');
  const initial = await background();
  await page.getByRole('button', { name: 'Відкрити налаштування' }).click();
  const toggle = page.getByRole('switch', { name: 'Темна тема' });
  await expect(toggle).not.toBeChecked();
  await toggle.click();
  await expect(toggle).toBeChecked();
  await expect(html).toHaveAttribute('data-dark', '');
  await expect.poll(background).not.toBe(initial);
  await page.reload();
  await expect(html).toHaveAttribute('data-dark', '');
  await expect.poll(background).not.toBe(initial);
  await page.getByRole('button', { name: 'Відкрити налаштування' }).click();
  // The color-scheme script restores <html> before React hydrates the switch.
  // Require the switch to reflect the persisted dark mode before toggling back.
  await expect(toggle).toBeChecked();
  await toggle.click();
  await expect(toggle).not.toBeChecked();
  await expect(html).toHaveAttribute('data-light', '');
  await expect.poll(background).toBe(initial);
});
