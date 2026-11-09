import type { DeepPartial } from '#types';

import { youtube_Config_Schema, type ContentBlock_Youtube_Config } from './defineYoutube.schemas';
import { onlyLocales, onlyStrings } from '../../_utils';

export function defineYoutube<const Slug extends string>(
  config: Omit<ContentBlock_Youtube_Config, 'slug'> & { slug: Slug },
) {
  youtube_Config_Schema.parse(config);

  const { id, type, slug, href, mode, title, hint, fallback } = config;

  const localeEntries = { href, title, hint, fallback } as const;

  const base = {
    id,
    type,
    slug,
    mode,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<ContentBlock_Youtube_Config>;

  return {
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<ContentBlock_Youtube_Config>,
    },
  };
}

export type ContentBlock_Youtube_Configurator = ReturnType<typeof defineYoutube>;
