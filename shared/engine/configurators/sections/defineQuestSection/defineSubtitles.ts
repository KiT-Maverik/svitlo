import type { ConfigWithLanguages, LanguageScope, PublicationLanguageOptions, DeepPartial } from '#types';
import type { AllLanguageCodes, LanguageCode } from '#schemas';
import { mergeForValidation, onlyLocales, onlyStrings, resolvePublicationLanguages, selectPublicationLocales,
  splitLocalizedFields, validateRequestedPublication } from '../../_shared__configurators';
import { validateLocalAssetPaths } from '../../contentBlocks/_shared__contentBlocks';
import { questSubtitles_Config_Schema, questSubtitles_Props_Schema, questSubtitles_Override_Schema,
  type QuestSubtitles_Config, type QuestSubtitles_Overrides } from './defineQuestSection.schemas';

export const defineSubtitles = <
  const Slug extends string,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(config: Omit<QuestSubtitles_Config, 'slug'> & { slug: Slug } &
  ConfigWithLanguages<QuestSubtitles_Config, Languages>) => {
  const parse = (value: QuestSubtitles_Config) => {
    const parsed = questSubtitles_Config_Schema.parse(value);
    validateLocalAssetPaths(parsed.locale.fileLocation, 'locale.fileLocation');
    return parsed;
  };
  const authored = structuredClone(parse(config));
  const { id, slug, type } = authored;
  const validate = (value: QuestSubtitles_Config) => { parse(value); };
  const files = (locale: DeepPartial<QuestSubtitles_Config['locale']>) => {
    const split = splitLocalizedFields(locale);
    return {
      base: Object.keys(split.base).length ? { locale: split.base } : {},
      locale: split.locale === undefined ? undefined :
        Object.fromEntries(Object.entries(split.locale).map(([lang, props]) => [lang, { locale: props }])) as
          Partial<Record<LanguageCode, { locale: unknown }>>,
    };
  };
  const props = (options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    const resource = files(structuredClone(authored.locale));
    const output = { base: { id, slug, type, params: authored.params, ...resource.base },
      locale: selectPublicationLocales(resource.locale, languages) };
    validateRequestedPublication(questSubtitles_Props_Schema, output, languages);
    return output;
  };
  const overrides = (patch: QuestSubtitles_Overrides, options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    const validated = questSubtitles_Override_Schema.parse(patch);
    validate(mergeForValidation<QuestSubtitles_Config>(authored, validated));
    const resource = files(validated.locale ?? {});
    const output = { base: { ...(validated.params ? { params: validated.params } : {}), ...resource.base },
      locale: selectPublicationLocales(resource.locale, languages) };
    validateRequestedPublication(questSubtitles_Props_Schema, props(options), languages, output);
    return output;
  };
  const result = {
    id, slug, type, validate,
    build: { props, overrides },
    config: {
      base: { id, slug, type, params: structuredClone(authored.params), locale: onlyStrings(authored.locale) },
      locales: () => ({ locale: onlyLocales(authored.locale) }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};
export type QuestSubtitles_Configurator = ReturnType<typeof defineSubtitles>;
