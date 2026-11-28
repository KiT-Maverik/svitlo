import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type {
  ChildrenSupporting,
  DeepPartial,
  LanguageScope,
  PublicationLanguageOptions,
  RequireLanguages,
} from '#types';

import {
  buildChildData,
  buildChildOverrides,
  mayReuseCompletedLesson,
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
  type SafePlacementMap,
} from '../../_shared__configurators';
import {
  chapter_Config_Schema,
  chapter_Data_Schema,
  chapter_Metadata_Config_Schema,
  chapter_Override_Config_Schema,
  type Chapter_Child,
  type Chapter_Child_Data,
  type Chapter_Config,
  type Chapter_Data,
  type Chapter_Locale,
  type Chapter_Metadata_Config,
  type Chapter_Metadata_Overrides,
  type Chapter_Overrides,
} from './defineChapter.schemas';

type ChildResource = {
  base: DeepPartial<Chapter_Child_Data>;
  locale: Partial<Record<LanguageCode, DeepPartial<Chapter_Child_Data>>> | undefined;
};
type BuildChild = {
  build: {
    data: (options: PublicationLanguageOptions) => ChildResource;
    overrides: (value: never, options: PublicationLanguageOptions) => ChildResource;
  };
};
type ChapterPublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCode, DeepPartial<Chapter_Data>>> | undefined;
};
type ChapterDataBase<Items extends Record<string, Chapter_Child>> = Pick<
  Chapter_Config,
  'id' | 'slug' | 'type' | 'params'
> & {
  locale?: DeepPartial<Chapter_Locale<'data'>>;
  children: Extract<keyof Items, string>[];
} & { [Key in keyof Items]: DeepPartial<Extract<Chapter_Child_Data, { type: Items[Key]['type'] }>> };
type ChapterOverrideBase = Chapter_Metadata_Overrides & {
  children?: string[];
  [key: string]: unknown;
};
type ChapterConfigBase = Pick<Chapter_Config, 'id' | 'slug' | 'type' | 'params'> & {
  locale: DeepPartial<Chapter_Locale<'config'>>;
};

const allowedChildren = ['lesson', 'episode', 'assessment'] as const;
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const authoredFields = new Set(['id', 'type', 'slug', 'params', 'locale', 'children']);
const directChildren = (config: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(config).filter(([key]) => !authoredFields.has(key)));

const validate = (config: Chapter_Config): void => {
  const items = directChildren(config);
  const parsed = chapter_Config_Schema.safeParse(config);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys({ items, order: config.children }, { path: 'children' }).map(
      issue => issue.path + ': ' + issue.message,
    ),
    ...validateSluggedConfiguratorMap(items, allowedChildren, {
      path: 'children',
      itemLabel: 'Chapter child',
      allowAliasForTypes: ['lesson'],
      reservedKeys: slugAddressedReservedKeys,
    }).map(issue => issue.path + ': ' + issue.message),
  ];
  for (const [slug, child] of Object.entries(items)) {
    if (
      !isRecord(child) ||
      !isRecord(child.build) ||
      typeof child.build.data !== 'function' ||
      typeof child.build.overrides !== 'function'
    ) {
      errors.push('children.' + slug + ': child must expose the stateless Build API');
      continue;
    }
    if (
      !isRecord(child.config) ||
      !isRecord(child.config.base) ||
      child.config.base.id !== child.id ||
      ('draft' in child && child.draft === true && child.slug !== slug) ||
      (child.type === 'lesson' ? child.config.base.slug !== child.slug : child.config.base.slug !== slug) ||
      child.config.base.type !== child.type
    ) {
      errors.push('children.' + slug + ': immutable child identity does not match its authored metadata');
    }
  }
  const seenIds = new Map<string, Record<string, unknown>>();
  for (const child of Object.values(items)) {
    if (!isRecord(child) || typeof child.id !== 'string') continue;
    const previous = seenIds.get(child.id);
    if (previous && !mayReuseCompletedLesson(previous, child)) {
      errors.push('children: duplicate Chapter child ID ' + child.id);
    } else seenIds.set(child.id, child);
  }
  if (errors.length) throw new Error('Chapter validation failed: ' + errors.join('; '));
};

/**
 * Stable, non-recursive declaration surface avoids TS7056 while preserving
 * the exact item keys and type-level child language scopes.
 */
type ChapterNewPlacements<Items extends Record<string, Chapter_Child>, Patch extends Record<string, unknown>> = {
  [Key in Exclude<keyof Patch, keyof Items | 'params' | 'locale' | 'children'>]: Patch[Key] extends Chapter_Child
    ? Patch[Key]
    : never;
};

export type Chapter_Configurator<
  Slug extends string = string,
  Items extends Record<string, Chapter_Child> = Record<string, Chapter_Child>,
  Languages extends readonly LanguageCode[] = readonly LanguageCode[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'chapter';
  readonly children: Extract<keyof Items, string>[];
  readonly validate: typeof validate;
  readonly build: {
    data(options: PublicationLanguageOptions<Languages>): ChapterPublication<ChapterDataBase<Items>>;
    overrides<const Patch extends Record<string, unknown>>(
      patch: Patch & {
        children: Extract<keyof Items | keyof Patch, string>[];
      } & {
        [Key in keyof Patch]: Key extends 'params'
          ? Chapter_Metadata_Overrides['params']
          : Key extends 'locale'
            ? Chapter_Metadata_Overrides['locale']
            : Key extends 'children'
              ? Extract<keyof Items | keyof Patch, string>[]
              : Key extends keyof Items
                ? Parameters<Items[Key]['build']['overrides']>[0] | false
                : Patch[Key] extends Chapter_Child
                  ? Patch[Key]
                  : never;
      } & ChildrenSupporting<Languages, ChapterNewPlacements<Items, Patch>> &
        SafePlacementMap<ChapterNewPlacements<Items, Patch>>,
      options: PublicationLanguageOptions<Languages>,
    ): ChapterPublication<ChapterOverrideBase>;
    overrides(
      patch: Chapter_Overrides<Items>,
      options: PublicationLanguageOptions<Languages>,
    ): ChapterPublication<ChapterOverrideBase>;
  };
  readonly config: {
    base: ChapterConfigBase;
    locales: () => { locale: DeepPartial<Chapter_Locale<'config'>> };
    validate: typeof validate;
  };
} & (string extends keyof Items ? {} : Readonly<Items>) &
  LanguageScope<Languages>;

type ChapterAuthoredInput<
  Slug extends string,
  Items extends Record<string, Chapter_Child>,
  Languages extends readonly LanguageCode[],
> = Omit<Chapter_Metadata_Config, 'slug' | 'locale'> & {
  slug: Slug;
  children: Extract<keyof Items, string>[];
  locale: RequireLanguages<Chapter_Config['locale'], Languages>;
} & Items &
  ChildrenSupporting<Languages, Items> &
  SafePlacementMap<Items>;

/** Define a Chapter with immutable ordered child configurators and stateless Build. */
const defineChapterImplementation = <
  const Slug extends string,
  const Items extends Record<string, Chapter_Child>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: ChapterAuthoredInput<Slug, Items, Languages>,
): Chapter_Configurator<Slug, Items, Languages> => {
  const metadataSchema = chapter_Metadata_Config_Schema;
  const metadataInput = {
    id: config.id,
    type: config.type,
    slug: config.slug,
    params: config.params,
    locale: config.locale,
  };
  const authored: Omit<Chapter_Metadata_Config, never> = structuredClone(metadataInput);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type } = authored;
  const slug = config.slug;
  const initialItems = directChildren(config) as Items;
  const initialOrder = [...config.children];

  const splitOwnLocale = (value: DeepPartial<Chapter_Config['locale']>) => {
    const own = splitLocalizedFields(value);
    const files: Partial<Record<LanguageCode, DeepPartial<Chapter_Data>>> = {};
    for (const [language, fields] of Object.entries(own.locale ?? {})) {
      files[language as LanguageCode] = {
        locale: fields as DeepPartial<Chapter_Locale<'data'>>,
      };
    }
    return {
      invariant: own.base as DeepPartial<Chapter_Locale<'data'>>,
      files,
    };
  };

  /** One-level, placement-keyed assembly; each child validates its own Data. */
  const buildContent = (
    items: Record<string, Chapter_Child>,
    order: readonly string[],
    changes: Record<string, unknown> = {},
  ) => {
    const { languages } = requireBuildContext();
    const ids = new Map<string, Chapter_Child>();
    const entries = order.map(key => {
      const child = items[key];
      if (!child) throw new Error('Unknown Chapter child: ' + key);
      const previous = ids.get(child.id);
      if (previous && !mayReuseCompletedLesson(previous, child)) {
        throw new Error('Duplicate Chapter child ID: ' + child.id);
      }
      ids.set(child.id, child);
      const build = (child as unknown as BuildChild).build;
      if (!build || typeof build.data !== 'function' || typeof build.overrides !== 'function') {
        throw new Error('Child lacks the stateless Build API: ' + key);
      }
      const resource = buildChildData({ build });
      const patch = Object.hasOwn(changes, key) ? buildChildOverrides({ build }, changes[key] as never) : undefined;
      return { key, resource, patch };
    });
    const base: Record<string, DeepPartial<Chapter_Child_Data>> = {};
    const patches: Record<string, ChildResource> = {};
    for (const { key, resource, patch } of entries) {
      // Preserve the source Lesson slug; the surrounding key is its placement.
      base[key] = mergeForValidation<Record<string, unknown>>(
        resource.base as Record<string, unknown>,
        (patch?.base ?? {}) as Record<string, unknown>,
      ) as DeepPartial<Chapter_Child_Data>;
      if (patch) patches[key] = patch;
    }
    const locale: Partial<Record<LanguageCode, Record<string, DeepPartial<Chapter_Child_Data>>>> = {};
    for (const language of languages) {
      const fragments: Record<string, DeepPartial<Chapter_Child_Data>> = {};
      for (const { key, resource, patch } of entries) {
        if (resource.locale?.[language] === undefined && patch?.locale?.[language] === undefined) continue;
        const localized = mergeForValidation<Record<string, unknown>>(
          resource.base as Record<string, unknown>,
          (resource.locale?.[language] ?? {}) as Record<string, unknown>,
        );
        const withBasePatch = mergeForValidation<Record<string, unknown>>(
          localized,
          (patch?.base ?? {}) as Record<string, unknown>,
        );
        fragments[key] = mergeForValidation<Record<string, unknown>>(
          withBasePatch,
          (patch?.locale?.[language] ?? {}) as Record<string, unknown>,
        ) as DeepPartial<Chapter_Child_Data>;
      }
      if (Object.keys(fragments).length) locale[language] = fragments;
    }
    return { base, locale, patches };
  };

  const base: ChapterConfigBase = {
    id,
    slug,
    type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  };

  const data = (options: PublicationLanguageOptions<Languages>): ChapterPublication<ChapterDataBase<Items>> => {
    const languages = resolvePublicationLanguages(options);
    validate({ ...copyAuthored(), children: initialOrder, ...initialItems });
    const metadata = copyAuthored();
    const own = splitOwnLocale(metadata.locale);
    const children = buildContent(initialItems, initialOrder);
    const files = selectPublicationLocales(own.files, languages) ?? {};
    for (const [language, entries] of Object.entries(children.locale)) {
      // Publication fragments are parsed against the concrete Props schema below.
      const destination = (files[language as LanguageCode] ??= {}) as Record<string, unknown>;
      Object.assign(destination, entries);
    }
    const result: ChapterPublication<ChapterDataBase<Items>> = {
      base: {
        id,
        slug,
        type,
        params: metadata.params,
        ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        children: [...initialOrder],
        ...children.base,
      } as unknown as ChapterDataBase<Items>,
      locale: Object.keys(files).length ? files : undefined,
    };
    for (const language of languages) {
      chapter_Data_Schema.parse(
        mergeForValidation<Record<string, unknown>>(
          result.base as Record<string, unknown>,
          (result.locale?.[language] ?? {}) as Record<string, unknown>,
        ),
      );
    }
    return result;
  };

  const overrides = <const Added extends Record<string, Chapter_Child> = {}>(
    patch: Chapter_Overrides<Items, Added> & ChildrenSupporting<Languages, Added>,
    options: PublicationLanguageOptions<Languages>,
  ): ChapterPublication<ChapterOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ ...copyAuthored(), children: initialOrder, ...initialItems });
      if (!isRecord(patch)) throw new Error('Expected Chapter overrides object');
      const metadataPatch = chapter_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key === 'params' || key === 'locale')),
      );
      metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = splitOwnLocale(metadataPatch.locale ?? {});
      const output: ChapterPublication<ChapterOverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        },
        locale: undefined,
      };
      const files = selectPublicationLocales(own.files, languages) ?? {};

      if (patch.children !== undefined && !Array.isArray(patch.children)) {
        throw new Error('children must be a replacement order array');
      }
      const changes: Record<string, unknown> = {};
      const additions: Record<string, Chapter_Child> = {};
      for (const [key, change] of Object.entries(patch)) {
        if (authoredFields.has(key)) {
          if (key !== 'params' && key !== 'locale' && key !== 'children') {
            throw new Error('Immutable Chapter override field: ' + key);
          }
          continue;
        }
        if (Object.hasOwn(initialItems, key)) changes[key] = change;
        else additions[key] = change as Chapter_Child;
      }
      const addedIssues = validateSluggedConfiguratorMap(additions, allowedChildren, {
        path: 'children',
        itemLabel: 'Chapter child',
        allowAliasForTypes: ['lesson'],
        reservedKeys: slugAddressedReservedKeys,
      });
      if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));

      const active: Record<string, Chapter_Child | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Chapter child slug: ' + key);
        if (
          !isRecord(child) ||
          !isRecord(child.build) ||
          typeof child.build.data !== 'function' ||
          typeof child.build.overrides !== 'function' ||
          !isRecord(child.config) ||
          !isRecord(child.config.base) ||
          child.config.base.id !== child.id ||
          ('draft' in child && child.draft === true && child.slug !== key) ||
          (child.type === 'lesson' ? child.config.base.slug !== child.slug : child.config.base.slug !== key) ||
          child.config.base.type !== child.type
        ) {
          throw new Error('New Chapter child must expose a matching immutable Build identity: ' + key);
        }
        active[key] = child as Chapter_Child;
      }
      for (const [key, change] of Object.entries(changes)) {
        if (!Object.hasOwn(initialItems, key)) throw new Error('Cannot override an unknown Chapter child: ' + key);
        if (change === false) {
          active[key] = false;
          structureChanged = true;
        } else {
          if (!isRecord(change)) throw new Error('Child override must be an object or false: ' + key);
          childPatches[key] = change;
        }
      }
      if (structureChanged && patch.children === undefined) {
        throw new Error('children is required when adding or disabling placements');
      }
      const order = patch.children ?? initialOrder;
      const issues = validateOrderedKeys({ items: active, order }, { path: 'children', allowDisabled: true });
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));

      if (Object.keys(changes).length || Object.keys(additions).length || patch.children !== undefined) {
        const enabled = Object.fromEntries(
          Object.entries(active).filter((entry): entry is [string, Chapter_Child] => entry[1] !== false),
        );
        const built = buildContent(enabled, order, childPatches);
        if (structureChanged || patch.children !== undefined) output.base.children = [...order];
        // Existing placements are sparse, additions are complete; false is a
        // deletion tombstone applied by the runtime Data assembler.
        for (const [key, change] of Object.entries(changes)) {
          output.base[key] = change === false ? false : (built.patches[key]?.base ?? {});
        }
        for (const key of Object.keys(additions)) output.base[key] = built.base[key];
        for (const language of languages) {
          const fragments: Record<string, unknown> = {};
          for (const key of Object.keys(changes)) {
            if (changes[key] === false) continue;
            const translated = built.patches[key]?.locale?.[language];
            if (translated !== undefined) fragments[key] = translated;
          }
          for (const key of Object.keys(additions)) {
            const translated = built.locale[language]?.[key];
            if (translated !== undefined) fragments[key] = translated;
          }
          if (Object.keys(fragments).length) {
            Object.assign((files[language] ??= {}) as Record<string, unknown>, fragments);
          }
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;
      // Reject an override when its four-layer resolved Props are invalid for any requested locale.
      validateSlugAddressedPublication(chapter_Data_Schema, data(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(
        'Invalid Chapter overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  return {
    id,
    slug,
    type,
    children: [...initialOrder],
    ...initialItems,
    validate,
    build: scopeBuild({ data, overrides }),
    config: {
      base,
      locales: (): { locale: DeepPartial<Chapter_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as unknown as Chapter_Configurator<Slug, Items, Languages>;
};

type ChapterInferredBase = Chapter_Metadata_Config & { children: string[] };
type ChapterInferredChildren<Config> = {
  [Key in Exclude<keyof Config, keyof ChapterInferredBase>]: Config[Key] extends Chapter_Child ? Config[Key] : never;
};

/** The inferred scope is the intersection of every child's advertised languages. */
type ChapterChildLanguages<Children extends Record<string, Chapter_Child>> = Exclude<
  LanguageCode,
  {
    [Key in keyof Children]: Children[Key] extends LanguageScope<infer Available extends readonly LanguageCode[]>
      ? Exclude<LanguageCode, Available[number]>
      : LanguageCode;
  }[keyof Children]
>;

/** An invariant title supports all languages; a localized title supports only authored keys. */
type ChapterTitleLanguages<Title> = Title extends string ? LanguageCode : Extract<keyof Title, LanguageCode>;
type ChapterInferredLanguages<Config extends ChapterInferredBase> = readonly [
  Extract<
    ChapterChildLanguages<ChapterInferredChildren<Config>> & ChapterTitleLanguages<Config['locale']['title']>,
    LanguageCode
  >,
];

/** Explicit authoring generics preserve the historical <Slug, Items, Languages> order. */
export function defineChapter<
  const Slug extends string,
  const Items extends Record<string, Chapter_Child>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(config: ChapterAuthoredInput<Slug, Items, Languages>): Chapter_Configurator<Slug, Items, Languages>;

/** Infer direct children and the languages supported by ALL children and the own title. */
export function defineChapter<const Config extends ChapterInferredBase>(
  config: Config &
    ChapterInferredChildren<Config> & {
      children: Extract<keyof ChapterInferredChildren<Config>, string>[];
      locale: RequireLanguages<Chapter_Config['locale'], ChapterInferredLanguages<Config>>;
    } & ChildrenSupporting<ChapterInferredLanguages<Config>, ChapterInferredChildren<Config>> &
    SafePlacementMap<ChapterInferredChildren<Config>>,
): Chapter_Configurator<Config['slug'], ChapterInferredChildren<Config>, ChapterInferredLanguages<Config>>;
export function defineChapter(config: unknown): unknown {
  return defineChapterImplementation(config as never);
}
