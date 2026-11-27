import type { LanguageCode } from '#schemas';
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
  course_Config_Schema,
  course_Data_Schema,
  course_Override_Config_Schema,
  type Course_Child,
  type Course_Child_Data,
  type Course_Config,
  type Course_Data,
  type Course_Locale,
  type Course_Metadata_Overrides,
  type Course_Overrides,
} from './defineCourse.schemas';

type ChildResource = {
  base: DeepPartial<Course_Child_Data>;
  locale: Partial<Record<LanguageCode, DeepPartial<Course_Child_Data>>> | undefined;
};
type BuildChild = {
  build: {
    data: (options: PublicationLanguageOptions) => ChildResource;
    overrides: (value: never, options: PublicationLanguageOptions) => ChildResource;
  };
};
type CoursePublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCode, DeepPartial<Course_Data>>> | undefined;
};
type CourseDataBase<Items extends Record<string, Course_Child>> = Pick<Course_Config, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<Course_Locale<'data'>>;
  children: Extract<keyof Items, string>[];
} & { [Key in keyof Items]: DeepPartial<Extract<Course_Child_Data, { type: Items[Key]['type'] }>> };
type CourseOverrideBase = Course_Metadata_Overrides & {
  children?: string[];
  [key: string]: unknown;
};
type CourseConfigBase = Pick<Course_Config, 'id' | 'slug' | 'type' | 'params'> & {
  locale: DeepPartial<Course_Locale<'config'>>;
};

const allowedChildren = ['module', 'chapter', 'lesson', 'episode', 'assessment'] as const;
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const validate = (config: Course_Config): void => {
  const parsed = course_Config_Schema.safeParse(config);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys(config.content, { path: 'content' }).map(issue => issue.path + ': ' + issue.message),
    ...validateSluggedConfiguratorMap(config.content?.items, allowedChildren, {
      path: 'content.items',
      itemLabel: 'Course child',
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
    if (seenIds.has(child.id)) errors.push('content.items: duplicate Course child ID ' + child.id);
    seenIds.add(child.id);
  }
  if (errors.length) throw new Error('Course validation failed: ' + errors.join('; '));
};

/**
 * Stable, non-recursive declaration surface avoids TS7056 while preserving
 * the exact item keys and type-level child language scopes.
 */
export type Course_Configurator<
  Slug extends string = string,
  Items extends Record<string, Course_Child> = Record<string, Course_Child>,
  Languages extends readonly LanguageCode[] = readonly LanguageCode[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'course';
  readonly content: { items: Items; order: string[] };
  readonly validate: typeof validate;
  readonly build: {
    data(options: PublicationLanguageOptions<Languages>): CoursePublication<CourseDataBase<Items>>;
    overrides<const Added extends Record<string, Course_Child> = {}>(
      patch: Course_Overrides<Items, Added> & {
        content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
      },
      options: PublicationLanguageOptions<Languages>,
    ): CoursePublication<CourseOverrideBase>;
  };
  readonly config: {
    base: CourseConfigBase;
    locales: () => { locale: DeepPartial<Course_Locale<'config'>> };
    validate: typeof validate;
  };
} & LanguageScope<Languages>;

/** Define a Course with immutable ordered child configurators and stateless Build. */
export const defineCourse = <
  const Slug extends string,
  const Items extends Record<string, Course_Child>,
  const Languages extends readonly [LanguageCode, ...LanguageCode[]],
>(
  config: Omit<Course_Config, 'slug' | 'content' | 'params' | 'locale'> & {
    slug: Slug;
    content: { items: Items & ChildrenSupporting<Languages, Items>; order: string[] };
    locale: RequireLanguages<Course_Config['locale'], Languages>;
    params: Omit<Course_Config['params'], 'languages'> & { languages: Languages };
  },
): Course_Configurator<Slug, Items, Languages> => {
  const metadataSchema = course_Config_Schema.omit({ content: true });
  const { content: _content, ...metadataInput } = config;
  const authored: Omit<Course_Config, 'content' | 'params'> & {
    params: Omit<Course_Config['params'], 'languages'> & { languages: readonly LanguageCode[] };
  } = structuredClone(metadataInput);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type } = authored;
  const slug = config.slug;
  const initialItems: Items = { ...config.content.items };
  const initialOrder = [...config.content.order];
  const content = { items: { ...initialItems }, order: [...initialOrder] };

  const splitOwnLocale = (value: DeepPartial<Course_Config['locale']>) => {
    const own = splitLocalizedFields(value);
    const files: Partial<Record<LanguageCode, DeepPartial<Course_Data>>> = {};
    for (const [language, fields] of Object.entries(own.locale ?? {})) {
      files[language as LanguageCode] = {
        locale: fields as DeepPartial<Course_Locale<'data'>>,
      };
    }
    return {
      invariant: own.base as DeepPartial<Course_Locale<'data'>>,
      files,
    };
  };

  /** One-level, placement-keyed assembly; each child validates its own Data. */
  const buildContent = (
    items: Record<string, Course_Child>,
    order: readonly string[],
    changes: Record<string, unknown> = {},
  ) => {
    const { languages } = requireBuildContext();
    const ids = new Set<string>();
    const entries = order.map(key => {
      const child = items[key];
      if (!child) throw new Error('Unknown Course child: ' + key);
      if (ids.has(child.id)) throw new Error('Duplicate Course child ID: ' + child.id);
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
    const base: Record<string, DeepPartial<Course_Child_Data>> = {};
    const patches: Record<string, ChildResource> = {};
    for (const { key, resource, patch } of entries) {
      // Preserve the source Lesson slug; the surrounding key is its placement.
      base[key] = mergeForValidation<Record<string, unknown>>(
        resource.base as Record<string, unknown>,
        (patch?.base ?? {}) as Record<string, unknown>,
      ) as DeepPartial<Course_Child_Data>;
      if (patch) patches[key] = patch;
    }
    const locale: Partial<Record<LanguageCode, Record<string, DeepPartial<Course_Child_Data>>>> = {};
    for (const language of languages) {
      const fragments: Record<string, DeepPartial<Course_Child_Data>> = {};
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
        ) as DeepPartial<Course_Child_Data>;
      }
      if (Object.keys(fragments).length) locale[language] = fragments;
    }
    return { base, locale, patches };
  };

  const base: CourseConfigBase = {
    id,
    slug,
    type,
    params: { ...structuredClone(authored.params), languages: [...authored.params.languages] },
    locale: onlyStrings(authored.locale),
  };

  const data = (options: PublicationLanguageOptions<Languages>): CoursePublication<CourseDataBase<Items>> => {
    const languages = resolvePublicationLanguages(options);
    validate({ ...copyAuthored(), content: { items: initialItems, order: initialOrder } });
    const metadata = copyAuthored();
    for (const language of languages) {
      if (!metadata.params.languages.includes(language)) {
        throw new Error('Course does not support publication language: ' + language);
      }
    }
    const own = splitOwnLocale(metadata.locale);
    const children = buildContent(initialItems, initialOrder);
    const files = selectPublicationLocales(own.files, languages) ?? {};
    for (const [language, entries] of Object.entries(children.locale)) {
      // Publication fragments are parsed against the concrete Props schema below.
      const destination = (files[language as LanguageCode] ??= {}) as Record<string, unknown>;
      Object.assign(destination, entries);
    }
    const result: CoursePublication<CourseDataBase<Items>> = {
      base: {
        id,
        slug,
        type,
        params: { ...metadata.params, languages: [...languages] },
        ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        children: [...initialOrder],
        ...children.base,
      } as CourseDataBase<Items>,
      locale: Object.keys(files).length ? files : undefined,
    };
    for (const language of languages) {
      course_Data_Schema.parse(
        mergeForValidation<Record<string, unknown>>(
          result.base as Record<string, unknown>,
          (result.locale?.[language] ?? {}) as Record<string, unknown>,
        ),
      );
    }
    return result;
  };

  const overrides = <const Added extends Record<string, Course_Child> = {}>(
    patch: Course_Overrides<Items, Added> & {
      content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): CoursePublication<CourseOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ ...copyAuthored(), content: { items: initialItems, order: initialOrder } });
      for (const language of languages) {
        if (!authored.params.languages.includes(language)) {
          throw new Error('Course does not support publication language: ' + language);
        }
      }
      if (!isRecord(patch)) throw new Error('Expected Course overrides object');
      for (const key of Object.keys(patch)) {
        if (!['params', 'locale', 'content'].includes(key)) throw new Error('Unknown Course override field: ' + key);
      }
      const metadataPatch = course_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key !== 'content')),
      );
      metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = splitOwnLocale(metadataPatch.locale ?? {});
      const output: CoursePublication<CourseOverrideBase> = {
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
            throw new Error('Unknown Course content override field: ' + key);
          }
        }
      }
      const changes = patch.content?.items ?? {};
      const additions = patch.content?.additionalItems ?? {};
      if (!isRecord(changes)) throw new Error('content.items must be a slug-keyed object');
      if (!isRecord(additions)) throw new Error('content.additionalItems must be a slug-keyed configurator map');
      const addedIssues = validateSluggedConfiguratorMap(additions, allowedChildren, {
        path: 'content.additionalItems',
        itemLabel: 'Course child',
        allowAliasForTypes: ['lesson'],
        reservedKeys: slugAddressedReservedKeys,
      });
      if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));

      const active: Record<string, Course_Child | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Course child slug: ' + key);
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
          throw new Error('New Course child must expose a matching immutable Build identity: ' + key);
        }
        active[key] = child as Course_Child;
      }
      for (const [key, change] of Object.entries(changes)) {
        if (!Object.hasOwn(initialItems, key)) throw new Error('Cannot override an unknown Course child: ' + key);
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
          Object.entries(active).filter((entry): entry is [string, Course_Child] => entry[1] !== false),
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
      validateSlugAddressedPublication(course_Data_Schema, data(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(
        'Invalid Course overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
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
      locales: (): { locale: DeepPartial<Course_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as Course_Configurator<Slug, Items, Languages>;
};
