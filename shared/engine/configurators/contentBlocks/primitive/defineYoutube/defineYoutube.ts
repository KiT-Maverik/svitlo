import { UNRESOLVED_YOUTUBE_HREF, type AllLanguageCodes, type LanguageCode } from '#schemas';
import type { ConfigWithLanguages, DeepPartial, LanguageScope, PublicationLanguageOptions } from '#types';

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
  youtube_Config_Schema,
  youtube_Data_Schema,
  youtube_Override_Config_Schema,
  type ContentBlock_Youtube_Config,
  type ContentBlock_Youtube_DataBase,
  type ContentBlock_Youtube_Locale,
  type ContentBlock_Youtube_Overrides,
} from './defineYoutube.schemas';

type YoutubeLocaleFiles = Partial<Record<LanguageCode, { locale: DeepPartial<ContentBlock_Youtube_Locale<'data'>> }>>;
type YoutubeDataPublication<Base, LocaleFiles = YoutubeLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type YoutubeOverrideDataBase = {
  params?: ContentBlock_Youtube_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Youtube_Locale<'data'>>;
};

const parseAndValidate = (config: ContentBlock_Youtube_Config): ContentBlock_Youtube_Config => {
  const parsed = youtube_Config_Schema.parse(config);

  return parsed;
};
const validate = (config: ContentBlock_Youtube_Config): void => {
  parseAndValidate(config);
};

function assertResolvedHref(href: ContentBlock_Youtube_Config['locale']['href']): void {
  if (
    href === UNRESOLVED_YOUTUBE_HREF ||
    (typeof href === 'object' && Object.values(href).includes(UNRESOLVED_YOUTUBE_HREF))
  ) {
    throw new Error('YouTube publication blocked: unresolved video reference');
  }
}

const buildYoutubeData = (
  config: ContentBlock_Youtube_Config,
): YoutubeDataPublication<ContentBlock_Youtube_DataBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(config.locale);
  const base = {
    id,
    type,
    slug,
    params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Youtube_Locale<'data'>> }
      : {}),
  } satisfies ContentBlock_Youtube_DataBase;
  return {
    base,
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      YoutubeLocaleFiles | undefined,
  };
};

const buildYoutubePatch = (patch: ContentBlock_Youtube_Overrides): YoutubeDataPublication<YoutubeOverrideDataBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Youtube_Locale<'data'>> }
        : {}),
    },
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      YoutubeLocaleFiles | undefined,
  };
};

/**
 * Reference a YouTube video as either a link or an embedded player.
 *
 * @remarks
 * Set `params.mode` to `'embed'` for inline viewing or `'link'` for
 * navigation to the video in `locale.href`. The required `locale.label`
 * identifies the video for the iframe/link and fallback UI.
 * `locale.title` is an optional visible heading, not its accessible label.
 */
export const defineYoutube = <
  const Slug extends string,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<ContentBlock_Youtube_Config, 'slug'> & { slug: Slug } & ConfigWithLanguages<
      ContentBlock_Youtube_Config,
      Languages
    >,
) => {
  const authored: ContentBlock_Youtube_Config = structuredClone(config);
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => structuredClone(authored);
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Youtube_Config>;

  const data = (
    options: PublicationLanguageOptions<Languages>,
  ): YoutubeDataPublication<ContentBlock_Youtube_DataBase> => {
    const languages = resolvePublicationLanguages(options);
    const parsed = parseAndValidate(copyAuthored());
    if (options.mode !== 'draft') assertResolvedHref(parsed.locale.href);
    const result = buildYoutubeData(parsed);
    result.locale = selectPublicationLocales(result.locale, languages);
    validateRequestedPublication(youtube_Data_Schema, result, languages);
    return result;
  };

  const overrides = (
    patch: ContentBlock_Youtube_Overrides,
    options: PublicationLanguageOptions<Languages>,
  ): YoutubeDataPublication<YoutubeOverrideDataBase> => {
    const languages = resolvePublicationLanguages(options);
    try {
      const parsedPatch = youtube_Override_Config_Schema.parse(patch);
      const effective = youtube_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      if (options.mode !== 'draft') assertResolvedHref(effective.locale.href);
      const output = buildYoutubePatch(structuredClone(parsedPatch));
      output.locale = selectPublicationLocales(output.locale, languages);
      validateRequestedPublication(youtube_Data_Schema, data(options), languages, output);
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
    build: scopeBuild({ data, overrides }),
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
