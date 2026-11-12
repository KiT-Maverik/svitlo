import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';

import { mergeForValidation, onlyLocales, onlyStrings, splitLocalizedFields } from '../../_shared__configurators';
import { validateLocalAssetPaths } from '../_shared__contentBlocks';
import {
  audio_Config_Schema,
  audio_Override_Config_Schema,
  type ContentBlock_Audio_Config,
  type ContentBlock_Audio_Locale,
  type ContentBlock_Audio_Overrides,
  type ContentBlock_Audio_ResourceBase,
} from './defineAudio.schemas';

type AudioLocaleFiles = Partial<Record<LanguageCodes, DeepPartial<ContentBlock_Audio_Locale<'props'>>>>;
type AudioAssembly<Base> = { base: Base; locale: AudioLocaleFiles | undefined };
type AudioOverrideBase = {
  params?: ContentBlock_Audio_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Audio_Locale<'props'>>;
};

const parseAndValidate = (config: ContentBlock_Audio_Config): ContentBlock_Audio_Config => {
  const parsed = audio_Config_Schema.parse(config);
  validateLocalAssetPaths(parsed.locale.fileLocation, 'locale.fileLocation');
  return parsed;
};
const validate = (config: ContentBlock_Audio_Config): void => {
  parseAndValidate(config);
};

const assembleAudio = (config: ContentBlock_Audio_Config): AudioAssembly<ContentBlock_Audio_ResourceBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(config.locale);
  const base = {
    id,
    type,
    slug,
    params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Audio_Locale<'props'>> }
      : {}),
  } satisfies ContentBlock_Audio_ResourceBase;
  return { base, locale: locale as unknown as AudioLocaleFiles | undefined };
};

const assembleAudioPatch = (patch: ContentBlock_Audio_Overrides): AudioAssembly<AudioOverrideBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Audio_Locale<'props'>> }
        : {}),
    },
    locale: locale as unknown as AudioLocaleFiles | undefined,
  };
};

/** Define Audio. */
/**
 * Build-time stateless publication. The isolated merged candidate is used
 * only for validation; the published override remains sparse.
 */
export const defineAudio = <const Slug extends string>(
  config: Omit<ContentBlock_Audio_Config, 'slug'> & { slug: Slug },
) => {
  const authored = structuredClone(parseAndValidate(config));
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => audio_Config_Schema.parse(structuredClone(authored));
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Audio_Config>;

  const resource = (): AudioAssembly<ContentBlock_Audio_ResourceBase> => assembleAudio(copyAuthored());
  const overrides = (patch: ContentBlock_Audio_Overrides): AudioAssembly<AudioOverrideBase> => {
    try {
      const parsedPatch = audio_Override_Config_Schema.parse(patch);
      const effective = audio_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      return assembleAudioPatch(structuredClone(parsedPatch));
    } catch (error) {
      throw new Error(`Invalid Audio overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: error,
      });
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
      locales: (): { locale: DeepPartial<ContentBlock_Audio_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
};

export type ContentBlock_Audio_Configurator = ReturnType<typeof defineAudio>;
