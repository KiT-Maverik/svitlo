import type { DeepPartial } from '#types';

import { checkpoint_Config_Schema, type ContentBlock_Checkpoint_Config } from './defineCheckpoint.schemas';

export function defineCheckpoint<
  const Slug extends string,
  const Items extends readonly ContentBlock_Checkpoint_Config['items'][number][],
>(
  config: Omit<ContentBlock_Checkpoint_Config, 'slug' | 'items'> & { slug: Slug; items: Items },
) {
  checkpoint_Config_Schema.parse(config);

  const { id, type, slug, title, items, ...params } = config;
  const base = {
    id,
    type,
    slug,
    ...params,
    title: typeof title === 'string' ? title : undefined,
  } satisfies DeepPartial<ContentBlock_Checkpoint_Config>;

  return {
    config: {
      base,
      locales: () =>
        ({
          title: typeof title === 'object' ? title : undefined,
          items: items.map(({ question }) => ({
            question: typeof question === 'object' ? question : undefined,
          })),
        }) satisfies DeepPartial<ContentBlock_Checkpoint_Config>,
    },
    // Like SkillGroup.skill, children stay as configurators, never raw authored configs.
    items,
  };
}

export type ContentBlock_Checkpoint_Configurator = ReturnType<typeof defineCheckpoint>;
