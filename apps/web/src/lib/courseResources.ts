import 'server-only';

import { join } from 'node:path';

import { loadPublishedCourseLessonProps, loadPublishedCourseTree } from '@svitlo/adapter-nextjs';
import { courseActivities, resolveEntityPath, type LanguageCode, type LocalizedCourse } from '@svitlo/engine/runtime';

export type { LocalizedCourse, LocalizedCourseContent, LocalizedCourseNode } from '@svitlo/engine/runtime';
/** Draft-only content is available locally; production always fails closed. */
export const loadCourseTree = (id: string, language: LanguageCode) =>
  loadPublishedCourseTree(id, language, undefined, process.env.NODE_ENV === 'development' ? 'draft' : 'production');

/**
 * Direct-route publication access. A malformed UUID or missing requested Course
 * base is a 404; a damaged or inaccessible published resource is not.
 */
export async function loadExistingCourseTree(id: string, language: LanguageCode): Promise<LocalizedCourse | null> {
  let courseId: string;
  try {
    courseId = resolveEntityPath(id).split('/')[1];
  } catch {
    return null;
  }
  try {
    return await loadCourseTree(courseId, language);
  } catch (error) {
    const expectedBase = join(process.cwd(), 'public/data/courses', courseId, 'base.json');
    const cause = error instanceof Error ? (error as Error & { cause?: NodeJS.ErrnoException }).cause : undefined;
    if (error instanceof Error && error.message === 'Course does not support language ' + language) return null;
    if (
      error instanceof Error &&
      error.message === 'Cannot read published resource: ' + expectedBase &&
      cause?.code === 'ENOENT'
    )
      return null;
    throw error;
  }
}

export function courseHasLesson(course: LocalizedCourse, id: string): boolean {
  return courseActivities(course).some(({ node }) => node.type === 'lesson' && node.id === id);
}
export function courseLessonIds(course: LocalizedCourse): string[] {
  return courseActivities(course)
    .filter(({ node }) => node.type === 'lesson' && !('draft' in node && node.draft === true))
    .map(({ node }) => node.id);
}
export async function loadCourseLessonTitles(course: LocalizedCourse, language: LanguageCode) {
  const pairs = await Promise.all(
    courseActivities(course)
      .filter(({ node }) => node.type === 'lesson' && !('draft' in node && node.draft === true))
      .map(async ({ node, placement }) => {
        const lesson = await loadPublishedCourseLessonProps(course.id, node.id, language, { placement });
        return { id: node.id, placement, title: lesson.locale.title };
      }),
  );
  return Object.fromEntries(
    pairs.flatMap(({ id, placement, title }) => [
      [id, title],
      ['placement:' + placement, title],
    ]),
  ) as Record<string, string>;
}
