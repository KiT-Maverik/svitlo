import {
  assembleLessonProps,
  languageCode_Schema,
  resolveEntityPath,
  getLanguageCode,
  type Lesson_Props,
  type PublishedLessonPropsResource,
  type LessonPropsFragment,
} from '@svitlo/engine';
import type { LanguageCode, Locale } from '@svitlo/contracts/localization';
import type { UiKitMessages } from '@svitlo/ui-kit';

/** Local build assets only; no server components, remote URLs or authored-data imports. */
export async function fetchLocalJson(path: string, optional = false): Promise<unknown | undefined> {
  const response = await fetch(path, { cache: 'default' });
  if (optional && response.status === 404) return undefined;
  if (!response.ok) throw new Error('Bundled resource unavailable (' + response.status + '): ' + path);
  return response.json() as Promise<unknown>;
}

/** Resolve one published Lesson Props resource for the selected language. */
export async function loadLesson(id: string, language: LanguageCode): Promise<Lesson_Props> {
  const selected = languageCode_Schema.parse(language);
  const location = resolveEntityPath(id);
  const basePath = '/data/lessons/' + location;
  const [base, localized] = await Promise.all([
    fetchLocalJson(basePath + '/base.json'),
    fetchLocalJson(basePath + '/' + selected + '.json', true),
  ]);
  const resource: PublishedLessonPropsResource = {
    base: base as PublishedLessonPropsResource['base'],
    ...(localized === undefined ? {} : { locale: { [selected]: localized as LessonPropsFragment } }),
  };
  const result = assembleLessonProps(resource, selected);
  if (result.id !== location.split('/')[1]) throw new Error('Published Lesson ID mismatch: ' + id);
  return result;
}

export async function loadMessages(locale: Locale): Promise<UiKitMessages> {
  return fetchLocalJson('/data/uiKit/components/' + getLanguageCode(locale) + '.json') as Promise<UiKitMessages>;
}

export type LessonIndex = {
  textbook: string;
  lessons: { id: string; title: string; languages: LanguageCode[] }[];
};

export async function loadLessonIndex(): Promise<LessonIndex> {
  return fetchLocalJson('/data/lesson-index.json') as Promise<LessonIndex>;
}
