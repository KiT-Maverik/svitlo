import type { DeepPartial, ConfigWithLanguages, LanguageScope, PublicationLanguageOptions } from '#types';
import type { AllLanguageCodes, LanguageCodes } from '#schemas';

import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  splitLocalizedFields,
  resolvePublicationLanguages,
  selectPublicationLocales,
  validateRequestedPublication,
} from '../../_shared__configurators';
import { validateLocalAssetPaths } from '../_shared__contentBlocks';
import {
  audio_Config_Schema,
  audio_Props_Schema,
  audio_Override_Config_Schema,
  type ContentBlock_Audio_Config,
  type ContentBlock_Audio_Locale,
  type ContentBlock_Audio_Overrides,
  type ContentBlock_Audio_PropsBase,
} from './defineAudio.schemas';

type AudioLocaleFiles = Partial<Record<LanguageCodes, { locale: DeepPartial<ContentBlock_Audio_Locale<'props'>> }>>;
type AudioPropsPublication<Base, LocaleFiles = AudioLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type AudioOverridePropsBase = {
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

const buildAudioProps = (config: ContentBlock_Audio_Config): AudioPropsPublication<ContentBlock_Audio_PropsBase> => {
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
  } satisfies ContentBlock_Audio_PropsBase;
  return {
    base,
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      AudioLocaleFiles | undefined,
  };
};

const buildAudioPatch = (patch: ContentBlock_Audio_Overrides): AudioPropsPublication<AudioOverridePropsBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Audio_Locale<'props'>> }
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
export const defineAudio = <const Slug extends string, const Languages extends readonly LanguageCodes[] = AllLanguageCodes>(
  config: Omit<ContentBlock_Audio_Config, 'slug'> & { slug: Slug } & ConfigWithLanguages<
      ContentBlock_Audio_Config,
      Languages
    >,
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

  const props = (
    options: PublicationLanguageOptions<Languages>,
  ): AudioPropsPublication<ContentBlock_Audio_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    const result = buildAudioProps(parseAndValidate(copyAuthored()));
    result.locale = selectPublicationLocales(result.locale, languages);
    validateRequestedPublication(audio_Props_Schema, result, languages);
    return result;
  };

  const overrides = (
    patch: ContentBlock_Audio_Overrides,
    options: PublicationLanguageOptions<Languages>,
  ): AudioPropsPublication<AudioOverridePropsBase> => {
    const languages = resolvePublicationLanguages(options);
    try {
      const parsedPatch = audio_Override_Config_Schema.parse(patch);
      const effective = audio_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      const output = buildAudioPatch(structuredClone(parsedPatch));
      output.locale = selectPublicationLocales(output.locale, languages);
      validateRequestedPublication(audio_Props_Schema, props(options), languages, output);
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
    build: { props, overrides },
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
