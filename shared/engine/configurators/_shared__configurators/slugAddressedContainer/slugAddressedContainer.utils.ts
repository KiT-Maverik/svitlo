import { camelCase_Schema } from '#schemas';
import type { LanguageCode } from '#schemas';

import { mergeForValidation } from '../assemblyFields.utils';

/** Fixed Data fields plus unsafe JS object keys and the retired collection envelope. */
export const slugAddressedReservedKeys = [
  'id', 'type', 'slug', 'params', 'locale', 'children',
  'content', 'items', 'order', 'additionalItems', 'additionalChildren',
  '__proto__', 'prototype', 'constructor', 'toString', 'valueOf',
  'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
  'toLocaleString', '__defineGetter__', '__defineSetter__',
  '__lookupGetter__', '__lookupSetter__',
] as const;

const metadata = new Set(['id', 'type', 'slug', 'params', 'locale', 'children']);
const reserved = new Set<string>(slugAddressedReservedKeys);
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

export type SlugAddressedIssue = { path: (string | number)[]; message: string };

/**
 * Validate ONE ordered, slug-addressed Data boundary. Child-owned content is
 * intentionally opaque: its own Configurator has already validated it.
 */
export const validateSlugAddressedContainer = (
  value: unknown,
  allowedTypes: readonly string[],
): SlugAddressedIssue[] => {
  if (!record(value)) return [{ path: [], message: 'Expected a slug-addressed Data object' }];
  const issues: SlugAddressedIssue[] = [];
  if (!Array.isArray(value.children)) {
    issues.push({ path: ['children'], message: 'children must be an ordered array of placement slugs' });
  }
  const children = Array.isArray(value.children) ? value.children : [];
  const keys = Object.keys(value).filter(key => !metadata.has(key));
  const active = new Set<string>();
  const ids = new Set<string>();

  for (const key of keys) {
    if (reserved.has(key)) {
      issues.push({ path: [key], message: 'Reserved child placement slug: ' + key });
      continue;
    }
    if (!camelCase_Schema.safeParse(key).success) {
      issues.push({ path: [key], message: 'Child placement key must be camelCase: ' + key });
    }
    const child = value[key];
    if (!record(child)) {
      issues.push({ path: [key], message: 'Child must be an active Data object (not disabled or stale)' });
      continue;
    }
    if (typeof child.type !== 'string' || !allowedTypes.includes(child.type)) {
      issues.push({ path: [key, 'type'], message: 'Unsupported child type: ' + String(child.type) });
    }
    if (typeof child.id !== 'string' || !child.id) {
      issues.push({ path: [key, 'id'], message: 'Child must have an immutable ID' });
    } else if (ids.has(child.id)) {
      issues.push({ path: [key, 'id'], message: 'Duplicate child ID: ' + child.id });
    } else {
      ids.add(child.id);
    }
    if (typeof child.slug !== 'string' || !child.slug) {
      issues.push({ path: [key, 'slug'], message: 'Child must retain its authored slug' });
    } else if (child.type !== 'lesson' && child.slug !== key) {
      issues.push({ path: [key, 'slug'], message: 'Child placement key does not match authored slug: ' + key });
    }
    active.add(key);
  }

  const seen = new Set<string>();
  for (const [index, key] of children.entries()) {
    if (typeof key !== 'string' || !camelCase_Schema.safeParse(key).success || reserved.has(key)) {
      issues.push({ path: ['children', index], message: 'Invalid or reserved placement slug: ' + String(key) });
      continue;
    }
    if (seen.has(key)) issues.push({ path: ['children', index], message: 'Duplicate placement slug: ' + key });
    if (!active.has(key)) issues.push({ path: ['children', index], message: 'Unknown or disabled child: ' + key });
    seen.add(key);
  }
  for (const key of active) {
    if (!seen.has(key)) {
      issues.push({ path: [key], message: 'Unlisted/stale child placement: ' + key });
    }
  }
  return issues;
};

/**
 * Validate effective four-layer Data, interpreting only explicit false
 * tombstones in a Course/Module/Chapter override as removals. The published
 * base Data itself never contains false children. E's runtime assembler must
 * apply the same tombstone rule before exposing resolved Data to a renderer.
 */
export const validateSlugAddressedPublication = (
  schema: { parse(value: unknown): unknown },
  source: { base: unknown; locale?: Partial<Record<LanguageCode, unknown>> },
  languages: readonly LanguageCode[],
  patch: { base: unknown; locale?: Partial<Record<LanguageCode, unknown>> },
): void => {
  for (const language of languages) {
    const original = mergeForValidation(source.base, source.locale?.[language] ?? {});
    const withBase = mergeForValidation(original, patch.base);
    const merged = mergeForValidation(withBase, patch.locale?.[language] ?? {});
    if (!record(merged)) throw new Error('Invalid slug-addressed Data root');
    const effective = { ...merged };
    if (record(patch.base)) {
      for (const [key, child] of Object.entries(patch.base)) {
        if (child === false && !metadata.has(key)) delete effective[key];
      }
    }
    try {
      schema.parse(effective);
    } catch (error) {
      throw new Error(
        'Invalid publication for language ' + language + ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  }
};
