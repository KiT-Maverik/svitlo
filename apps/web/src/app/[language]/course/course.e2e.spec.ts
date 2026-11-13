import { test, expect } from '@playwright/test';

const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const discoveryId = 'f760e7b7-9f77-5027-89ce-4e40d9d031a1';
const retiredEpisodeId = '9f417177-1d07-5a9d-ad74-0146c5637e84';

test('Course and Lessons publish Engine Props files, not legacy TOC and overrides', async ({ request }) => {
  const [courseResource, lessonResource] = await Promise.all([
    request.get('/data/courses/' + courseId + '/base.json'),
    request.get('/data/lessons/1/' + discoveryId + '/base.json'),
  ]);
  expect(courseResource.ok()).toBe(true);
  expect(lessonResource.ok()).toBe(true);

  const course = await courseResource.json();
  expect(course.type).toBe('course');
  expect(course.content.order).toEqual(['lightLaboratory']);
  const courseModule = course.content.items.lightLaboratory;
  expect(courseModule.type).toBe('module');
  expect(courseModule.content.order).toEqual(['lightFoundations', 'lightExploration']);
  const chapter = courseModule.content.items.lightFoundations;
  expect(chapter.type).toBe('chapter');
  expect(chapter.content.items.lightDiscovery).toEqual({ type: 'lesson', id: discoveryId });
  expect(chapter.content.items.lightStory.type).toBe('lesson');

  const lesson = await lessonResource.json();
  expect(lesson.type).toBe('lesson');
  expect(Array.isArray(lesson.section)).toBe(true);
  expect(lesson.params.languages).toContain('uk');
});

test('Course detail uses the published nested hierarchy and opens a real Lesson', async ({ page }) => {
  await page.goto('/uk/course/' + courseId);
  await expect(page.getByRole('heading', { name: 'Подорож світла', level: 1 })).toBeVisible();
  await expect(page.getByText('The Light Laboratory')).toBeVisible();
  await expect(page.getByText('Light: first steps')).toBeVisible();
  await expect(page.getByRole('link', { name: /Light Lab · Discovery/ })).toHaveAttribute(
    'href',
    '/uk/course/' + courseId + '/lesson/uk/' + discoveryId,
  );

  await page.goto('/uk/course/' + courseId + '/lesson/uk/' + discoveryId);
  await expect(page.getByRole('heading', { name: 'Light Lab · Discovery (demo)', exact: true })).toBeVisible();
  await page.goto('/uk/lesson/uk/' + discoveryId);
  await expect(page.getByRole('heading', { name: 'Light Lab · Discovery (demo)', exact: true })).toBeVisible();
});

test('Course-context Lesson preserves the independent content language', async ({ page }) => {
  await page.goto('/uk/course/' + courseId + '/lesson/en/' + discoveryId);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  await expect(page.locator('#learning-content [lang="en-US"]').first()).toHaveAttribute('dir', 'ltr');
  await page.getByRole('button', { name: 'Відкрити налаштування' }).click();
  await page.getByRole('combobox', { name: 'Мова інтерфейсу' }).click();
  await page.getByRole('option', { name: 'English' }).click();
  await expect(page).toHaveURL('/en/course/' + courseId + '/lesson/en/' + discoveryId);
});

test('Course sidebar retains published group titles and active Lesson state', async ({ page }) => {
  await page.goto('/uk/course/' + courseId + '/lesson/uk/' + discoveryId);
  await page.getByRole('button', { name: 'Відкрити список тем' }).click();
  const sidebar = page.getByRole('navigation', { name: 'Список тем' });
  const moduleButton = sidebar.getByRole('button', { name: 'The Light Laboratory' }).first();
  const chapterButton = sidebar.getByRole('button', { name: 'Light: first steps' }).first();
  const activeLink = sidebar.locator('a[href="/uk/course/' + courseId + '/lesson/uk/' + discoveryId + '"]');
  await expect(moduleButton).toHaveAttribute('aria-expanded', 'true');
  await expect(chapterButton).toHaveAttribute('aria-expanded', 'true');
  await expect(activeLink).toHaveAttribute('aria-current', 'page');

  await chapterButton.click();
  await expect(activeLink).toBeHidden();
  await chapterButton.click();
  await expect(activeLink).toBeVisible();
});

test('Unknown Course membership and retired Episode resource route return 404', async ({ request }) => {
  for (const route of [
    '/uk/course/' + courseId + '/lesson/uk/ffffffff-ffff-ffff-ffff-ffffffffffff',
    '/uk/course/' + courseId + '/episode/' + retiredEpisodeId,
  ]) {
    const response = await request.get(route);
    expect(response.status()).toBe(404);
  }
});

test('Course catalog still supports unpublished previews without fake Lesson links', async ({ page }) => {
  await page.goto('/uk/courses');
  await expect(page.getByRole('heading', { name: 'Обирай свою наступну пригоду', level: 1 })).toBeVisible();
  await page.getByRole('link', { name: 'Переглянути курс: Математика навколо нас' }).click();
  await expect(page.getByText('Це попередній перегляд. Уроки будуть доступні пізніше.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Почати навчання' })).toHaveCount(0);
});
