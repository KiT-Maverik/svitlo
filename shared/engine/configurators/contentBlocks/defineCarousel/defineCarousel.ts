import { buildChildProps, buildChildOverrides, requireBuildContext } from '../../_shared__configurators';
import { z } from 'zod';

import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type {
  ChildrenSupporting,
  ConfigWithLanguages,
  DeepPartial,
  LanguageScope,
  PublicationLanguageOptions,
} from '#types';

import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  resolvePublicationLanguages,
  selectPublicationLocales,
  splitLocalizedFields,
  validateOrderedKeys,
  validateRequestedPublication,
  validateSluggedConfiguratorMap,
  scopeBuild,
} from '../../_shared__configurators';
import {
  carousel_Config_Schema,
  carousel_Override_Config_Schema,
  carousel_Props_Schema,
  carousel_Slide_Props_Schema,
  type Carousel_Metadata_Overrides,
  type ContentBlock_Carousel_Config,
  type ContentBlock_Carousel_Locale,
  type ContentBlock_Carousel_Overrides,
  type ContentBlock_Carousel_PropsBase,
  type ContentBlock_Carousel_SlideConfigurator,
  type ContentBlock_Carousel_SlideProps,
} from './defineCarousel.schemas';

type Slide = ContentBlock_Carousel_SlideConfigurator;
type SlidePatch = ReturnType<Slide['build']['overrides']>;
type CarouselLocaleBody = { locale: DeepPartial<ContentBlock_Carousel_Locale<'props'>> };
type CarouselLocaleFiles = Partial<Record<LanguageCode, CarouselLocaleBody>>;
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
    issues.push(
      ...validateSluggedConfiguratorMap(config.slides.items, ['image', 'scene'], {
        path: 'slides.items',
        itemLabel: 'Carousel slide',
      }),
    );
    for (const [key, slide] of Object.entries(config.slides.items)) {
      if (
        !isRecord(slide) ||
        !isRecord(slide.build) ||
        typeof slide.build.props !== 'function' ||
        typeof slide.build.overrides !== 'function'
      ) {
        issues.push({
          check: 'item',
          path: 'slides.items.' + key,
          message: 'Carousel slide must expose the Build API',
        });
      }
    }
  }
  if (issues.length) throw new Error('Invalid Carousel slides: ' + issues.map(issue => issue.message).join('; '));
};

/**
 * Display images and registered interactive Scenes in one ordered Carousel.
 *
 * @remarks
 * Author each slide with `defineImage` or `defineScene`. `slides.order` controls the
 * pedagogical sequence; at least one slide must remain enabled.
 *
 * @example
 * ```ts
 * slides: {
 *   items: configuratorArrayToSlugMap([firstSlide, secondSlide]),
 *   order: ['firstSlide', 'secondSlide'],
 * }
 * ```
 */
export const defineCarousel = <
  const Slug extends string,
  const Items extends Record<string, Slide>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<ContentBlock_Carousel_Config, 'slug' | 'slides'> & {
    slug: Slug;
    slides: { items: Items & ChildrenSupporting<Languages, Items>; order: string[] };
  } & ConfigWithLanguages<ContentBlock_Carousel_Config, Languages>,
) => {
  const metadataSchema = carousel_Config_Schema.omit({ slides: true });
  const { slides: _slides, ...metadataInput } = config;
  const authored: Omit<ContentBlock_Carousel_Config, 'slides'> = structuredClone(metadataInput);
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
      files[language as LanguageCode] = {
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
  ): {
    base: ContentBlock_Carousel_SlideProps[] | undefined;
    locale: Partial<Record<LanguageCode, ContentBlock_Carousel_SlideProps[]>>;
  } => {
    const { languages } = requireBuildContext();
    const entries = order
      .map(key => {
        const slide = items[key];
        const resource = buildChildProps(slide);
        const patch = Object.hasOwn(patches, key)
          ? (buildChildOverrides(slide, patches[key] as never) as unknown as SlidePatch)
          : undefined;
        return { resource, patch };
      })
      .filter(({ resource, patch }) => {
        // Disabled children are absent from resolved Carousel Props, like other nested
        // ContentBlocks. Preserve the authored collection and its order unchanged.
        const effective = mergeForValidation(resource.base, patch?.base ?? {});
        return effective.params.disabled !== true;
      });
    if (!entries.length) throw new Error('At least one active Carousel slide is required');

    const arraySchema = z.array(carousel_Slide_Props_Schema).min(1);
    const invariant = entries.map(({ resource, patch }) => mergeForValidation(resource.base, patch?.base ?? {}));
    const parsedInvariant = arraySchema.safeParse(invariant);

    const translatedLanguages = languages.filter(language =>
      entries.some(
        ({ resource, patch }) => resource.locale?.[language] !== undefined || patch?.locale?.[language] !== undefined,
      ),
    );
    const localized: Partial<Record<LanguageCode, ContentBlock_Carousel_SlideProps[]>> = {};
    for (const language of translatedLanguages) {
      const values = entries.map(({ resource, patch }) => {
        const withLocale = mergeForValidation(resource.base, resource.locale?.[language] ?? {});
        const withPatchBase = mergeForValidation(withLocale, patch?.base ?? {});
        return mergeForValidation(withPatchBase, patch?.locale?.[language] ?? {});
      });
      const parsed = arraySchema.safeParse(values);
      if (!parsed.success) {
        throw new Error('Incomplete Carousel slides for ' + language + ': ' + parsed.error.message, {
          cause: parsed.error,
        });
      }
      localized[language] = parsed.data;
    }

    if (!parsedInvariant.success && !translatedLanguages.length) {
      throw new Error('Carousel slides must be invariant or complete in their localized files');
    }
    return { base: parsedInvariant.success ? parsedInvariant.data : undefined, locale: localized };
  };

  const base = {
    id,
    slug,
    type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Carousel_Config>;

  const props = (
    options: PublicationLanguageOptions<Languages>,
  ): CarouselPublication<ContentBlock_Carousel_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    validate({ ...copyAuthored(), slides: { items: initialItems, order: initialOrder } });
    const metadata = copyAuthored();
    const own = splitOwnLocale(metadata.locale);
    const built = buildSlides(initialItems, initialOrder);
    const files = selectPublicationLocales(own.files, languages) ?? {};

    for (const [language, entries] of Object.entries(built.locale)) {
      (files[language as LanguageCode] ??= { locale: {} }).locale.slides = entries;
    }
    if (!built.base) {
      for (const language of Object.keys(files) as LanguageCode[]) {
        if (!files[language]?.locale.slides) {
          throw new Error('Carousel slides are missing for localized title language ' + language);
        }
      }
    }

    const result = {
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
    validateRequestedPublication(carousel_Props_Schema, result, languages);
    return result;
  };

  const overrides = <const Added extends Record<string, Slide> = {}>(
    patch: ContentBlock_Carousel_Overrides<Items, Added> & {
      slides?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): CarouselPublication<CarouselOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ ...copyAuthored(), slides: { items: initialItems, order: initialOrder } });
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
      const files = selectPublicationLocales(own.files, languages) ?? {};

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

      const addedIssues = validateSluggedConfiguratorMap(additions, ['image', 'scene'], {
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
        if (!Object.hasOwn(initialItems, key))
          throw new Error('Cannot override an unknown existing Carousel slide: ' + key);
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

      const sourcePublication = props(options);
      const modifiesSlides =
        Object.keys(changes).length > 0 || Object.keys(additions).length > 0 || patch.slides?.order !== undefined;
      if (modifiesSlides) {
        const enabled = Object.fromEntries(
          Object.entries(active).filter((entry): entry is [string, Slide] => entry[1] !== false),
        );
        const built = buildSlides(enabled, order, childPatches);
        if (built.base) output.base.locale = { ...output.base.locale, slides: built.base };
        for (const [language, entries] of Object.entries(built.locale)) {
          (files[language as LanguageCode] ??= { locale: {} }).locale.slides = entries;
        }
        // When a localized child is disabled or removed, the remaining slides may
        // be invariant. Override the original language-specific arrays as well;
        // otherwise the old arrays would resurrect the removed slide at assembly.
        if (built.base) {
          for (const language of languages) {
            if (sourcePublication.locale?.[language]?.locale.slides && !built.locale[language]) {
              (files[language] ??= { locale: {} }).locale.slides = structuredClone(built.base);
            }
          }
        }
      }

      output.locale = Object.keys(files).length ? files : undefined;
      validateRequestedPublication(carousel_Props_Schema, sourcePublication, languages, output);
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
    build: scopeBuild({ props, overrides }),
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
