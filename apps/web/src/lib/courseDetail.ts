import 'server-only';

import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';

import { coursePropsToTopics } from './courseNavigation';
import { toCoursePreview } from './coursePreview';
import { loadCourseLessonTitles, loadExistingCourseTree } from './courseResources';

/**
 * Direct UUID-addressed detail loading. Unlike the listing route, it never enumerates
 * other Courses. Keep the assembled Course for both the preview and navigation.
 */
export async function loadCourseDetail(courseId: string, language: string) {
  const interfaceLocale = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  if (!interfaceLocale) return null;

  const published = await loadExistingCourseTree(courseId, interfaceLocale.language);
  if (!published) return null;

  const titles = await loadCourseLessonTitles(published, interfaceLocale.language);
  return {
    course: toCoursePreview(published),
    outline: coursePropsToTopics(published, interfaceLocale.language, interfaceLocale.language, titles),
    interfaceLanguage: interfaceLocale.language,
  };
}
