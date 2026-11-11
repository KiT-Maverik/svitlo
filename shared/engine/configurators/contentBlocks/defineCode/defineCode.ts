import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

import { code_Config_Schema, type ContentBlock_Code_Config, type ContentBlock_Code_Locale } from './defineCode.schemas';
import { validateCodeVariables } from './validateCodeVariables';

const validate = (config: ContentBlock_Code_Config, resolvedSource?: string) => {
  code_Config_Schema.parse(config);
  validateCodeVariables(config, resolvedSource);
};

/**
 * Define a static, display-only Code block from a source file.
 *
 * @remarks
 * Code is rendered as text with syntax highlighting; this block never compiles,
 * evaluates or executes the source. `params.fileLocation` identifies the source
 * file used by the publisher, not an executable entry point.
 *
 * Use `%_%VARIABLE_NAME%_%` in that file with UPPER_SNAKE_CASE IDs matching
 * `locale.variables`. Only the replacement values are localized.
 *
 * `config.validate(config)` checks the authored data without filesystem access.
 * The Node-only publisher can call `loadAndValidateCodeTemplate(config, baseDirectory)`
 * to resolve a file relative to an explicit root, check that it exists, read it
 * as UTF-8 and reject undeclared, missing or malformed placeholders.
 * Alternatively, `config.validate(config, resolvedSource)` checks the same
 * placeholders when the caller already has the source string.
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
