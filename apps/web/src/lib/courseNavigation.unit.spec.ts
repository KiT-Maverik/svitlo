import { describe, expect, it } from 'vitest';
import type { LocalizedCourse } from './courseResources';
import { coursePropsToTopics } from './courseNavigation';

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
