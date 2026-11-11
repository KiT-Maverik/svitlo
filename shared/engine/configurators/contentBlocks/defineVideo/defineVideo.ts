import type { DeepPartial } from '#types';
import { validateLocalAssetPaths } from '../_shared__contentBlocks';

import { onlyLocales, onlyStrings } from '../../_shared__configurators';

import {
  video_Config_Schema,
  type ContentBlock_Video_Config,
  type ContentBlock_Video_Locale,
} from './defineVideo.schemas';

const validate = (config: ContentBlock_Video_Config) => {
  video_Config_Schema.parse(config);
  validateLocalAssetPaths(config.locale.fileLocation, 'locale.fileLocation');
  validateLocalAssetPaths(config.locale.poster, 'locale.poster');
};

export const defineVideo = <const Slug extends string>(
  config: Omit<ContentBlock_Video_Config, 'slug'> & { slug: Slug },
) => {
  validate(config);

  const { id, type, slug, locale, params } = config;

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Video_Config>;

  const overrides: DeepPartial<ContentBlock_Video_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Video_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Video_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Video_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Video_Configurator = ReturnType<typeof defineVideo>;
