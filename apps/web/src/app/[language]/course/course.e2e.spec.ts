import { test, expect } from '@playwright/test';

const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const episodeId = '9f417177-1d07-5a9d-ad74-0146c5637e84';

test('Course publishes independent localized TOC, override and Episode JSON resources', async ({ request }) => {
  const base = '/data/pages/courses/' + courseId;
  const [toc, override, episode] = await Promise.all([
    request.get(base + '/toc/uk.json'),
    request.get(base + '/overrides/' + lessonId + '/uk.json'),
    request.get(base + '/episodes/' + episodeId + '/uk.json'),
  ]);
  expect(toc.ok()).toBe(true);
  expect(override.ok()).toBe(true);
  expect(episode.ok()).toBe(true);
  const tree = await toc.json();
  expect(tree.type).toBe('course');
  expect(tree.children[0].type).toBe('module');
  expect(tree.children[0].children[0].type).toBe('chapter');
  expect(tree.children[0].children[0].children.some((item: { type: string }) => item.type === 'episode')).toBe(true);
  const patch = await override.json();
  expect(patch.lessonId).toBe(lessonId);
  expect(patch.overrides.sections.order).toEqual(['practice', 'storyBridge', 'theory', 'quiz']);
  expect(patch.overrides.sections.added[0].source.type).toBe('course');
  expect(patch.overrides.parameters.sections.allowSkipping).toBe(false);
  expect(patch.overrides.questions).toBeUndefined();
  expect(patch.overrides.flashcards).toBeUndefined();
  const story = await episode.json();
  expect(story.sections[0].type).toBe('scenario');
  expect(story.sections[0].content[0].locales).toContain('Lorem ipsum');
});

test('Course navigation renders Modules and opens the overridden Lesson without changing standalone route', async ({
  page,
}) => {
  await page.goto('/uk/course/' + courseId);
  await expect(page.getByRole('heading', { name: 'Playground · Light Journey' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Course table of contents' })).toContainText(
    'The Light Laboratory',
  );
  await page.goto('/uk/course/' + courseId + '/lesson/' + lessonId);
  await expect(page.getByText('Порівняй швидкість світла у вакуумі, повітрі та воді.')).toBeVisible();
  const next = page
    .getByRole('navigation', { name: 'Нижня навігація навчання' })
    .getByRole('button', { name: 'Далі →' });
  await next.click();
  await expect(page.getByText(/A small story between lesson sections/)).toBeVisible();
  await page.goto('/uk/lesson/' + lessonId);
  await expect(page.getByRole('heading', { name: 'Як рухається світло', exact: true })).toBeVisible();
});

test('Episode is navigable as a separate Course unit', async ({ page }) => {
  await page.goto('/uk/course/' + courseId + '/episode/' + episodeId);
  await expect(page.getByText(/Lorem ipsum dolor sit amet/)).toBeVisible();
});

test('Unknown Course membership returns 404', async ({ request }) => {
  const response = await request.get('/uk/course/' + courseId + '/lesson/ffffffff-ffff-ffff-ffff-ffffffffffff');
  expect(response.status()).toBe(404);
});
