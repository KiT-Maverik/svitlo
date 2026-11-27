import type { LanguageCode } from '#schemas';
import type { ChildrenSupporting, PublicationLanguageOptions } from '#types';

import {
  buildChildData,
  buildChildOverrides,
  mergeForValidation,
  scopeBuild,
  slugAddressedReservedKeys,
} from '../_shared__configurators';
import type { Lesson_Configurator } from '../lessons/defineLesson';
import { sectionTypes, type Section_Configurator } from '../sections';
import type { CourseLessonBoundPatch } from '../../types/workflow/courseLessonSourcePatch.types';

type AddedSections = Record<string, Section_Configurator>;
type LessonPatch<Lesson extends Lesson_Configurator, Added extends AddedSections = {}> =
  CourseLessonBoundPatch<Lesson, Added> &
  ChildrenSupporting<Lesson['__svitloLanguageScope'], Added>;

/**
 * Infer *only* genuinely new Section keys from the supplied literal patch.
 * A generic Added=Record<string, Section> would poison every existing key
 * with never and silently discard all useful inference.
 */
type AddedFromPatch<Lesson, Patch> = {
  [Key in Exclude<keyof Patch, keyof Lesson | 'params' | 'locale' | 'events' | 'children'>]:
    Patch[Key] extends Section_Configurator ? Patch[Key] : never;
};
type VerifiedPatchKeys<Lesson extends Lesson_Configurator, Patch> = {
  [Key in keyof Patch]: Key extends keyof CourseLessonBoundPatch<Lesson>
    ? unknown
    : Key extends keyof Lesson
      ? never
      : Patch[Key] extends Section_Configurator ? unknown : never;
};

/**
 * A placement owns its patch snapshot, not the independently authored Lesson.
 * Added Sections are trusted Build Configurators, never executable draft input.
 */
export type PlacedLesson<
  Lesson extends Lesson_Configurator,
  Added extends AddedSections = {},
> = Lesson & {
  readonly placement: {
    readonly source: Lesson;
    readonly patch: LessonPatch<Lesson, Added>;
  };
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  isObject(value) &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
const metadataKeys = new Set(['params', 'locale', 'events', 'children']);
const prohibitedKeys = new Set<string>([
  ...slugAddressedReservedKeys.filter(key => !metadataKeys.has(key)),
  'skills',
]);

/** Reject functions, accessors, prototype keys, cycles and non-JSON patch data. */
const assertPlain = (value: unknown, trail = 'patch', seen = new Set<object>()): void => {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number' && Number.isFinite(value)) return;
  if (typeof value !== 'object' || value === null || seen.has(value)) {
    throw new Error('Lesson placement requires plain JSON Config at ' + trail);
  }
  if (!Array.isArray(value) && !isPlainObject(value))
    throw new Error('Lesson placement requires plain JSON Config at ' + trail);
  seen.add(value);
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index++) {
      if (!Object.hasOwn(value, index)) throw new Error('Sparse Lesson placement array at ' + trail);
      assertPlain(value[index], trail + '[' + index + ']', seen);
    }
  } else {
    if (Object.getOwnPropertySymbols(value).length) throw new Error('Symbol in Lesson placement at ' + trail);
    for (const [key, property] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
      if (['__proto__', 'prototype', 'constructor'].includes(key) ||
          !Object.hasOwn(property, 'value')) {
        throw new Error('Unsafe Lesson placement key or accessor at ' + trail + '.' + key);
      }
      assertPlain(property.value, trail + '.' + key, seen);
    }
  }
  seen.delete(value);
};

/** Guard the *real* trusted Section identity and Build interface at a direct key. */
const isVerifiedSection = (value: unknown, key: string): value is Section_Configurator => {
  if (!isObject(value) || !sectionTypes.some(type => type === value.type) ||
      value.slug !== key || typeof value.id !== 'string' ||
      !isObject(value.config) || !isObject(value.config.base) ||
      value.config.base.id !== value.id ||
      value.config.base.slug !== key || value.config.base.type !== value.type ||
      !isObject(value.build) ||
      typeof value.build.data !== 'function' ||
      typeof value.build.overrides !== 'function') return false;
  return true;
};

/**
 * Only direct *new* Section keys may hold trusted Configurators. Every other
 * value is independently cloned JSON. Never recursively clone Build methods.
 */
const snapshotPatch = <Patch>(
  patch: Patch,
  existingKeys: ReadonlySet<string>,
): Patch => {
  if (!isPlainObject(patch)) throw new Error('Lesson placement patch must be a plain Config object');
  const snapshot: Record<string, unknown> = {};
  for (const [key, property] of Object.entries(Object.getOwnPropertyDescriptors(patch))) {
    if (prohibitedKeys.has(key) || !Object.hasOwn(property, 'value'))
      throw new Error('Unsafe or immutable Lesson placement field: ' + key);
    const value = property.value;
    if (!metadataKeys.has(key) && !existingKeys.has(key) && isVerifiedSection(value, key)) {
      snapshot[key] = value;
      continue;
    }
    assertPlain(value, 'patch.' + key);
    snapshot[key] = structuredClone(value);
  }
  return snapshot as Patch;
};

const merge = (base: Record<string, unknown>, patch: Record<string, unknown>) =>
  mergeForValidation<Record<string, unknown>>(base, patch);

/**
 * An override array is a complete replacement; false is a Section tombstone,
 * not publishable Data. The original Lesson validates the sparse patch first.
 */
const withoutDisabledSections = (
  value: Record<string, unknown>,
  patch: Record<string, unknown>,
  existingKeys: ReadonlySet<string>,
): Record<string, unknown> => {
  const complete = { ...value };
  for (const [key, child] of Object.entries(patch)) {
    if (existingKeys.has(key) && child === false) delete complete[key];
  }
  return complete;
};

/**
 * Attach a placement-local Config patch to an original Lesson.
 *
 * Existing nested Section/ContentBlock patches and trusted added Sections use
 * direct keys. The original Lesson's Build is the final validation boundary.
 * Neither source Config nor its locale publication is mutated.
 */
export function placeLesson<
  const Lesson extends Lesson_Configurator,
  const Patch extends Record<string, unknown>,
>(
  source: Lesson,
  patch: Patch & LessonPatch<Lesson, AddedFromPatch<Lesson, Patch>> &
    VerifiedPatchKeys<Lesson, Patch>,
): PlacedLesson<Lesson, AddedFromPatch<Lesson, Patch>> {
  if (
    source?.type !== 'lesson' ||
    typeof source.build?.data !== 'function' ||
    typeof source.build?.overrides !== 'function' ||
    (isObject(source) && Object.hasOwn(source, 'placement'))
  ) {
    throw new Error('placeLesson requires an original defineLesson Configurator');
  }
  const existingKeys = new Set<string>(source.children);
  const authored = snapshotPatch(patch, existingKeys);

  const composed = (additional: unknown): Record<string, unknown> => {
    const next = snapshotPatch(additional, existingKeys) as Record<string, unknown>;
    const combined = { ...(authored as Record<string, unknown>) };
    for (const [key, value] of Object.entries(next)) {
      const prior = combined[key];
      if (!existingKeys.has(key) && isVerifiedSection(prior, key)) {
        if (value === false) {
          delete combined[key];
          continue;
        }
        if (!isVerifiedSection(value, key))
          throw new Error('Added Lesson Section cannot be patched without a Section Build: ' + key);
      }
      // New trusted Section instances and complete array/order replacements
      // are atomic; metadata and existing nested Config patches merge by key.
      combined[key] = isVerifiedSection(value, key) || key === 'events'
        ? value
        : merge({ value: prior }, { value }).value;
    }
    return combined;
  };

  const build = scopeBuild({
    data(options: PublicationLanguageOptions<Lesson['__svitloLanguageScope']>) {
      const original = buildChildData(source);
      const changed = buildChildOverrides(source, authored);
      const changeBase = changed.base as Record<string, unknown>;
      const base = withoutDisabledSections(
        merge(original.base as Record<string, unknown>, changeBase),
        changeBase, existingKeys,
      );
      const files: Partial<Record<LanguageCode, Record<string, unknown>>> = {};
      for (const code of options.languages) {
        if (original.locale?.[code] === undefined && changed.locale?.[code] === undefined) continue;
        const before = merge(
          original.base as Record<string, unknown>,
          (original.locale?.[code] ?? {}) as Record<string, unknown>,
        );
        files[code] = withoutDisabledSections(
          merge(merge(before, changeBase),
            (changed.locale?.[code] ?? {}) as Record<string, unknown>),
          changeBase, existingKeys,
        );
      }
      return {
        base,
        locale: Object.keys(files).length ? files : undefined,
      } as ReturnType<Lesson['build']['data']>;
    },
    overrides(
      additional: CourseLessonBoundPatch<Lesson>,
      _options: PublicationLanguageOptions<Lesson['__svitloLanguageScope']>,
    ) {
      return buildChildOverrides(source, composed(additional));
    },
  });

  return {
    ...source,
    placement: { source, patch: snapshotPatch(authored, existingKeys) },
    build,
  } as PlacedLesson<Lesson, AddedFromPatch<Lesson, Patch>>;
}
