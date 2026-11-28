import { expect, test } from '@playwright/test';

const courseId = '11111111-1111-4111-8111-000000000113';
const lessonId = '11111111-1111-4111-8111-00000000011c';
const courseLessonPlacement = 'fixtureModule/fixtureChapter/fixtureLesson';

test('selected content package publishes canonical Course, Lesson, Question Data and derived TOC', async ({
  request,
}) => {
  const [courseResource, lessonResource, questionResource, tocResource, localizedTocResource, localizedCourseResource] =
    await Promise.all([
      request.get('/data/courses/' + courseId + '/base.json'),
      request.get('/data/lessons/c/' + lessonId + '/base.json'),
      request.get('/data/questions/a/11111111-1111-4111-8111-00000000012a/base.json'),
      request.get('/data/courses/' + courseId + '/toc/base.json'),
      request.get('/data/courses/' + courseId + '/toc/uk.json'),
      request.get('/data/courses/' + courseId + '/uk.json'),
    ]);
  for (const resource of [
    courseResource,
    lessonResource,
    questionResource,
    tocResource,
    localizedTocResource,
    localizedCourseResource,
  ])
    expect(resource.ok()).toBe(true);

  const toc = await tocResource.json();
  expect(toc.type).toBe('course');
  expect(toc.children).toEqual(['fixtureModule']);
  expect(toc.fixtureModule.children).toEqual(['fixtureChapter']);
  expect(toc.fixtureModule.fixtureChapter.children).toEqual(['fixtureLesson']);
  expect(toc.fixtureModule.fixtureChapter.fixtureLesson).toMatchObject({ type: 'lesson', id: lessonId });
  expect(toc).not.toHaveProperty('content');

  const localizedToc = await localizedTocResource.json();
  expect(localizedToc).toMatchObject({
    label: 'Контрольний курс',
    fixtureModule: {
      label: 'Контрольний модуль',
      fixtureChapter: { label: 'Контрольна глава' },
    },
  });
  expect(localizedToc).not.toHaveProperty('children');
  expect(localizedToc.fixtureModule).not.toHaveProperty('children');

  const published = await courseResource.json();
  expect(published.type).toBe('course');
  expect(published.children).toEqual(['fixtureModule']);
  const fixtureModule = published.fixtureModule;
  expect(fixtureModule).toMatchObject({ type: 'module', slug: 'fixtureModule', children: ['fixtureChapter'] });
  const chapter = fixtureModule.fixtureChapter;
  expect(chapter).toMatchObject({ type: 'chapter', slug: 'fixtureChapter', children: ['fixtureLesson'] });
  expect(chapter.fixtureLesson).toEqual({ type: 'lesson', id: lessonId });
  expect(published).not.toHaveProperty('content');

  const localizedCourse = await localizedCourseResource.json();
  expect(localizedCourse).toMatchObject({
    locale: { title: 'Контрольний курс' },
    fixtureModule: { locale: { title: 'Контрольний модуль' } },
  });
  expect(localizedCourse).not.toHaveProperty('children');
  expect(localizedCourse.fixtureModule).not.toHaveProperty('children');

  const lesson = await lessonResource.json();
  expect(lesson.type).toBe('lesson');
  expect(lesson.children).toEqual(['fixtureIntro', 'fixturePractice', 'fixtureQuiz']);
  expect(lesson.fixtureIntro.children).toEqual(['fixtureText', 'fixtureImage', 'fixtureScene']);
  expect(lesson.fixturePractice.children).toEqual(['practiceText']);
  expect(lesson.fixtureQuiz.children).toEqual([]);
  expect(lesson).not.toHaveProperty('section');
  expect(lesson.params.languages).toEqual(expect.arrayContaining(['uk', 'en', 'ar', 'qm']));

  const question = await questionResource.json();
  expect(question.content.question.children).toEqual(['questionText']);
  expect(question.content.answers.correct.children).toEqual(['answerCorrect']);
  expect(question.content.answers.incorrect.children).toEqual(['answerWrong']);
  expect(question.content.answers.distractors.children).toEqual([]);

  const storyResponse = await request.get('/data/courses/11111111-1111-4111-8111-000000000140/base.json');
  expect(storyResponse.ok()).toBe(true);
  const story = await storyResponse.json();
  expect(story.children).toEqual(['opening', 'module', 'direct', 'finalLesson']);
  expect(story.opening.children).toEqual(['opening', 'closing']);
  expect(story.opening.opening.children).toEqual(['narration', 'picture', 'fixtureScene']);
  expect(story.module.children).toEqual(['moduleStory', 'nested']);
  expect(story.module.nested.children).toEqual(['nestedStory', 'repeat']);
  expect(story.module.nested.repeat).toEqual({ id: lessonId, type: 'lesson' });
  expect(story.finalLesson.overrides.locale.title).toBe('Controlled Lesson 2');
});

test('Course detail renders the selected package hierarchy and opens a published Lesson', async ({ page }) => {
  await page.goto('/uk/course/' + courseId);
  await expect(page.getByRole('heading', { name: 'Контрольний курс', level: 1 })).toBeVisible();
  await expect(page.getByText('Контрольний модуль')).toBeVisible();
  await expect(page.getByText('Контрольна глава')).toBeVisible();
  await expect(page.getByRole('link', { name: /Контрольний урок/ })).toHaveAttribute(
    'href',
    '/uk/course/' + courseId + '/lesson/uk/' + courseLessonPlacement,
  );
  await page.goto('/uk/course/' + courseId + '/lesson/uk/' + courseLessonPlacement);
  await expect(page.getByRole('heading', { name: 'Контрольний урок', level: 1 })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Контрольна інтерактивна сцена' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Контрольна інтерактивна сцена' })).toBeVisible();
  await page.goto('/uk/lesson/uk/' + lessonId);
  await expect(page.getByRole('heading', { name: 'Контрольний урок', level: 1 })).toBeVisible();
});

test('Course Lesson separates interface language and content language', async ({ page }) => {
  await page.goto('/uk/course/' + courseId + '/lesson/en/' + courseLessonPlacement);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  await expect(page.locator('#learning-content [lang="en-US"]').first()).toHaveAttribute('dir', 'ltr');
  await page.getByRole('button', { name: 'Відкрити налаштування' }).click();
  await page.getByRole('combobox', { name: 'Мова інтерфейсу' }).click();
  await page.getByRole('option', { name: 'English' }).click();
  await expect(page).toHaveURL('/en/course/' + courseId + '/lesson/en/' + courseLessonPlacement);
});

test('Course sidebar retains real group titles and active Lesson state', async ({ page }) => {
  await page.goto('/uk/course/' + courseId + '/lesson/uk/' + courseLessonPlacement);
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
    '/uk/course/' + courseId + '/lesson/uk/fixtureModule/fixtureChapter/missingLesson',
    '/uk/course/' + courseId + '/episode/uk/fixtureModule/fixtureChapter/removedEpisode',
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
  await page.goto('/uk/course/' + story);
  await page.getByRole('link', { name: /Контрольний епізод 321/ }).click();
  await expect(page).toHaveURL('/uk/course/' + story + '/episode/uk/opening');
  await expect(page.getByRole('heading', { name: 'Контрольний епізод 321', level: 1 })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Контрольна інтерактивна сцена' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Контрольна інтерактивна сцена' })).toBeVisible();
  await page.getByRole('button', { name: 'Далі', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Практика', level: 2 })).toBeVisible();
  await page
    .getByRole('link', { name: /Контрольний епізод 322/ })
    .first()
    .click();
  await expect(page).toHaveURL('/uk/course/' + story + '/episode/uk/module/moduleStory');
  await page.goto('/uk/course/' + story + '/lesson/uk/finalLesson');
  await expect(page.getByRole('heading', { name: 'Контрольний урок 2', level: 1 })).toBeVisible();
});

test('Direct Course URLs reject malformed or absent IDs and unsupported interface languages', async ({ request }) => {
  for (const route of [
    '/en/course/not-a-uuid',
    '/en/course/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    '/unsupported/course/' + courseId,
  ])
    expect((await request.get(route)).status()).toBe(404);
});

test('Course detail falls back to a published content language and keeps interface navigation', async ({ page }) => {
  await page.goto('/pl/course/' + courseId);
  await expect(page).toHaveURL('/pl/course/' + courseId);
  const notice = page.getByTestId('course-language-notice');
  await expect(notice).toHaveAttribute('role', 'status');
  await expect(notice).toContainText('Showing the available');
  await expect(page.getByRole('heading', { name: 'Контрольний курс', level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: /Контрольний урок/ })).toHaveAttribute(
    'href',
    '/pl/course/' + courseId + '/lesson/uk/' + courseLessonPlacement,
  );
  await page.getByRole('link', { name: /Контрольний урок/ }).click();
  await expect(page).toHaveURL('/pl/course/' + courseId + '/lesson/uk/' + courseLessonPlacement);
});

test('Course detail keeps its requested language without displaying a fallback notice', async ({ page }) => {
  await page.goto('/uk/course/' + courseId);
  await expect(page.getByTestId('course-language-notice')).toHaveCount(0);
});

// This invalid TOC is published once by the Web-owned fixture builder. No
// browser worker may create or remove files beneath the shared host public root.
test('Mismatched published Course TOC displays an accessible recovery path', async ({ page }) => {
  const invalidTocCourseId = '11111111-1111-4111-8111-0000000002fc';
  await page.goto('/en/course/' + invalidTocCourseId);

  // Next's streamed response status is not evidence of a usable error UI.
  const error = page.getByTestId('course-load-error');
  await expect(error).toHaveAttribute('role', 'alert');
  await expect(error).toBeVisible();
  await expect(error).toContainText('Unable to load this course');
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'All courses' })).toHaveAttribute('href', '/en/courses');
  await expect(page.getByRole('heading', { name: 'Broken TOC fixture Course' })).toHaveCount(0);
});
