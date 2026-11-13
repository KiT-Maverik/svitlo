import { resolveEntityPath } from '../../entityPath/resolveEntityPath.utils';

/**
 * Published Lesson Props. The Configurator has already validated and built this
 * value; the generator must not reassemble or reinterpret its nested content.
 */
export type LessonPropsPublication = {
  base: { id: string; type?: string };
  locale?: object | undefined;
};

export type LessonPublicationEntry = {
  source: string;
  publication: LessonPropsPublication;
};

const json = (value: unknown, source: string): string => {
  const content = JSON.stringify(
    value,
    (_key, entry: unknown) => {
      if (
        entry === undefined ||
        typeof entry === 'function' ||
        typeof entry === 'symbol' ||
        typeof entry === 'bigint' ||
        (typeof entry === 'number' && !Number.isFinite(entry))
      ) {
        throw new Error('Non-JSON value in Lesson publication: ' + source);
      }
      return entry;
    },
    2,
  );
  if (content === undefined) throw new Error('Empty Lesson publication: ' + source);
  return content + '\n';
};

/**
 * Render complete, already-built Lesson publications to relative file paths:
 * <uuid-last-hex-digit>/<uuid>/base.json and <locale>.json.
 *
 * The returned map is suitable for an atomic directory publisher. Every source
 * Lesson ID must be globally unique within the supplied publication batch.
 */
export function renderLessonPropsFiles(entries: readonly LessonPublicationEntry[]): Map<string, string> {
  const files = new Map<string, string>();
  const owners = new Map<string, string>();

  for (const { source, publication } of entries) {
    if (!publication || !publication.base || publication.base.type !== 'lesson') {
      throw new Error('Expected built Lesson Props at: ' + source);
    }
    const relative = resolveEntityPath(publication.base.id);
    const id = relative.split('/')[1];
    const previous = owners.get(id);
    if (previous !== undefined) {
      throw new Error('Duplicate Lesson ID ' + id + ': ' + previous + ' and ' + source);
    }
    owners.set(id, source);

    files.set(relative + '/base.json', json(publication.base, source + '/base'));
    if (publication.locale === undefined) continue;
    if (
      publication.locale === null ||
      typeof publication.locale !== 'object' ||
      Array.isArray(publication.locale)
    ) {
      throw new Error('Invalid Lesson locale publication: ' + source);
    }

    for (const [language, body] of Object.entries(publication.locale).sort(([a], [b]) => a.localeCompare(b))) {
      // Language codes are two-letter lower-case codes in the current Engine contract.
      if (!/^[a-z]{2}$/.test(language)) {
        throw new Error('Invalid Lesson language file name: ' + language + ' (' + source + ')');
      }
      if (body === undefined) continue;
      if (body === null || typeof body !== 'object' || Array.isArray(body)) {
        throw new Error('Invalid Lesson locale body: ' + source + '/' + language);
      }
      if (Object.keys(body).length === 0) continue; // Invariant-only locale.
      // body is already Props-shaped. Never add or unwrap a locale field.
      files.set(relative + '/' + language + '.json', json(body, source + '/' + language));
    }
  }
  return files;
}
