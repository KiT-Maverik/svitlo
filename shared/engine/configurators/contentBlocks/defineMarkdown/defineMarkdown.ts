import { readFileSync, readdirSync } from 'node:fs';
import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';

import { onlyLocales, onlyStrings } from '../../_shared';

import {
  markdown_Config_Schema,
  type ContentBlock_Markdown_Config,
  type ContentBlock_Markdown_Locale,
} from './defineMarkdown.schemas';
import { validateReplacementVariables } from '../_shared';

type MarkdownFiles = { moduleUrl: string; languages: readonly LanguageCodes[] };

type MarkdownInlineConfig<Slug extends string> = Omit<ContentBlock_Markdown_Config, 'slug'> & {
  slug: Slug;
  files?: never;
};

type MarkdownFileConfig<Slug extends string> = Omit<ContentBlock_Markdown_Config, 'slug' | 'locale'> & {
  slug: Slug;
  files: MarkdownFiles;
  locale?: Omit<ContentBlock_Markdown_Locale<'config'>, 'value'>;
};

function readMarkdownFiles({ moduleUrl, languages }: MarkdownFiles): Partial<Record<LanguageCodes, string>> {
  if (!languages.length || new Set(languages).size !== languages.length) {
    throw new Error('Markdown files: languages must be a non-empty list without duplicates');
  }

  const directory = new URL('./locales/', moduleUrl);
  const expected = new Set(languages);
  const unexpected = readdirSync(directory)
    .filter(name => name.endsWith('.md') && !expected.has(name.slice(0, -3) as LanguageCodes));
  if (unexpected.length) throw new Error('Unexpected Markdown locale files: ' + unexpected.join(', '));

  const values: Partial<Record<LanguageCodes, string>> = {};
  for (const language of languages) {
    const file = new URL(language + '.md', directory);
    let value: string;
    try {
      value = readFileSync(file, 'utf8');
    } catch (cause) {
      throw new Error('Missing or unreadable Markdown locale file: ' + file.pathname, { cause });
    }
    if (!value.trim()) throw new Error('Empty Markdown locale file: ' + file.pathname);
    values[language] = value;
  }
  return values;
}

const validate = (config: ContentBlock_Markdown_Config) => {
  markdown_Config_Schema.parse(config);
  const errors = validateReplacementVariables(config.locale.value, config.locale.variables, 'locale.value');
  if (errors.length) throw new Error('Markdown variables validation failed:\n' + errors.join('\n'));
};

/**
 * Define localized Markdown with optional Code-style replacement variables.
 *
 * @remarks
 * Store translations as `locales/<language>.md` beside the definition. Pass
 * `files: { moduleUrl: import.meta.url, languages }`; the files are read as
 * UTF-8 immediately and only their text is retained in the configurator.
 * Missing, empty, duplicate or unexpected locales fail during definition.
 * Alternatively, supply `locale.value` directly when text is already loaded.
 *
 * Use `%_%VARIABLE_NAME%_%` with UPPER_SNAKE_CASE keys in `locale.variables`.
 * Each declared variable must occur in every Markdown locale, and localized
 * replacement values must exist for every corresponding language.
 */
export const defineMarkdown = <const Slug extends string>(
  config: MarkdownInlineConfig<Slug> | MarkdownFileConfig<Slug>,
) => {
  const locale = 'files' in config && config.files
    ? { ...config.locale, value: readMarkdownFiles(config.files) }
    : (config as MarkdownInlineConfig<Slug>).locale;

  const resolved: ContentBlock_Markdown_Config = {
    id: config.id,
    slug: config.slug,
    type: config.type,
    params: config.params,
    locale,
  };
  validate(resolved);

  const { id, type, slug, params } = resolved;

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Markdown_Config>;

  const overrides: DeepPartial<ContentBlock_Markdown_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Markdown_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Markdown_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Markdown_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Markdown_Configurator = ReturnType<typeof defineMarkdown>;
