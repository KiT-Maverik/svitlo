import { describe, expect, it } from 'vitest';
import type { LocalizedCourse } from './courseResources';
import { coursePropsToTopics, flattenCourseTopics } from './courseNavigation';

const course: LocalizedCourse = {
  id: 'course-id',
  type: 'course',
  locale: { title: 'Light journey' },
  params: { languages: ['uk', 'en'] },
  content: {
    order: ['laboratory'],
    items: {
      laboratory: {
        id: 'module-1',
        type: 'module',
        locale: { title: 'Light laboratory' },
        content: {
          order: ['fundamentals', 'refraction'],
          items: {
            fundamentals: {
              id: 'chapter-1',
              type: 'chapter',
              locale: { title: 'First steps' },
              content: {
                order: ['reflection'],
                items: {
                  reflection: { id: 'lesson-1', type: 'lesson' },
                },
              },
            },
            refraction: { id: 'lesson-2', type: 'lesson' },
          },
        },
      },
    },
  },
};
const titles = { 'lesson-1': 'Reflection', 'lesson-2': 'Refraction' };

describe('coursePropsToTopics', () => {
  it('retains keyed Module/Chapter order and resolves referenced Lesson titles', () => {
    const topics = coursePropsToTopics(course, 'uk', 'en', titles);
    expect(topics).toEqual([
      {
        id: 'module-1',
        type: 'module',
        title: 'Light laboratory',
        children: [
          {
            id: 'chapter-1',
            type: 'chapter',
            title: 'First steps',
            children: [
              {
                id: 'lesson-1',
                type: 'lesson',
                title: 'Reflection',
                href: '/uk/course/course-id/lesson/en/lesson-1',
              },
            ],
          },
          {
            id: 'lesson-2',
            type: 'lesson',
            title: 'Refraction',
            href: '/uk/course/course-id/lesson/en/lesson-2',
          },
        ],
      },
    ]);
  });

  it('rejects missing Lesson titles rather than exposing UUIDs in navigation', () => {
    expect(() => coursePropsToTopics(course, 'uk', 'uk', {})).toThrow(/Missing localized Lesson title/);
  });
});

it('preserves mixed Episode and repeated Lesson navigation in reviewed order', () => {
  const mixed = structuredClone(course);
  mixed.content.items.start = {
    id: 'episode-one',
    slug: 'start',
    type: 'episode',
    params: { languages: ['en'] },
    locale: { title: 'Start story' },
    section: [],
  };
  mixed.content.items.repeat = { id: 'lesson-1', type: 'lesson' };
  mixed.content.order = ['start', 'laboratory', 'repeat'];
  const flat = flattenCourseTopics(
    coursePropsToTopics(mixed, 'uk', 'en', {
      ...titles,
      'placement:repeat': 'Second placement',
    }),
  );
  expect(flat.map(topic => topic.href)).toEqual([
    '/uk/course/course-id/episode/en/episode-one',
    '/uk/course/course-id/lesson/en/lesson-1?placement=laboratory%2Ffundamentals%2Freflection',
    '/uk/course/course-id/lesson/en/lesson-2',
    '/uk/course/course-id/lesson/en/lesson-1?placement=repeat',
  ]);
  expect(flat.at(-1)?.title).toBe('Second placement');
});
