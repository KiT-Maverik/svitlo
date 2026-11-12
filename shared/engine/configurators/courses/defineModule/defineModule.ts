import type { LanguageCodes } from '#schemas';
import type { ChildrenSupporting, DeepPartial, LanguageScope, RequireLanguages } from '#types';

import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  splitLocalizedFields,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { chapter_Props_Schema } from '../defineChapter';
import { lesson_Props_Schema } from '../../lessons/defineLesson';
import {
  module_Config_Schema,
  module_Override_Config_Schema,
  type Module_Child,
  type Module_Child_Props,
  type Module_Config,
  type Module_Locale,
  type Module_Metadata_Overrides,
  type Module_Overrides,
  type Module_Props,
} from './defineModule.schemas';

type ChildResource = {
  base: DeepPartial<Module_Child_Props>;
  locale: Partial<Record<LanguageCodes, DeepPartial<Module_Child_Props>>> | undefined;
};
type BuildChild = {
  build: {
    props: () => ChildResource;
    overrides: (value: never) => ChildResource;
  };
};
type ModulePublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCodes, DeepPartial<Module_Props>>> | undefined;
};
type ModulePropsBase = Pick<Module_Config, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<Module_Locale<'props'>>;
  content: DeepPartial<Module_Child_Props>[];
};
type ModuleOverrideBase = Module_Metadata_Overrides & {
  content?: DeepPartial<Module_Child_Props>[];
};
type ModuleConfigBase = Pick<Module_Config, 'id' | 'slug' | 'type' | 'params'> & {
  locale: DeepPartial<Module_Locale<'config'>>;
};

const allowedChildren = ['chapter', 'lesson'] as const;
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const validate = (config: Module_Config): void => {
  const parsed = module_Config_Schema.safeParse(config);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys(config.content, { path: 'content' }).map(issue => issue.path + ': ' + issue.message),
    ...validateSluggedConfiguratorMap(config.content?.items, allowedChildren, {
      path: 'content.items',
      itemLabel: 'Module child',
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
    if (seenIds.has(child.id)) errors.push('content.items: duplicate Module child ID ' + child.id);
    seenIds.add(child.id);
  }
  if (errors.length) throw new Error('Module validation failed: ' + errors.join('; '));
};

const parseChild = (value: unknown): Module_Child_Props => {
  if (!isRecord(value)) throw new Error('Expected resolved Module child Props');
  switch (value.type) {
    case 'chapter': {
      const parsed = chapter_Props_Schema.safeParse(value);
      if (!parsed.success) throw new Error('Invalid Module child Props: ' + parsed.error.message);
      return structuredClone(value) as Module_Child_Props;
    }
    case 'lesson': {
      const parsed = lesson_Props_Schema.safeParse(value);
      if (!parsed.success) throw new Error('Invalid Module child Props: ' + parsed.error.message);
      return structuredClone(value) as Module_Child_Props;
    }
    default: throw new Error('Unsupported Module child type: ' + String(value.type));
  }
};

/**
 * Stable, non-recursive declaration surface avoids TS7056 while preserving
 * the exact item keys and type-level child language scopes.
 */
export type Module_Configurator<
  Slug extends string = string,
  Items extends Record<string, Module_Child> = Record<string, Module_Child>,
  Languages extends readonly LanguageCodes[] = readonly LanguageCodes[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'module';
  readonly content: { items: Items; order: string[] };
  readonly validate: typeof validate;
  readonly build: {
    props: () => ModulePublication<ModulePropsBase>;
    overrides: <const Added extends Record<string, Module_Child> = {}>(
      patch: Module_Overrides<Items, Added> & {
        content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
      },
    ) => ModulePublication<ModuleOverrideBase>;
  };
  readonly config: {
    base: ModuleConfigBase;
    locales: () => { locale: DeepPartial<Module_Locale<'config'>> };
    validate: typeof validate;
  };
} & LanguageScope<Languages>;

/** Define a Module with immutable ordered child configurators and stateless Build. */
export const defineModule = <
  const Slug extends string,
  const Items extends Record<string, Module_Child>,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Module_Config, 'slug' | 'content' | 'locale'> & {
    slug: Slug;
    content: { items: Items & ChildrenSupporting<Languages, Items>; order: string[] };
    locale: RequireLanguages<Module_Config['locale'], Languages>;

  },
): Module_Configurator<Slug, Items, Languages> => {
  validate(config);
  const metadataSchema = module_Config_Schema.omit({ content: true });
  const authored = metadataSchema.parse(config);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type } = authored;
  const slug = config.slug;
  const initialItems: Items = { ...config.content.items };
  const initialOrder = [...config.content.order];
  const content = { items: { ...initialItems }, order: [...initialOrder] };

  const splitOwnLocale = (value: DeepPartial<Module_Config['locale']>) => {
    const own = splitLocalizedFields(value);
    const files: Partial<Record<LanguageCodes, DeepPartial<Module_Props>>> = {};
    for (const [language, fields] of Object.entries(own.locale ?? {})) {
      files[language as LanguageCodes] = {
        locale: fields as DeepPartial<Module_Locale<'props'>,
      };
    }
    return {
      invariant: own.base as DeepPartial<Module_Locale<'props'>>,
      files,
    };
  };

  const buildContent = (
    items: Record<string, Module_Child>,
    order: readonly string[],
    patches: Record<string, unknown> = {},
    ownLanguages: readonly LanguageCodes[] = [],
  ) => {
    const ids = new Set<string>();
    for (const key of order) {
      const child = items[key];
      if (!child) throw new Error('Unknown Module child: ' + key);
      if (ids.has(child.id)) throw new Error('Duplicate Module child ID: ' + child.id);
      ids.add(child.id);
    }
    const entries = order.map(key => {
      const raw = items[key];
      const build = (raw as unknown as BuildChild).build;
      if (!build || typeof build.props !== 'function' || typeof build.overrides !== 'function') {
        throw new Error('Child lacks the stateless Build API: ' + key);
      }
      const resource = build.props();
      const patch = Object.hasOwn(patches, key) ? build.overrides(patches[key] as never) : undefined;
      return { resource, patch };
    });
    const base = entries.map(({ resource, patch }) =>
      mergeForValidation(resource.base, (patch?.base ?? {}) as DeepPartial<typeof resource.base>),
    );
    const languages = new Set<LanguageCodes>(ownLanguages);
    for (const { resource, patch } of entries) {
      for (const language of Object.keys(resource.locale ?? {})) languages.add(language as LanguageCodes);
      for (const language of Object.keys(patch?.locale ?? {})) languages.add(language as LanguageCodes);
    }
    const locale: Partial<Record<LanguageCodes, Module_Child_Props[]>> = {};
    for (const language of languages) {
      locale[language] = entries.map(({ resource, patch }) => {
        const original = mergeForValidation(resource.base, resource.locale?.[language] ?? {});
        const withBasePatch = mergeForValidation(original, (patch?.base ?? {}) as DeepPartial<typeof original>);
        const effective = mergeForValidation(withBasePatch, (patch?.locale?.[language] ?? {}) as DeepPartial<typeof withBasePatch>);
        return parseChild(effective);
      });
    }
    return { base, locale };
  };

  const base: ModuleConfigBase = {
    id,
    slug,
    type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  };

  const props = (): ModulePublication<ModulePropsBase> => {
    const metadata = copyAuthored();
    const own = splitOwnLocale(metadata.locale);
    const children = buildContent(initialItems, initialOrder, {}, Object.keys(own.files) as LanguageCodes[]);
    const files = own.files;
    for (const [language, entries] of Object.entries(children.locale)) {
      (files[language as LanguageCodes] ??= {}).content = entries;
    }
    return {
      base: {
        id, slug, type, params: metadata.params,
        ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        content: children.base,
      },
      locale: Object.keys(files).length ? files : undefined,
    };
  };

  const overrides = <const Added extends Record<string, Module_Child> = {}>(
    patch: Module_Overrides<Items, Added> & {
      content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
  ): ModulePublication<ModuleOverrideBase> => {
    try {
      if (!isRecord(patch)) throw new Error('Expected Module overrides object');
      for (const key of Object.keys(patch)) {
        if (!['params', 'locale', 'content'].includes(key)) throw new Error('Unknown Module override field: ' + key);
      }
      const metadataPatch = module_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key !== 'content')),
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
      const files = own.files;

      if (patch.content !== undefined && !isRecord(patch.content)) throw new Error('content must be an object');
      if (patch.content) {
        for (const key of Object.keys(patch.content)) {
          if (!['items', 'additionalItems', 'order'].includes(key)) {
            throw new Error('Unknown Module content override field: ' + key);
          }
        }
      }
      const changes = patch.content?.items ?? {};
      const additions = patch.content?.additionalItems ?? {};
      if (!isRecord(changes)) throw new Error('content.items must be a slug-keyed object');
      if (!isRecord(additions)) throw new Error('content.additionalItems must be a slug-keyed configurator map');
      const addedIssues = validateSluggedConfiguratorMap(additions, allowedChildren, {
        path: 'content.additionalItems', itemLabel: 'Module child',
      });
      if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));

      const active: Record<string, Module_Child | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Module child slug: ' + key);
        if (!isRecord(child) || !isRecord(child.build) ||
          typeof child.build.props !== 'function' || typeof child.build.overrides !== 'function') {
          throw new Error('New Module child must expose the Build API: ' + key);
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
      if (structureChanged && patch.content?.order === undefined) {
        throw new Error('content.order is required when adding or disabling children');
      }
      const order = patch.content?.order ?? initialOrder;
      const issues = validateOrderedKeys({ items: active, order }, { path: 'content', allowDisabled: true });
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));

      if (Object.keys(changes).length || Object.keys(additions).length || patch.content?.order !== undefined) {
        const enabled = Object.fromEntries(
          Object.entries(active).filter((entry): entry is [string, Module_Child] => entry[1] !== false),
        );
        const built = buildContent(enabled, order, childPatches, Object.keys(files) as LanguageCodes[]);
        output.base.content = built.base;
        for (const [language, values] of Object.entries(built.locale)) {
          (files[language as LanguageCodes] ??= {}).content = values;
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;
      return output;
    } catch (error) {
      throw new Error(
        'Invalid Module overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  return {
    id, slug, type, content, validate,
    build: { props, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<Module_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as Module_Configurator<Slug, Items, Languages>;
};
