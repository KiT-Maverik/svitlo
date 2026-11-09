import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { scene_Config_Schema, type ContentBlock_Scene_Config } from './defineScene.schemas';

export function defineScene<const Slug extends string>(
  config: Omit<ContentBlock_Scene_Config, 'slug'> & { slug: Slug },
) {
  scene_Config_Schema.parse(config);

  const { id, type, slug, locales } = config;

  const localeEntries = { locales } as const;

  const base = {
    id,
    type,
    slug,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<ContentBlock_Scene_Config>;

  return {
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<ContentBlock_Scene_Config>,
    },
  };
}

export type ContentBlock_Scene_Configurator = ReturnType<typeof defineScene>;
