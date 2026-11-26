import { join } from 'node:path';

import { afterEach, expect, it, vi } from 'vitest';

import type { LocalizedCourse } from '@svitlo/engine/runtime';

import {
  courseHasLesson,
  courseLessonIds,
  loadCourseToc,
  loadCourseTree,
  loadExistingCourseTree,
  loadExistingCourseWithFallback,
} from './courseResources';

const adapter = vi.hoisted(() => {
  class PublishedResourceError extends Error {
    constructor(
      readonly code: string,
      readonly resourcePath: string,
    ) {
      super('Published resource error');
    }
  }
  class CourseLanguageUnavailableError extends Error {}
  return {
    lesson: vi.fn(),
    toc: vi.fn(),
    course: vi.fn(),
    fallback: vi.fn(),
    PublishedResourceError,
    CourseLanguageUnavailableError,
  };
});
vi.mock('server-only', () => ({}));
vi.mock('@svitlo/adapter-nextjs', () => ({
  loadPublishedCourseLessonProps: adapter.lesson,
  loadPublishedCourseToc: adapter.toc,
  loadPublishedCourseTree: adapter.course,
  loadPublishedCourseTreeWithFallback: adapter.fallback,
  PublishedResourceError: adapter.PublishedResourceError,
  CourseLanguageUnavailableError: adapter.CourseLanguageUnavailableError,
}));

const courseId = '99999999-9999-4999-8999-999999999999';
const completeId = '88888888-8888-4888-8888-888888888888';
const pendingId = '77777777-7777-4777-8777-777777777777';

const mixed = {
  id: courseId,
  type: 'course',
  params: { languages: ['en'] },
  locale: { title: 'Draft Course' },
  content: {
    order: ['complete', 'pending'],
    items: {
      complete: { id: completeId, type: 'lesson' },
      pending: {
        id: pendingId,
        slug: 'pending',
        type: 'lesson',
        draft: true,
        locale: { title: 'Not implemented' },
        section: [],
      },
    },
  },
} as LocalizedCourse;

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

it('reads one TOC rather than standalone Lesson Props for navigation', async () => {
  const expected = { id: courseId, content: { items: {}, order: [] } };
  adapter.toc.mockResolvedValue(expected);
  expect(courseHasLesson(mixed, pendingId)).toBe(true);
  expect(courseLessonIds(mixed)).toEqual([completeId]);
  expect(await loadCourseToc(courseId, 'en')).toBe(expected);
  expect(adapter.toc).toHaveBeenCalledTimes(1);
  expect(adapter.toc).toHaveBeenCalledWith(courseId, 'en', undefined, 'production');
  expect(adapter.lesson).not.toHaveBeenCalled();
});

it('only enables Draft assembly in the development host, never in production', async () => {
  adapter.course.mockResolvedValue(mixed);
  adapter.fallback.mockResolvedValue({ course: mixed, contentLanguage: 'en' });
  vi.stubEnv('NODE_ENV', 'development');
  await loadCourseTree(courseId, 'en');
  await loadCourseToc(courseId, 'en');
  await loadExistingCourseWithFallback(courseId, 'en');
  expect(adapter.course).toHaveBeenLastCalledWith(courseId, 'en', undefined, 'draft');
  expect(adapter.toc).toHaveBeenLastCalledWith(courseId, 'en', undefined, 'draft');
  expect(adapter.fallback).toHaveBeenLastCalledWith(courseId, 'en', undefined, 'draft');

  vi.stubEnv('NODE_ENV', 'production');
  await loadCourseTree(courseId, 'en');
  await loadCourseToc(courseId, 'en');
  await loadExistingCourseWithFallback(courseId, 'en');
  expect(adapter.course).toHaveBeenLastCalledWith(courseId, 'en', undefined, 'production');
  expect(adapter.toc).toHaveBeenLastCalledWith(courseId, 'en', undefined, 'production');
  expect(adapter.fallback).toHaveBeenLastCalledWith(courseId, 'en', undefined, 'production');
});

it('validates direct Course IDs and reads only the requested publication', async () => {
  adapter.course.mockResolvedValue(mixed);
  adapter.fallback.mockResolvedValue({ course: mixed, contentLanguage: 'en' });
  expect(await loadExistingCourseTree(courseId, 'en')).toBe(mixed);
  expect(await loadExistingCourseWithFallback(courseId, 'en')).toEqual({ course: mixed, contentLanguage: 'en' });
  expect(adapter.course).toHaveBeenCalledTimes(1);
  expect(adapter.fallback).toHaveBeenCalledTimes(1);
  await expect(loadExistingCourseTree('../outside', 'en')).resolves.toBeNull();
  await expect(loadExistingCourseWithFallback('not-a-uuid', 'en')).resolves.toBeNull();
  expect(adapter.course).toHaveBeenCalledTimes(1);
  expect(adapter.fallback).toHaveBeenCalledTimes(1);
});

it('returns not-found only on structured missing-base or unavailable explicit activity language', async () => {
  const base = join(process.cwd(), 'public/data/courses', courseId, 'base.json');
  adapter.course.mockRejectedValueOnce(new adapter.PublishedResourceError('missing', base));
  await expect(loadExistingCourseTree(courseId, 'en')).resolves.toBeNull();
  adapter.course.mockRejectedValueOnce(new adapter.CourseLanguageUnavailableError('unsupported'));
  await expect(loadExistingCourseTree(courseId, 'en')).resolves.toBeNull();

  adapter.course.mockRejectedValueOnce(new adapter.PublishedResourceError('invalid-json', base));
  await expect(loadExistingCourseTree(courseId, 'en')).rejects.toThrow('Published resource error');
  adapter.course.mockRejectedValueOnce(new adapter.PublishedResourceError('missing', base + '/other'));
  await expect(loadExistingCourseTree(courseId, 'en')).rejects.toThrow('Published resource error');

  adapter.fallback.mockRejectedValueOnce(new adapter.PublishedResourceError('missing', base));
  await expect(loadExistingCourseWithFallback(courseId, 'en')).resolves.toBeNull();
  adapter.fallback.mockRejectedValueOnce(new adapter.PublishedResourceError('read-failed', base));
  await expect(loadExistingCourseWithFallback(courseId, 'en')).rejects.toThrow('Published resource error');
});
