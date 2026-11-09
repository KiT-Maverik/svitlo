import type { DeepPartial } from '#types';

import { scene_Config_Schema, type ContentBlock_Scene_Config } from './defineScene.schemas';

export function defineScene<const Slug extends string>(config: Omit<ContentBlock_Scene_Config, 'slug'> & { slug: Slug }) {
  scene_Config_Schema.parse(config);

  const { id, type, slug, locales } = config;
  const base = { id, type, slug } satisfies DeepPartial<ContentBlock_Scene_Config>;

  return {
    config: {
      base,
      locales: () => ({ locales }) satisfies DeepPartial<ContentBlock_Scene_Config>,
    },
  };
}

export type ContentBlock_Scene_Configurator = ReturnType<typeof defineScene>;
