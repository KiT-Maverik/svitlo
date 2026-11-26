import 'server-only';

import { join } from 'node:path';

import { DEFAULT_SUPPORTED_LANGUAGES, resolveEntityPath, type LanguageCode } from '@svitlo/engine/runtime';

import { coursePropsToTopics } from './courseNavigation';
import { toCoursePreview } from './coursePreview';
import { loadCourseLessonTitles, loadCourseTree } from './courseResources';

/** Only an absent *requested base* is a missing Course; malformed publications must fail visibly. */
function missingRequestedBase(error: unknown, courseId: string): boolean {
  if (!(error instanceof Error)) return false;
  const base = join(process.cwd(), 'public/data/courses', courseId, 'base.json');
  const cause = (error as Error & { cause?: NodeJS.ErrnoException }).cause;
  return error.message === 'Cannot read published resource: ' + base && cause?.code === 'ENOENT';
}

/**
 * Direct UUID-addressed detail loading. Unlike the listing route, it never enumerates
 * other Courses. Keep the assembled Course for both the preview and navigation.
 */
export async function loadCourseDetail(courseId: string, language: string) {
  const interfaceLocale = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  if (!interfaceLocale) return null;

  let id: string;
  try {
    id = resolveEntityPath(courseId).split('/')[1];
  } catch {
    return null;
  }

  let published;
  try {
    published = await loadCourseTree(id, interfaceLocale.language);
  } catch (error) {
    if (missingRequestedBase(error, id)) return null;
    throw error;
  }

  const titles = await loadCourseLessonTitles(published, interfaceLocale.language);
  return {
    course: toCoursePreview(published),
    outline: coursePropsToTopics(published, interfaceLocale.language, interfaceLocale.language, titles),
    interfaceLanguage: interfaceLocale.language as LanguageCode,
  };
}
