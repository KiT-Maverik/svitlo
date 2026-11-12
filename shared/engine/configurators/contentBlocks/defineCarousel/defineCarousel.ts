import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';

import { mergeForValidation, onlyLocales, onlyStrings, splitLocalizedFields } from '../../_shared__configurators';
import { validateLocalAssetPaths } from '../_shared__contentBlocks';
import {
  carousel_Config_Schema,
  carousel_Override_Config_Schema,
  type ContentBlock_Carousel_Config,
  type ContentBlock_Carousel_Locale,
  type ContentBlock_Carousel_Overrides,
  type ContentBlock_Carousel_ResourceBase,
} from './defineCarousel.schemas';

type CarouselLocaleFiles = Partial<Record<LanguageCodes, DeepPartial<ContentBlock_Carousel_Locale<'props'>>>>;
type CarouselAssembly<Base> = { base: Base; locale: CarouselLocaleFiles | undefined };
type CarouselOverrideBase = {
  params?: ContentBlock_Carousel_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Carousel_Locale<'props'>>;
};

const parseAndValidate = (config: ContentBlock_Carousel_Config): ContentBlock_Carousel_Config => {
  const parsed = carousel_Config_Schema.parse(config);
  parsed.locale.slides.forEach((slide, index) => validateLocalAssetPaths(slide.src, `locale.slides[${index}].src`));
  return parsed;
};
const validate = (config: ContentBlock_Carousel_Config): void => { parseAndValidate(config); };

const assembleCarousel = (config: ContentBlock_Carousel_Config): CarouselAssembly<ContentBlock_Carousel_ResourceBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(config.locale);
  const base = {
    id, type, slug, params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Carousel_Locale<'props'>> }
      : {}),
  } satisfies ContentBlock_Carousel_ResourceBase;
  return { base, locale: locale as unknown as CarouselLocaleFiles | undefined };
};

const assembleCarouselPatch = (patch: ContentBlock_Carousel_Overrides): CarouselAssembly<CarouselOverrideBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Carousel_Locale<'props'>> }
        : {}),
    },
    locale: locale as unknown as CarouselLocaleFiles | undefined,
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
    id, type, slug, params: structuredClone(authored.params), locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Carousel_Config>;

  const resource = (): CarouselAssembly<ContentBlock_Carousel_ResourceBase> => assembleCarousel(copyAuthored());
  const overrides = (patch: ContentBlock_Carousel_Overrides): CarouselAssembly<CarouselOverrideBase> => {
    try {
      const parsedPatch = carousel_Override_Config_Schema.parse(patch);
      const effective = carousel_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      return assembleCarouselPatch(structuredClone(parsedPatch));
    } catch (error) {
      throw new Error(`Invalid Carousel overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: error,
      });
    }
  };
  return {
    id, slug, type, validate,
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
