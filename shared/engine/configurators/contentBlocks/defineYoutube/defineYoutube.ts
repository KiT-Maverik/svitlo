import type { DeepPartial } from '#types';

import { youtube_Config_Schema, type ContentBlock_Youtube_Config } from './defineYoutube.schemas';

export function defineYoutube<const Slug extends string>(
  config: Omit<ContentBlock_Youtube_Config, 'slug'> & { slug: Slug },
) {
  youtube_Config_Schema.parse(config);

  const { id, type, slug, href, mode, title, hint, fallback } = config;
  const base = {
    id,
    type,
    slug,
    mode,
    href: typeof href === 'string' ? href : undefined,
    title: typeof title === 'string' ? title : undefined,
    hint: typeof hint === 'string' ? hint : undefined,
    fallback: fallback && {
      offline: typeof fallback.offline === 'string' ? fallback.offline : undefined,
      unavailable: typeof fallback.unavailable === 'string' ? fallback.unavailable : undefined,
      retry: typeof fallback.retry === 'string' ? fallback.retry : undefined,
    },
  } satisfies DeepPartial<ContentBlock_Youtube_Config>;

  return {
    config: {
      base,
      locales: () =>
        ({
          href: typeof href === 'object' ? href : undefined,
          title: typeof title === 'object' ? title : undefined,
          hint: typeof hint === 'object' ? hint : undefined,
          fallback: fallback && {
            offline: typeof fallback.offline === 'object' ? fallback.offline : undefined,
            unavailable: typeof fallback.unavailable === 'object' ? fallback.unavailable : undefined,
            retry: typeof fallback.retry === 'object' ? fallback.retry : undefined,
          },
        }) satisfies DeepPartial<ContentBlock_Youtube_Config>,
    },
  };
}

export type ContentBlock_Youtube_Configurator = ReturnType<typeof defineYoutube>;
