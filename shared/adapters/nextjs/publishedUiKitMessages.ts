import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Locale } from '@svitlo/contracts/localization';
import type { UiKitMessages } from '@svitlo/ui-kit';
import { getLanguageCode } from '@svitlo/engine/runtime';

/** Read only one locale from the standalone textbook's generated UI Kit JSON. */
const cache = new Map<string, Promise<UiKitMessages>>();

export function loadPublishedUiKitMessages(locale: Locale): Promise<UiKitMessages> {
  const filename = path.join(process.cwd(), 'public', 'data', 'uiKit', 'components', getLanguageCode(locale) + '.json');
  const cached = cache.get(filename);
  if (cached) return cached;

  const pending = readFile(filename, 'utf8')
    .then(text => JSON.parse(text) as UiKitMessages)
    .catch(error => {
      cache.delete(filename);
      throw new Error('Missing or invalid published UI Kit messages: ' + filename, { cause: error });
    });
  cache.set(filename, pending);
  return pending;
}
