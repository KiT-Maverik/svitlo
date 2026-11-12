import type { DeepPartial, ConfigWithLanguages, LanguageScope, ChildrenSupporting } from '#types';
import type { LanguageCodes } from '#schemas';
import { z } from 'zod';

import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  splitLocalizedFields,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import {
  carousel_Config_Schema,
  carousel_Override_Config_Schema,
  type Carousel_Metadata_Overrides,
  type ContentBlock_Carousel_Config,
  type ContentBlock_Carousel_Locale,
  type ContentBlock_Carousel_Overrides,
  type ContentBlock_Carousel_PropsBase,
  type ContentBlock_Carousel_SlideProps,
} from './defineCarousel.schemas';
import {
  carouselSlide_Published_Schema,
  type ContentBlock_CarouselSlide_Configurator,
} from './defineCarouselSlide';

type Slide = ContentBlock_CarouselSlide_Configurator;
type SlideResource = ReturnType<Slide['build']['props']>;
type SlidePatch = ReturnType<Slide['build']['overrides']>;
type CarouselLocaleBody = { locale: DeepPartial<ContentBlock_Carousel_Locale<'props'>> };
type CarouselLocaleFiles = Partial<Record<LanguageCodes, CarouselLocaleBody>>;
type CarouselPublication<Base> = { base: Base; locale: CarouselLocaleFiles | undefined };
type CarouselOverrideBase = {
  params?: Carousel_Metadata_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Carousel_Locale<'props'>>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Validate Carousel metadata and its collection boundary, never slide internals. */
const validate = (config: ContentBlock_Carousel_Config): void => {
  const parsed = carousel_Config_Schema.safeParse(config);
  if (!parsed.success) throw new Error('Invalid Carousel Config: ' + parsed.error.message);

  const issues: { check: string; path: string; message: string }[] = validateOrderedKeys(config.slides, {
    path: 'slides',
    requireNonEmpty: true,
  });
  if (isRecord(config.slides) && isRecord(config.slides.items)) {
    issues.push(...validateSluggedConfiguratorMap(config.slides.items, ['carouselSlide'], {
      path: 'slides.items',
      itemLabel: 'Carousel slide',
    }));
    for (const [key, slide] of Object.entries(config.slides.items)) {
      if (
        !isRecord(slide) ||
        !isRecord(slide.build) ||
        typeof slide.build.props !== 'function' ||
        typeof slide.build.overrides !== 'function'
      ) {
        issues.push({ check: 'item', path: 'slides.items.' + key, message: 'Carousel slide must expose the Build API' });
      }
    }
  }
  if (issues.length) throw new Error('Invalid Carousel slides: ' + issues.map(issue => issue.message).join('; '));
};

/**
 * A Carousel owns ordered slide configurators; the UI still receives plain
 * sorted slide Props. Locale arrays are atomic and contain complete slides.
 */
export const defineCarousel = <
  const Slug extends string,
  const Items extends Record<string, Slide>,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<ContentBlock_Carousel_Config, 'slug' | 'slides'> & {
    slug: Slug;
    slides: { items: Items & ChildrenSupporting<Languages, Items>; order: string[] };
  } & ConfigWithLanguages<ContentBlock_Carousel_Config, Languages>,
) => {
  validate(config);
  const metadataSchema = carousel_Config_Schema.omit({ slides: true });
  const authored = metadataSchema.parse(config);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type } = authored;
  const slug = config.slug;
  const initialItems: Items = { ...config.slides.items };
  const initialOrder = [...config.slides.order];
  const slides = { items: { ...initialItems }, order: [...initialOrder] };

  const splitOwnLocale = (input: DeepPartial<ContentBlock_Carousel_Locale<'config'>>) => {
    const { base: invariant, locale } = splitLocalizedFields(input);
    const files: CarouselLocaleFiles = {};
    for (const [language, fields] of Object.entries(locale ?? {})) {
      files[language as LanguageCodes] = {
        locale: fields as DeepPartial<ContentBlock_Carousel_Locale<'props'>>,
      };
    }
    return {
      invariant: invariant as DeepPartial<ContentBlock_Carousel_Locale<'props'>>,
      files,
    };
  };

  const buildSlides = (
    items: Record<string, Slide>,
    order: readonly string[],
    patches: Record<string, unknown> = {},
  ): { base: ContentBlock_Carousel_SlideProps[] | undefined; locale: Partial<Record<LanguageCodes, ContentBlock_Carousel_SlideProps[]>> } => {
    const entries = order.map(key => {
      const slide = items[key];
      const resource = slide.build.props();
      const patch = Object.hasOwn(patches, key)
        ? (slide.build.overrides as (patch: never) => SlidePatch)(patches[key] as never)
        : undefined;
      return { resource, patch };
    });

    const invariant = entries.map(({ resource, patch }) =>
      mergeForValidation(
        resource.base.locale ?? {},
        patch?.base.locale ?? {},
      ),
    );
    const arraySchema = z.array(carouselSlide_Published_Schema).min(1);
    const parsedInvariant = arraySchema.safeParse(invariant);

    const languages = new Set<LanguageCodes>();
    for (const { resource, patch } of entries) {
      for (const language of Object.keys(resource.locale ?? {})) languages.add(language as LanguageCodes);
      for (const language of Object.keys(patch?.locale ?? {})) languages.add(language as LanguageCodes);
    }

    const localized: Partial<Record<LanguageCodes, ContentBlock_Carousel_SlideProps[]>> = {};
    for (const language of languages) {
      const values = entries.map(({ resource, patch }) => {
        const fromResource = mergeForValidation(
          resource.base.locale ?? {},
          resource.locale?.[language]?.locale ?? {},
        );
        const withPatchBase = mergeForValidation(fromResource, patch?.base.locale ?? {});
        return mergeForValidation(withPatchBase, patch?.locale?.[language]?.locale ?? {});
      });
      const parsed = arraySchema.safeParse(values);
      if (!parsed.success) {
        throw new Error('Incomplete Carousel slides for ' + language + ': ' + parsed.error.message, {
          cause: parsed.error,
        });
      }
      localized[language] = parsed.data;
    }

    if (!parsedInvariant.success && !languages.size) {
      throw new Error('Carousel slides must be invariant or complete in their localized files');
    }
    return {
      base: parsedInvariant.success ? parsedInvariant.data : undefined,
      locale: localized,
    };
  };

  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Carousel_Config>;

  const props = (): CarouselPublication<ContentBlock_Carousel_PropsBase> => {
    const metadata = copyAuthored();
    const own = splitOwnLocale(metadata.locale);
    const built = buildSlides(initialItems, initialOrder);
    const files = own.files;

    for (const [language, entries] of Object.entries(built.locale)) {
      (files[language as LanguageCodes] ??= { locale: {} }).locale.slides = entries;
    }
    if (!built.base) {
      for (const language of Object.keys(files) as LanguageCodes[]) {
        if (!files[language]?.locale.slides) {
          throw new Error('Carousel slides are missing for localized title language ' + language);
        }
      }
    }

    return {
      base: {
        id,
        slug,
        type,
        params: metadata.params,
        ...(Object.keys(own.invariant).length || built.base
          ? { locale: { ...own.invariant, ...(built.base ? { slides: built.base } : {}) } }
          : {}),
      },
      locale: Object.keys(files).length ? files : undefined,
    };
  };

  const overrides = <const Added extends Record<string, Slide> = {}>(
    patch: ContentBlock_Carousel_Overrides<Items, Added> & {
      slides?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
  ): CarouselPublication<CarouselOverrideBase> => {
    try {
      if (!isRecord(patch)) throw new Error('Expected Carousel overrides object');
      for (const key of Object.keys(patch)) {
        if (!['params', 'locale', 'slides'].includes(key)) {
          throw new Error('Unknown Carousel override field: ' + key);
        }
      }
      const metadataPatch = carousel_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key !== 'slides')),
      );
      metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));

      const own = splitOwnLocale(metadataPatch.locale ?? {});
      const output: CarouselPublication<CarouselOverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        },
        locale: undefined,
      };
      const files = own.files;

      if (patch.slides !== undefined && !isRecord(patch.slides)) {
        throw new Error('slides must be an object');
      }
      if (patch.slides) {
        for (const key of Object.keys(patch.slides)) {
          if (!['items', 'additionalItems', 'order'].includes(key)) {
            throw new Error('Unknown Carousel slides override field: ' + key);
          }
        }
      }
      const changes = patch.slides?.items ?? {};
      if (!isRecord(changes)) throw new Error('slides.items must be a slug-keyed object');
      const additions = patch.slides?.additionalItems ?? {};
      if (!isRecord(additions)) throw new Error('slides.additionalItems must be a slug-keyed configurator map');

      const addedIssues = validateSluggedConfiguratorMap(additions, ['carouselSlide'], {
        path: 'slides.additionalItems',
        itemLabel: 'Carousel slide',
      });
      if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));

      const active: Record<string, Slide | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, slide] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Carousel slide slug: ' + key);
        if (
          !isRecord(slide) ||
          !isRecord(slide.build) ||
          typeof slide.build.props !== 'function' ||
          typeof slide.build.overrides !== 'function'
        ) {
          throw new Error('New Carousel slide must expose the Build API: ' + key);
        }
        active[key] = slide as Slide;
      }
      for (const [key, change] of Object.entries(changes)) {
        if (!Object.hasOwn(initialItems, key)) throw new Error('Cannot override an unknown existing Carousel slide: ' + key);
        if (change === false) {
          active[key] = false;
          structureChanged = true;
        } else {
          if (!isRecord(change)) throw new Error('Carousel slide overrides must be objects or false: ' + key);
          childPatches[key] = change;
        }
      }
      if (structureChanged && patch.slides?.order === undefined) {
        throw new Error('slides.order is required when adding or disabling Carousel slides');
      }
      const order = patch.slides?.order ?? initialOrder;
      const issues = validateOrderedKeys(
        { items: active, order },
        { path: 'slides', allowDisabled: true, requireNonEmpty: true },
      );
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
      if (!order.length) throw new Error('At least one active Carousel slide is required');

      const modifiesSlides =
        Object.keys(changes).length > 0 || Object.keys(additions).length > 0 || patch.slides?.order !== undefined;
      if (modifiesSlides) {
        const enabled = Object.fromEntries(
          Object.entries(active).filter((entry): entry is [string, Slide] => entry[1] !== false),
        );
        const built = buildSlides(enabled, order, childPatches);
        if (built.base) output.base.locale = { ...output.base.locale, slides: built.base };
        for (const [language, entries] of Object.entries(built.locale)) {
          (files[language as LanguageCodes] ??= { locale: {} }).locale.slides = entries;
        }
      }

      output.locale = Object.keys(files).length ? files : undefined;
      return output;
    } catch (error) {
      throw new Error(
        'Invalid Carousel overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type,
    slides,
    validate,
    build: { props, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Carousel_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_Carousel_Configurator = ReturnType<typeof defineCarousel>;
