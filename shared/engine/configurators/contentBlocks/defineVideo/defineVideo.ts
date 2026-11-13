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
  video_Config_Schema,
  video_Props_Schema,
  video_Override_Config_Schema,
  type ContentBlock_Video_Config,
  type ContentBlock_Video_Locale,
  type ContentBlock_Video_Overrides,
  type ContentBlock_Video_PropsBase,
} from './defineVideo.schemas';

type VideoLocaleFiles = Partial<Record<LanguageCodes, { locale: DeepPartial<ContentBlock_Video_Locale<'props'>> }>>;
type VideoPropsPublication<Base, LocaleFiles = VideoLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type VideoOverridePropsBase = {
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

const buildVideoProps = (config: ContentBlock_Video_Config): VideoPropsPublication<ContentBlock_Video_PropsBase> => {
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
  } satisfies ContentBlock_Video_PropsBase;
  return {
    base,
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      VideoLocaleFiles | undefined,
  };
};

const buildVideoPatch = (patch: ContentBlock_Video_Overrides): VideoPropsPublication<VideoOverridePropsBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Video_Locale<'props'>> }
        : {}),
    },
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      VideoLocaleFiles | undefined,
  };
};

/**
 * Add a video as an instructional ContentBlock.
 *
 * @remarks
 * `locale.fileLocation` points to the video and `locale.poster` to its preview.
 * `locale.label` names the player accessibly; `locale.title` is an optional
 * visible heading, not a substitute for the label. Local textbook assets
 * are checked where the textbook can be resolved.
 * Author fallback messages for offline/unavailable playback when appropriate.
 */
export const defineVideo = <
  const Slug extends string,
  const Languages extends readonly LanguageCodes[] = AllLanguageCodes,
>(
  config: Omit<ContentBlock_Video_Config, 'slug'> & { slug: Slug } & ConfigWithLanguages<
      ContentBlock_Video_Config,
      Languages
    >,
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

  const props = (
    options: PublicationLanguageOptions<Languages>,
  ): VideoPropsPublication<ContentBlock_Video_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    const result = buildVideoProps(parseAndValidate(copyAuthored()));
    result.locale = selectPublicationLocales(result.locale, languages);
    validateRequestedPublication(video_Props_Schema, result, languages);
    return result;
  };

  const overrides = (
    patch: ContentBlock_Video_Overrides,
    options: PublicationLanguageOptions<Languages>,
  ): VideoPropsPublication<VideoOverridePropsBase> => {
    const languages = resolvePublicationLanguages(options);
    try {
      const parsedPatch = video_Override_Config_Schema.parse(patch);
      const effective = video_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      const output = buildVideoPatch(structuredClone(parsedPatch));
      output.locale = selectPublicationLocales(output.locale, languages);
      validateRequestedPublication(video_Props_Schema, props(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(`Invalid Video overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`, {
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
      locales: (): { locale: DeepPartial<ContentBlock_Video_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_Video_Configurator = ReturnType<typeof defineVideo>;
