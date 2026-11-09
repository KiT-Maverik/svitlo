import { z } from 'zod';

import { languageCode_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { projectFields } from '../_internal/projectFields';

// Scene values can contain nested text records. Ordinary text blocks constrain
// these values further in their own Config schemas.
const localizedValue_Schema: z.ZodType<unknown> = z.lazy(() =>
  z.union([z.string(), z.record(z.string(), localizedValue_Schema)]),
);

const localeDictionary_Schema = z.partialRecord(languageCode_Schema, localizedValue_Schema);

/** Recognize locale dictionaries by language keys, including structured Scene values. */
export function isLocaleDictionary(value: unknown): boolean {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length > 0 &&
    localeDictionary_Schema.safeParse(value).success
  );
}

/** Keep locale-dictionary leaves, preserving nested paths and array indexes. */
export function onlyLocales<const T extends object>(source: T): DeepPartial<T> {
  return projectFields(source, isLocaleDictionary);
}
