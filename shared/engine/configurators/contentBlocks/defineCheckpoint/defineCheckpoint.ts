import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { checkpoint_Config_Schema, type ContentBlock_Checkpoint_Config } from './defineCheckpoint.schemas';

export function defineCheckpoint<
  const Slug extends string,
  const Items extends readonly ContentBlock_Checkpoint_Config['items'][number][],
>(
  config: Omit<ContentBlock_Checkpoint_Config, 'slug' | 'items'> & { slug: Slug; items: Items },
) {
  checkpoint_Config_Schema.parse(config);

  const { id, type, slug, title, items, ...params } = config;

  const localeEntries = { title } as const;

  const base = {
    id,
    type,
    slug,
    ...params,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<ContentBlock_Checkpoint_Config>;

  return {
    config: {
      base,
      locales: () => onlyLocales({ title, items: items.map(({ question }) => ({ question })) }) satisfies DeepPartial<ContentBlock_Checkpoint_Config>,
    },
    // Keep the authored child configurators, never flatten them into raw configs.
    items,
  };
}

export type ContentBlock_Checkpoint_Configurator = ReturnType<typeof defineCheckpoint>;
