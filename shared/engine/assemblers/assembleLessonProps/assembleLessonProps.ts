import {
  lesson_Data_Schema,
  type Lesson_Data,
  type Lesson_DataBase,
} from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import { languageCode_Schema, type LanguageCode } from '../../schemas/languages.schemas';
import type { DeepPartial } from '../../types/transformer.types';

/** Published locale files are sparse Data-shaped fragments, not authoring configs. */
export type LessonDataFragment = DeepPartial<Lesson_Data>;

export type PublishedLessonDataResource = {
  base: Lesson_DataBase;
  locale?: Partial<Record<LanguageCode, LessonDataFragment>>;
};

/**
 * Published overrides never replace Lesson identity or language scope.
 * Collections use direct placement slugs; child deletions are published as false tombstones. Question/Flashcard resources are published independently.
 */
export type LessonOverrideFragment = {
  params?: DeepPartial<Omit<Lesson_Data['params'], 'languages'>>;
  locale?: DeepPartial<Lesson_Data['locale']>;
  children?: string[];
  [placementSlug: string]: unknown;
  events?: Lesson_Data['events'];
};

export type PublishedLessonDataOverride = {
  base?: LessonOverrideFragment;
  locale?: Partial<Record<LanguageCode, LessonOverrideFragment>>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const unsafeKeys = new Set(['__proto__', 'constructor', 'prototype']);

/** Objects merge by key; arrays replace atomically. False placement tombstones delete child keys. */
function merge(previous: unknown, next: unknown): unknown {
  if (next === undefined) return previous;
  if (!isRecord(previous) || !isRecord(next)) return next;

  const result: Record<string, unknown> = { ...previous };
  const childKeys = new Set(Array.isArray(previous.children) ? previous.children : []);
  for (const [key, value] of Object.entries(next)) {
    if (unsafeKeys.has(key)) throw new Error('Unsafe published Lesson property: ' + key);
    if (value === false && childKeys.has(key)) {
      delete result[key];
      continue;
    }
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
export function assembleLessonData(
  resource: PublishedLessonDataResource,
  language: LanguageCode,
  override?: PublishedLessonDataOverride,
): Lesson_Data {
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
    return structuredClone(lesson_Data_Schema.parse(resolved)) as Lesson_Data;
  } catch (error) {
    throw new Error('Invalid assembled Lesson Props for ' + selected, { cause: error });
  }
}
