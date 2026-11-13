import { languageCode_Schema, type LanguageCodes } from '../../schemas/languages.schemas';
import type { DeepPartial } from '../../types/transformer.types';
import {
  lesson_Props_Schema,
  type Lesson_Props,
  type Lesson_PropsBase,
} from '../../configurators/lessons/defineLesson/defineLesson.schemas';

/** Published locale files are sparse Props-shaped fragments, not authoring configs. */
export type LessonPropsFragment = DeepPartial<Lesson_Props>;

export type PublishedLessonPropsResource = {
  base: Lesson_PropsBase;
  locale?: Partial<Record<LanguageCodes, LessonPropsFragment>>;
};

/** Build-time overrides have no right to replace the Lesson's immutable identity. */
type LessonOverrideFragment = Omit<LessonPropsFragment, 'id' | 'slug' | 'type'>;

export type PublishedLessonPropsOverride = {
  base?: LessonOverrideFragment;
  locale?: Partial<Record<LanguageCodes, LessonOverrideFragment>>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const unsafeKeys = new Set(['__proto__', 'constructor', 'prototype']);

/** Objects merge by key; arrays and primitive values replace their predecessors. */
function merge(previous: unknown, next: unknown): unknown {
  if (next === undefined) return previous;
  if (!isRecord(previous) || !isRecord(next)) return next;

  const result: Record<string, unknown> = { ...previous };
  for (const [key, value] of Object.entries(next)) {
    if (unsafeKeys.has(key)) throw new Error('Unsafe published Lesson property: ' + key);
    result[key] = merge(previous[key], value);
  }
  return result;
}

function checkFragment(fragment: unknown, label: string): void {
  if (fragment === undefined) return;
  if (!isRecord(fragment)) throw new Error('Invalid published Lesson ' + label + ': expected Props object');

  for (const field of ['id', 'slug', 'type']) {
    if (Object.hasOwn(fragment, field)) {
      throw new Error('Published Lesson ' + label + ' cannot override identity field: ' + field);
    }
  }
  if (isRecord(fragment.params) && Object.hasOwn(fragment.params, 'languages')) {
    throw new Error('Published Lesson ' + label + ' cannot override params.languages');
  }
}

/**
 * Pure, cross-platform Lesson assembler. Hosts read the files; this function
 * resolves exactly one requested language and produces validated frontend Props.
 *
 * Precedence: resource.base -> resource.locale[language] ->
 *             override.base -> override.locale[language].
 * A published Props array always replaces the complete earlier array.
 */
export function assembleLessonProps(
  resource: PublishedLessonPropsResource,
  language: LanguageCodes,
  override?: PublishedLessonPropsOverride,
): Lesson_Props {
  const selected = languageCode_Schema.parse(language);
  if (!isRecord(resource) || !isRecord(resource.base)) {
    throw new Error('Invalid published Lesson resource: missing base Props object');
  }

  const { base } = resource;
  if (!isRecord(base.params) || !Array.isArray(base.params.languages) || !base.params.languages.includes(selected)) {
    throw new Error('Lesson does not support requested language: ' + selected);
  }

  const resourceLocale = resource.locale?.[selected];
  const overrideLocale = override?.locale?.[selected];
  checkFragment(resourceLocale, 'locale ' + selected);
  checkFragment(override?.base, 'override base');
  checkFragment(overrideLocale, 'override locale ' + selected);

  let resolved: unknown = base;
  for (const layer of [resourceLocale, override?.base, overrideLocale]) {
    if (layer !== undefined) resolved = merge(resolved, layer);
  }

  try {
    // Zod parses a fresh Props value; clone the unknown child payloads as well.
    return structuredClone(lesson_Props_Schema.parse(resolved)) as Lesson_Props;
  } catch (error) {
    throw new Error('Invalid assembled Lesson Props for ' + selected, { cause: error });
  }
}
