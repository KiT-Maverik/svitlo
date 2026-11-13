import type { DeepPartial, ConfigWithLanguages, LanguageScope, PublicationLanguageOptions } from '#types';
import type { LanguageCodes } from '#schemas';

import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  splitLocalizedFields,
  resolvePublicationLanguages,
  selectPublicationLocales,
  validateRequestedPublication,
} from '../../_shared__configurators';
import {
  youtube_Config_Schema,
  youtube_Props_Schema,
  youtube_Override_Config_Schema,
  type ContentBlock_Youtube_Config,
  type ContentBlock_Youtube_Locale,
  type ContentBlock_Youtube_Overrides,
  type ContentBlock_Youtube_PropsBase,
} from './defineYoutube.schemas';

type YoutubeLocaleFiles = Partial<Record<LanguageCodes, { locale: DeepPartial<ContentBlock_Youtube_Locale<'props'>> }>>;
type YoutubePropsPublication<Base, LocaleFiles = YoutubeLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type YoutubeOverridePropsBase = {
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

const buildYoutubeProps = (
  config: ContentBlock_Youtube_Config,
): YoutubePropsPublication<ContentBlock_Youtube_PropsBase> => {
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
  } satisfies ContentBlock_Youtube_PropsBase;
  return {
    base,
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      YoutubeLocaleFiles | undefined,
  };
};

const buildYoutubePatch = (
  patch: ContentBlock_Youtube_Overrides,
): YoutubePropsPublication<YoutubeOverridePropsBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Youtube_Locale<'props'>> }
        : {}),
    },
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      YoutubeLocaleFiles | undefined,
  };
};

/** Define Youtube. */
/**
 * Stateless ContentBlock Build API validates isolated snapshots and emits
 * either complete Props or exclusively sparse override fields.
 */
export const defineYoutube = <const Slug extends string, const Languages extends readonly LanguageCodes[] = []>(
  config: Omit<ContentBlock_Youtube_Config, 'slug'> & { slug: Slug } & ConfigWithLanguages<
      ContentBlock_Youtube_Config,
      Languages
    >,
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

  const props = (
    options: PublicationLanguageOptions<Languages>,
  ): YoutubePropsPublication<ContentBlock_Youtube_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    const result = buildYoutubeProps(parseAndValidate(copyAuthored()));
    result.locale = selectPublicationLocales(result.locale, languages);
    validateRequestedPublication(youtube_Props_Schema, result, languages);
    return result;
  };

  const overrides = (
    patch: ContentBlock_Youtube_Overrides,
    options: PublicationLanguageOptions<Languages>,
  ): YoutubePropsPublication<YoutubeOverridePropsBase> => {
    const languages = resolvePublicationLanguages(options);
    try {
      const parsedPatch = youtube_Override_Config_Schema.parse(patch);
      const effective = youtube_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      const output = buildYoutubePatch(structuredClone(parsedPatch));
      output.locale = selectPublicationLocales(output.locale, languages);
      validateRequestedPublication(youtube_Props_Schema, props(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(
        `Invalid Youtube overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`,
        {
          cause: error,
        },
      );
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
      locales: (): { locale: DeepPartial<ContentBlock_Youtube_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_Youtube_Configurator = ReturnType<typeof defineYoutube>;
