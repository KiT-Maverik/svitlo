import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

import { code_Config_Schema, type ContentBlock_Code_Config, type ContentBlock_Code_Locale } from './defineCode.schemas';
import { validateCodeVariables } from './validateCodeVariables';

const validate = (config: ContentBlock_Code_Config) => {
  code_Config_Schema.parse(config);
  validateCodeVariables(config);
};

/**
 * Define a static Code block for displaying source text with syntax highlighting.
 *
 * @remarks
 * Pass the complete source string in \`params.codeAsText\`. Code blocks are
 * display-only: no compilation or execution occurs. Indentation, whitespace
 * and line breaks are preserved.
 *
 * When the source lives in a file, place it beside the authoring definition
 * and read it as UTF-8 there, before calling \`defineCode\`. Resolve the path
 * relative to the current module using \`import.meta.url\`, not process.cwd().
 * Node's \`readFileSync\` throws if the file cannot be read; the configurator
 * itself requires no file path, loader or filesystem dependency.
 *
 * Use \`%_%VARIABLE_NAME%_%\` in the source, with matching UPPER_SNAKE_CASE
 * IDs in \`locale.variables\`. \`config.validate\` checks these references
 * directly against \`params.codeAsText\`.
 *
 * @example
 * \`\`\`ts
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
 * \`\`\`
 */
export const defineCode = <const Slug extends string>(
  config: Omit<ContentBlock_Code_Config, 'slug'> & { slug: Slug },
) => {
  validate(config);

  const { id, type, slug, locale, params } = config;

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Code_Config>;

  const overrides: DeepPartial<ContentBlock_Code_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Code_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Code_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Code_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Code_Configurator = ReturnType<typeof defineCode>;
