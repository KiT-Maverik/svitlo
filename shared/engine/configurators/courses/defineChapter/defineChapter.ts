import type { SafePlacementMap } from '../../_shared__configurators';
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
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  requireBuildContext,
  resolvePublicationLanguages,
  scopeBuild,
  selectPublicationLocales,
  splitLocalizedFields,
  validateOrderedKeys,
  validateSlugAddressedPublication,
  slugAddressedReservedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import {
  chapter_Config_Schema,
  chapter_Data_Schema,
  chapter_Override_Config_Schema,
  type Chapter_Child,
  type Chapter_Child_Data,
  type Chapter_Config,
  type Chapter_Data,
  type Chapter_Locale,
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
type ChapterDataBase<Items extends Record<string, Chapter_Child>> = Pick<Chapter_Config, 'id' | 'slug' | 'type' | 'params'> & {
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

const validate = (config: Chapter_Config): void => {
  const parsed = chapter_Config_Schema.safeParse(config);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys(config.content, { path: 'content' }).map(issue => issue.path + ': ' + issue.message),
    ...validateSluggedConfiguratorMap(config.content?.items, allowedChildren, {
      path: 'content.items',
      itemLabel: 'Chapter child',
      allowAliasForTypes: ['lesson'],
      reservedKeys: slugAddressedReservedKeys,
    }).map(issue => issue.path + ': ' + issue.message),
  ];
  if (isRecord(config.content) && isRecord(config.content.items)) {
    for (const [slug, child] of Object.entries(config.content.items)) {
      if (
        !isRecord(child) ||
        !isRecord(child.build) ||
        typeof child.build.data !== 'function' ||
        typeof child.build.overrides !== 'function'
      ) {
        errors.push('content.items.' + slug + ': child must expose the stateless Build API');
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
        errors.push('content.items.' + slug + ': immutable child identity does not match its authored metadata');
      }
    }
  }
  const seenIds = new Set<string>();
  for (const child of Object.values(config.content?.items ?? {})) {
    if (!isRecord(child) || typeof child.id !== 'string') continue;
    if (seenIds.has(child.id)) errors.push('content.items: duplicate Chapter child ID ' + child.id);
    seenIds.add(child.id);
  }
  if (errors.length) throw new Error('Chapter validation failed: ' + errors.join('; '));
};

/**
 * Stable, non-recursive declaration surface avoids TS7056 while preserving
 * the exact item keys and type-level child language scopes.
 */
export type Chapter_Configurator<
  Slug extends string = string,
  Items extends Record<string, Chapter_Child> = Record<string, Chapter_Child>,
  Languages extends readonly LanguageCode[] = readonly LanguageCode[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'chapter';
  readonly content: { items: Items; order: string[] };
  readonly validate: typeof validate;
  readonly build: {
    data(options: PublicationLanguageOptions<Languages>): ChapterPublication<ChapterDataBase<Items>>;
    overrides<const Added extends Record<string, Chapter_Child> = {}>(
      patch: Chapter_Overrides<Items, Added> & {
        content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> & SafePlacementMap<Added> };
      },
      options: PublicationLanguageOptions<Languages>,
    ): ChapterPublication<ChapterOverrideBase>;
  };
  readonly config: {
    base: ChapterConfigBase;
    locales: () => { locale: DeepPartial<Chapter_Locale<'config'>> };
    validate: typeof validate;
  };
} & LanguageScope<Languages>;

/** Define a Chapter with immutable ordered child configurators and stateless Build. */
export const defineChapter = <
  const Slug extends string,
  const Items extends Record<string, Chapter_Child>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<Chapter_Config, 'slug' | 'content' | 'locale'> & {
    slug: Slug;
    content: { items: Items & ChildrenSupporting<Languages, Items> & SafePlacementMap<Items>; order: string[] };
    locale: RequireLanguages<Chapter_Config['locale'], Languages>;
  },
): Chapter_Configurator<Slug, Items, Languages> => {
  const metadataSchema = chapter_Config_Schema.omit({ content: true });
  const { content: _content, ...metadataInput } = config;
  const authored: Omit<Chapter_Config, 'content'> = structuredClone(metadataInput);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type } = authored;
  const slug = config.slug;
  const initialItems: Items = { ...config.content.items };
  const initialOrder = [...config.content.order];
  const content = { items: { ...initialItems }, order: [...initialOrder] };

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
    const ids = new Set<string>();
    const entries = order.map(key => {
      const child = items[key];
      if (!child) throw new Error('Unknown Chapter child: ' + key);
      if (ids.has(child.id)) throw new Error('Duplicate Chapter child ID: ' + child.id);
      ids.add(child.id);
      const build = (child as unknown as BuildChild).build;
      if (!build || typeof build.data !== 'function' || typeof build.overrides !== 'function') {
        throw new Error('Child lacks the stateless Build API: ' + key);
      }
      const resource = buildChildData({ build });
      const patch = Object.hasOwn(changes, key)
        ? buildChildOverrides({ build }, changes[key] as never)
        : undefined;
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
    validate({ ...copyAuthored(), content: { items: initialItems, order: initialOrder } });
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
      } as ChapterDataBase<Items>,
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
    patch: Chapter_Overrides<Items, Added> & {
      content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> & SafePlacementMap<Added> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): ChapterPublication<ChapterOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ ...copyAuthored(), content: { items: initialItems, order: initialOrder } });
      if (!isRecord(patch)) throw new Error('Expected Chapter overrides object');
      for (const key of Object.keys(patch)) {
        if (!['params', 'locale', 'content'].includes(key)) throw new Error('Unknown Chapter override field: ' + key);
      }
      const metadataPatch = chapter_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key !== 'content')),
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

      if (patch.content !== undefined && !isRecord(patch.content)) throw new Error('content must be an object');
      if (patch.content) {
        for (const key of Object.keys(patch.content)) {
          if (!['items', 'additionalItems', 'order'].includes(key)) {
            throw new Error('Unknown Chapter content override field: ' + key);
          }
        }
      }
      const changes = patch.content?.items ?? {};
      const additions = patch.content?.additionalItems ?? {};
      if (!isRecord(changes)) throw new Error('content.items must be a slug-keyed object');
      if (!isRecord(additions)) throw new Error('content.additionalItems must be a slug-keyed configurator map');
      const addedIssues = validateSluggedConfiguratorMap(additions, allowedChildren, {
        path: 'content.additionalItems',
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
      if (structureChanged && patch.content?.order === undefined) {
        throw new Error('content.order is required when adding or disabling children');
      }
      const order = patch.content?.order ?? initialOrder;
      const issues = validateOrderedKeys({ items: active, order }, { path: 'content', allowDisabled: true });
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));

      if (Object.keys(changes).length || Object.keys(additions).length || patch.content?.order !== undefined) {
        const enabled = Object.fromEntries(
          Object.entries(active).filter((entry): entry is [string, Chapter_Child] => entry[1] !== false),
        );
        const built = buildContent(enabled, order, childPatches);
        if (structureChanged || patch.content?.order !== undefined) output.base.children = [...order];
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
    content,
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
