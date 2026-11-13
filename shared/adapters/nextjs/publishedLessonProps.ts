import { readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  assembleLessonProps,
  languageCode_Schema,
  resolveEntityPath,
  type LanguageCodes,
  type Lesson_Props,
  type LessonPropsFragment,
  type PublishedLessonPropsOverride,
  type PublishedLessonPropsResource,
} from '@svitlo/engine/runtime';

export type LoadPublishedLessonPropsOptions = {
  /** Folder containing the 0-f/UUID Lesson directory hierarchy. */
  rootDirectory: string;
  id: string;
  language: LanguageCodes;
  override?: PublishedLessonPropsOverride;
};

async function readPublishedJson(filename: string, required: boolean): Promise<unknown | undefined> {
  let contents: string;
  try {
    contents = await readFile(filename, 'utf8');
  } catch (error) {
    if (!required && (error as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
    throw new Error('Unable to read published Lesson file: ' + filename, { cause: error });
  }

  try {
    return JSON.parse(contents) as unknown;
  } catch (error) {
    throw new Error('Malformed published Lesson JSON: ' + filename, { cause: error });
  }
}

/**
 * Node/Next.js filesystem loader for the new one-base/one-file-per-locale format.
 * A host picks the collection root; the Engine owns the stable UUID bucket path
 * and the pure Props merge/validation. Only the selected locale file is read.
 */
export async function loadPublishedLessonProps({
  rootDirectory,
  id,
  language,
  override,
}: LoadPublishedLessonPropsOptions): Promise<Lesson_Props> {
  if (typeof rootDirectory !== 'string' || !rootDirectory.trim()) {
    throw new Error('A published Lesson rootDirectory is required');
  }

  const selectedLanguage = languageCode_Schema.parse(language);
  const relative = resolveEntityPath(id);
  const normalizedId = relative.split('/')[1];
  const directory = path.join(path.resolve(rootDirectory), ...relative.split('/'));
  const [base, locale] = await Promise.all([
    readPublishedJson(path.join(directory, 'base.json'), true),
    readPublishedJson(path.join(directory, selectedLanguage + '.json'), false),
  ]);

  const resource: PublishedLessonPropsResource = {
    base: base as PublishedLessonPropsResource['base'],
    ...(locale !== undefined ? { locale: { [selectedLanguage]: locale as LessonPropsFragment } } : {}),
  };
  const result = assembleLessonProps(resource, selectedLanguage, override);
  if (result.id.toLowerCase() !== normalizedId) {
    throw new Error('Published Lesson ID does not match the requested folder: ' + normalizedId);
  }
  return result;
}
