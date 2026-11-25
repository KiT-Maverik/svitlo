import { renderBlockerSpecification } from './renderBlockerTodo.mjs';

/**
 * A reviewed media brief is temporary implementation guidance, not a
 * persistent specification file or runtime Config. Keep it at the end of its
 * owning generated index.ts in the same comment as its cleanup blocker.
 */
const plainRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);

export function renderTemporaryMediaSpecification(
  production: Readonly<Record<string, unknown>> | undefined,
  kind: 'Image' | 'Video' | 'Audio' | 'Subtitles' | 'Scene',
): string {
  if (production === undefined) return '';
  if (!plainRecord(production)) throw new Error('$.production: expected plain authoring notes');

  // A media brief is a production instruction, never a second policy/status
  // inventory. Global accessibility, offline and device requirements are
  // verified independently by the workflow and do not need repeating here.
  const byKind: Record<typeof kind, readonly string[]> = {
    Image: ['prompt'],
    Video: ['script', 'storyboard', 'prompt', 'specification'],
    Audio: ['script', 'prompt', 'specification'],
    Subtitles: ['script', 'specification'],
    Scene: ['specification', 'pedagogicalIntent', 'script', 'storyboard'],
  };
  const details = Object.entries(production).filter(([key]) => byKind[kind].includes(key));
  if (kind === 'Image' && (typeof production.prompt !== 'string' || production.prompt.trim().length < 80))
    throw new Error('$.production.prompt: Image requires a concrete generation prompt with visual detail');
  if (!details.length) return '';

  const body = details
    .map(
      ([key, value]) =>
        '# ' + key + '\n\n' + (typeof value === 'string' ? value.trimEnd() : JSON.stringify(value, null, 2)),
    )
    .join('\n\n');

  return (
    renderBlockerSpecification(
      'Remove the temporary ' + kind + ' specification after this content item is implemented and verified.',
      body,
    ) + '\n'
  );
}
