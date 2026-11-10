import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

import {
  image_Config_Schema,
  type ContentBlock_Image_Config,
  type ContentBlock_Image_Locale,
} from './defineImage.schemas';

export const defineImage = (config: ContentBlock_Image_Config) => {
  image_Config_Schema.parse(config);

  const { id, type, slug, locale, params } = config;

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Image_Config>;

  const overrides: DeepPartial<ContentBlock_Image_Config> = {};

  return {
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Image_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Image_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Image_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Image_Configurator = ReturnType<typeof defineImage>;
