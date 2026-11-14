import type { ConfigWithLanguages, LanguageScope, PublicationLanguageOptions, DeepPartial } from '#types';
import type { AllLanguageCodes, LanguageCode } from '#schemas';
import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  resolvePublicationLanguages,
  selectPublicationLocales,
  splitLocalizedFields,
  validateRequestedPublication,
} from '../../_shared__configurators';
import { validateLocalAssetPaths } from '../_shared__contentBlocks';
import {
  subtitles_Config_Schema,
  subtitles_Props_Schema,
  subtitles_Override_Config_Schema,
  type ContentBlock_Subtitles_Config,
  type ContentBlock_Subtitles_Overrides,
} from './defineSubtitles.schemas';

export const defineSubtitles = <
  const Slug extends string,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<ContentBlock_Subtitles_Config, 'slug'> & { slug: Slug } & ConfigWithLanguages<
      ContentBlock_Subtitles_Config,
      Languages
    >,
) => {
  const parse = (value: ContentBlock_Subtitles_Config) => {
    const parsed = subtitles_Config_Schema.parse(value);
    validateLocalAssetPaths(parsed.locale.fileLocation, 'locale.fileLocation');
    return parsed;
  };
  const authored = structuredClone(parse(config));
  const { id, slug, type } = authored;
  const validate = (value: ContentBlock_Subtitles_Config) => {
    parse(value);
  };
  const files = (locale: DeepPartial<ContentBlock_Subtitles_Config['locale']>) => {
    const split = splitLocalizedFields(locale);
    return {
      base: Object.keys(split.base).length ? { locale: split.base } : {},
      locale:
        split.locale === undefined
          ? undefined
          : (Object.fromEntries(
              Object.entries(split.locale).map(([lang, props]) => [lang, { locale: props }]),
            ) as Partial<Record<LanguageCode, { locale: unknown }>>),
    };
  };
  const props = (options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    const resource = files(structuredClone(authored.locale));
    const output = {
      base: { id, slug, type, params: authored.params, ...resource.base },
      locale: selectPublicationLocales(resource.locale, languages),
    };
    validateRequestedPublication(subtitles_Props_Schema, output, languages);
    return output;
  };
  const overrides = (patch: ContentBlock_Subtitles_Overrides, options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    const validated = subtitles_Override_Config_Schema.parse(patch);
    validate(mergeForValidation<ContentBlock_Subtitles_Config>(authored, validated));
    const resource = files(validated.locale ?? {});
    const output = {
      base: { ...(validated.params ? { params: validated.params } : {}), ...resource.base },
      locale: selectPublicationLocales(resource.locale, languages),
    };
    validateRequestedPublication(subtitles_Props_Schema, props(options), languages, output);
    return output;
  };
  const result = {
    id,
    slug,
    type,
    validate,
    build: { props, overrides },
    config: {
      base: { id, slug, type, params: structuredClone(authored.params), locale: onlyStrings(authored.locale) },
      locales: () => ({ locale: onlyLocales(authored.locale) }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};
export type ContentBlock_Subtitles_Configurator = ReturnType<typeof defineSubtitles>;
