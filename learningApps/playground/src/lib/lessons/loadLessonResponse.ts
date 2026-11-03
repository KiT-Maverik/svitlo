import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { LanguageCode } from '@svitlo/engine/localization';
import { resolveEntityPath } from '@svitlo/engine';
import { assembleLessonResponse } from './assembleLessonResponse';

/** Local published files are the sole runtime source; authored TS is never loaded here. */
export async function loadLessonResponse(id: string, language: LanguageCode) {
  if (!/^[a-z]{2}$/.test(language)) throw new Error('Invalid lesson locale');
  const relativePath = resolveEntityPath(id);
  const root = path.join(process.cwd(), 'public', 'data', 'pages', 'lessons', ...relativePath.split('/'));
  const kinds = ['config', 'flashcards', 'questions'] as const;
  const [config, flashcards, questions] = await Promise.all(kinds.map(async kind => {
    const filename = path.join(root, kind, language + '.json');
    let source: string;
    try {
      source = await readFile(filename, 'utf8');
    } catch (error) {
      throw new Error('Missing published lesson resource ' + filename +
        '. Run the lessons generator for this textbook before dev/build.', { cause: error });
    }
    try {
      return JSON.parse(source) as unknown;
    } catch (error) {
      throw new Error('Malformed published lesson JSON: ' + filename, { cause: error });
    }
  }));
  return assembleLessonResponse(id, language, { config, flashcards, questions });
}
