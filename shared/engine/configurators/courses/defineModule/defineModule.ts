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
  mayReuseCompletedLesson,
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
  module_Config_Schema,
  module_Metadata_Config_Schema,
  module_Data_Schema,
  module_Override_Config_Schema,
  type Module_Child,
  type Module_Child_Data,
  type Module_Config,
  type Module_Metadata_Config,
  type Module_Data,
  type Module_Locale,
  type Module_Metadata_Overrides,
  type Module_Overrides,
} from './defineModule.schemas';

type ChildResource = {
  base: DeepPartial<Module_Child_Data>;
  locale: Partial<Record<LanguageCode, DeepPartial<Module_Child_Data>>> | undefined;
};
type BuildChild = {
  build: {
    data: (options: PublicationLanguageOptions) => ChildResource;
    overrides: (value: never, options: PublicationLanguageOptions) => ChildResource;
  };
};
type ModulePublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCode, DeepPartial<Module_Data>>> | undefined;
};
type ModuleDataBase<Items extends Record<string, Module_Child>> = Pick<Module_Config, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<Module_Locale<'data'>>;
  children: Extract<keyof Items, string>[];
} & { [Key in keyof Items]: DeepPartial<Extract<Module_Child_Data, { type: Items[Key]['type'] }>> };
type ModuleOverrideBase = Module_Metadata_Overrides & {
  children?: string[];
  [key: string]: unknown;
};
type ModuleConfigBase = Pick<Module_Config, 'id' | 'slug' | 'type' | 'params'> & {
  locale: DeepPartial<Module_Locale<'config'>>;
};

const allowedChildren = ['chapter', 'lesson', 'episode', 'assessment'] as const;
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const authoredFields = new Set(['id', 'type', 'slug', 'params', 'locale', 'children']);
const directChildren = (config: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(config).filter(([key]) => !authoredFields.has(key)));

const validate = (config: Module_Config): void => {
  const items = directChildren(config);
  const parsed = module_Config_Schema.safeParse(config);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys({ items, order: config.children }, { path: 'children' }).map(issue => issue.path + ': ' + issue.message),
    ...validateSluggedConfiguratorMap(items, allowedChildren, {
      path: 'children', itemLabel: 'Module child', allowAliasForTypes: ['lesson'], reservedKeys: slugAddressedReservedKeys,
    }).map(issue => issue.path + ': ' + issue.message),
  ];
  for (const [slug, child] of Object.entries(items)) {
    if (!isRecord(child) || !isRecord(child.build) ||
        typeof child.build.data !== 'function' || typeof child.build.overrides !== 'function') {
      errors.push('children.' + slug + ': child must expose the stateless Build API');
      continue;
    }
    if (!isRecord(child.config) || !isRecord(child.config.base) ||
        child.config.base.id !== child.id ||
        ('draft' in child && child.draft === true && child.slug !== slug) ||
        (child.type === 'lesson' ? child.config.base.slug !== child.slug : child.config.base.slug !== slug) ||
        child.config.base.type !== child.type) {
      errors.push('children.' + slug + ': immutable child identity does not match its authored metadata');
    }
  }
  const seenIds = new Map<string, Record<string, unknown>>();
  for (const child of Object.values(items)) {
    if (!isRecord(child) || typeof child.id !== 'string') continue;
    const previous = seenIds.get(child.id);
    if (previous && !mayReuseCompletedLesson(previous, child)) {
      errors.push('children: duplicate Module child ID ' + child.id);
    } else seenIds.set(child.id, child);
  }
  if (errors.length) throw new Error('Module validation failed: ' + errors.join('; '));
};

/**
 * Stable, non-recursive declaration surface avoids TS7056 while preserving
 * the exact item keys and type-level child language scopes.
 */
export type Module_Configurator<
  Slug extends string = string,
  Items extends Record<string, Module_Child> = Record<string, Module_Child>,
  Languages extends readonly LanguageCode[] = readonly LanguageCode[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'module';
  readonly children: Extract<keyof Items, string>[];
  readonly validate: typeof validate;
  readonly build: {
    data(options: PublicationLanguageOptions<Languages>): ModulePublication<ModuleDataBase<Items>>;
    overrides<const Added extends Record<string, Module_Child>>(
      patch: Module_Overrides<Items, Added> & ChildrenSupporting<Languages, Added>,
      options: PublicationLanguageOptions<Languages>,
    ): ModulePublication<ModuleOverrideBase>;
    overrides(
      patch: Module_Overrides<Items>,
      options: PublicationLanguageOptions<Languages>,
    ): ModulePublication<ModuleOverrideBase>;
  };
  readonly config: {
    base: ModuleConfigBase;
    locales: () => { locale: DeepPartial<Module_Locale<'config'>> };
    validate: typeof validate;
  };
} & (string extends keyof Items ? {} : Readonly<Items>) & LanguageScope<Languages>;

type ModuleAuthoredInput<
  Slug extends string,
  Items extends Record<string, Module_Child>,
  Languages extends readonly LanguageCode[],
> = Omit<Module_Metadata_Config, 'slug' | 'locale'> & {
  slug: Slug;
  children: Extract<keyof Items, string>[];
  locale: RequireLanguages<Module_Config['locale'], Languages>;

} & Items & ChildrenSupporting<Languages, Items> & SafePlacementMap<Items>;

/** Define a Module with immutable ordered child configurators and stateless Build. */
const defineModuleImplementation = <
  const Slug extends string,
  const Items extends Record<string, Module_Child>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: ModuleAuthoredInput<Slug, Items, Languages>,
): Module_Configurator<Slug, Items, Languages> => {
  const metadataSchema = module_Metadata_Config_Schema;
  const metadataInput = { id: config.id, type: config.type, slug: config.slug, params: config.params, locale: config.locale };
  const authored: Omit<Module_Metadata_Config, never> = structuredClone(metadataInput);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type } = authored;
  const slug = config.slug;
  const initialItems = directChildren(config) as Items;
  const initialOrder = [...config.children];

  const splitOwnLocale = (value: DeepPartial<Module_Config['locale']>) => {
    const own = splitLocalizedFields(value);
    const files: Partial<Record<LanguageCode, DeepPartial<Module_Data>>> = {};
    for (const [language, fields] of Object.entries(own.locale ?? {})) {
      files[language as LanguageCode] = {
        locale: fields as DeepPartial<Module_Locale<'data'>>,
      };
    }
    return {
      invariant: own.base as DeepPartial<Module_Locale<'data'>>,
      files,
    };
  };

  /** One-level, placement-keyed assembly; each child validates its own Data. */
  const buildContent = (
    items: Record<string, Module_Child>,
    order: readonly string[],
    changes: Record<string, unknown> = {},
  ) => {
    const { languages } = requireBuildContext();
    const ids = new Map<string, Module_Child>();
    const entries = order.map(key => {
      const child = items[key];
      if (!child) throw new Error('Unknown Module child: ' + key);
      const previous = ids.get(child.id);
      if (previous && !mayReuseCompletedLesson(previous, child)) {
        throw new Error('Duplicate Module child ID: ' + child.id);
      }
      ids.set(child.id, child);
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
    const base: Record<string, DeepPartial<Module_Child_Data>> = {};
    const patches: Record<string, ChildResource> = {};
    for (const { key, resource, patch } of entries) {
      // Preserve the source Lesson slug; the surrounding key is its placement.
      base[key] = mergeForValidation<Record<string, unknown>>(
        resource.base as Record<string, unknown>,
        (patch?.base ?? {}) as Record<string, unknown>,
      ) as DeepPartial<Module_Child_Data>;
      if (patch) patches[key] = patch;
    }
    const locale: Partial<Record<LanguageCode, Record<string, DeepPartial<Module_Child_Data>>>> = {};
    for (const language of languages) {
      const fragments: Record<string, DeepPartial<Module_Child_Data>> = {};
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
        ) as DeepPartial<Module_Child_Data>;
      }
      if (Object.keys(fragments).length) locale[language] = fragments;
    }
    return { base, locale, patches };
  };

  const base: ModuleConfigBase = {
    id,
    slug,
    type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  };

  const data = (options: PublicationLanguageOptions<Languages>): ModulePublication<ModuleDataBase<Items>> => {
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
    const result: ModulePublication<ModuleDataBase<Items>> = {
      base: {
        id,
        slug,
        type,
        params: metadata.params,
        ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        children: [...initialOrder],
        ...children.base,
      } as unknown as ModuleDataBase<Items>,
      locale: Object.keys(files).length ? files : undefined,
    };
    for (const language of languages) {
      module_Data_Schema.parse(
        mergeForValidation<Record<string, unknown>>(
          result.base as Record<string, unknown>,
          (result.locale?.[language] ?? {}) as Record<string, unknown>,
        ),
      );
    }
    return result;
  };

  const overrides = <const Added extends Record<string, Module_Child> = {}>(
    patch: Module_Overrides<Items, Added> & ChildrenSupporting<Languages, Added>,
    options: PublicationLanguageOptions<Languages>,
  ): ModulePublication<ModuleOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ ...copyAuthored(), children: initialOrder, ...initialItems });
      if (!isRecord(patch)) throw new Error('Expected Module overrides object');
      const metadataPatch = module_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key === 'params' || key === 'locale')),
      );
      metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = splitOwnLocale(metadataPatch.locale ?? {});
      const output: ModulePublication<ModuleOverrideBase> = {
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
      const additions: Record<string, Module_Child> = {};
      for (const [key, change] of Object.entries(patch)) {
        if (authoredFields.has(key)) {
          if (key !== 'params' && key !== 'locale' && key !== 'children') {
            throw new Error('Immutable Module override field: ' + key);
          }
          continue;
        }
        if (Object.hasOwn(initialItems, key)) changes[key] = change;
        else additions[key] = change as Module_Child;
      }
      const addedIssues = validateSluggedConfiguratorMap(additions, allowedChildren, {
        path: 'children', itemLabel: 'Module child', allowAliasForTypes: ['lesson'], reservedKeys: slugAddressedReservedKeys,
      });
      if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));

      const active: Record<string, Module_Child | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Module child slug: ' + key);
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
          throw new Error('New Module child must expose a matching immutable Build identity: ' + key);
        }
        active[key] = child as Module_Child;
      }
      for (const [key, change] of Object.entries(changes)) {
        if (!Object.hasOwn(initialItems, key)) throw new Error('Cannot override an unknown Module child: ' + key);
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
          Object.entries(active).filter((entry): entry is [string, Module_Child] => entry[1] !== false),
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
      validateSlugAddressedPublication(module_Data_Schema, data(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(
        'Invalid Module overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
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
      locales: (): { locale: DeepPartial<Module_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as unknown as Module_Configurator<Slug, Items, Languages>;
};

/** Explicit authoring generics preserve the historical <Slug, Items, Languages> order. */
export function defineModule<
  const Slug extends string,
  const Items extends Record<string, Module_Child>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(config: ModuleAuthoredInput<Slug, Items, Languages>): Module_Configurator<Slug, Items, Languages>;

/** Infer direct placement fields from the ordered placement key literals. */
export function defineModule<
  const Slug extends string,
  const Keys extends string,
  const Items extends Record<Keys, Module_Child>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(config: Omit<Module_Metadata_Config, 'slug' | 'locale'> & {
    slug: Slug;
    children: Keys[];
    locale: RequireLanguages<Module_Config['locale'], Languages>;
  } & { [Key in Keys]: Items[Key] } &
  ChildrenSupporting<Languages, Items> & SafePlacementMap<Items>): Module_Configurator<Slug, Items, Languages>;
export function defineModule(config: unknown): unknown {
  return defineModuleImplementation(config as never);
}
