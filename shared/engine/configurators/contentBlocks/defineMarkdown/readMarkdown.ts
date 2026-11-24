import { lstatSync, readFileSync } from 'node:fs';

import { languageCode_Schema, type LanguageCode } from '#schemas';

/**
 * Read a Markdown source beside a defining module. Called at authoring/build
 * time; only the returned text enters Config and published Props.
 */
function readMarkdownFile(moduleUrl: string, name: string): string {
  const file = new URL('./' + name, moduleUrl);
  try {
    if (!lstatSync(file).isFile()) {
      throw new Error('not a regular file (symlinks are not accepted)');
    }
  } catch (cause) {
    throw new Error('Missing or invalid Markdown file: ' + file.pathname, { cause });
  }
  let content: string;
  try {
    content = readFileSync(file, 'utf8');
  } catch (cause) {
    throw new Error('Unreadable Markdown file: ' + file.pathname, { cause });
  }
  if (!content.trim()) throw new Error('Empty Markdown file: ' + file.pathname);
  return content;
}

/** Without languages, read a shared `markdown.md` beside the module. */
export function readMarkdown(moduleUrl: string): string;
/** With languages, read exactly the requested `<language>.md` files beside the module. */
export function readMarkdown<const Languages extends readonly [LanguageCode, ...LanguageCode[]]>(
  moduleUrl: string,
  languages: Languages,
): Record<Languages[number], string>;
export function readMarkdown(
  moduleUrl: string,
  languages?: readonly LanguageCode[],
): string | Partial<Record<LanguageCode, string>> {
  if (languages === undefined) return readMarkdownFile(moduleUrl, 'markdown.md');
  if (!Array.isArray(languages)) throw new Error('Markdown languages must be an array');
  const requestedLanguages: readonly LanguageCode[] = languages;
  if (!requestedLanguages.length || new Set(requestedLanguages).size !== requestedLanguages.length) {
    throw new Error('Markdown languages must be a non-empty list without duplicates');
  }
  const values: Partial<Record<LanguageCode, string>> = {};
  for (const language of requestedLanguages) {
    if (!languageCode_Schema.safeParse(language).success) {
      throw new Error('Invalid Markdown language code: ' + String(language));
    }
    values[language] = readMarkdownFile(moduleUrl, language + '.md');
  }
  return values;
}
