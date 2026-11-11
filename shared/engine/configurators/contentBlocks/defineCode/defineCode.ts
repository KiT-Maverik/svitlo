import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

import { code_Config_Schema, type ContentBlock_Code_Config, type ContentBlock_Code_Locale } from './defineCode.schemas';

const validate = (config: ContentBlock_Code_Config) => {
  code_Config_Schema.parse(config);
};

/**
 * Define Code from a source template with localized replacements.
 *
 * @remarks
 * `params.fileLocation` identifies the source template. Write
 * `%_%VARIABLE_NAME%_%` in the source, using UPPER_SNAKE_CASE IDs.
 * Matching `locale.variables` supply localized replacement values.
 * Only values are localized; substitution happens before highlighting.
 * Unmatched markers remain literal and do not alter surrounding code.
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
