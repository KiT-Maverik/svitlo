import type { DeepPartial } from '#types';
import { validateLocalAssetPaths } from '../_shared__contentBlocks';

import { onlyLocales, onlyStrings } from '../../_shared__configurators';

import {
  image_Config_Schema,
  type ContentBlock_Image_Config,
  type ContentBlock_Image_Locale,
} from './defineImage.schemas';

const validate = (config: ContentBlock_Image_Config) => {
  image_Config_Schema.parse(config);
  validateLocalAssetPaths(config.locale.src, 'locale.src');
};

export const defineImage = <const Slug extends string>(
  config: Omit<ContentBlock_Image_Config, 'slug'> & { slug: Slug },
) => {
  validate(config);

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
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Image_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Image_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Image_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Image_Configurator = ReturnType<typeof defineImage>;
