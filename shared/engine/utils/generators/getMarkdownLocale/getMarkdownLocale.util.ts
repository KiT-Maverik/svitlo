import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SUPPORTED_LANGUAGES, type LanguageCode } from '../../../types/languages';

const defaultLanguageCodes = DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => language);
type DefaultLanguageCode = (typeof DEFAULT_SUPPORTED_LANGUAGES)[number]['language'];

export function getMarkdownLocale(directory: string | URL): Record<DefaultLanguageCode, string>;
export function getMarkdownLocale<const T extends LanguageCode>(
  directory: string | URL,
  languages: readonly T[],
): Record<T, string>;
export function getMarkdownLocale(
  directory: string | URL,
  languages: readonly LanguageCode[] = defaultLanguageCodes,
): Record<LanguageCode, string> {
  const absoluteDirectory = directory instanceof URL ? fileURLToPath(directory) : resolve(directory);
  const locale = {} as Record<LanguageCode, string>;

  for (const language of languages) {
    const file = resolve(absoluteDirectory, `${language}.md`);
    let content: string;

    try {
      content = readFileSync(file, 'utf8');
    } catch (error) {
      throw new Error(`Missing Markdown locale file: ${file}`, { cause: error });
    }

    if (!content.trim()) {
      throw new Error(`Empty Markdown locale file: ${file}`);
    }

    locale[language] = content;
  }

  return locale;
}
