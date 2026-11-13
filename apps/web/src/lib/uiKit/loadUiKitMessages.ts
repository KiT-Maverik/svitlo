import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Locale } from '@svitlo/contracts/localization';
import { getLanguageCode } from '@svitlo/engine/runtime';
import type { UiKitMessages } from '@svitlo/ui-kit';

/** One read per locale per server process; never import authored UI Kit data. */
const localeCache = new Map<Locale, Promise<UiKitMessages>>();

export function loadUiKitMessages(locale: Locale): Promise<UiKitMessages> {
  const cached = localeCache.get(locale);
  if (cached) return cached;
  const file = join(process.cwd(), 'public', 'data', 'uiKit', 'components', getLanguageCode(locale) + '.json');
  const pending = readFile(file, 'utf8')
    .then(content => JSON.parse(content) as UiKitMessages)
    .catch(error => {
      localeCache.delete(locale);
      throw error;
    });
  localeCache.set(locale, pending);
  return pending;
}
