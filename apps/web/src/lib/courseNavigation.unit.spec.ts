import { describe, expect, it } from 'vitest';

import { coursePropsToTopics, flattenCourseTopics } from './courseNavigation';
import type { LocalizedCourse } from './courseResources';

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

it('links a nested Assessment from the Course outline and activity navigation', () => {
  const withAssessment = structuredClone(course);
  const chapter = withAssessment.content.items.laboratory;
  if (chapter.type !== 'module' && chapter.type !== 'chapter') throw Error('Expected Course module fixture');
  const fundamentals = chapter.content.items.fundamentals;
  if (fundamentals.type !== 'module' && fundamentals.type !== 'chapter') throw Error('Expected Course chapter fixture');
  fundamentals.content.items.finalReview = {
    id: '11111111-1111-4111-8111-111111111119',
    slug: 'finalReview',
    type: 'assessment',
    params: { languages: ['uk'] },
    locale: { title: 'Підсумкова перевірка' },
    section: [],
  };
  fundamentals.content.order.push('finalReview');
  const outline = coursePropsToTopics(withAssessment, 'uk', 'uk', titles);
  const nested = outline[0]?.children?.[0]?.children;
  expect(nested?.[1]).toEqual({
    id: '11111111-1111-4111-8111-111111111119',
    type: 'assessment',
    title: 'Підсумкова перевірка',
    href: '/uk/course/course-id/assessment/uk/11111111-1111-4111-8111-111111111119',
  });
  expect(flattenCourseTopics(outline).map(item => item.type)).toEqual(['lesson', 'assessment', 'lesson']);
});

it('shows a reserved Lesson as Not implemented without loading a standalone title', () => {
  const preview = structuredClone(course);
  const laboratory = preview.content.items.laboratory;
  if (laboratory.type !== 'module') throw Error('Expected Module');
  const fundamentals = laboratory.content.items.fundamentals;
  if (fundamentals.type !== 'chapter') throw Error('Expected Chapter');
  const pending = fundamentals.content.items.reflection;
  Object.assign(pending, {
    slug: 'reflection',
    draft: true,
    locale: { title: 'Not implemented' },
    section: [],
  });
  const outline = coursePropsToTopics(preview, 'uk', 'en', { 'lesson-2': 'Refraction' });
  const placeholder = outline[0]?.children?.[0]?.children?.[0];
  expect(placeholder).toMatchObject({ type: 'lesson', title: 'Not implemented' });
  expect(placeholder?.href).toBeUndefined();
  const playable = flattenCourseTopics(outline);
  expect(playable.map(item => item.title)).toEqual(['Refraction']);
  expect(playable[0]?.href).toBe('/uk/course/course-id/lesson/en/lesson-2');
});

it('shows unfinished Episodes and Assessments in the outline without broken navigation links', () => {
  const preview = structuredClone(course);
  preview.content.items.story = {
    id: 'episode-stub',
    slug: 'story',
    type: 'episode',
    params: { languages: ['en'] },
    locale: { title: 'Not implemented' },
    section: [],
  };
  preview.content.items.review = {
    id: 'assessment-stub',
    slug: 'review',
    type: 'assessment',
    params: { languages: ['en'] },
    locale: { title: 'Not implemented' },
    section: [],
  };
  Object.assign(preview.content.items.story, { draft: true });
  Object.assign(preview.content.items.review, { draft: true });
  preview.content.order.unshift('story', 'review');

  const outline = coursePropsToTopics(preview, 'uk', 'en', titles);
  expect(outline.slice(0, 2)).toEqual([
    { id: 'episode-stub', type: 'episode', title: 'Not implemented' },
    { id: 'assessment-stub', type: 'assessment', title: 'Not implemented' },
  ]);
  expect(flattenCourseTopics(outline).map(item => item.type)).toEqual(['lesson', 'lesson']);
});
