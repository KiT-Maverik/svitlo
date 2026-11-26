import { afterEach, expect, it, vi } from 'vitest';

import type { LocalizedCourse } from '@svitlo/engine/runtime';

import { courseHasLesson, courseLessonIds, loadCourseToc, loadCourseTree } from './courseResources';

const adapter = vi.hoisted(() => ({
  toc: vi.fn(),
  course: vi.fn(),
}));
vi.mock('server-only', () => ({}));
vi.mock('@svitlo/adapter-nextjs', () => ({
  loadPublishedCourseToc: adapter.toc,
  loadPublishedCourseTree: adapter.course,
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

it('obtains the TOC once for any number of Lesson placements, with no Lesson Props reads', async () => {
  const toc = { id: courseId, label: 'Draft Course', content: { order: ['complete', 'pending'] } };
  adapter.toc.mockResolvedValue(toc);
  expect(courseHasLesson(mixed, pendingId)).toBe(true);
  expect(courseLessonIds(mixed)).toEqual([completeId]);
  expect(await loadCourseToc(courseId, 'en')).toBe(toc);
  expect(adapter.toc).toHaveBeenCalledTimes(1);
  expect(adapter.toc).toHaveBeenCalledWith(courseId, 'en', undefined, 'production');
  expect(adapter.course).not.toHaveBeenCalled();
});

it('applies the same draft gate to Course tree and TOC loads', async () => {
  adapter.course.mockResolvedValue(mixed);
  adapter.toc.mockResolvedValue({});
  vi.stubEnv('NODE_ENV', 'development');
  await loadCourseTree(courseId, 'en');
  await loadCourseToc(courseId, 'en');
  expect(adapter.course).toHaveBeenLastCalledWith(courseId, 'en', undefined, 'draft');
  expect(adapter.toc).toHaveBeenLastCalledWith(courseId, 'en', undefined, 'draft');

  vi.stubEnv('NODE_ENV', 'production');
  await loadCourseToc(courseId, 'en');
  expect(adapter.toc).toHaveBeenLastCalledWith(courseId, 'en', undefined, 'production');
});
