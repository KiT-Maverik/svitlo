import { z } from 'zod';

import { languageCode_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { projectFields } from '../_internal/projectFields';

// Only language-to-string dictionaries are localized leaves. Nested Scene
// records use the same field-level localization contract as other blocks.
const localeDictionary_Schema = z.partialRecord(languageCode_Schema, z.string());

/** Recognize dictionaries keyed only by supported languages. */
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
