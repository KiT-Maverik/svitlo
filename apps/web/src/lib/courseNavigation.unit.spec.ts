import { describe, expect, it } from 'vitest';

import type { CourseToc } from '@svitlo/engine/runtime';

import { courseTocToTopics, flattenCourseTopics } from './courseNavigation';

const toc: CourseToc = {
  id: 'course-id',
  type: 'course',
  languages: ['en', 'uk'],
  label: 'Light journey',
  content: {
    order: ['laboratory'],
    items: {
      laboratory: {
        id: 'module-1',
        type: 'module',
        label: 'Light laboratory',
        content: {
          order: ['fundamentals', 'refraction'],
          items: {
            fundamentals: {
              id: 'chapter-1',
              type: 'chapter',
              label: 'First steps',
              content: {
                order: ['reflection'],
                items: { reflection: { id: 'lesson-1', type: 'lesson', label: 'Reflection' } },
              },
            },
            refraction: { id: 'lesson-2', type: 'lesson', label: 'Refraction' },
          },
        },
      },
    },
  },
};

describe('courseTocToTopics', () => {
  it('preserves ordered Course hierarchy and localized Lesson labels without any title lookup', () => {
    const topics = courseTocToTopics(toc, 'uk', 'en');
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
              { id: 'lesson-1', type: 'lesson', title: 'Reflection', href: '/uk/course/course-id/lesson/en/lesson-1' },
            ],
          },
          { id: 'lesson-2', type: 'lesson', title: 'Refraction', href: '/uk/course/course-id/lesson/en/lesson-2' },
        ],
      },
    ]);
  });

  it('uses distinct placement URLs and labels for reused Lessons', () => {
    const repeated = structuredClone(toc);
    repeated.content.items.repeat = { id: 'lesson-1', type: 'lesson', label: 'Second placement' };
    repeated.content.order.push('repeat');
    const flat = flattenCourseTopics(courseTocToTopics(repeated, 'uk', 'en'));
    expect(flat.map(item => item.title)).toEqual(['Reflection', 'Refraction', 'Second placement']);
    expect(flat.map(item => item.href)).toEqual([
      '/uk/course/course-id/lesson/en/lesson-1?placement=laboratory%2Ffundamentals%2Freflection',
      '/uk/course/course-id/lesson/en/lesson-2',
      '/uk/course/course-id/lesson/en/lesson-1?placement=repeat',
    ]);
  });

  it('includes episodes and assessments but never links pending draft activities', () => {
    const mixed = structuredClone(toc);
    mixed.content.items.story = { id: 'episode-one', type: 'episode', label: 'Story' };
    mixed.content.items.review = { id: 'assessment-one', type: 'assessment', label: 'Not implemented', draft: true };
    mixed.content.order.unshift('story', 'review');
    const topics = courseTocToTopics(mixed, 'uk', 'en');
    expect(topics.slice(0, 2)).toEqual([
      { id: 'episode-one', type: 'episode', title: 'Story', href: '/uk/course/course-id/episode/en/episode-one' },
      { id: 'assessment-one', type: 'assessment', title: 'Not implemented' },
    ]);
    expect(flattenCourseTopics(topics).map(item => item.type)).toEqual(['episode', 'lesson', 'lesson']);
  });
});
