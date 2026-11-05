import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Locale } from '@svitlo/engine/localization';
import type { UiKit_Global } from '@svitlo/ui-kit';

/** One read per locale per server process; never import authored UI Kit data. */
const localeCache = new Map<Locale, Promise<UiKit_Global<'response'>>>();

export function loadUiKitMessages(locale: Locale): Promise<UiKit_Global<'response'>> {
  const cached = localeCache.get(locale);
  if (cached) return cached;
  const file = join(process.cwd(), 'public', 'data', 'ui-kit', locale + '.json');
  const pending = readFile(file, 'utf8')
    .then(content => JSON.parse(content) as UiKit_Global<'response'>)
    .catch(error => {
      localeCache.delete(locale);
      throw error;
    });
  localeCache.set(locale, pending);
  return pending;
}
