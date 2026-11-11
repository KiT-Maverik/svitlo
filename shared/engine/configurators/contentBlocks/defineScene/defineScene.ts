import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

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
 *
 * Keep the authored value in a local constant, then derive the Scene component's
 * resolved (single-language) value type with Engine's `ResolveLocale` utility.
 *
 * @example
 * ```ts
 * import { defineScene, type ResolveLocale } from '@svitlo/engine';
 *
 * const introductionValue = {
 *   character: 'hero',
 *   greeting: { en: 'Hello!', uk: 'Привіт!' },
 *   dialog: {
 *     emotion: 'happy',
 *     message: { en: 'Ready?', uk: 'Готовий?' },
 *   },
 * } as const;
 *
 * type IntroductionSceneValue = ResolveLocale<typeof introductionValue>;
 *
 * const introductionScene = defineScene({
 *   id: sceneId,
 *   slug: 'introduction',
 *   type: 'scene',
 *   params: {},
 *   locale: { value: introductionValue },
 * });
 *
 * // The Scene component receives `value: IntroductionSceneValue` after
 * // resource assembly and language selection.
 * ```
 *
 * `ResolveLocale` is type-only. The existing publisher assembles the actual
 * localized values and must verify that required translations are present.
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
