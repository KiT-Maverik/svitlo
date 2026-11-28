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
const course = {
  id: courseId,
  type: 'course',
  params: { languages: ['en', 'uk'] },
  locale: { title: 'Selected fixture Course', description: 'Fixture description' },
  children: [],
} as LocalizedCourse;

beforeEach(() => {
  resources.fallback.mockResolvedValue({ course, contentLanguage: 'en' });
  resources.toc.mockResolvedValue({
    id: courseId,
    type: 'course',
    languages: ['en', 'uk'],
    label: 'Selected fixture Course',
    children: [],
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

it('rejects an unsupported interface locale without loading Course resources', async () => {
  await expect(loadCourseDetail(courseId, 'not-a-locale')).resolves.toBeNull();
  expect(resources.fallback).not.toHaveBeenCalled();
  expect(resources.toc).not.toHaveBeenCalled();
});

it('propagates inaccessible requested publication errors', async () => {
  resources.fallback.mockRejectedValueOnce(new Error('Cannot read published resource'));
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow('Cannot read published resource');
});

it('keeps the requested interface language while routing activities through selected content language', async () => {
  const fallbackCourse = structuredClone(course);
  fallbackCourse.lesson = { id: '11111111-1111-4111-8111-00000000011c', type: 'lesson' };
  fallbackCourse.children = ['lesson'];
  resources.fallback.mockResolvedValueOnce({ course: fallbackCourse, contentLanguage: 'uk' });
  resources.toc.mockResolvedValueOnce({
    id: courseId,
    type: 'course',
    languages: ['en', 'uk'],
    label: 'Контрольний курс',
    children: ['lesson'],
      lesson: { id: '11111111-1111-4111-8111-00000000011c', type: 'lesson', label: 'Контрольний урок' },
  });
  const detail = await loadCourseDetail(courseId, 'en');
  expect(detail?.interfaceLanguage).toBe('en');
  expect(detail?.contentLanguage).toBe('uk');
  expect(detail?.outline[0]?.href).toBe('/en/course/' + courseId + '/lesson/uk/lesson');
  expect(resources.toc).toHaveBeenCalledWith(courseId, 'uk');
});
