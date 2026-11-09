import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { checkpoint_Config_Schema, type ContentBlock_Checkpoint_Config } from './defineCheckpoint.schemas';

export function defineCheckpoint<
  const Slug extends string,
  const Items extends readonly ContentBlock_Checkpoint_Config['items'][number][],
>(config: Omit<ContentBlock_Checkpoint_Config, 'slug' | 'items'> & { slug: Slug; items: Items }) {
  checkpoint_Config_Schema.parse(config);

  const { id, type, slug, title, items, ...params } = config;

  // Only localized questions belong to this projection; child configurators stay in items.
  const localeEntries = { title, items: items.map(({ question }) => ({ question })) } as const;

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
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<ContentBlock_Checkpoint_Config>,
    },
    // Keep the authored child configurators, never flatten them into raw configs.
    items,
  };
}

export type ContentBlock_Checkpoint_Configurator = ReturnType<typeof defineCheckpoint>;
