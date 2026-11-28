import type { CourseToc, CourseTocNode, LocalizedCourse } from '@svitlo/engine/runtime';

export type CourseNavigationTopic = {
  id: string;
  title: string;
  type: 'module' | 'chapter' | 'lesson' | 'episode' | 'assessment';
  href?: string;
  children?: readonly CourseNavigationTopic[];
};

const routeKey = /^[a-z][a-zA-Z0-9]*$/;
const forbidden = new Set(['__proto__', 'constructor', 'prototype']);

/** The UI route addresses a placement, not the reusable activity UUID. */
export function coursePlacementHref(
  courseId: string,
  interfaceLanguage: string,
  contentLanguage: string,
  type: 'lesson' | 'episode' | 'assessment',
  placement: string,
): string {
  const path = placement.split('/');
  if (!path.length || path.some(key => !routeKey.test(key) || forbidden.has(key)))
    throw Error('Unsafe Course route placement');
  return (
    '/' +
    encodeURIComponent(interfaceLanguage) +
    '/course/' +
    encodeURIComponent(courseId) +
    '/' +
    type +
    '/' +
    encodeURIComponent(contentLanguage) +
    '/' +
    path.map(encodeURIComponent).join('/')
  );
}

/** Extract only a validated placement path; never reinterpret UUIDs or query strings as paths. */
export function parseCoursePlacement(path: readonly string[]): string | null {
  if (
    !Array.isArray(path) ||
    !path.length ||
    path.some(key => typeof key !== 'string' || !routeKey.test(key) || forbidden.has(key))
  )
    return null;
  return path.join('/');
}

function tocNode(value: unknown): CourseTocNode {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Invalid Course TOC node');
  const node = value as CourseTocNode;
  if (
    !['module', 'chapter', 'lesson', 'episode', 'assessment'].includes(node.type) ||
    typeof node.id !== 'string' ||
    typeof node.label !== 'string'
  )
    throw Error('Invalid localized Course TOC node');
  return node;
}

/** The published TOC is canonical Data; ordered UI arrays are assembled here only. */
export function courseTocToTopics(
  toc: CourseToc,
  interfaceLanguage: string,
  contentLanguage: string = interfaceLanguage,
): CourseNavigationTopic[] {
  function convert(node: CourseTocNode, placement: string): CourseNavigationTopic {
    if (node.type === 'module' || node.type === 'chapter') {
      return {
        id: placement,
        title: node.label,
        type: node.type,
        children: node.children.map(key => convert(tocNode(node[key]), placement + '/' + key)),
      };
    }
    return {
      id: placement,
      title: node.label,
      type: node.type,
      ...(!node.draft
        ? { href: coursePlacementHref(toc.id, interfaceLanguage, contentLanguage, node.type, placement) }
        : {}),
    };
  }
  return toc.children.map(key => convert(tocNode(toc[key]), key));
}

export function flattenCourseTopics(topics: readonly CourseNavigationTopic[]): CourseNavigationTopic[] {
  return topics.flatMap(topic => (topic.href ? [topic] : flattenCourseTopics(topic.children ?? [])));
}

function courseNode(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Invalid Course placement');
  return value as Record<string, unknown>;
}

/**
 * Prevent mixing separately published Course and TOC revisions. Their localized
 * labels may differ, but placement order, IDs, kinds and draft gates must agree.
 */
export function assertCourseTocMatchesTree(course: LocalizedCourse, toc: CourseToc): void {
  if (course.id !== toc.id || JSON.stringify(course.params.languages) !== JSON.stringify(toc.languages))
    throw new Error('Published Course/TOC identity or language mismatch');

  function verify(actual: Record<string, unknown>, derived: Record<string, unknown>, path: string): void {
    const actualOrder = actual.children;
    const tocOrder = derived.children;
    if (
      !Array.isArray(actualOrder) ||
      !Array.isArray(tocOrder) ||
      JSON.stringify(actualOrder) !== JSON.stringify(tocOrder)
    )
      throw new Error('Published Course/TOC order mismatch at ' + path);
    for (const key of actualOrder) {
      const a = courseNode(actual[key]);
      const b = courseNode(derived[key]);
      if (a.id !== b.id || a.type !== b.type || a.draft !== b.draft)
        throw new Error('Published Course/TOC placement mismatch at ' + path + '/' + key);
      if (a.type === 'module' || a.type === 'chapter') verify(a, b, path + '/' + key);
    }
  }
  verify(course, toc, course.id);
}
