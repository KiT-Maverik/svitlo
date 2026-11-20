import { test, expect } from '@playwright/test';

/** Web-owned fixture package metadata, not Playground content. */
const skillId = '11111111-1111-4111-8111-00000000011a';

test('Skill Analytics resolves the selected package published base and locale', async ({ page, request }) => {
  const [baseResponse, localeResponse] = await Promise.all([
    request.get('/data/skills/base.json'),
    request.get('/data/skills/uk.json'),
  ]);
  expect(baseResponse.ok()).toBe(true);
  expect(localeResponse.ok()).toBe(true);
  const base = await baseResponse.json();
  const uk = await localeResponse.json();
  expect(base.fixtureDomain.slug).toBe('fixtureDomain');
  expect(base.fixtureDomain.groups[0].skills[0].id).toBe(skillId);
  expect(uk.fixtureDomain.groups[0].skills[0].name).toBe('Контрольна навичка');

  const requested: string[] = [];
  page.on('request', resource => {
    if (resource.url().includes('/data/skills/')) requested.push(new URL(resource.url()).pathname);
  });
  await page.goto('/skillAnalytics?lang=uk');
  await expect(page.getByTestId('skill-node-fixtureDomain')).toBeVisible();
  await expect(page.getByTestId('skill-node-fixtureSkill')).toBeVisible();
  // The selected package's sparse Skills are merged on the server.
  expect(requested).toEqual([]);
});

test('Skill landing resolves the selected fixture Skill UUID', async ({ page }) => {
  await page.goto('/skills/' + skillId + '/learn?lang=uk');
  await expect(page.getByRole('heading', { name: 'Контрольна навичка' })).toBeVisible();
});
