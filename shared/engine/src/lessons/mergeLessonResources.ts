/**
 * Merge one shared Lesson collection with its selected-language sparse patch.
 * Objects merge recursively; numeric-key patches target existing array indexes.
 * This never mutates either input or silently replaces invariant scalar fields.
 */
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const forbidden = new Set(['__proto__', 'prototype', 'constructor']);

export function mergeLessonResources(base: unknown, patch: unknown): unknown {
  function merge(current: unknown, overlay: unknown, at: string): unknown {
    if (Array.isArray(current)) {
      if (!isRecord(overlay)) throw new Error('Expected sparse array patch at ' + at);
      const copy: unknown[] = [...current];
      for (const [key, value] of Object.entries(overlay)) {
        if (!/^(0|[1-9][0-9]*)$/.test(key) || Number(key) >= copy.length) {
          throw new Error('Invalid sparse array index at ' + at + '/' + key);
        }
        copy[Number(key)] = merge(copy[Number(key)], value, at + '/' + key);
      }
      return copy;
    }
    if (isRecord(current)) {
      if (!isRecord(overlay)) throw new Error('Expected sparse object patch at ' + at);
      const copy: Record<string, unknown> = { ...current };
      for (const [key, value] of Object.entries(overlay)) {
        if (forbidden.has(key)) throw new Error('Forbidden sparse patch key at ' + at + '/' + key);
        copy[key] = Object.hasOwn(current, key)
          ? merge(current[key], value, at + '/' + key)
          : value;
      }
      return copy;
    }
    // The splitter omits translated object keys, or uses null for translated
    // scalar array elements; a non-null invariant may never be overwritten.
    if (current !== undefined && current !== null) {
      throw new Error('Sparse patch attempts to replace invariant value at ' + at);
    }
    return overlay;
  }

  if (!isRecord(base) || !isRecord(patch)) throw new Error('Expected published Lesson objects');
  return merge(base, patch, '');
}
