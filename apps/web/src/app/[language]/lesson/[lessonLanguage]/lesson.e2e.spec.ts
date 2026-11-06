import { test, expect } from '@playwright/test';

const id = 'd3048d21-8690-5255-b62c-984c69ac272c';

test('lesson renders sections, scenes and quiz in the selected content language', async ({ page }) => {
  await page.goto(`/uk/lesson/uk/${id}`);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('heading', { name: 'Як рухається світло', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Світловий промінь' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Анімація поширення світла від джерела до екрана' })).toBeVisible();

  const next = page
    .getByRole('navigation', { name: 'Нижня навігація навчання' })
    .getByRole('button', { name: 'Далі →', exact: true });
  await next.click();
  await expect(page.getByRole('heading', { name: 'Одне світло. Різні середовища.' })).toBeVisible();
  await next.click();
  await expect(page.locator('fieldset')).toHaveCount(1);
});

test('the requested lesson language selects localized published JSON and scene props', async ({ page }) => {
  const root = '/data/pages/lessons/c/' + id + '/config/';
  const [baseResource, localizedResource] = await Promise.all([
    page.request.get(root + 'base.json'),
    page.request.get(root + 'en.json'),
  ]);
  expect(baseResource.ok()).toBe(true);
  expect(localizedResource.ok()).toBe(true);
  const base = await baseResource.json();
  const json = await localizedResource.json();
  expect(base.data.title).toBeUndefined();
  expect(json.data.title).toBe('How Light Travels');
  expect(json.localeSources['/title']).toEqual({ code: 'en' });

  await page.goto(`/uk/lesson/en/${id}`);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  await expect(page.locator('#learning-content [lang="en-US"]').first()).toBeVisible();
  await expect(page.getByRole('img', { name: 'Trace the path of light' })).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Animation of light traveling from the source to the screen' }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'How light travels', exact: true })).toBeVisible();
});

test('interface language selection does not change the lesson language', async ({ page }) => {
  await page.goto(`/uk/lesson/uk/${id}`);
  await page.getByRole('button', { name: 'Профіль' }).click();
  await page.getByRole('menuitem', { name: 'Швидкі налаштування' }).click();
  await expect(page.getByRole('heading', { name: 'Швидкі налаштування' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Мова інтерфейсу' }).click();
  await page.getByRole('option', { name: 'English' }).click();
  await expect(page).toHaveURL(`/en/lesson/uk/${id}`);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  await expect(page.getByRole('heading', { name: 'Як рухається світло', exact: true })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Top learning navigation' })).toBeVisible();
});

test('lesson language selection does not change the interface language', async ({ page }) => {
  await page.goto(`/uk/lesson/uk/${id}`);
  await page.getByRole('button', { name: 'Профіль' }).click();
  await page.getByRole('menuitem', { name: 'Швидкі налаштування' }).click();
  await page.getByRole('combobox', { name: 'Мова уроку' }).click();
  await page.getByRole('option', { name: 'English' }).click();
  await expect(page).toHaveURL(`/uk/lesson/en/${id}`);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  await expect(page.locator('#learning-content [lang="en-US"]').first()).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('heading', { name: 'How light travels', exact: true })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Верхня навігація навчання' })).toBeVisible();
});

test('mobile quick settings fills the content width and provides a close button', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 720 });
  await page.goto(`/uk/lesson/uk/${id}`);
  await page.getByRole('button', { name: 'Профіль' }).click();
  await page.getByRole('menuitem', { name: 'Швидкі налаштування' }).click();
  const settings = page.getByRole('complementary', { name: 'Швидкі налаштування' });
  await expect(settings.getByRole('heading', { name: 'Швидкі налаштування' })).toBeVisible();
  const box = await settings.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(389);
  await settings.getByRole('button', { name: 'Закрити панель налаштувань' }).click();
  await expect(settings).not.toBeInViewport();
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.getByRole('button', { name: 'Профіль' }).click();
  await page.getByRole('menuitem', { name: 'Швидкі налаштування' }).click();
  await expect(settings.getByRole('button', { name: 'Закрити панель налаштувань' })).toBeHidden();
});

test('RTL interface and content directions remain independent', async ({ page }) => {
  await page.goto(`/ar/lesson/en/${id}`);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar-SA');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('#learning-content [lang="en-US"]').first()).toHaveAttribute('dir', 'ltr');

  await page.goto(`/uk/lesson/ar/${id}`);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('#learning-content [lang="ar-SA"]').first()).toHaveAttribute('dir', 'rtl');

  await page.goto(`/qm/lesson/qm/${id}`);
  await expect(page.locator('html')).toHaveAttribute('lang', 'crh-Latn-UA');
});

test('legacy lesson URLs redirect without losing the content language or query', async ({ page }) => {
  await page.goto(`/uk/lesson/${id}?ref=example`);
  await expect(page).toHaveURL(`/uk/lesson/uk/${id}?ref=example`);
});

test('unsupported and removed lesson URLs return 404', async ({ request }) => {
  for (const path of [
    '/topics/light',
    '/topics/demo',
    '/lesson/' + id,
    '/xx/lesson/uk/' + id,
    '/uk/lesson/xx/' + id,
    '/xx/lesson/' + id,
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(404);
  }
});

test('Quick Settings switches the actual page colors and persists the theme', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.setItem('mui-mode', 'light'));
  await page.goto(`/uk/lesson/uk/${id}`);

  const html = page.locator('html');
  const surface = page.locator('#learning-content').locator('..').locator('..');
  const background = () => surface.evaluate(node => getComputedStyle(node).backgroundColor);

  await expect(html).toHaveAttribute('data-light', '');
  const lightBackground = await background();

  await page.getByRole('button', { name: 'Профіль' }).click();
  await page.getByRole('menuitem', { name: 'Швидкі налаштування' }).click();
  const toggle = page.getByRole('switch', { name: 'Темна тема' });
  await expect(toggle).not.toBeChecked();

  await toggle.click();
  await expect(toggle).toBeChecked();
  await expect(html).toHaveAttribute('data-dark', '');
  await expect.poll(background).not.toBe(lightBackground);

  await page.reload();
  await expect(html).toHaveAttribute('data-dark', '');
  await expect.poll(background).not.toBe(lightBackground);

  await page.getByRole('button', { name: 'Профіль' }).click();
  await page.getByRole('menuitem', { name: 'Швидкі налаштування' }).click();
  await expect(toggle).toBeChecked();
  await toggle.click();
  await expect(toggle).not.toBeChecked();
  await expect(html).toHaveAttribute('data-light', '');
  await expect.poll(background).toBe(lightBackground);
});
