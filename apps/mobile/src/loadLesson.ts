import { resolveEntityPath } from '@svitlo/engine';
import { assembleLessonResponse, type LessonResponse } from '@svitlo/engine/lesson';
import type { LanguageCode, Locale } from '@svitlo/engine/localization';
import type { UiKit_Global } from '@svitlo/ui-kit';

/** Local build assets only; no server components, remote URLs or authored-data imports. */
export async function fetchLocalJson(path: string): Promise<unknown> {
  const response = await fetch(path, { cache: 'default' });
  if (!response.ok) throw new Error('Bundled resource unavailable (' + response.status + '): ' + path);
  return response.json() as Promise<unknown>;
}

export async function loadLesson(id: string, language: LanguageCode): Promise<LessonResponse> {
  const base = '/data/pages/lessons/' + resolveEntityPath(id);
  const [config, flashcards, questions] = await Promise.all(
    (['config', 'flashcards', 'questions'] as const).map(kind =>
      fetchLocalJson(base + '/' + kind + '/' + language + '.json')
    )
  );
  return assembleLessonResponse(id, language, { config, flashcards, questions });
}

export async function loadMessages(locale: Locale): Promise<UiKit_Global<'response'>> {
  return fetchLocalJson('/data/ui-kit/' + locale + '.json') as Promise<UiKit_Global<'response'>>;
}

export type LessonIndex = {
  textbook: string;
  lessons: { id: string; title: string; languages: LanguageCode[] }[];
};

export async function loadLessonIndex(): Promise<LessonIndex> {
  return fetchLocalJson('/data/lesson-index.json') as Promise<LessonIndex>;
}
