import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  assembleCourseLesson,
  assembleCourseToc,
  assembleCourseTree,
  languageCode_Schema,
  resolveEntityPath,
  type CourseToc,
  type LanguageCode,
  type Lesson_Data,
  type LocalizedCourse,
  type PublishedCourseDataFiles,
  type PublishedLessonDataResource,
} from '@svitlo/engine/runtime';

export class PublishedResourceError extends Error {
  readonly code: 'missing' | 'read-failed' | 'invalid-json';
  readonly resourcePath: string;

  constructor(code: 'missing' | 'read-failed' | 'invalid-json', resourcePath: string, cause: unknown) {
    const message =
      code === 'invalid-json'
        ? 'Invalid published JSON: ' + resourcePath
        : 'Cannot read published resource: ' + resourcePath;
    super(message, { cause });
    this.name = 'PublishedResourceError';
    this.code = code;
    this.resourcePath = resourcePath;
  }
}

/** A valid Course exists, but it does not declare the requested language. */
export class CourseLanguageUnavailableError extends Error {
  readonly code = 'course-language-unavailable';
  constructor(
    readonly courseId: string,
    readonly language: LanguageCode,
  ) {
    super('Course does not support language ' + language);
    this.name = 'CourseLanguageUnavailableError';
  }
}

const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

function courseLanguages(base: unknown, id: string): LanguageCode[] {
  if (!record(base) || base.id !== id || base.type !== 'course')
    throw new Error('Published Course identity mismatch: ' + id);
  if (!record(base.params) || !Array.isArray(base.params.languages))
    throw new Error('Invalid published Course languages: ' + id);
  const languages: LanguageCode[] = [];
  for (const language of base.params.languages) languages.push(languageCode_Schema.parse(language));
  if (languages.length === 0 || new Set(languages).size !== languages.length)
    throw new Error('Invalid published Course languages: ' + id);
  return languages;
}

/** Host-owned publication roots. The generator can choose different directories. */
export type CourseLessonPublicationRoots = {
  lessonsRoot?: string;
  coursesRoot?: string;
  placement?: string;
};

async function readPublishedJson(filename: string, optional: boolean): Promise<unknown | undefined> {
  let source: string;
  try {
    source = await readFile(filename, 'utf8');
  } catch (error) {
    if (optional && (error as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
    throw new PublishedResourceError(
      (error as NodeJS.ErrnoException).code === 'ENOENT' ? 'missing' : 'read-failed',
      filename,
      error,
    );
  }
  try {
    return JSON.parse(source) as unknown;
  } catch (error) {
    throw new PublishedResourceError('invalid-json', filename, error);
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
): Promise<Lesson_Data> {
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
    placement: roots.placement,
    language: selectedLanguage,
    lesson: lesson as unknown as PublishedLessonDataResource,
    course: course as unknown as PublishedCourseDataFiles,
  });
}

/** Load the actual localized Course resource, including Course-owned Episodes. */
export async function loadPublishedCourseTree(
  courseId: string,
  language: LanguageCode,
  coursesRoot = path.join(process.cwd(), 'public/data/courses'),
  mode: 'production' | 'draft' = 'production',
): Promise<LocalizedCourse> {
  const id = resolveEntityPath(courseId).split('/')[1];
  const code = languageCode_Schema.parse(language);
  const resource = await readPublication(path.join(coursesRoot, id), code);
  if (!courseLanguages(resource.base, id).includes(code)) throw new CourseLanguageUnavailableError(id, code);
  return assembleCourseTree(resource.base, resource.locale?.[code], id, code, mode);
}

/**
 * Resolve a Course detail's requested content language without catalog enumeration.
 * Published sparse locales may legitimately omit a patch; when the requested
 * language is *not declared*, prefer the first declared language with a published
 * locale file, then the first declared language as the deterministic base-only
 * fallback. Preserve declared-language errors instead of retrying another locale.
 */
export async function loadPublishedCourseTreeWithFallback(
  courseId: string,
  requestedLanguage: LanguageCode,
  coursesRoot = path.join(process.cwd(), 'public/data/courses'),
  mode: 'production' | 'draft' = 'production',
): Promise<{ course: LocalizedCourse; contentLanguage: LanguageCode }> {
  const id = resolveEntityPath(courseId).split('/')[1];
  const requested = languageCode_Schema.parse(requestedLanguage);
  const directory = path.join(coursesRoot, id);
  const base = await readPublishedJson(path.join(directory, 'base.json'), false);
  const languages = courseLanguages(base, id);
  let contentLanguage = requested;
  if (!languages.includes(requested)) {
    const entries = await readdir(directory, { withFileTypes: true });
    const localeFiles = new Set(entries.filter(entry => entry.isFile()).map(entry => entry.name));
    contentLanguage = languages.find(language => localeFiles.has(language + '.json')) ?? languages[0];
    // If a concrete locale file was selected, its disappearance is publication
    // corruption, not a reason to silently substitute unlocalized base text.
    const chosen = contentLanguage + '.json';
    const locale = await readPublishedJson(path.join(directory, chosen), !localeFiles.has(chosen));
    return { course: assembleCourseTree(base, locale, id, contentLanguage, mode), contentLanguage };
  }
  const locale = await readPublishedJson(path.join(directory, contentLanguage + '.json'), true);
  const course = assembleCourseTree(base, locale, id, contentLanguage, mode);
  return { course, contentLanguage };
}

/** Load only the derived Course navigation resource. Never load full Lesson Props for sidebar labels. */
export async function loadPublishedCourseToc(
  courseId: string,
  language: LanguageCode,
  coursesRoot = path.join(process.cwd(), 'public/data/courses'),
  mode: 'production' | 'draft' = 'production',
): Promise<CourseToc> {
  const id = resolveEntityPath(courseId).split('/')[1];
  const code = languageCode_Schema.parse(language);
  const resource = await readPublication(path.join(coursesRoot, id, 'toc'), code);
  return assembleCourseToc(resource.base, resource.locale?.[code], id, code, mode);
}
