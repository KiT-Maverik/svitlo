import { describe, expect, it } from 'vitest';

import { getCourseLanguageFallbackNotice, getCourseMessages } from './courseMessages';
import { toCoursePreview } from './coursePreview';
import type { LocalizedCourse } from './courseResources';

const lesson = '11111111-1111-4111-8111-11111111111c';
const course = {
  id: '11111111-1111-4111-8111-111111111113',
  type: 'course',
  params: { languages: ['uk', 'en'] },
  locale: { title: 'Controlled title', description: 'Controlled description' },
  content: {
    order: ['module'],
    items: {
      module: {
        type: 'module',
        id: '11111111-1111-4111-8111-111111111118',
        locale: { title: 'Controlled module' },
        content: { order: ['lesson'], items: { lesson: { type: 'lesson', id: lesson } } },
      },
    },
  },
} as LocalizedCourse;

describe('published course presentation', () => {
  it('derives previews only from published Props, not demo textbooks', () => {
    expect(toCoursePreview(course)).toMatchObject({
      id: course.id,
      title: 'Controlled title',
      description: 'Controlled description',
      lessons: 1,
      modules: 1,
      languages: ['uk', 'en'],
    });
  });
  it('keeps host presentation language independent from educational data', () => {
    expect(getCourseMessages('uk').catalogTitle).not.toBe(getCourseMessages('en').catalogTitle);
    expect(getCourseMessages('pl')).toEqual(getCourseMessages('en'));
  });
});

it('does not count a Course-owned Assessment as a Lesson or Module', () => {
  const withAssessment = structuredClone(course);
  const courseModule = withAssessment.content.items.module;
  if (courseModule.type !== 'module' && courseModule.type !== 'chapter') throw Error('Expected Module fixture');
  courseModule.content.items.review = {
    id: '11111111-1111-4111-8111-111111111119',
    type: 'assessment',
    slug: 'review',
    params: { languages: ['uk'] },
    locale: { title: 'Review' },
    section: [],
  };
  courseModule.content.order.push('review');
  expect(toCoursePreview(withAssessment)).toMatchObject({ lessons: 1, modules: 1 });
});

it('localizes an accessible Course fallback explanation with both language names', () => {
  expect(getCourseLanguageFallbackNotice('uk', 'uk', 'en')).toContain('англійськ');
  expect(getCourseLanguageFallbackNotice('en', 'pl', 'uk')).toContain('Showing the available');
  expect(getCourseLanguageFallbackNotice('en', 'pl', 'uk')).toContain('Ukrainian');
});
