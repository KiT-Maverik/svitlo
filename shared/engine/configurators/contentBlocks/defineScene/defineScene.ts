import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared__configurators';

import {
  scene_Config_Schema,
  type ContentBlock_Scene_Config,
  type ContentBlock_Scene_Locale,
} from './defineScene.schemas';

const validate = (config: ContentBlock_Scene_Config) => {
  scene_Config_Schema.parse(config);
};

/**
 * Define a Scene with invariant strings and field-level localized text.
 * Do not use arrays anywhere in the authored Scene locale value. Represent
 * collections as objects with stable, descriptive keys instead, so sparse
 * locale patches can be deep-merged deterministically without array indexes.
 * Scene components may convert resolved keyed objects into arrays when needed.
 * Derive the component's single-language value type with `ResolveLocale<typeof value>`.
 * Runtime localization and translation completeness are handled by publication.
 */
export const defineScene = <const Slug extends string>(
  config: Omit<ContentBlock_Scene_Config, 'slug'> & { slug: Slug },
) => {
  validate(config);

  const { id, type, slug, locale, params } = config;

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Scene_Config>;

  const overrides: DeepPartial<ContentBlock_Scene_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Scene_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Scene_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Scene_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Scene_Configurator = ReturnType<typeof defineScene>;
