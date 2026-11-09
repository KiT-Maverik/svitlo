import type { DeepPartial } from '#types';

import { text_Config_Schema, type ContentBlock_Text_Config } from './defineText.schemas';

export function defineText<const Slug extends string>(config: Omit<ContentBlock_Text_Config, 'slug'> & { slug: Slug }) {
  text_Config_Schema.parse(config);

  const { id, type, slug, value, params } = config;

  const base = {
    id,
    type,
    slug,
    params,
    ...(typeof value === 'string' ? { value } : {}),
  } satisfies DeepPartial<ContentBlock_Text_Config>;

  return {
    config: {
      base,
      locales: () => (typeof value === 'string' ? {} : { value }) satisfies DeepPartial<ContentBlock_Text_Config>,
    },
  };
}

export type ContentBlock_Text_Configurator = ReturnType<typeof defineText>;
