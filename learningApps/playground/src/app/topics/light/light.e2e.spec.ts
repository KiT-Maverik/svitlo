import { test, expect } from '@playwright/test';

test('howLightMoves renders ordered sections, markdown, scenes and quiz from published JSON', async ({ page }) => {
  await page.goto('/topics/light');
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
  // Quiz screens render their authored question responses, not the retired
  // quiz welcome message / fieldset wrapper from the previous architecture.
  await expect(page.getByRole('heading', {
    name: 'Як поширюється світло в прозорому однорідному середовищі?',
  })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Перевірити', exact: true })).toHaveCount(6);
});

test('switching the requested locale selects localized JSON, including scene props', async ({ page }) => {
  const resource = await page.request.get('/data/pages/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/config/en.json');
  expect(resource.ok()).toBe(true);
  const json = await resource.json();
  expect(json.data.title).toBe('How Light Travels');
  expect(json.localeSources['/title']).toEqual({ code: 'en' });
  await page.goto('/topics/light?lang=en-US');
  await expect(page.getByRole('img', { name: 'Trace the path of light' })).toBeVisible();
  await expect(page.getByRole('region', {
    name: 'Animation of light traveling from the source to the screen',
  })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'How light travels', exact: true })).toBeVisible();
});
