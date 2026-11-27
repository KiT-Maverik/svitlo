/**
 * Build-only content identity for Lesson reviews.
 *
 * Hash the fully assembled `lesson.build.data({ languages })` resource.
 * This deliberately excludes Scene implementation and binary asset bytes:
 * unchanged Props with changed external files require separate reviews.
 */
import { createHash } from 'node:crypto';

function canonical(value: unknown): string {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') {
    return JSON.stringify(value);
  }
  if (typeof value === 'number' && Number.isFinite(value)) return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (typeof value === 'object' && value !== null) {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new Error('Lesson review Props must contain plain JSON objects');
    }
    return (
      '{' +
      Object.entries(value)
        .filter(([, entry]) => entry !== undefined)
        .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
        .map(([key, entry]) => JSON.stringify(key) + ':' + canonical(entry))
        .join(',') +
      '}'
    );
  }
  throw new Error('Lesson review Props must contain serializable JSON values');
}

/** Short SHA-256 identity for all assembled Lesson Props including locale data. */
export function hashLessonReviewProps(props: { base: unknown; locale?: unknown }): string {
  if (props === null || typeof props !== 'object' || !Object.hasOwn(props, 'base')) {
    throw new Error('Expected assembled Lesson Props with a base object');
  }
  return createHash('sha256').update(canonical(props)).digest('hex').slice(0, 20);
}

/** A bare digest is the identifier unless TypeScript needs '_' for a leading digit. */
export function lessonReviewIdentifier(digest: string): string {
  if (!/^[a-f0-9]{20}$/.test(digest)) throw new Error('Expected a 20-digit lowercase hexadecimal Lesson review digest');
  return /^[a-f]/.test(digest) ? digest : '_' + digest;
}
