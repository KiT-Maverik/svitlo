import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { text_Config_Schema, type ContentBlock_Text_Config } from './defineText.schemas';

export function defineText<const Slug extends string>(config: Omit<ContentBlock_Text_Config, 'slug'> & { slug: Slug }) {
  text_Config_Schema.parse(config);

  const { id, type, slug, value, params } = config;

  const localeEntries = { value } as const;

  const base = {
    id,
    type,
    slug,
    params,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<ContentBlock_Text_Config>;

  return {
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<ContentBlock_Text_Config>,
    },
  };
}

export type ContentBlock_Text_Configurator = ReturnType<typeof defineText>;
