import type { DeepPartial } from '#types';

import { projectFields } from '../_internal/projectFields';
import { isLocaleDictionary } from '../onlyLocales/onlyLocales.utils';

/** Keep invariant strings, not the strings inside localized dictionaries. */
export function onlyStrings<const T extends object>(source: T): DeepPartial<T> {
  return projectFields(source, value => typeof value === 'string', isLocaleDictionary, true);
}
