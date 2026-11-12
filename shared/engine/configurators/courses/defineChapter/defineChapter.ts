import type { LanguageCodes } from '#schemas';
import type { ChildrenSupporting, DeepPartial, LanguageScope, PublicationLanguageOptions, RequireLanguages } from '#types';

import {
  mergeForValidation,
  onlyLocales,
  resolvePublicationLanguages,
  selectPublicationLocales,
  onlyStrings,
  splitLocalizedFields,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { lesson_Props_Schema } from '../../lessons/defineLesson';
import {
  chapter_Config_Schema,
  chapter_Override_Config_Schema,
  chapter_Props_Schema,
  type Chapter_Child,
  type Chapter_Child_Props,
  type Chapter_Config,
  type Chapter_Locale,
  type Chapter_Metadata_Overrides,
  type Chapter_Overrides,
  type Chapter_Props,
} from './defineChapter.schemas';

type ChildResource = {
  base: DeepPartial<Chapter_Child_Props>;
  locale: Partial<Record<LanguageCodes, DeepPartial<Chapter_Child_Props>>> | undefined;
};
type BuildChild = {
  build: {
    props: (options: PublicationLanguageOptions) => ChildResource;
    overrides: (value: never, options: PublicationLanguageOptions) => ChildResource;
  };
};
type ChapterPublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCodes, DeepPartial<Chapter_Props>>> | undefined;
};
type ChapterPropsBase = Pick<Chapter_Config, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<Chapter_Locale<'props'>>;
  content: DeepPartial<Chapter_Child_Props>[];
};
type ChapterOverrideBase = Chapter_Metadata_Overrides & {
  content?: DeepPartial<Chapter_Child_Props>[];
};
type ChapterConfigBase = Pick<Chapter_Config, 'id' | 'slug' | 'type' | 'params'> & {
  locale: DeepPartial<Chapter_Locale<'config'>>;
};

const allowedChildren = ['lesson'] as const;
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
    }).map(issue => issue.path + ': ' + issue.message),
  ];
  if (isRecord(config.content) && isRecord(config.content.items)) {
    for (const [slug, child] of Object.entries(config.content.items)) {
      if (!isRecord(child) || !isRecord(child.build) ||
        typeof child.build.props !== 'function' || typeof child.build.overrides !== 'function') {
        errors.push('content.items.' + slug + ': child must expose the stateless Build API');
        continue;
      }
      if (!isRecord(child.config) || !isRecord(child.config.base) ||
        child.config.base.id !== child.id || child.config.base.slug !== slug ||
        child.config.base.type !== child.type) {
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

const parseChild = (value: unknown): Chapter_Child_Props => {
  if (!isRecord(value)) throw new Error('Expected resolved Chapter child Props');
  switch (value.type) {
    case 'lesson': {
      const parsed = lesson_Props_Schema.safeParse(value);
      if (!parsed.success) throw new Error('Invalid Chapter child Props: ' + parsed.error.message);
      return structuredClone(value) as Chapter_Child_Props;
    }
    default: throw new Error('Unsupported Chapter child type: ' + String(value.type));
  }
};

/**
 * Stable, non-recursive declaration surface avoids TS7056 while preserving
 * the exact item keys and type-level child language scopes.
 */
export type Chapter_Configurator<
  Slug extends string = string,
  Items extends Record<string, Chapter_Child> = Record<string, Chapter_Child>,
  Languages extends readonly LanguageCodes[] = readonly LanguageCodes[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'chapter';
  readonly content: { items: Items; order: string[] };
  readonly validate: typeof validate;
  readonly build: {
    props(options: PublicationLanguageOptions<Languages>): ChapterPublication<ChapterPropsBase>;
    overrides<const Added extends Record<string, Chapter_Child> = {}>(
      patch: Chapter_Overrides<Items, Added> & {
        content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
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
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Chapter_Config, 'slug' | 'content' | 'locale'> & {
    slug: Slug;
    content: { items: Items & ChildrenSupporting<Languages, Items>; order: string[] };
    locale: RequireLanguages<Chapter_Config['locale'], Languages>;

  },
): Chapter_Configurator<Slug, Items, Languages> => {
  validate(config);
  const metadataSchema = chapter_Config_Schema.omit({ content: true });
  const authored = metadataSchema.parse(config);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type } = authored;
  const slug = config.slug;
  const initialItems: Items = { ...config.content.items };
  const initialOrder = [...config.content.order];
  const content = { items: { ...initialItems }, order: [...initialOrder] };

  const splitOwnLocale = (value: DeepPartial<Chapter_Config['locale']>) => {
    const own = splitLocalizedFields(value);
    const files: Partial<Record<LanguageCodes, DeepPartial<Chapter_Props>>> = {};
    for (const [language, fields] of Object.entries(own.locale ?? {})) {
      files[language as LanguageCodes] = {
        locale: fields as DeepPartial<Chapter_Locale<'props'>>,
      };
    }
    return {
      invariant: own.base as DeepPartial<Chapter_Locale<'props'>>,
      files,
    };
  };

  const buildContent = (
    items: Record<string, Chapter_Child>,
    order: readonly string[],
    languages: readonly LanguageCodes[],
    patches: Record<string, unknown> = {},
  ) => {
    const ids = new Set<string>();
    for (const key of order) {
      const child = items[key];
      if (!child) throw new Error('Unknown Chapter child: ' + key);
      if (ids.has(child.id)) throw new Error('Duplicate Chapter child ID: ' + child.id);
      ids.add(child.id);
    }
    const entries = order.map(key => {
      const raw = items[key];
      const build = (raw as unknown as BuildChild).build;
      if (!build || typeof build.props !== 'function' || typeof build.overrides !== 'function') {
        throw new Error('Child lacks the stateless Build API: ' + key);
      }
      const resource = build.props({ languages });
      const patch = Object.hasOwn(patches, key) ? build.overrides(patches[key] as never, { languages }) : undefined;
      return { resource, patch };
    });
    // Child resources are already validated; avoid recursive generic inference on
    // the whole nested Course/Lesson union while merging sparse published fragments.
    const base = entries.map(({ resource, patch }) =>
      mergeForValidation<Record<string, unknown>>(
        resource.base as Record<string, unknown>,
        (patch?.base ?? {}) as Record<string, unknown>,
      ),
    );
    const locale: Partial<Record<LanguageCodes, Chapter_Child_Props[]>> = {};
    for (const language of languages) {
      const resolved = entries.map(({ resource, patch }) => {
        const original = mergeForValidation<Record<string, unknown>>(
          resource.base as Record<string, unknown>,
          (resource.locale?.[language] ?? {}) as Record<string, unknown>,
        );
        const withBasePatch = mergeForValidation<Record<string, unknown>>(
          original, (patch?.base ?? {}) as Record<string, unknown>,
        );
        const effective = mergeForValidation<Record<string, unknown>>(
          withBasePatch, (patch?.locale?.[language] ?? {}) as Record<string, unknown>,
        );
        return parseChild(effective);
      });
      // Inspect the published envelope without recursively expanding nested Lesson unions.
      const hasTranslatedChild = entries.some(({ resource, patch }) => {
        const ownLocales: Partial<Record<LanguageCodes, unknown>> | undefined = resource.locale;
        const patchLocales: Partial<Record<LanguageCodes, unknown>> | undefined = patch?.locale;
        return ownLocales?.[language] !== undefined || patchLocales?.[language] !== undefined;
      });
      if (hasTranslatedChild) locale[language] = resolved;
    }
    return { base, locale };
  };

  const base: ChapterConfigBase = {
    id,
    slug,
    type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  };

  const props = (options: PublicationLanguageOptions<Languages>): ChapterPublication<ChapterPropsBase> => {
    const languages = resolvePublicationLanguages(options);
    const metadata = copyAuthored();
    const own = splitOwnLocale(metadata.locale);
    const children = buildContent(initialItems, initialOrder, languages);
    const files = selectPublicationLocales(own.files, languages) ?? {};
    for (const [language, entries] of Object.entries(children.locale)) {
      // Publication fragments are parsed against the concrete Props schema below.
      const destination = (files[language as LanguageCodes] ??= {}) as Record<string, unknown>;
      destination.content = entries;
    }
    const result: ChapterPublication<ChapterPropsBase> = {
      base: {
        id, slug, type, params: metadata.params,
        ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        content: children.base,
      },
      locale: Object.keys(files).length ? files : undefined,
    };
    for (const language of languages) {
      chapter_Props_Schema.parse(mergeForValidation(result.base, result.locale?.[language] ?? {}));
    }
    return result;
  };

  const overrides = <const Added extends Record<string, Chapter_Child> = {}>(
    patch: Chapter_Overrides<Items, Added> & {
      content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): ChapterPublication<ChapterOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
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
        path: 'content.additionalItems', itemLabel: 'Chapter child',
      });
      if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));

      const active: Record<string, Chapter_Child | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Chapter child slug: ' + key);
        if (!isRecord(child) || !isRecord(child.build) ||
          typeof child.build.props !== 'function' || typeof child.build.overrides !== 'function' ||
          !isRecord(child.config) || !isRecord(child.config.base) ||
          child.config.base.id !== child.id || child.config.base.slug !== key ||
          child.config.base.type !== child.type) {
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
        const built = buildContent(enabled, order, languages, childPatches);
        output.base.content = built.base;
        for (const [language, values] of Object.entries(built.locale)) {
          (files[language as LanguageCodes] ??= {}).content = values;
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;
      return output;
    } catch (error) {
      throw new Error(
        'Invalid Chapter overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  return {
    id, slug, type, content, validate,
    build: { props, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<Chapter_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as Chapter_Configurator<Slug, Items, Languages>;
};
