import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import type { LocalizedCourse } from '@svitlo/engine/runtime';

import { loadCourseDetail } from './courseDetail';

const resources = vi.hoisted(() => ({
  fallback: vi.fn(),
  toc: vi.fn(),
}));
vi.mock('server-only', () => ({}));
vi.mock('./courseResources', () => ({
  loadExistingCourseWithFallback: resources.fallback,
  loadCourseToc: resources.toc,
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
  resources.fallback.mockResolvedValue({ course, contentLanguage: 'en' });
  resources.toc.mockResolvedValue({
    id: courseId,
    type: 'course',
    languages: ['en', 'uk'],
    label: 'Selected fixture Course',
    content: { order: [], items: {} },
  });
});
afterEach(() => vi.clearAllMocks());

it('loads only the requested Course once, deriving both preview and outline from it', async () => {
  const detail = await loadCourseDetail(courseId, 'en');
  expect(detail).toMatchObject({
    course: { id: courseId, title: 'Selected fixture Course' },
    outline: [],
    interfaceLanguage: 'en',
    contentLanguage: 'en',
  });
  expect(resources.fallback).toHaveBeenCalledTimes(1);
  expect(resources.fallback).toHaveBeenCalledWith(courseId, 'en');
  expect(resources.toc).toHaveBeenCalledTimes(1);
  expect(resources.toc).toHaveBeenCalledWith(courseId, 'en');
});

it('never enumerates unrelated orphan or malformed Course publications on a direct request', async () => {
  await expect(loadCourseDetail(courseId, 'en')).resolves.toMatchObject({ course: { id: courseId } });
  expect(resources.fallback).toHaveBeenCalledTimes(1);
  expect(resources.fallback).not.toHaveBeenCalledWith(orphanId, 'en');
});

it('returns not-found for a missing Course and an unsupported interface locale', async () => {
  resources.fallback.mockResolvedValueOnce(null);
  await expect(loadCourseDetail(courseId, 'en')).resolves.toBeNull();
  await expect(loadCourseDetail(courseId, 'not-a-locale')).resolves.toBeNull();
  expect(resources.fallback).toHaveBeenCalledTimes(1);
});

it('propagates malformed and inaccessible requested publications', async () => {
  resources.fallback.mockRejectedValueOnce(new Error('Invalid published JSON'));
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow('Invalid published JSON');
  resources.fallback.mockRejectedValueOnce(new Error('Cannot read published resource'));
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow('Cannot read published resource');
});

it('keeps the requested interface language while routing activities through selected content language', async () => {
  const fallbackCourse = structuredClone(course);
  fallbackCourse.content.items.lesson = { id: '11111111-1111-4111-8111-00000000011c', type: 'lesson' };
  fallbackCourse.content.order = ['lesson'];
  resources.fallback.mockResolvedValueOnce({ course: fallbackCourse, contentLanguage: 'uk' });
  resources.toc.mockResolvedValueOnce({
    id: courseId,
    type: 'course',
    languages: ['en', 'uk'],
    label: 'Контрольний курс',
    content: {
      order: ['lesson'],
      items: {
        lesson: { id: '11111111-1111-4111-8111-00000000011c', type: 'lesson', label: 'Контрольний урок' },
      },
    },
  });
  const detail = await loadCourseDetail(courseId, 'en');
  expect(detail?.interfaceLanguage).toBe('en');
  expect(detail?.contentLanguage).toBe('uk');
  expect(detail?.outline[0]?.href).toBe('/en/course/' + courseId + '/lesson/uk/11111111-1111-4111-8111-00000000011c');
  expect(resources.toc).toHaveBeenCalledWith(courseId, 'uk');
});

it('rejects a stale TOC hierarchy instead of displaying incorrect Course navigation', async () => {
  resources.toc.mockResolvedValueOnce({
    id: courseId,
    type: 'course',
    languages: ['en', 'uk'],
    label: 'Course',
    content: {
      order: ['stale'],
      items: { stale: { id: '11111111-1111-4111-8111-00000000011c', type: 'lesson', label: 'Stale' } },
    },
  });
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow(/Course\/TOC order mismatch/);
});
