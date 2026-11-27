import { expect, test } from '@playwright/test';

test('a real Playground lesson opens from the index on a phone-sized screen', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const lesson = page.getByRole('link').first();
  await expect(lesson).toBeVisible();
  await lesson.click();
  await expect(page).toHaveURL(/\/[a-z]{2}\/lesson\/[a-z]{2}\/[0-9a-f-]{36}$/);
  await expect(page.locator('#learning-content')).toBeVisible();
  await expect(page.locator('#learning-content')).toContainText(/\S+/);
  const sizes = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.viewportWidth + 1);
});

test('lesson step progress survives a reload of the mobile production host', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link').first().click();
  const steps = page.locator('nav').filter({ has: page.locator('button[aria-current="step"]') });
  const activeStep = () =>
    steps
      .locator('button')
      .evaluateAll(buttons => buttons.findIndex(button => button.getAttribute('aria-current') === 'step'));

  await expect(steps).toHaveCount(1);
  const initial = await activeStep();
  expect(initial).toBeGreaterThanOrEqual(0);
  await page
    .getByRole('button', { name: /next|далі|наступ/i })
    .first()
    .click();
  await expect.poll(activeStep).toBeGreaterThan(initial);
  const advanced = await activeStep();

  await page.reload();
  await expect(page.locator('#learning-content')).toBeVisible();
  await expect.poll(activeStep).toBe(advanced);
});
