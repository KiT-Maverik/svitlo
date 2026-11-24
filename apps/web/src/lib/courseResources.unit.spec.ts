import { afterEach, expect, it, vi } from 'vitest';
import type { LocalizedCourse } from '@svitlo/engine/runtime';

const adapter = vi.hoisted(() => ({
  lesson: vi.fn(),
  course: vi.fn(),
}));
vi.mock('server-only', () => ({}));
vi.mock('@svitlo/adapter-nextjs', () => ({
  loadPublishedCourseLessonProps: adapter.lesson,
  loadPublishedCourseTree: adapter.course,
}));

import {
  courseHasLesson,
  courseLessonIds,
  loadCourseLessonTitles,
  loadCourseTree,
} from './courseResources';

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

it('does not fetch standalone Lesson Props for a reserved Draft Course placement', async () => {
  adapter.lesson.mockResolvedValue({ locale: { title: 'Reviewed Lesson' } });
  expect(courseHasLesson(mixed, pendingId)).toBe(true);
  expect(courseLessonIds(mixed)).toEqual([completeId]);

  const titles = await loadCourseLessonTitles(mixed, 'en');
  expect(titles).toEqual({
    [completeId]: 'Reviewed Lesson',
    'placement:complete': 'Reviewed Lesson',
  });
  expect(adapter.lesson).toHaveBeenCalledTimes(1);
  expect(adapter.lesson).toHaveBeenCalledWith(courseId, completeId, 'en', { placement: 'complete' });
});

it('only enables Draft assembly in the development host, never in production', async () => {
  adapter.course.mockResolvedValue(mixed);
  vi.stubEnv('NODE_ENV', 'development');
  await loadCourseTree(courseId, 'en');
  expect(adapter.course).toHaveBeenLastCalledWith(courseId, 'en', undefined, 'draft');

  vi.stubEnv('NODE_ENV', 'production');
  await loadCourseTree(courseId, 'en');
  expect(adapter.course).toHaveBeenLastCalledWith(courseId, 'en', undefined, 'production');
});
