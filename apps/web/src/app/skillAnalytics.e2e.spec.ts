import { test, expect } from '@playwright/test';

const redSkillId = '00000000-0000-4000-8000-000000000001';

test('Skill Analytics renders from the published base tree and requested locale', async ({ page, request }) => {
  const [baseResponse, localeResponse] = await Promise.all([
    request.get('/data/skills/base.json'),
    request.get('/data/skills/uk.json'),
  ]);
  expect(baseResponse.ok()).toBe(true);
  expect(localeResponse.ok()).toBe(true);
  const base = await baseResponse.json();
  const uk = await localeResponse.json();
  expect(base.testColors.slug).toBe('testColors');
  expect(base.testColors.groups[0].skills[0].id).toBe(redSkillId);
  expect(uk.testColors.groups[0].skills[0].locale.name).toContain('[TEST uk]');

  const requested: string[] = [];
  page.on('request', resource => {
    if (resource.url().includes('/data/skills/')) requested.push(new URL(resource.url()).pathname);
  });
  await page.goto('/skillAnalytics?lang=uk');
  await expect(page.getByTestId('skill-node-testColors')).toBeVisible();
  await expect(page.getByTestId('skill-node-testRecognizeRed')).toBeVisible();
  // Sparse resources are read and merged on the Next.js server, not fetched by the browser.
  expect(requested).toEqual([]);
});

test('Skill landing page resolves its UUID from the same published tree', async ({ page }) => {
  await page.goto('/skills/' + redSkillId + '/learn?lang=uk');
  await expect(page.getByRole('heading', { name: '[TEST uk] Recognize red' })).toBeVisible();
});
