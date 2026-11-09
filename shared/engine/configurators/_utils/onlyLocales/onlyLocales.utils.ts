import { z } from 'zod';

import { languageCode_Schema, localeText_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { projectFields } from '../_internal/projectFields';

const localeDictionary_Schema = z.partialRecord(languageCode_Schema, localeText_Schema);

/** A localized text value is a nonempty dictionary of supported language codes. */
export function isLocaleDictionary(value: unknown): boolean {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length > 0 &&
    localeDictionary_Schema.safeParse(value).success
  );
}

/** Keep only complete locale-dictionary leaves, preserving nested paths and array indexes. */
export function onlyLocales<const T extends object>(source: T): DeepPartial<T> {
  return projectFields(source, isLocaleDictionary);
}
