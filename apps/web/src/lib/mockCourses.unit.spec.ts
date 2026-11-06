import { describe, expect, it } from 'vitest';
import { getMockCourse, getMockCourses, getMockCourseMessages, mockCourseOutline, PLAYGROUND_COURSE_ID } from './mockCourses';

describe('temporary course catalog adapters', () => {
  it('exposes distinct courses and preserves published Playground lesson URLs', () => {
    const courses = getMockCourses('uk');
    expect(courses.map(({ preview }) => preview.id)).toHaveLength(3);
    expect(new Set(courses.map(({ preview }) => preview.id)).size).toBe(3);
    const published = getMockCourse(PLAYGROUND_COURSE_ID, 'uk');
    expect(published).toBeDefined();
    if (!published) return;
    const module = mockCourseOutline(published, 'uk')[0];
    expect(module.type).toBe('module');
    const chapter = module.children?.[0];
    expect(chapter?.type).toBe('chapter');
    expect(chapter?.children?.some(item => item.type === 'episode' && item.href?.includes('/episode/'))).toBe(true);
    expect(chapter?.children?.some(item => item.type === 'lesson' && item.href?.includes('/lesson/'))).toBe(true);
  });

  it('does not link to lessons that have not been published', () => {
    const unpublished = getMockCourses('en').find(({ published }) => !published);
    expect(unpublished).toBeDefined();
    if (!unpublished) return;
    const all = (nodes: ReturnType<typeof mockCourseOutline>): boolean =>
      nodes.every(node => !node.href && all(node.children ?? []));
    expect(all(mockCourseOutline(unpublished, 'en'))).toBe(true);
  });

  it('provides Ukrainian/English demo copy and handles unknown IDs', () => {
    expect(getMockCourseMessages('uk').catalogTitle).not.toBe(getMockCourseMessages('en').catalogTitle);
    expect(getMockCourseMessages('pl')).toEqual(getMockCourseMessages('en'));
    expect(getMockCourse('does-not-exist', 'uk')).toBeUndefined();
  });
});
