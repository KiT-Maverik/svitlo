import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  assembleCourseLesson,
  resolveEntityPath,
  languageCode_Schema,
  type LanguageCode,
  type Lesson_Props,
  type PublishedLessonPropsResource,
  type PublishedCoursePropsFiles,
} from '@svitlo/engine/runtime';

/** Host-owned publication roots. The generator can choose different directories. */
export type CourseLessonPublicationRoots = {
  lessonsRoot?: string;
  coursesRoot?: string;
};

async function readPublishedJson(filename: string, optional: boolean): Promise<unknown | undefined> {
  let source: string;
  try {
    source = await readFile(filename, 'utf8');
  } catch (error) {
    if (optional && (error as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
    throw new Error('Cannot read published resource: ' + filename, { cause: error });
  }
  try {
    return JSON.parse(source) as unknown;
  } catch (error) {
    throw new Error('Invalid published JSON: ' + filename, { cause: error });
  }
}

async function readPublication(directory: string, language: LanguageCode) {
  const [base, localized] = await Promise.all([
    readPublishedJson(path.join(directory, 'base.json'), false),
    readPublishedJson(path.join(directory, language + '.json'), true),
  ]);
  return { base, locale: localized === undefined ? undefined : { [language]: localized } };
}

/**
 * Next.js filesystem loader for Build-shaped Lesson and Course publications.
 *
 * Lessons use <last-UUID-digit>/<UUID> directories; Courses use <course-UUID>.
 * Both contain base.json and optional <language>.json files. The Course file contains a hierarchy of
 * full Course/Module/Chapter Props and sparse Lesson overrides.
 *
 */
export async function loadPublishedCourseLessonProps(
  courseId: string,
  lessonId: string,
  language: LanguageCode,
  roots: CourseLessonPublicationRoots = {},
): Promise<Lesson_Props> {
  const selectedLanguage = languageCode_Schema.parse(language);
  const lessonsRoot = roots.lessonsRoot ?? path.join(process.cwd(), 'public/data/lessons');
  const coursesRoot = roots.coursesRoot ?? path.join(process.cwd(), 'public/data/courses');
  const lessonDirectory = path.join(lessonsRoot, ...resolveEntityPath(lessonId).split('/'));
  const courseDirectory = path.join(coursesRoot, resolveEntityPath(courseId).split('/')[1]);

  const [lesson, course] = await Promise.all([
    readPublication(lessonDirectory, selectedLanguage),
    readPublication(courseDirectory, selectedLanguage),
  ]);
  return assembleCourseLesson({
    courseId,
    lessonId,
    language: selectedLanguage,
    lesson: lesson as unknown as PublishedLessonPropsResource,
    course: course as unknown as PublishedCoursePropsFiles,
  });
}
