import {
  resolveEntityPath,
  assembleLessonProps,
  languageCode_Schema,
  getLanguageCode,
  isLocale,
  type Lesson_Props,
  type PublishedLessonPropsResource,
  type LessonPropsFragment,
} from '@svitlo/engine';
import type { LanguageCode, Locale } from '@svitlo/contracts/localization';

/** Fetch only build-published Lesson Props. No Node, Electron or authored *.data.ts at runtime. */
async function loadJson(url: string, optional = false): Promise<unknown | undefined> {
  const response = await fetch(url);
  if (optional && response.status === 404) return undefined;
  if (!response.ok) throw new Error('Missing packaged textbook resource: ' + url + ' (' + response.status + ')');
  return response.json() as Promise<unknown>;
}

export async function loadPublishedLesson(id: string, language: LanguageCode): Promise<Lesson_Props> {
  const selected = languageCode_Schema.parse(language);
  const location = resolveEntityPath(id);
  const directory = '/data/lessons/' + location;
  const [base, localized] = await Promise.all([
    loadJson(directory + '/base.json'),
    loadJson(directory + '/' + selected + '.json', true),
  ]);
  const resource: PublishedLessonPropsResource = {
    base: base as PublishedLessonPropsResource['base'],
    ...(localized === undefined ? {} : { locale: { [selected]: localized as LessonPropsFragment } }),
  };
  const lesson = assembleLessonProps(resource, selected);
  if (lesson.id !== location.split('/')[1]) throw new Error('Published Lesson ID mismatch: ' + id);
  return lesson;
}

export async function loadPublishedUiKitMessages<T>(locale: Locale): Promise<T> {
  if (!isLocale(locale)) throw new Error('Unsupported locale');
  return (await loadJson('/data/uiKit/components/' + getLanguageCode(locale) + '.json')) as T;
}
