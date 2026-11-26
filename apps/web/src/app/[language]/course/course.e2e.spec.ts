import { expect, test } from '@playwright/test';

const courseId = '11111111-1111-4111-8111-000000000113';
const lessonId = '11111111-1111-4111-8111-00000000011c';

test('selected content package publishes Course and Lesson Engine Props, not legacy resources', async ({ request }) => {
  const [courseResource, lessonResource, tocResource, localizedTocResource] = await Promise.all([
    request.get('/data/courses/' + courseId + '/base.json'),
    request.get('/data/lessons/c/' + lessonId + '/base.json'),
    request.get('/data/courses/' + courseId + '/toc/base.json'),
    request.get('/data/courses/' + courseId + '/toc/uk.json'),
  ]);
  expect(courseResource.ok()).toBe(true);
  expect(lessonResource.ok()).toBe(true);
  expect(tocResource.ok()).toBe(true);
  expect(localizedTocResource.ok()).toBe(true);
  const toc = await tocResource.json();
  const localizedToc = await localizedTocResource.json();
  expect(toc.type).toBe('course');
  expect(toc.content.order).toEqual(['fixtureModule']);
  expect(toc.content.items.fixtureModule.content.items.fixtureChapter.content.items.fixtureLesson).toMatchObject({
    type: 'lesson',
    id: lessonId,
  });
  expect(localizedToc.content.items.fixtureModule).toHaveProperty('label', 'Контрольний модуль');
  expect(JSON.stringify(toc)).not.toContain('"section"');
  const published = await courseResource.json();
  expect(published.type).toBe('course');
  expect(published.content.order).toEqual(['fixtureModule']);
  const fixtureModule = published.content.items.fixtureModule;
  expect(fixtureModule.type).toBe('module');
  expect(fixtureModule.content.order).toEqual(['fixtureChapter']);
  const chapter = fixtureModule.content.items.fixtureChapter;
  expect(chapter.type).toBe('chapter');
  expect(chapter.content.items.fixtureLesson).toEqual({ type: 'lesson', id: lessonId });
  const lesson = await lessonResource.json();
  expect(lesson.type).toBe('lesson');
  expect(lesson.section.map((section: { type: string }) => section.type)).toEqual(['content', 'practice', 'quiz']);
  expect(lesson.params.languages).toEqual(expect.arrayContaining(['uk', 'en', 'ar', 'qm']));
});

test('Course detail renders the selected package hierarchy and opens a published Lesson', async ({ page }) => {
  await page.goto('/uk/course/' + courseId);
  await expect(page.getByRole('heading', { name: 'Контрольний курс', level: 1 })).toBeVisible();
  await expect(page.getByText('Контрольний модуль')).toBeVisible();
  await expect(page.getByText('Контрольна глава')).toBeVisible();
  await expect(page.getByRole('link', { name: /Контрольний урок/ })).toHaveAttribute(
    'href',
    '/uk/course/' + courseId + '/lesson/uk/' + lessonId,
  );
  await page.goto('/uk/course/' + courseId + '/lesson/uk/' + lessonId);
  await expect(page.getByRole('heading', { name: 'Контрольний урок', level: 1 })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Контрольна інтерактивна сцена' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Контрольна інтерактивна сцена' })).toBeVisible();
  await page.goto('/uk/lesson/uk/' + lessonId);
  await expect(page.getByRole('heading', { name: 'Контрольний урок', level: 1 })).toBeVisible();
});

test('Course Lesson separates interface language and content language', async ({ page }) => {
  await page.goto('/uk/course/' + courseId + '/lesson/en/' + lessonId);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  await expect(page.locator('#learning-content [lang="en-US"]').first()).toHaveAttribute('dir', 'ltr');
  await page.getByRole('button', { name: 'Відкрити налаштування' }).click();
  await page.getByRole('combobox', { name: 'Мова інтерфейсу' }).click();
  await page.getByRole('option', { name: 'English' }).click();
  await expect(page).toHaveURL('/en/course/' + courseId + '/lesson/en/' + lessonId);
});

test('Course sidebar retains real group titles and active Lesson state', async ({ page }) => {
  await page.goto('/uk/course/' + courseId + '/lesson/uk/' + lessonId);
  await page.getByRole('button', { name: 'Відкрити список тем' }).click();
  const sidebar = page.getByRole('navigation', { name: 'Список тем' });
  const moduleButton = sidebar.getByRole('button', { name: 'Контрольний модуль' }).first();
  const chapterButton = sidebar.getByRole('button', { name: 'Контрольна глава' }).first();
  const active = sidebar.locator('a[href="/uk/course/' + courseId + '/lesson/uk/' + lessonId + '"]');
  await expect(moduleButton).toHaveAttribute('aria-expanded', 'true');
  await expect(chapterButton).toHaveAttribute('aria-expanded', 'true');
  await expect(active).toHaveAttribute('aria-current', 'page');
  await chapterButton.click();
  await expect(active).toBeHidden();
  await chapterButton.click();
  await expect(active).toBeVisible();
});

test('Unknown Course membership and removed Episode URL return 404', async ({ request }) => {
  for (const route of [
    '/uk/course/' + courseId + '/lesson/uk/ffffffff-ffff-ffff-ffff-ffffffffffff',
    '/uk/course/' + courseId + '/episode/11111111-1111-4111-8111-000000000129',
  ])
    expect((await request.get(route)).status()).toBe(404);
});

test('Course catalog includes only actual selected package publications', async ({ page }) => {
  await page.goto('/uk/courses');
  await expect(page.getByRole('heading', { name: 'Обирай свою наступну пригоду', level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: /Контрольний курс/ })).toHaveAttribute('href', '/uk/course/' + courseId);
  await expect(page.getByText('Математика навколо нас')).toHaveCount(0);
  await expect(page.getByText('Таємниці космосу')).toHaveCount(0);
});

test('Episode host renders localized media and registered Scene, then follows reviewed Course order', async ({
  page,
}) => {
  const story = '11111111-1111-4111-8111-000000000140';
  const episode = '11111111-1111-4111-8111-000000000141';
  await page.goto('/uk/course/' + story);
  await page.getByRole('link', { name: /Контрольний епізод 321/ }).click();
  await expect(page).toHaveURL('/uk/course/' + story + '/episode/uk/' + episode);
  await expect(page.getByRole('heading', { name: 'Контрольний епізод 321', level: 1 })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Контрольна інтерактивна сцена' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Контрольна інтерактивна сцена' })).toBeVisible();
  await page.getByRole('button', { name: 'Далі', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Практика', level: 2 })).toBeVisible();
  await page
    .getByRole('link', { name: /Контрольний епізод 322/ })
    .first()
    .click();
  await expect(page).toHaveURL('/uk/course/' + story + '/episode/uk/11111111-1111-4111-8111-000000000142');
  await page.goto('/uk/course/' + story + '/lesson/uk/' + lessonId + '?placement=finalLesson');
  await expect(page.getByRole('heading', { name: 'Контрольний урок 2', level: 1 })).toBeVisible();
});
