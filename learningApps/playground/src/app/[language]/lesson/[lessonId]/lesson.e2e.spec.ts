import { test, expect } from '@playwright/test';

test('howLightMoves renders ordered sections, markdown, scenes and quiz from published JSON', async ({ page }) => {
  await page.goto('/uk/lesson/d3048d21-8690-5255-b62c-984c69ac272c');
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('heading', { name: 'Як рухається світло', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Світловий промінь' })).toBeVisible();
  await expect(page.getByRole('region', {
    name: 'Анімація поширення світла від джерела до екрана',
  })).toBeVisible();
  const next = page.getByRole('navigation', { name: 'Нижня навігація навчання' })
    .getByRole('button', { name: 'Далі →', exact: true });
  await next.click();
  await expect(page.getByRole('heading', { name: 'Одне світло. Різні середовища.' })).toBeVisible();
  await next.click();
  await expect(page.locator('fieldset')).toHaveCount(1);
});

test('switching the requested locale selects localized JSON, including scene props', async ({ page }) => {
  const resource = await page.request.get('/data/pages/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/config/en.json');
  expect(resource.ok()).toBe(true);
  const json = await resource.json();
  expect(json.data.title).toBe('How Light Travels');
  expect(json.localeSources['/title']).toEqual({ code: 'en' });
  await page.goto('/en/lesson/d3048d21-8690-5255-b62c-984c69ac272c');
  await expect(page.getByRole('img', { name: 'Trace the path of light' })).toBeVisible();
  await expect(page.getByRole('region', {
    name: 'Animation of light traveling from the source to the screen',
  })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'How light travels', exact: true })).toBeVisible();
});

test('the language selector changes the route language', async ({ page }) => {
  await page.goto('/uk/lesson/d3048d21-8690-5255-b62c-984c69ac272c');
  await page.getByRole('combobox', { name: 'Мова' }).click();
  await page.getByRole('option', { name: 'English' }).click();
  await expect(page).toHaveURL('/en/lesson/d3048d21-8690-5255-b62c-984c69ac272c');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  await expect(page.getByRole('heading', { name: 'How light travels', exact: true })).toBeVisible();
});

test('RTL and internal language codes configure the document', async ({ page }) => {
  await page.goto('/ar/lesson/d3048d21-8690-5255-b62c-984c69ac272c');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar-SA');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('img', { name: /مسار الضوء/ })).toBeVisible();
  await expect(page.getByRole('img', { name: /مسار الضوء/ }).locator('g[transform="translate(960 0) scale(-1 1)"]')).toHaveCount(1);

  await page.goto('/qm/lesson/d3048d21-8690-5255-b62c-984c69ac272c');
  await expect(page.locator('html')).toHaveAttribute('lang', 'crh-Latn-UA');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

test('unsupported and removed lesson URLs return 404', async ({ request }) => {
  for (const path of ['/topics/light', '/topics/demo', '/lesson/d3048d21-8690-5255-b62c-984c69ac272c', '/xx/lesson/d3048d21-8690-5255-b62c-984c69ac272c']) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(404);
  }
});

