import { z } from 'zod';

import type { LanguageCodes } from '../schemas/languages.schemas';
import { allLanguageCodes } from '../schemas/languages.schemas';
import { createLocaleSubsetSchema } from '../schemas/locale.schemas';

export type DefinitionLanguages = readonly [LanguageCodes, ...LanguageCodes[]];
export type EntityDefinition = {
  readonly config: {
    readonly base: unknown;
    readonly locales: () => unknown;
    readonly overrides?: () => unknown;
    readonly test?: {
      readonly config: (...args: any[]) => unknown;
      readonly props: (props: unknown) => unknown;
    };
  };
};
export type TaggedDefinition<Kind extends string> = EntityDefinition & { readonly kind: Kind };

const codes = new Set<string>(allLanguageCodes);
const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

export function isDefinition(value: unknown): value is EntityDefinition {
  if (!isObject(value) || !isObject(value.config)) return false;
  const config = value.config;
  return 'base' in config && typeof config.locales === 'function';
}

export function childDefinition<Child extends EntityDefinition>(
  predicate: (value: EntityDefinition) => boolean = () => true,
) {
  return z.custom<Child>(value => isDefinition(value) && predicate(value), {
    message: 'Expected a nested Definition returned by define*, not an authored config',
  });
}

export function taggedChild<Kind extends string>(...kinds: readonly Kind[]) {
  return childDefinition<TaggedDefinition<Kind>>(value => 'kind' in value && kinds.includes(value.kind as Kind));
}

export const localizedText = <L extends DefinitionLanguages>(languages: L) =>
  z.union([z.string().min(1), createLocaleSubsetSchema(languages, true)]);

export const localizedMap = <L extends DefinitionLanguages>(languages: L) => createLocaleSubsetSchema(languages, true);

export const uuid = z.uuid();
export const slug = z.string().min(1);
export const resolvedProps = <Kind extends string>(kind: Kind) =>
  z.object({ type: z.literal(kind), id: uuid }).catchall(z.unknown());

type Split = { base: unknown; locales: Record<string, unknown>; overrides: Record<string, unknown> };
const noLocales = (): Record<string, unknown> => ({});
const indexPath = (path: string) => path.replace(/\.\d+(?=\.|$)/g, '.*');

/**
 * Explicit localization paths are owned by each concrete entity schema.
 * Arrays use sparse numeric patches; nested Definitions contribute their
 * projections without serializing functions into base data.
 */
export function partitionDefinition(source: unknown, localizablePaths: readonly string[]): Split {
  const paths = new Set(localizablePaths);
  const project = (value: unknown, path: string, localized = false): Split => {
    if (isDefinition(value)) {
      const childLocales = value.config.locales();
      const childOverrides = value.config.overrides?.();
      const overrides = isObject(childOverrides) ? childOverrides : {};
      const localeKeys = isObject(childLocales) ? Object.keys(childLocales) : [];
      const perLanguage = localeKeys.length > 0 && localeKeys.every(key => codes.has(key));
      const locales: Record<string, unknown> = {};

      if (perLanguage && isObject(childLocales)) {
        for (const [language, patch] of Object.entries(childLocales)) {
          locales[language] = typeof patch === 'string' ? { value: patch } : patch;
        }
      } else if (isObject(childLocales)) {
        Object.assign(locales, project(childLocales, '', true).locales);
      }

      let base = value.config.base;
      // Composite ContentBlocks expose their child configurators outside config,
      // matching the SkillGroup / SkillDomain composition convention.
      if ('items' in value && Array.isArray(value.items)) {
        const items = project(value.items, 'items', true);
        if (isObject(base)) base = { ...base, items: items.base };
        for (const [language, patch] of Object.entries(items.locales)) {
          if (isObject(patch)) {
            const previous = locales[language];
            locales[language] = isObject(previous) ? deepMerge(previous, patch) : patch;
          }
        }
        Object.assign(overrides, items.overrides);
      }

      return { base, locales, overrides };
    }
    if (
      (localized || paths.has(indexPath(path))) &&
      isObject(value) &&
      Object.keys(value).length > 0 &&
      Object.keys(value).every(key => codes.has(key))
    ) {
      return { base: undefined, locales: { ...value }, overrides: {} };
    }
    if (Array.isArray(value)) {
      const parts = value.map((item, index) => project(item, path ? path + '.' + index : String(index), localized));
      const locales: Record<string, Record<string, unknown>> = {};
      const overrides: Record<string, unknown> = {};
      for (const [index, part] of parts.entries()) {
        if (Object.keys(part.overrides).length) overrides[index] = part.overrides;
        for (const [language, patch] of Object.entries(part.locales)) {
          (locales[language] ??= {})[index] = patch;
        }
      }
      return { base: parts.map(part => part.base), locales, overrides };
    }
    if (isObject(value)) {
      const base: Record<string, unknown> = {};
      const locales: Record<string, Record<string, unknown>> = {};
      const overrides: Record<string, unknown> = {};
      for (const [key, child] of Object.entries(value)) {
        const part = project(child, path ? path + '.' + key : key, localized);
        if (part.base !== undefined) base[key] = part.base;
        if (Object.keys(part.overrides).length) overrides[key] = part.overrides;
        for (const [language, patch] of Object.entries(part.locales)) {
          (locales[language] ??= {})[key] = patch;
        }
      }
      return { base, locales, overrides };
    }
    return { base: value, locales: noLocales(), overrides: {} };
  };
  return project(source, '');
}

const deepMerge = (left: Record<string, unknown>, right: Record<string, unknown>) => {
  const next = { ...left };
  for (const [key, value] of Object.entries(right)) {
    next[key] = isObject(value) && isObject(next[key]) ? deepMerge(next[key] as Record<string, unknown>, value) : value;
  }
  return next;
};

/**
 * One helper for the common Definition lifecycle. No old creator/generator
 * APIs are invoked; validation is handled by the entity's own Zod schemas.
 *
 * withOverrides() returns a separate Definition, so a course-specific view
 * never mutates the standalone Lesson's override state.
 */
export function defineStructured<
  const Kind extends string,
  const L extends DefinitionLanguages,
  S extends z.ZodTypeAny,
  P extends z.ZodTypeAny,
>(kind: Kind, source: z.input<S>, schema: (languages: L) => S, propsSchema: P, localizablePaths: readonly string[]) {
  const split = partitionDefinition(source, localizablePaths);
  const initialBase = split.base as Record<string, unknown>;
  const create = (patch: Record<string, unknown>) => {
    const definition = {
      kind,
      config: {
        base: initialBase,
        locales: () => (Object.keys(split.locales).length ? split.locales : null),
        overrides: () => {
          const resolved = deepMerge(split.overrides, patch);
          return Object.keys(resolved).length ? resolved : null;
        },
        test: {
          config: (languages: L) => schema(languages).safeParse(source),
          props: (props: unknown) => propsSchema.safeParse(props),
        },
      },
      withOverrides: (next: Record<string, unknown>) => create(deepMerge(patch, next)),
    };
    return definition satisfies TaggedDefinition<Kind>;
  };
  return create({});
}
