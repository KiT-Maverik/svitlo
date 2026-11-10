import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

import {
  code_Config_Schema,
  type ContentBlock_Code_Config,
  type ContentBlock_Code_Locale,
} from './defineCode.schemas';

export const defineCode = (config: ContentBlock_Code_Config) => {
  code_Config_Schema.parse(config);

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
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Code_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Code_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Code_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Code_Configurator = ReturnType<typeof defineCode>;
