import 'server-only';

import { join } from 'node:path';

import {
  CourseLanguageUnavailableError,
  loadPublishedCourseToc,
  loadPublishedCourseTree,
  loadPublishedCourseTreeWithFallback,
  PublishedResourceError,
} from '@svitlo/adapter-nextjs';
import { courseActivities, resolveEntityPath, type LanguageCode, type LocalizedCourse } from '@svitlo/engine/runtime';

export type { LocalizedCourse, LocalizedCourseContent, LocalizedCourseNode } from '@svitlo/engine/runtime';
/** Draft-only content is available locally; production always fails closed. */
export const loadCourseTree = (id: string, language: LanguageCode) =>
  loadPublishedCourseTree(id, language, undefined, process.env.NODE_ENV === 'development' ? 'draft' : 'production');

/** Only a missing base for the requested Course is a 404. */
function missingRequestedBase(error: unknown, id: string): boolean {
  return (
    error instanceof PublishedResourceError &&
    error.code === 'missing' &&
    error.resourcePath === join(process.cwd(), 'public/data/courses', id, 'base.json')
  );
}

function canonicalCourseId(id: string): string | null {
  try {
    return resolveEntityPath(id).split('/')[1];
  } catch {
    return null;
  }
}

/** Direct activity routes preserve their explicit content language. */
export async function loadExistingCourseTree(id: string, language: LanguageCode): Promise<LocalizedCourse | null> {
  const courseId = canonicalCourseId(id);
  if (!courseId) return null;
  try {
    return await loadCourseTree(courseId, language);
  } catch (error) {
    if (missingRequestedBase(error, courseId) || error instanceof CourseLanguageUnavailableError) return null;
    throw error;
  }
}

/** Course overview retains the interface locale while selecting an available content locale. */
export async function loadExistingCourseWithFallback(
  id: string,
  language: LanguageCode,
): Promise<{ course: LocalizedCourse; contentLanguage: LanguageCode } | null> {
  const courseId = canonicalCourseId(id);
  if (!courseId) return null;
  try {
    return await loadPublishedCourseTreeWithFallback(
      courseId,
      language,
      undefined,
      process.env.NODE_ENV === 'development' ? 'draft' : 'production',
    );
  } catch (error) {
    if (missingRequestedBase(error, courseId)) return null;
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
/** Read only the derived TOC, using the same strict draft gate as Course Props. */
export const loadCourseToc = (id: string, language: LanguageCode) =>
  loadPublishedCourseToc(id, language, undefined, process.env.NODE_ENV === 'development' ? 'draft' : 'production');
