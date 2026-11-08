import { resolveEntityPath, assembleLessonResponse, mergeLessonResources, type LessonResponse } from '@svitlo/engine';
import type { LanguageCode, Locale } from '@svitlo/contracts/localization';

/** Fetch only build-published lesson data. No Node, Electron or authored *.data.ts at runtime. */
async function loadJson(url: string): Promise<unknown> {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Missing packaged textbook resource: ' + url + ' (' + response.status + ')');
  return response.json() as Promise<unknown>;
}

export async function loadPublishedLesson(id: string, language: LanguageCode): Promise<LessonResponse> {
  if (!/^[a-z]{2}$/.test(language)) throw new Error('Unsupported lesson language');
  const location = resolveEntityPath(id);
  const base = '/data/pages/lessons/' + location;
  const [config, flashcards, questions] = await Promise.all(
    (['config', 'flashcards', 'questions'] as const).map(async kind => {
      const directory = base + '/' + kind + '/';
      const [invariant, localized] = await Promise.all([
        loadJson(directory + 'base.json'),
        loadJson(directory + language + '.json'),
      ]);
      return mergeLessonResources(invariant, localized);
    }),
  );
  return assembleLessonResponse(id, language, { config, flashcards, questions });
}

export async function loadPublishedUiKitMessages<T>(locale: Locale): Promise<T> {
  if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(locale)) throw new Error('Unsupported locale');
  return (await loadJson('/data/ui-kit/' + locale + '.json')) as T;
}
