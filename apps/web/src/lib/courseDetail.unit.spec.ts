import { join } from 'node:path';

import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import type { LocalizedCourse } from '@svitlo/engine/runtime';

import { loadCourseDetail } from './courseDetail';

const resources = vi.hoisted(() => ({
  tree: vi.fn(),
  titles: vi.fn(),
}));
vi.mock('server-only', () => ({}));
vi.mock('./courseResources', () => ({
  loadCourseTree: resources.tree,
  loadCourseLessonTitles: resources.titles,
}));

const courseId = '11111111-1111-4111-8111-000000000113';
const orphanId = '11111111-1111-4111-8111-000000000114';
const course = {
  id: courseId,
  type: 'course',
  params: { languages: ['en', 'uk'] },
  locale: { title: 'Selected fixture Course', description: 'Fixture description' },
  content: { items: {}, order: [] },
} as LocalizedCourse;

beforeEach(() => {
  resources.tree.mockResolvedValue(course);
  resources.titles.mockResolvedValue({});
});
afterEach(() => vi.clearAllMocks());

it('loads only the requested Course once, deriving both preview and outline from it', async () => {
  const detail = await loadCourseDetail(courseId, 'en');
  expect(detail).toMatchObject({
    course: { id: courseId, title: 'Selected fixture Course' },
    outline: [],
    interfaceLanguage: 'en',
  });
  expect(resources.tree).toHaveBeenCalledExactlyOnceWith(courseId, 'en');
  expect(resources.titles).toHaveBeenCalledExactlyOnceWith(course, 'en');
});

it('ignores unrelated orphan directories and malformed Course resources on a direct request', async () => {
  // Catalog enumeration must never be used to discover the requested Course.
  // A stale or malformed sibling is deliberately not part of the loader inputs.
  await expect(loadCourseDetail(courseId, 'en')).resolves.toMatchObject({ course: { id: courseId } });
  expect(resources.tree).toHaveBeenCalledExactlyOnceWith(courseId, 'en');
  expect(resources.tree).not.toHaveBeenCalledWith(orphanId, 'en');
});

it('rejects invalid and absent Course identifiers and unsupported interface locales', async () => {
  expect(await loadCourseDetail('../etc/passwd', 'en')).toBeNull();
  expect(await loadCourseDetail('not-a-uuid', 'en')).toBeNull();
  expect(await loadCourseDetail(courseId, 'not-a-locale')).toBeNull();
  expect(resources.tree).not.toHaveBeenCalled();

  const base = join(process.cwd(), 'public/data/courses', courseId, 'base.json');
  const missing = new Error('Cannot read published resource: ' + base, {
    cause: Object.assign(new Error('missing'), { code: 'ENOENT' }),
  });
  resources.tree.mockRejectedValueOnce(missing);
  await expect(loadCourseDetail(courseId, 'en')).resolves.toBeNull();
  expect(resources.tree).toHaveBeenCalledTimes(1);
});

it('does not turn malformed or inaccessible requested publications into a 404', async () => {
  resources.tree.mockRejectedValueOnce(new Error('Invalid published JSON: requested base'));
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow('Invalid published JSON');

  const base = join(process.cwd(), 'public/data/courses', courseId, 'base.json');
  resources.tree.mockRejectedValueOnce(
    new Error('Cannot read published resource: ' + base, {
      cause: Object.assign(new Error('permission denied'), { code: 'EACCES' }),
    }),
  );
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow('Cannot read published resource');
});
