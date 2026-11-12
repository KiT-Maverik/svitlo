import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';

import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  splitLocalizedFields,
  wrapLocale,
  type ResourceAssembler,
  type WrappedLocaleFiles,
} from '../../_shared__configurators';
import { validateLocalAssetPaths } from '../_shared__contentBlocks';
import {
  video_Config_Schema,
  video_Override_Config_Schema,
  type ContentBlock_Video_Config,
  type ContentBlock_Video_Locale,
  type ContentBlock_Video_Overrides,
  type ContentBlock_Video_ResourceBase,
} from './defineVideo.schemas';

type VideoLocaleFiles = Partial<Record<LanguageCodes, DeepPartial<ContentBlock_Video_Locale<'props'>>>>;
type VideoEmbeddedLocaleFiles = WrappedLocaleFiles<DeepPartial<ContentBlock_Video_Locale<'props'>>>;
type VideoAssembly<Base, LocaleFiles = VideoLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type VideoOverrideBase = {
  params?: ContentBlock_Video_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Video_Locale<'props'>>;
};

const parseAndValidate = (config: ContentBlock_Video_Config): ContentBlock_Video_Config => {
  const parsed = video_Config_Schema.parse(config);
  validateLocalAssetPaths(parsed.locale.fileLocation, 'locale.fileLocation');
  validateLocalAssetPaths(parsed.locale.poster, 'locale.poster');
  return parsed;
};
const validate = (config: ContentBlock_Video_Config): void => {
  parseAndValidate(config);
};

const assembleVideo = (config: ContentBlock_Video_Config): VideoAssembly<ContentBlock_Video_ResourceBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(config.locale);
  const base = {
    id,
    type,
    slug,
    params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Video_Locale<'props'>> }
      : {}),
  } satisfies ContentBlock_Video_ResourceBase;
  return { base, locale: locale as unknown as VideoLocaleFiles | undefined };
};

const assembleVideoPatch = (patch: ContentBlock_Video_Overrides): VideoAssembly<VideoOverrideBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Video_Locale<'props'>> }
        : {}),
    },
    locale: locale as unknown as VideoLocaleFiles | undefined,
  };
};

/** Define Video. */
/**
 * Stateless authored ContentBlock. Assembly validates isolated snapshots and
 * emits either complete resources or exclusively sparse override fields.
 */
export const defineVideo = <const Slug extends string>(
  config: Omit<ContentBlock_Video_Config, 'slug'> & { slug: Slug },
) => {
  const authored = structuredClone(parseAndValidate(config));
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => video_Config_Schema.parse(structuredClone(authored));
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Video_Config>;

  function resource(): VideoAssembly<ContentBlock_Video_ResourceBase>;
  function resource(options: { embed: true }): VideoAssembly<ContentBlock_Video_ResourceBase, VideoEmbeddedLocaleFiles>;
  function resource(options?: {
    embed?: true;
  }): VideoAssembly<ContentBlock_Video_ResourceBase, VideoLocaleFiles | VideoEmbeddedLocaleFiles> {
    const assembled = assembleVideo(copyAuthored());
    return options?.embed ? { base: assembled.base, locale: wrapLocale(assembled.locale) } : assembled;
  }
  const resourceApi: ResourceAssembler<
    ContentBlock_Video_ResourceBase,
    DeepPartial<ContentBlock_Video_Locale<'props'>>
  > = resource;

  const overrides = (patch: ContentBlock_Video_Overrides): VideoAssembly<VideoOverrideBase> => {
    try {
      const parsedPatch = video_Override_Config_Schema.parse(patch);
      const effective = video_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      return assembleVideoPatch(structuredClone(parsedPatch));
    } catch (error) {
      throw new Error(`Invalid Video overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: error,
      });
    }
  };
  return {
    id,
    slug,
    type,
    validate,
    assemble: { resource: resourceApi, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Video_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
};

export type ContentBlock_Video_Configurator = ReturnType<typeof defineVideo>;
