import { describe, expect, it } from 'vitest';

import type { CourseToc } from '@svitlo/engine/runtime';

import {
  coursePlacementHref, courseTocToTopics, flattenCourseTopics, parseCoursePlacement,
} from './courseNavigation';

const toc: CourseToc = {
  id: 'course-id',
  type: 'course',
  languages: ['en', 'uk'],
  label: 'Light journey',
  children: ['laboratory'],
  laboratory: {
    id: 'module-1',
    type: 'module',
    label: 'Light laboratory',
    children: ['fundamentals', 'refraction'],
    fundamentals: {
      id: 'chapter-1',
      type: 'chapter',
      label: 'First steps',
      children: ['reflection'],
      reflection: { id: 'lesson-1', type: 'lesson', label: 'Reflection' },
    },
    refraction: { id: 'lesson-2', type: 'lesson', label: 'Refraction' },
  },
};

describe('Course TOC presentation and slug routing', () => {
  it('preserves nested order and splits interface/content locales without scanning Lessons', () => {
    expect(courseTocToTopics(toc, 'uk', 'en')).toEqual([
      {
        id: 'laboratory', type: 'module', title: 'Light laboratory', children: [
          {
            id: 'laboratory/fundamentals', type: 'chapter', title: 'First steps', children: [
              {
                id: 'laboratory/fundamentals/reflection', type: 'lesson', title: 'Reflection',
                href: '/uk/course/course-id/lesson/en/laboratory/fundamentals/reflection',
              },
            ],
          },
          {
            id: 'laboratory/refraction', type: 'lesson', title: 'Refraction',
            href: '/uk/course/course-id/lesson/en/laboratory/refraction',
          },
        ],
      },
    ]);
  });

  it('uses distinct URLs for repeated canonical Lessons without ID search or query overrides', () => {
    const repeated = structuredClone(toc);
    repeated.children.push('repeat');
    repeated.repeat = { id: 'lesson-1', type: 'lesson', label: 'Second placement' };
    const flat = flattenCourseTopics(courseTocToTopics(repeated, 'uk', 'en'));
    expect(flat.map(item => item.id)).toEqual([
      'laboratory/fundamentals/reflection', 'laboratory/refraction', 'repeat',
    ]);
    expect(flat.map(item => item.href)).toEqual([
      '/uk/course/course-id/lesson/en/laboratory/fundamentals/reflection',
      '/uk/course/course-id/lesson/en/laboratory/refraction',
      '/uk/course/course-id/lesson/en/repeat',
    ]);
  });

  it('retains Course-owned Episode/Assessment placements and excludes draft destinations', () => {
    const mixed = structuredClone(toc);
    mixed.story = { id: 'episode-one', type: 'episode', label: 'Story' };
    mixed.review = { id: 'assessment-one', type: 'assessment', label: 'Not implemented', draft: true };
    mixed.children.unshift('story', 'review');
    const topics = courseTocToTopics(mixed, 'uk', 'en');
    expect(topics.slice(0, 2)).toEqual([
      { id: 'story', type: 'episode', title: 'Story', href: '/uk/course/course-id/episode/en/story' },
      { id: 'review', type: 'assessment', title: 'Not implemented' },
    ]);
    expect(flattenCourseTopics(topics).map(item => item.type)).toEqual(['episode', 'lesson', 'lesson']);
  });

  it('rejects unsafe malformed URLs instead of silently translating UUIDs or placement queries', () => {
    expect(parseCoursePlacement(['laboratory', 'fundamentals', 'reflection'])).toBe('laboratory/fundamentals/reflection');
    for (const path of [[], ['..'], ['constructor'], ['a%2Fb'], ['a', ''], ['a?placement=x']]) {
      expect(parseCoursePlacement(path)).toBeNull();
    }
    expect(() => coursePlacementHref('id', 'uk', 'en', 'lesson', '../lesson')).toThrow('Unsafe');
  });
});
