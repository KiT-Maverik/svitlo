import { describe, expect, it } from 'vitest';
import { getCourseMessages } from './courseMessages';
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
