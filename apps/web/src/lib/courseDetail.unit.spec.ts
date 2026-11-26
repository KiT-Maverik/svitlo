import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import type { LocalizedCourse } from '@svitlo/engine/runtime';

import { loadCourseDetail } from './courseDetail';

const resources = vi.hoisted(() => ({
  existing: vi.fn(),
  titles: vi.fn(),
}));
vi.mock('server-only', () => ({}));
vi.mock('./courseResources', () => ({
  loadExistingCourseTree: resources.existing,
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
  resources.existing.mockResolvedValue(course);
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
  expect(resources.existing).toHaveBeenCalledTimes(1);
  expect(resources.existing).toHaveBeenCalledWith(courseId, 'en');
  expect(resources.titles).toHaveBeenCalledTimes(1);
  expect(resources.titles).toHaveBeenCalledWith(course, 'en');
});

it('never enumerates unrelated orphan or malformed Course publications on a direct request', async () => {
  await expect(loadCourseDetail(courseId, 'en')).resolves.toMatchObject({ course: { id: courseId } });
  expect(resources.existing).toHaveBeenCalledTimes(1);
  expect(resources.existing).not.toHaveBeenCalledWith(orphanId, 'en');
});

it('returns not-found for a missing Course and an unsupported interface locale', async () => {
  resources.existing.mockResolvedValueOnce(null);
  await expect(loadCourseDetail(courseId, 'en')).resolves.toBeNull();
  await expect(loadCourseDetail(courseId, 'not-a-locale')).resolves.toBeNull();
  expect(resources.existing).toHaveBeenCalledTimes(1);
});

it('propagates malformed and inaccessible requested publications', async () => {
  resources.existing.mockRejectedValueOnce(new Error('Invalid published JSON'));
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow('Invalid published JSON');
  resources.existing.mockRejectedValueOnce(new Error('Cannot read published resource'));
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow('Cannot read published resource');
});
