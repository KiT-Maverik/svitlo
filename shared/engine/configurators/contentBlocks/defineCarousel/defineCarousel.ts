import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';

import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  splitLocalizedFields,
  wrapLocale,
  type WrappedLocaleFiles,
} from '../../_shared__configurators';
import { validateLocalAssetPaths } from '../_shared__contentBlocks';
import {
  carousel_Config_Schema,
  carousel_Props_Schema,
  carousel_Override_Config_Schema,
  type ContentBlock_Carousel_Config,
  type ContentBlock_Carousel_Locale,
  type ContentBlock_Carousel_Overrides,
  type ContentBlock_Carousel_ResourceBase,
} from './defineCarousel.schemas';

type CarouselLocaleFiles = Partial<Record<LanguageCodes, DeepPartial<ContentBlock_Carousel_Locale<'props'>>>>;
type CarouselEmbeddedLocaleFiles = WrappedLocaleFiles<DeepPartial<ContentBlock_Carousel_Locale<'props'>>>;
type CarouselAssembly<Base, LocaleFiles = CarouselLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type CarouselOverrideBase = {
  params?: ContentBlock_Carousel_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Carousel_Locale<'props'>>;
};

const parseAndValidate = (config: ContentBlock_Carousel_Config): ContentBlock_Carousel_Config => {
  const parsed = carousel_Config_Schema.parse(config);
  parsed.locale.slides.forEach((slide, index) => validateLocalAssetPaths(slide.src, `locale.slides[${index}].src`));
  return parsed;
};
const validate = (config: ContentBlock_Carousel_Config): void => {
  parseAndValidate(config);
};

/** Arrays are atomic, so each published language receives complete slide Props. */
const validatePublishedSlides = (locale: CarouselLocaleFiles | undefined): void => {
  for (const [language, fields] of Object.entries(locale ?? {})) {
    if (fields.slides !== undefined) {
      const parsed = carousel_Props_Schema.shape.locale.shape.slides.safeParse(fields.slides);
      if (!parsed.success) {
        throw new Error(`Incomplete Carousel slides for ${language}: ${parsed.error.message}`, { cause: parsed.error });
      }
    }
  }
};

const assembleCarousel = (
  config: ContentBlock_Carousel_Config,
): CarouselAssembly<ContentBlock_Carousel_ResourceBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(config.locale);
  const base = {
    id,
    type,
    slug,
    params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Carousel_Locale<'props'>> }
      : {}),
  } satisfies ContentBlock_Carousel_ResourceBase;
  const files = locale as unknown as CarouselLocaleFiles | undefined;
  validatePublishedSlides(files);
  return { base, locale: files };
};

const assembleCarouselPatch = (patch: ContentBlock_Carousel_Overrides): CarouselAssembly<CarouselOverrideBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  const files = locale as unknown as CarouselLocaleFiles | undefined;
  validatePublishedSlides(files);
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Carousel_Locale<'props'>> }
        : {}),
    },
    locale: files,
  };
};

/** Define Carousel. */
/**
 * Build-time stateless publication. The isolated merged candidate is used
 * only for validation; the published override remains sparse.
 */
export const defineCarousel = <const Slug extends string>(
  config: Omit<ContentBlock_Carousel_Config, 'slug'> & { slug: Slug },
) => {
  const authored = structuredClone(parseAndValidate(config));
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => carousel_Config_Schema.parse(structuredClone(authored));
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Carousel_Config>;

  function resource(): CarouselAssembly<ContentBlock_Carousel_ResourceBase>;
  function resource(options: { embed: true }): CarouselAssembly<ContentBlock_Carousel_ResourceBase, CarouselEmbeddedLocaleFiles>;
  function resource(
    options?: { embed?: true },
  ): CarouselAssembly<ContentBlock_Carousel_ResourceBase, CarouselLocaleFiles | CarouselEmbeddedLocaleFiles> {
    const assembled = assembleCarousel(copyAuthored());
    return options?.embed ? { base: assembled.base, locale: wrapLocale(assembled.locale) } : assembled;
  }
  const overrides = (patch: ContentBlock_Carousel_Overrides): CarouselAssembly<CarouselOverrideBase> => {
    try {
      const parsedPatch = carousel_Override_Config_Schema.parse(patch);
      const effective = carousel_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      return assembleCarouselPatch(structuredClone(parsedPatch));
    } catch (error) {
      throw new Error(
        `Invalid Carousel overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`,
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
      locales: (): { locale: DeepPartial<ContentBlock_Carousel_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
};

export type ContentBlock_Carousel_Configurator = ReturnType<typeof defineCarousel>;
