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
} from '../../../_shared__configurators';
import { validateLocalAssetPaths } from '../../_shared__contentBlocks';
import {
  carouselSlide_Config_Schema,
  carouselSlide_Props_Schema,
  carouselSlide_Override_Config_Schema,
  type ContentBlock_CarouselSlide_Config,
  type ContentBlock_CarouselSlide_Overrides,
  type ContentBlock_CarouselSlide_Fields,
} from './defineCarouselSlide.schemas';

type SlideLocaleBody = { locale: Partial<ContentBlock_CarouselSlide_Fields> };
type SlideLocaleFiles = Partial<Record<LanguageCodes, SlideLocaleBody>>;
type SlideBase = Pick<ContentBlock_CarouselSlide_Config, 'id' | 'slug' | 'type'> & {
  locale?: Partial<ContentBlock_CarouselSlide_Fields>;
};
type SlideOverrideBase = { locale?: Partial<ContentBlock_CarouselSlide_Fields> };
type SlidePublication<Base> = { base: Base; locale: SlideLocaleFiles | undefined };

const parseAndValidate = (config: ContentBlock_CarouselSlide_Config): ContentBlock_CarouselSlide_Config => {
  const parsed = carouselSlide_Config_Schema.parse(config);
  validateLocalAssetPaths(parsed.locale.src, 'locale.src');
  return parsed;
};

const publishLocale = (input: DeepPartial<ContentBlock_CarouselSlide_Config['locale']>) => {
  const { base, locale } = splitLocalizedFields(input);
  return {
    invariant: base as Partial<ContentBlock_CarouselSlide_Fields>,
    files:
      locale === undefined
        ? undefined
        : (Object.fromEntries(
            Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]),
          ) as SlideLocaleFiles),
  };
};

/** Slide identity never appears in the Carousel's UI slides array. */
export const defineCarouselSlide = <const Slug extends string, const Languages extends readonly LanguageCodes[] = []>(
  config: Omit<ContentBlock_CarouselSlide_Config, 'slug'> & { slug: Slug } & ConfigWithLanguages<
      ContentBlock_CarouselSlide_Config,
      Languages
    >,
) => {
  const authored = structuredClone(parseAndValidate(config));
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => carouselSlide_Config_Schema.parse(structuredClone(authored));

  const props = (options: PublicationLanguageOptions<Languages>): SlidePublication<SlideBase> => {
    const languages = resolvePublicationLanguages(options);
    const own = publishLocale(copyAuthored().locale);
    const result = {
      base: { id, slug, type, ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}) },
      locale: selectPublicationLocales(own.files, languages),
    };
    validateRequestedPublication(carouselSlide_Props_Schema, result, languages);
    return result;
  };
  const overrides = (
    patch: ContentBlock_CarouselSlide_Overrides,
    options: PublicationLanguageOptions<Languages>,
  ): SlidePublication<SlideOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      const parsed = carouselSlide_Override_Config_Schema.parse(patch);
      parseAndValidate(carouselSlide_Config_Schema.parse(mergeForValidation(copyAuthored(), parsed)));
      const own = publishLocale(parsed.locale ?? {});
      const result = {
        base: Object.keys(own.invariant).length ? { locale: own.invariant } : {},
        locale: selectPublicationLocales(own.files, languages),
      };
      validateRequestedPublication(carouselSlide_Props_Schema, props(options), languages, result);
      return result;
    } catch (error) {
      throw new Error(
        'Invalid Carousel Slide overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };
  const result = {
    id,
    slug,
    type,
    validate: (value: ContentBlock_CarouselSlide_Config): void => {
      parseAndValidate(value);
    },
    build: { props, overrides },
    config: {
      base: { id, slug, type, locale: onlyStrings(authored.locale) },
      locales: (): { locale: DeepPartial<ContentBlock_CarouselSlide_Config['locale']> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_CarouselSlide_Configurator = ReturnType<typeof defineCarouselSlide>;
