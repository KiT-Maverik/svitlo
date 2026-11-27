import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ConfigWithLanguages, DeepPartial, LanguageScope, PublicationLanguageOptions } from '#types';

import { runtimeMediaLocale } from '../../_shared__contentBlocks';
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
  audio_Config_Schema,
  audio_Data_Schema,
  audio_Override_Config_Schema,
  type ContentBlock_Audio_Config,
  type ContentBlock_Audio_DataBase,
  type ContentBlock_Audio_Locale,
  type ContentBlock_Audio_Overrides,
} from './defineAudio.schemas';

type AudioLocaleFiles = Partial<Record<LanguageCode, { locale: DeepPartial<ContentBlock_Audio_Locale<'data'>> }>>;
type AudioDataPublication<Base, LocaleFiles = AudioLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type AudioOverrideDataBase = {
  params?: ContentBlock_Audio_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Audio_Locale<'data'>>;
};

const parseAndValidate = (config: ContentBlock_Audio_Config): ContentBlock_Audio_Config => {
  const parsed = audio_Config_Schema.parse(config);
  return parsed;
};
const validate = (config: ContentBlock_Audio_Config): void => {
  parseAndValidate(config);
};

const buildAudioData = (config: ContentBlock_Audio_Config): AudioDataPublication<ContentBlock_Audio_DataBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(runtimeMediaLocale(config.locale, 'fileLocation'));
  const base = {
    id,
    type,
    slug,
    params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Audio_Locale<'data'>> }
      : {}),
  } satisfies ContentBlock_Audio_DataBase;
  return {
    base,
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      AudioLocaleFiles | undefined,
  };
};

const buildAudioPatch = (patch: ContentBlock_Audio_Overrides): AudioDataPublication<AudioOverrideDataBase> => {
  const { base: invariant, locale } = splitLocalizedFields(runtimeMediaLocale(patch.locale ?? {}, 'fileLocation'));
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Audio_Locale<'data'>> }
        : {}),
    },
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      AudioLocaleFiles | undefined,
  };
};

/** Define Audio. */
/**
 * Build complete Props and validated sparse overrides. Temporary merged
 * configurations are used only for semantic validation.
 */
export const defineAudio = <
  const Slug extends string,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<ContentBlock_Audio_Config, 'slug'> & { slug: Slug } & ConfigWithLanguages<
      ContentBlock_Audio_Config,
      Languages
    >,
) => {
  const authored: ContentBlock_Audio_Config = structuredClone(config);
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => structuredClone(authored);
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Audio_Config>;

  const data = (options: PublicationLanguageOptions<Languages>): AudioDataPublication<ContentBlock_Audio_DataBase> => {
    const languages = resolvePublicationLanguages(options);
    const result = buildAudioData(parseAndValidate(copyAuthored()));
    result.locale = selectPublicationLocales(result.locale, languages);
    validateRequestedPublication(audio_Data_Schema, result, languages);
    return result;
  };

  const overrides = (
    patch: ContentBlock_Audio_Overrides,
    options: PublicationLanguageOptions<Languages>,
  ): AudioDataPublication<AudioOverrideDataBase> => {
    const languages = resolvePublicationLanguages(options);
    try {
      const parsedPatch = audio_Override_Config_Schema.parse(patch);
      const effective = audio_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      const output = buildAudioPatch(structuredClone(parsedPatch));
      output.locale = selectPublicationLocales(output.locale, languages);
      validateRequestedPublication(audio_Data_Schema, data(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(`Invalid Audio overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`, {
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
      locales: (): { locale: DeepPartial<ContentBlock_Audio_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_Audio_Configurator = ReturnType<typeof defineAudio>;
