import { lstatSync, readFileSync } from 'node:fs';

import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ConfigWithLanguages, DeepPartial, LanguageScope, PublicationLanguageOptions } from '#types';

import { validateReplacementVariables } from '../_shared__contentBlocks';
import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  resolvePublicationLanguages,
  selectPublicationLocales,
  splitLocalizedFields,
  validateRequestedPublication,
  scopeBuild,
} from '../../_shared__configurators';
import {
  code_Config_Schema,
  code_Override_Config_Schema,
  code_Props_Schema,
  type ContentBlock_Code_Config,
  type ContentBlock_Code_Locale,
  type ContentBlock_Code_Overrides,
  type ContentBlock_Code_PropsBase,
} from './defineCode.schemas';

/**
 * Load source code next to the defining module, using an extension selected
 * by the deterministic Lesson builder from the authored Code language.
 * The file contents alone enter the Config/Props; no relative path is kept.
 */
export function readCodeSource(moduleUrl: string, extension: string): string {
  if (!/^[a-z0-9]+$/.test(extension)) throw new Error('Invalid authored Code file extension: ' + extension);
  const url = new URL('./code.' + extension, moduleUrl);
  try {
    if (!lstatSync(url).isFile()) throw new Error('not a regular source file');
    const content = readFileSync(url, 'utf8');
    if (!content.trim()) throw new Error('empty source file');
    return content;
  } catch (cause) {
    throw new Error('Missing, empty or unreadable Code source: ' + url.pathname, { cause });
  }
}

type CodeLocaleFiles = Partial<Record<LanguageCode, { locale: DeepPartial<ContentBlock_Code_Locale<'props'>> }>>;
type CodePropsPublication<Base, LocaleFiles = CodeLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type CodeOverridePropsBase = {
  params?: ContentBlock_Code_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Code_Locale<'props'>>;
};

const parseAndValidate = (config: ContentBlock_Code_Config): ContentBlock_Code_Config => {
  const parsed = code_Config_Schema.parse(config);
  const errors = validateReplacementVariables(parsed.params.codeAsText, parsed.locale.variables, 'Code template');
  if (errors.length) throw new Error('Code variables validation failed:\n' + errors.join('\n'));
  return parsed;
};
const validate = (config: ContentBlock_Code_Config): void => {
  parseAndValidate(config);
};

const buildCodeProps = (config: ContentBlock_Code_Config): CodePropsPublication<ContentBlock_Code_PropsBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(config.locale);
  const base = {
    id,
    type,
    slug,
    params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Code_Locale<'props'>> }
      : {}),
  } satisfies ContentBlock_Code_PropsBase;
  return {
    base,
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      CodeLocaleFiles | undefined,
  };
};

const buildCodePatch = (patch: ContentBlock_Code_Overrides): CodePropsPublication<CodeOverridePropsBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Code_Locale<'props'>> }
        : {}),
    },
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      CodeLocaleFiles | undefined,
  };
};

/**
 * Define a static Code block for displaying source text with syntax highlighting.
 *
 * @remarks
 * Pass the complete source string in `params.codeAsText`. Code blocks are
 * display-only: no compilation or execution occurs. Indentation, whitespace
 * and line breaks are preserved.
 *
 * File-backed authoring uses `readCodeSource(import.meta.url, extension)` with
 * a conventional `code.<extension>` beside the definition. The builder
 * selects the extension from the authored Code language.
 * File paths are never persisted in Config/Props. Missing source is an error.
 *
 * Use `%_%VARIABLE_NAME%_%` in the source, with matching UPPER_SNAKE_CASE
 * keys in the `locale.variables` object. Each key maps to an invariant
 * string or a dictionary of language-specific strings. `config.validate`
 * checks these references directly against `params.codeAsText`.
 *
 * @example
 * ```ts
 * import { readFileSync } from 'node:fs';
 *
 * const codeAsText = readFileSync(new URL('./example.py', import.meta.url), 'utf8');
 * const block = defineCode({
 *   id: 'c2cc84f3-f057-493d-b1b6-1880aad8023b',
 *   slug: 'example',
 *   type: 'code',
 *   params: { language: 'python', codeAsText },
 *   locale: {},
 * });
 * ```
 */
/**
 * Build complete Props and validated sparse overrides. Temporary merged
 * configurations are used only for semantic validation.
 */
export const defineCode = <
  const Slug extends string,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<ContentBlock_Code_Config, 'slug'> & { slug: Slug } & ConfigWithLanguages<
      ContentBlock_Code_Config,
      Languages
    >,
) => {
  const authored: ContentBlock_Code_Config = structuredClone(config);
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => structuredClone(authored);
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Code_Config>;

  const props = (options: PublicationLanguageOptions<Languages>): CodePropsPublication<ContentBlock_Code_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    const result = buildCodeProps(parseAndValidate(copyAuthored()));
    result.locale = selectPublicationLocales(result.locale, languages);
    validateRequestedPublication(code_Props_Schema, result, languages);
    return result;
  };

  const overrides = (
    patch: ContentBlock_Code_Overrides,
    options: PublicationLanguageOptions<Languages>,
  ): CodePropsPublication<CodeOverridePropsBase> => {
    const languages = resolvePublicationLanguages(options);
    try {
      const parsedPatch = code_Override_Config_Schema.parse(patch);
      const effective = code_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      const output = buildCodePatch(structuredClone(parsedPatch));
      output.locale = selectPublicationLocales(output.locale, languages);
      validateRequestedPublication(code_Props_Schema, props(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(`Invalid Code overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: error,
      });
    }
  };
  const result = {
    id,
    slug,
    type,
    validate,
    build: scopeBuild({ props, overrides }),
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Code_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_Code_Configurator = ReturnType<typeof defineCode>;
