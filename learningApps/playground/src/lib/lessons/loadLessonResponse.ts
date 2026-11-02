import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { LanguageCode } from '@svitlo/engine/localization';
import { assembleLessonResponse } from './assembleLessonResponse';

const validSegment = /^[a-zA-Z0-9_-]+$/;

/** Local published files are the sole runtime source; authored TS is never loaded here. */
export async function loadLessonResponse(group: string, slug: string, language: LanguageCode) {
  if (![group, slug, language].every(segment => validSegment.test(segment))) {
    throw new Error('Invalid lesson resource identifier: ' + group + '/' + slug + '/' + language);
  }
  const root = path.join(process.cwd(), 'public', 'data', 'pages', 'lessons', group, slug);
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
  return assembleLessonResponse(group, slug, language, { config, flashcards, questions });
}
