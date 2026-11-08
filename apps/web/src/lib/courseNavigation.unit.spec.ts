import { describe, expect, it } from 'vitest';
import type { Course_Toc } from '@svitlo/contracts/content';
import { courseTocToTopics } from './courseNavigation';

const toc: Course_Toc = {
  id: 'course-id',
  type: 'course',
  title: 'Light journey',
  children: [
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
            { id: 'lesson-1', type: 'lesson', title: 'Reflection' },
            { id: 'episode-1', type: 'episode', title: 'A discovery' },
          ],
        },
        { id: 'lesson-2', type: 'lesson', title: 'Refraction' },
      ],
    },
    { id: 'episode-2', type: 'episode', title: 'Outside the module' },
  ],
};

describe('courseTocToTopics', () => {
  it('keeps the published Module/Chapter tree and Course order without group links', () => {
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
              {
                id: 'lesson-1',
                type: 'lesson',
                title: 'Reflection',
                href: '/uk/course/course-id/lesson/en/lesson-1',
              },
              {
                id: 'episode-1',
                type: 'episode',
                title: 'A discovery',
                href: '/uk/course/course-id/episode/episode-1',
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
      {
        id: 'episode-2',
        type: 'episode',
        title: 'Outside the module',
        href: '/uk/course/course-id/episode/episode-2',
      },
    ]);
  });

  it('uses the interface language for Lesson navigation by default', () => {
    const topics = courseTocToTopics(toc, 'pl');
    expect(topics[0]?.children?.[0]?.children?.[0]?.href).toBe('/pl/course/course-id/lesson/pl/lesson-1');
  });
});
