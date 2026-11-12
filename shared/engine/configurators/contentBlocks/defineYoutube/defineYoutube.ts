import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';

import { mergeForValidation, onlyLocales, onlyStrings, splitLocalizedFields } from '../../_shared__configurators';
import {
  youtube_Config_Schema,
  youtube_Override_Config_Schema,
  type ContentBlock_Youtube_Config,
  type ContentBlock_Youtube_Locale,
  type ContentBlock_Youtube_Overrides,
  type ContentBlock_Youtube_ResourceBase,
} from './defineYoutube.schemas';

type YoutubeLocaleFiles = Partial<Record<LanguageCodes, DeepPartial<ContentBlock_Youtube_Locale<'props'>>>>;
type YoutubeAssembly<Base> = { base: Base; locale: YoutubeLocaleFiles | undefined };
type YoutubeOverrideBase = {
  params?: ContentBlock_Youtube_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Youtube_Locale<'props'>>;
};

const parseAndValidate = (config: ContentBlock_Youtube_Config): ContentBlock_Youtube_Config => {
  const parsed = youtube_Config_Schema.parse(config);

  return parsed;
};
const validate = (config: ContentBlock_Youtube_Config): void => {
  parseAndValidate(config);
};

const assembleYoutube = (config: ContentBlock_Youtube_Config): YoutubeAssembly<ContentBlock_Youtube_ResourceBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(config.locale);
  const base = {
    id,
    type,
    slug,
    params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Youtube_Locale<'props'>> }
      : {}),
  } satisfies ContentBlock_Youtube_ResourceBase;
  return { base, locale: locale as unknown as YoutubeLocaleFiles | undefined };
};

const assembleYoutubePatch = (patch: ContentBlock_Youtube_Overrides): YoutubeAssembly<YoutubeOverrideBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Youtube_Locale<'props'>> }
        : {}),
    },
    locale: locale as unknown as YoutubeLocaleFiles | undefined,
  };
};

/** Define Youtube. */
/**
 * Stateless authored ContentBlock. Assembly validates isolated snapshots and
 * emits either complete resources or exclusively sparse override fields.
 */
export const defineYoutube = <const Slug extends string>(
  config: Omit<ContentBlock_Youtube_Config, 'slug'> & { slug: Slug },
) => {
  const authored = structuredClone(parseAndValidate(config));
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => youtube_Config_Schema.parse(structuredClone(authored));
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Youtube_Config>;

  const resource = (): YoutubeAssembly<ContentBlock_Youtube_ResourceBase> => assembleYoutube(copyAuthored());
  const overrides = (patch: ContentBlock_Youtube_Overrides): YoutubeAssembly<YoutubeOverrideBase> => {
    try {
      const parsedPatch = youtube_Override_Config_Schema.parse(patch);
      const effective = youtube_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      return assembleYoutubePatch(structuredClone(parsedPatch));
    } catch (error) {
      throw new Error(
        `Invalid Youtube overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`,
        {
          cause: error,
        },
      );
    }
  };
  return {
    id,
    slug,
    type,
    validate,
    assemble: { resource, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Youtube_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
};

export type ContentBlock_Youtube_Configurator = ReturnType<typeof defineYoutube>;
