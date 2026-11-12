import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';

import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  splitLocalizedFields,
} from '../../_shared__configurators';
import { validateSceneEntry } from '../_shared__contentBlocks';
import {
  scene_Config_Schema,
  scene_Override_Config_Schema,
  type ContentBlock_Scene_Config,
  type ContentBlock_Scene_Locale,
  type ContentBlock_Scene_Overrides,
  type ContentBlock_Scene_PropsBase,
} from './defineScene.schemas';

type SceneLocaleFiles = Partial<Record<LanguageCodes, { locale: DeepPartial<ContentBlock_Scene_Locale<'props'>> }>>;
type ScenePropsPublication<Base> = { base: Base; locale: SceneLocaleFiles | undefined };
type SceneOverridePropsBase = {
  params?: ContentBlock_Scene_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Scene_Locale<'props'>>;
};

const parseAndValidate = (config: ContentBlock_Scene_Config): ContentBlock_Scene_Config => {
  const parsed = scene_Config_Schema.parse(config);
  validateSceneEntry(parsed.id);
  return parsed;
};
const validate = (config: ContentBlock_Scene_Config): void => {
  parseAndValidate(config);
};

const buildSceneProps = (config: ContentBlock_Scene_Config): ScenePropsPublication<ContentBlock_Scene_PropsBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(config.locale);
  const base = {
    id,
    type,
    slug,
    params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Scene_Locale<'props'>> }
      : {}),
  } satisfies ContentBlock_Scene_PropsBase;
  const files = locale
    ? (Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }])) as SceneLocaleFiles)
    : undefined;
  return { base, locale: files };
};

const buildScenePatch = (patch: ContentBlock_Scene_Overrides): ScenePropsPublication<SceneOverridePropsBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Scene_Locale<'props'>> }
        : {}),
    },
    locale: locale
        ? (Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }])) as SceneLocaleFiles)
        : undefined,
  };
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
/**
 * Stateless ContentBlock Build API validates isolated snapshots and emits
 * either complete Props or exclusively sparse override fields.
 */
export const defineScene = <const Slug extends string>(
  config: Omit<ContentBlock_Scene_Config, 'slug'> & { slug: Slug },
) => {
  const authored = structuredClone(parseAndValidate(config));
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => scene_Config_Schema.parse(structuredClone(authored));
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Scene_Config>;

  const props = (): ScenePropsPublication<ContentBlock_Scene_PropsBase> =>
    buildSceneProps(parseAndValidate(copyAuthored()));

  const overrides = (patch: ContentBlock_Scene_Overrides): ScenePropsPublication<SceneOverridePropsBase> => {
    try {
      const parsedPatch = scene_Override_Config_Schema.parse(patch);
      const effective = scene_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      return buildScenePatch(structuredClone(parsedPatch));
    } catch (error) {
      throw new Error(`Invalid Scene overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: error,
      });
    }
  };
  return {
    id,
    slug,
    type,
    validate,
    build: { props, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Scene_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
};

export type ContentBlock_Scene_Configurator = ReturnType<typeof defineScene>;
