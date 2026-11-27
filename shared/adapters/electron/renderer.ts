import {
  assembleLessonData,
  createAssessmentResourceLoader,
  getLanguageCode,
  isLocale,
  languageCode_Schema,
  resolveEntityPath,
  type LanguageCode,
  type Lesson_Data,
  type LessonDataFragment,
  type Locale,
  type PublishedLessonDataResource,
} from '@svitlo/engine/runtime';

/** Fetch only build-published Lesson Props. No Node, Electron or authored *.data.ts at runtime. */
async function loadJson(url: string, optional = false): Promise<unknown | undefined> {
  const response = await fetch(url);
  if (optional && response.status === 404) return undefined;
  if (!response.ok) throw new Error('Missing packaged textbook resource: ' + url + ' (' + response.status + ')');
  return response.json() as Promise<unknown>;
}

export async function loadPublishedLesson(id: string, language: LanguageCode): Promise<Lesson_Data> {
  const selected = languageCode_Schema.parse(language);
  const location = resolveEntityPath(id);
  const directory = '/data/lessons/' + location;
  const [base, localized] = await Promise.all([
    loadJson(directory + '/base.json'),
    loadJson(directory + '/' + selected + '.json', true),
  ]);
  const resource: PublishedLessonDataResource = {
    base: base as PublishedLessonDataResource['base'],
    ...(localized === undefined ? {} : { locale: { [selected]: localized as LessonDataFragment } }),
  };
  const lesson = assembleLessonData(resource, selected);
  if (lesson.id !== location.split('/')[1]) throw new Error('Published Lesson ID mismatch: ' + id);
  return lesson;
}

export async function loadPublishedUiKitMessages<T>(locale: Locale): Promise<T> {
  if (!isLocale(locale)) throw new Error('Unsupported locale');
  return (await loadJson('/data/uiKit/components/' + getLanguageCode(locale) + '.json')) as T;
}

/** Load only Engine-addressed, locally packaged assessment JSON, never remote resources. */
export const packagedAssessmentLoader = createAssessmentResourceLoader(async (paths, signal) => {
  const results = new Map<string, unknown>();
  await Promise.all(
    paths.map(async path => {
      const response = await fetch('/' + path, { signal });
      if (response.status === 404) return;
      if (!response.ok) {
        throw new Error('Missing packaged assessment resource: ' + path + ' (' + response.status + ')');
      }
      results.set(path, await response.json());
    }),
  );
  return results;
});
