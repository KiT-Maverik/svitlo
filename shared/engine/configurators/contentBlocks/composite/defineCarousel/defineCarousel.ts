import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type {
  ChildrenSupporting,
  ConfigWithLanguages,
  DeepPartial,
  LanguageScope,
  PublicationLanguageOptions,
} from '#types';

import {
  buildChildData,
  buildChildOverrides,
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  requireBuildContext,
  resolvePublicationLanguages,
  scopeBuild,
  selectPublicationLocales,
  slugAddressedReservedKeys,
  splitLocalizedFields,
  validateOrderedKeys,
  validateSlugAddressedPublication,
  validateSluggedConfiguratorMap,
  type AddedPlacementsFromPatch,
  type SafePlacementMap,
} from '../../../_shared__configurators';
import {
  carousel_Config_Schema,
  carousel_Data_Schema,
  carousel_Metadata_Config_Schema,
  carousel_Override_Config_Schema,
  carouselSlideTypes,
  type Carousel_Metadata_Overrides,
  type ContentBlock_Carousel_Config,
  type ContentBlock_Carousel_DataBase,
  type ContentBlock_Carousel_Locale,
  type ContentBlock_Carousel_Overrides,
  type ContentBlock_Carousel_SlideConfigurator,
} from './defineCarousel.schemas';

type Slide = ContentBlock_Carousel_SlideConfigurator;
type SlidePublication = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type CarouselLocaleBody = {
  locale?: DeepPartial<ContentBlock_Carousel_Locale<'data'>>;
  [placementSlug: string]: unknown;
};
type CarouselLocaleFiles = Partial<Record<LanguageCode, CarouselLocaleBody>>;
type CarouselPublication<Base> = { base: Base; locale: CarouselLocaleFiles | undefined };
type CarouselOverrideBase = {
  params?: Carousel_Metadata_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Carousel_Locale<'data'>>;
  children?: string[];
  [placementSlug: string]: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const ownFields = new Set(['id', 'slug', 'type', 'params', 'locale', 'children']);
const directSlides = (config: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(Object.entries(config).filter(([key]) => !ownFields.has(key)));

const hasBuildAPI = (slide: unknown, key: string): slide is Slide =>
  isRecord(slide) &&
  isRecord(slide.build) &&
  typeof slide.build.data === 'function' &&
  typeof slide.build.overrides === 'function' &&
  isRecord(slide.config) &&
  isRecord(slide.config.base) &&
  slide.config.base.id === slide.id &&
  slide.config.base.slug === key &&
  slide.config.base.type === slide.type;

/** Validate the Carousel collection boundary, leaving slide internals to the children. */
const validate = (config: ContentBlock_Carousel_Config): void => {
  const items = directSlides(config);
  const parsed = carousel_Config_Schema.safeParse(config);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys(
      { items, order: config.children },
      {
        path: 'children',
        requireNonEmpty: true,
      },
    ).map(issue => issue.message),
    ...validateSluggedConfiguratorMap(items, carouselSlideTypes, {
      path: 'children',
      itemLabel: 'Carousel slide',
      reservedKeys: slugAddressedReservedKeys,
    }).map(issue => issue.message),
  ];

  const ids = new Set<string>();
  let enabled = 0;
  for (const [key, slide] of Object.entries(items)) {
    if (!hasBuildAPI(slide, key)) errors.push('Invalid Carousel slide Build API or identity: ' + key);
    if (isRecord(slide) && typeof slide.id === 'string') {
      if (ids.has(slide.id)) errors.push('Duplicate Carousel slide ID: ' + slide.id);
      ids.add(slide.id);
    }
    if (hasBuildAPI(slide, key) && (!isRecord(slide.config.base.params) || slide.config.base.params.disabled !== true))
      enabled++;
  }
  if (!enabled) errors.push('At least one active Carousel slide is required');
  if (errors.length) throw new Error('Invalid Carousel slides: ' + errors.join('; '));
};

type AuthoredInput<
  Slug extends string,
  Items extends Record<string, Slide>,
  Languages extends readonly LanguageCode[],
> = Pick<ContentBlock_Carousel_Config, 'id' | 'type' | 'params' | 'locale'> & {
  slug: Slug;
  children: Extract<keyof Items, string>[];
} & Items &
  ChildrenSupporting<Languages, Items> &
  SafePlacementMap<Items> &
  ConfigWithLanguages<ContentBlock_Carousel_Config, Languages>;

/**
 * Order a direct, slug-addressed collection of Image/Scene slides.
 *
 * `children` is the only authoritative order in Config and domain Data;
 * `slides[]` is a later UI Props projection, not an authored or Data field.
 * Slide materialization keeps the existing `slides/<slug>/` source folders.
 */
/** Infer literal child placement keys before checking the Configurator's Build/locale constraints. */
type DefineCarouselChildKeys<Input> = Exclude<keyof Input, 'id' | 'type' | 'slug' | 'params' | 'locale' | 'children'>;
type InferredDefineCarouselChildren<Input> = {
  [Key in DefineCarouselChildKeys<Input>]: Input[Key] extends Slide ? Input[Key] : Slide;
};

const defineCarouselImpl = <
  const Slug extends string,
  const Items extends Record<string, Slide>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: AuthoredInput<Slug, Items, Languages>,
) => {
  const metadataInput = {
    id: config.id,
    slug: config.slug,
    type: config.type,
    params: config.params,
    locale: config.locale,
  };
  const authored = structuredClone(metadataInput);
  const copyAuthored = () => carousel_Metadata_Config_Schema.parse(structuredClone(authored));
  const { id, slug, type } = authored;
  const initialItems = directSlides(config) as unknown as Items;
  const initialOrder = [...config.children];
  const originalConfig = () => ({ ...copyAuthored(), children: [...initialOrder], ...initialItems });

  const ownLocale = (input: DeepPartial<ContentBlock_Carousel_Locale<'config'>>) => {
    const { base, locale } = splitLocalizedFields(input);
    const files: CarouselLocaleFiles = {};
    for (const [language, fields] of Object.entries(locale ?? {})) {
      files[language as LanguageCode] = {
        locale: fields as DeepPartial<ContentBlock_Carousel_Locale<'data'>>,
      };
    }
    return {
      invariant: base as DeepPartial<ContentBlock_Carousel_Locale<'data'>>,
      files,
    };
  };

  /** Compose direct child Data without materializing UI positional arrays. */
  const buildSlides = (
    items: Record<string, Slide>,
    order: readonly string[],
    changes: Record<string, unknown> = {},
  ) => {
    const { languages } = requireBuildContext();
    const base: Record<string, unknown> = {};
    const locale: Partial<Record<LanguageCode, Record<string, unknown>>> = {};
    const patches: Record<string, SlidePublication> = {};
    const resources: Record<string, SlidePublication> = {};
    const active: string[] = [];

    for (const key of order) {
      const slide = items[key];
      if (!slide) throw new Error('Missing Carousel slide: ' + key);
      // Disabled authored children are absent from Data. They must not force a
      // translated resource to exist for an otherwise unrelated Build scope.
      if (
        !Object.hasOwn(changes, key) &&
        isRecord(slide.config.base.params) &&
        slide.config.base.params.disabled === true
      )
        continue;
      const resource = buildChildData(slide) as unknown as SlidePublication;
      const patch = Object.hasOwn(changes, key)
        ? (buildChildOverrides(slide, changes[key] as never) as unknown as SlidePublication)
        : undefined;
      const mergedBase = patch ? mergeForValidation(resource.base, patch.base) : resource.base;
      if (isRecord(mergedBase.params) && mergedBase.params.disabled === true) continue;

      active.push(key);
      base[key] = resource.base;
      resources[key] = resource;
      if (patch) patches[key] = patch;
      for (const language of languages) {
        if (resource.locale?.[language] !== undefined) {
          (locale[language] ??= {})[key] = resource.locale[language];
        }
      }
    }
    if (!active.length) throw new Error('At least one active Carousel slide is required');
    return { order: active, base, locale, patches, resources };
  };

  const base = {
    id,
    slug,
    type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  };

  const data = (
    options: PublicationLanguageOptions<Languages>,
  ): CarouselPublication<ContentBlock_Carousel_DataBase> => {
    const languages = resolvePublicationLanguages(options);
    validate(originalConfig());
    const metadata = copyAuthored();
    const own = ownLocale(metadata.locale);
    const slides = buildSlides(initialItems, initialOrder);
    const files = selectPublicationLocales(own.files, languages) ?? {};
    for (const [language, fragments] of Object.entries(slides.locale)) {
      Object.assign((files[language as LanguageCode] ??= {}), fragments);
    }

    const result: CarouselPublication<ContentBlock_Carousel_DataBase> = structuredClone({
      base: {
        id,
        slug,
        type,
        params: metadata.params,
        ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        children: slides.order,
        ...slides.base,
      },
      locale: Object.keys(files).length ? files : undefined,
    });
    for (const language of languages) {
      carousel_Data_Schema.parse(mergeForValidation(result.base, result.locale?.[language] ?? {}));
    }
    return result;
  };

  const overridesImplementation = <const Added extends Record<string, Slide> = {}>(
    patch: ContentBlock_Carousel_Overrides<Items, Added> & ChildrenSupporting<Languages, Added>,
    options: PublicationLanguageOptions<Languages>,
  ): CarouselPublication<CarouselOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate(originalConfig());
      if (!isRecord(patch)) throw new Error('Expected Carousel overrides object');

      const metadataPatch = carousel_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key === 'params' || key === 'locale')),
      );
      carousel_Metadata_Config_Schema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = ownLocale(metadataPatch.locale ?? {});
      const files = selectPublicationLocales(own.files, languages) ?? {};
      const output: CarouselPublication<CarouselOverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        },
        locale: undefined,
      };

      if (patch.children !== undefined && !Array.isArray(patch.children))
        throw new Error('children must be a replacement order array');

      const changes: Record<string, unknown> = {};
      const additions: Record<string, Slide> = {};
      for (const [key, value] of Object.entries(patch)) {
        if (ownFields.has(key)) {
          if (key !== 'params' && key !== 'locale' && key !== 'children')
            throw new Error('Immutable Carousel override field: ' + key);
          continue;
        }
        if (Object.hasOwn(initialItems, key)) changes[key] = value;
        else additions[key] = value as Slide;
      }
      const issues = validateSluggedConfiguratorMap(additions, carouselSlideTypes, {
        path: 'children',
        itemLabel: 'Carousel slide',
        reservedKeys: slugAddressedReservedKeys,
      });
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));

      for (const [key, child] of Object.entries(additions)) {
        if (!hasBuildAPI(child, key)) throw new Error('Invalid added Carousel slide Build API or identity: ' + key);
      }
      const candidates: Record<string, Slide | false> = { ...initialItems };
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Carousel slide slug: ' + key);
        candidates[key] = child;
      }

      const childPatches: Record<string, SlidePublication> = {};
      const originalEnabled = new Set(data(options).base.children);
      let structural = Object.keys(additions).length > 0;
      for (const [key, change] of Object.entries(changes)) {
        if (change === false) {
          candidates[key] = false;
          structural = true;
        } else {
          if (!isRecord(change)) throw new Error('Carousel slide patch must be an object or false: ' + key);
          const child = initialItems[key];
          const resolved = buildChildOverrides(child, change as never) as unknown as SlidePublication;
          childPatches[key] = resolved;
        }
      }

      const enabled: Record<string, Slide> = {};
      for (const [key, child] of Object.entries(candidates)) {
        if (child === false) continue;
        if (
          !Object.hasOwn(childPatches, key) &&
          isRecord(child.config.base.params) &&
          child.config.base.params.disabled === true
        )
          continue;
        const resource = buildChildData(child) as unknown as SlidePublication;
        const patched = childPatches[key];
        const effective = patched ? mergeForValidation(resource.base, patched.base) : resource.base;
        if (isRecord(effective.params) && effective.params.disabled === true) {
          if (originalEnabled.has(key)) structural = true;
          continue;
        }
        if (!originalEnabled.has(key)) structural = true;
        enabled[key] = child;
      }
      if (structural && patch.children === undefined)
        throw new Error('children is required when adding or disabling Carousel slides');
      const order = patch.children ?? initialOrder.filter(key => Object.hasOwn(enabled, key));
      // Only effective active slides belong in the resolved order. An authored
      // disabled slide can remain addressable in Config but is absent from Data.
      const activeOrderIssues = validateOrderedKeys(
        { items: enabled, order },
        { path: 'children', requireNonEmpty: true },
      );
      if (activeOrderIssues.length) {
        throw new Error(activeOrderIssues.map(issue => issue.message).join('; '));
      }
      validate({ ...copyAuthored(), children: [...order], ...enabled });
      const built = buildSlides(enabled, order, changes);

      if (structural || patch.children !== undefined) output.base.children = [...built.order];
      for (const [key, change] of Object.entries(changes)) {
        if (!Object.hasOwn(enabled, key)) {
          output.base[key] = false;
          continue;
        }
        const resource = buildChildData(enabled[key]) as unknown as SlidePublication;
        if (!originalEnabled.has(key)) {
          output.base[key] = mergeForValidation(resource.base, childPatches[key]?.base ?? {});
          for (const language of languages) {
            const fragment = mergeForValidation(
              resource.locale?.[language] ?? {},
              childPatches[key]?.locale?.[language] ?? {},
            );
            if (Object.keys(fragment).length) (files[language] ??= {})[key] = fragment;
          }
        } else {
          output.base[key] = childPatches[key]?.base ?? {};
          for (const language of languages) {
            const fragment = childPatches[key]?.locale?.[language];
            if (fragment !== undefined) (files[language] ??= {})[key] = fragment;
          }
        }
      }
      for (const [key, child] of Object.entries(additions)) {
        if (!Object.hasOwn(enabled, key)) continue;
        const resource = buildChildData(child) as unknown as SlidePublication;
        output.base[key] = resource.base;
        for (const language of languages) {
          const fragment = resource.locale?.[language];
          if (fragment !== undefined) (files[language] ??= {})[key] = fragment;
        }
      }

      output.locale = Object.keys(files).length ? files : undefined;
      const published = structuredClone(output);
      validateSlugAddressedPublication(carousel_Data_Schema, data(options), languages, published);
      return published;
    } catch (error) {
      throw new Error(
        'Invalid Carousel overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const overrides: {
    <const Patch extends Record<string, unknown>>(
      patch: Patch &
        ContentBlock_Carousel_Overrides<Items, AddedPlacementsFromPatch<Patch, Items, Slide>> &
        ChildrenSupporting<Languages, AddedPlacementsFromPatch<Patch, Items, Slide>>,
      options: PublicationLanguageOptions<Languages>,
    ): CarouselPublication<CarouselOverrideBase>;
    (
      patch: ContentBlock_Carousel_Overrides<Items, {}>,
      options: PublicationLanguageOptions<Languages>,
    ): CarouselPublication<CarouselOverrideBase>;
  } = overridesImplementation;

  const result = {
    ...initialItems,
    id,
    slug,
    type,
    children: [...initialOrder],
    validate,
    build: scopeBuild({ data, overrides }),
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


/** Preserve explicit generic authoring and infer directly keyed children from ordinary literals. */
export const defineCarousel: {
  <
    const Input extends Pick<ContentBlock_Carousel_Config, 'id' | 'type' | 'params' | 'locale'> & {
      slug: string;
      children: string[];
    },
  >(
    config: Input & AuthoredInput<Input['slug'], InferredDefineCarouselChildren<Input>, AllLanguageCodes>,
  ): ReturnType<typeof defineCarouselImpl<Input['slug'], InferredDefineCarouselChildren<Input>, AllLanguageCodes>>;
  <
    const Slug extends string,
    const Items extends Record<string, Slide>,
    const Languages extends readonly LanguageCode[] = AllLanguageCodes,
  >(
    config: AuthoredInput<Slug, Items, Languages>,
  ): ReturnType<typeof defineCarouselImpl<Slug, Items, Languages>>;
} = defineCarouselImpl;

type DefinedCarousel = ReturnType<typeof defineCarousel>;
/** The parent-facing union erases a composite's generic placement index. */
export type ContentBlock_Carousel_Configurator = Pick<DefinedCarousel, 'validate' | 'config'> & {
  readonly id: string;
  readonly slug: string;
  readonly type: 'carousel';
  readonly children: readonly string[];
  readonly __svitloLanguageScope: readonly LanguageCode[];
  readonly build: {
    data(options: PublicationLanguageOptions): ReturnType<DefinedCarousel['build']['data']>;
    overrides(patch: never, options: PublicationLanguageOptions): ReturnType<DefinedCarousel['build']['overrides']>;
  };
};
