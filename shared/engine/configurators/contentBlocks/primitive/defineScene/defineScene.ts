import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ConfigWithLanguages, DeepPartial, LanguageScope, PublicationLanguageOptions } from '#types';

import { validateSceneEntry } from '../../_shared__contentBlocks';
import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  resolvePublicationLanguages,
  scopeBuild,
  selectPublicationLocales,
  splitLocalizedFields,
  validateRequestedPublication,
} from '../../../_shared__configurators';
import {
  scene_Config_Schema,
  scene_Data_Schema,
  scene_Override_Config_Schema,
  type ContentBlock_Scene_Config,
  type ContentBlock_Scene_DataBase,
  type ContentBlock_Scene_Locale,
  type ContentBlock_Scene_Overrides,
} from './defineScene.schemas';

type SceneLocaleFiles = Partial<Record<LanguageCode, { locale: DeepPartial<ContentBlock_Scene_Locale<'data'>> }>>;
type SceneDataPublication<Base, LocaleFiles = SceneLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type SceneOverrideDataBase = {
  params?: ContentBlock_Scene_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Scene_Locale<'data'>>;
};

const parseAndValidate = (
  config: ContentBlock_Scene_Config,
  mode: PublicationLanguageOptions['mode'] = 'production',
): ContentBlock_Scene_Config => {
  const parsed = scene_Config_Schema.parse(config);
  if (mode !== 'draft') validateSceneEntry(parsed.id);
  return parsed;
};
const validate = (config: ContentBlock_Scene_Config): void => {
  parseAndValidate(config);
};

const buildSceneData = (config: ContentBlock_Scene_Config): SceneDataPublication<ContentBlock_Scene_DataBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(config.locale);
  const base = {
    id,
    type,
    slug,
    params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Scene_Locale<'data'>> }
      : {}),
  } satisfies ContentBlock_Scene_DataBase;
  return {
    base,
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      SceneLocaleFiles | undefined,
  };
};

const buildScenePatch = (patch: ContentBlock_Scene_Overrides): SceneDataPublication<SceneOverrideDataBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Scene_Locale<'data'>> }
        : {}),
    },
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      SceneLocaleFiles | undefined,
  };
};

/**
 * Provide localized input data for an interactive Scene.
 *
 * @remarks
 * `locale.value` supports invariant strings, language dictionaries and
 * nested objects with stable, descriptive keys. Never author arrays inside
 * the Scene's locale value: keyed collections allow sparse translations
 * to merge without positional ambiguity. The Scene component may construct
 * arrays from those resolved objects at rendering time.
 *
 * Use `ResolveLocale<typeof value>` for the Scene component's
 * single-language props. Implementing the visual interaction and registering
 * its Scene entrypoint are separate from authoring this configurator.
 */
export const defineScene = <
  const Slug extends string,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<ContentBlock_Scene_Config, 'slug'> & { slug: Slug } & ConfigWithLanguages<
      ContentBlock_Scene_Config,
      Languages
    >,
) => {
  const authored: ContentBlock_Scene_Config = structuredClone(config);
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => structuredClone(authored);
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Scene_Config>;

  const data = (options: PublicationLanguageOptions<Languages>): SceneDataPublication<ContentBlock_Scene_DataBase> => {
    const languages = resolvePublicationLanguages(options);
    const result = buildSceneData(parseAndValidate(copyAuthored(), options.mode));
    result.locale = selectPublicationLocales(result.locale, languages);
    validateRequestedPublication(scene_Data_Schema, result, languages);
    return result;
  };

  const overrides = (
    patch: ContentBlock_Scene_Overrides,
    options: PublicationLanguageOptions<Languages>,
  ): SceneDataPublication<SceneOverrideDataBase> => {
    const languages = resolvePublicationLanguages(options);
    try {
      const parsedPatch = scene_Override_Config_Schema.parse(patch);
      const effective = scene_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      parseAndValidate(effective, options.mode);
      const output = buildScenePatch(structuredClone(parsedPatch));
      output.locale = selectPublicationLocales(output.locale, languages);
      validateRequestedPublication(scene_Data_Schema, data(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(`Invalid Scene overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: error,
      });
    }
  };
  const result = {
    id,
    slug,
    type,
    validate,
    build: scopeBuild({ data, overrides }),
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Scene_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_Scene_Configurator = ReturnType<typeof defineScene>;
