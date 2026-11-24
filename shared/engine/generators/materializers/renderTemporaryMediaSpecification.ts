/**
 * A reviewed media brief is temporary implementation guidance, not a
 * persistent specification file or runtime Config. Keep it at the end of its
 * owning generated index.ts, with an explicit cleanup blocker.
 */
const plainRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);

export function renderTemporaryMediaSpecification(
  production: Readonly<Record<string, unknown>> | undefined,
  kind: 'Image' | 'Video' | 'Audio' | 'Subtitles',
): string {
  if (production === undefined) return '';
  if (!plainRecord(production)) throw new Error('$.production: expected plain authoring notes');

  const details = Object.entries(production).filter(([key]) => key !== 'pending' && key !== 'documentLanguage');
  if (!details.length) return '';

  const body = details
    .map(
      ([key, value]) =>
        '# ' + key + '\n\n' + (typeof value === 'string' ? value.trimEnd() : JSON.stringify(value, null, 2)),
    )
    .join('\n\n')
    .replace(/\r\n?|\u2028|\u2029/g, '\n')
    // An authored brief cannot terminate the generated TS block comment.
    .replace(/\*\//g, '* /');

  return [
    '// TODO (BLOCKER): Remove the temporary ' +
      kind +
      ' specification after this content item is implemented and verified.',
    '/**',
    ...body.split('\n').map(line => ' *' + (line ? ' ' + line : '')),
    ' */',
    '',
  ].join('\n');
}
