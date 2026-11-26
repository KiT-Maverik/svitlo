import 'server-only';

import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';

import { coursePropsToTopics } from './courseNavigation';
import { toCoursePreview } from './coursePreview';
import { loadCourseLessonTitles, loadExistingCourseWithFallback } from './courseResources';

/**
 * Direct UUID-addressed detail loading. Unlike the listing route, it never enumerates
 * other Courses. Keep the assembled Course for both the preview and navigation.
 */
export async function loadCourseDetail(courseId: string, language: string) {
  const interfaceLocale = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  if (!interfaceLocale) return null;

  const detail = await loadExistingCourseWithFallback(courseId, interfaceLocale.language);
  if (!detail) return null;
  const { course: published, contentLanguage } = detail;

  const titles = await loadCourseLessonTitles(published, contentLanguage);
  return {
    course: toCoursePreview(published),
    outline: coursePropsToTopics(published, interfaceLocale.language, contentLanguage, titles),
    interfaceLanguage: interfaceLocale.language,
    contentLanguage,
  };
}
