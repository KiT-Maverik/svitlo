import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { resolveEntityPath } from '@svitlo/engine';
import { assembleLessonResponse, mergeLessonResources, type LessonResponse } from '@svitlo/engine/lesson';
import type { LanguageCode } from '@svitlo/engine/localization';

/**
 * Read the invariant base and selected-language sparse patch from the standalone
 * textbook's public folder. This is server-only; authored TS is never imported.
 *
 * Each textbook runs the existing lessons generator before dev/build and can
 * override this loader in createLessonPage when using another data source.
 */
export async function loadPublishedLesson(id: string, language: LanguageCode): Promise<LessonResponse> {
  if (!/^[a-z]{2}$/.test(language)) throw new Error('Invalid lesson locale');
  const relativePath = resolveEntityPath(id);
  const directory = path.join(process.cwd(), 'public', 'data', 'pages', 'lessons', ...relativePath.split('/'));
  const kinds = ['config', 'flashcards', 'questions'] as const;
  const [config, flashcards, questions] = await Promise.all(
    kinds.map(async kind => {
      const [base, localized] = await Promise.all(
        (['base', language] as const).map(async name => {
          const filename = path.join(directory, kind, name + '.json');
          let source: string;
          try {
            source = await readFile(filename, 'utf8');
          } catch (error) {
            throw new Error(
              'Missing published lesson resource ' + filename +
                '. Run the lessons generator for this textbook before dev/build.',
              { cause: error },
            );
          }
          try {
            return JSON.parse(source) as unknown;
          } catch (error) {
            throw new Error('Malformed published lesson JSON: ' + filename, { cause: error });
          }
        }),
      );
      return mergeLessonResources(base, localized);
    }),
  );
  return assembleLessonResponse(id, language, { config, flashcards, questions });
}
