import type { DeepPartial } from '#types';

/**
 * Project JSON-like authored fields without mutating the input.
 * Array placeholders preserve indexes used by localized patches.
 */
export function projectFields<const T extends object>(
  source: T,
  include: (value: unknown) => boolean,
  skip: (value: unknown) => boolean = () => false,
): DeepPartial<T> {
  const visit = (value: unknown): unknown => {
    if (skip(value)) return undefined;
    if (include(value)) return value;

    if (Array.isArray(value)) {
      const items = value.map(visit);
      if (!items.some(item => item !== undefined)) return undefined;
      return items.map(item => item ?? {});
    }

    if (value !== null && typeof value === 'object') {
      const entries = Object.entries(value).flatMap(([key, child]) => {
        const projected = visit(child);
        return projected === undefined ? [] : [[key, projected] as const];
      });
      return entries.length ? Object.fromEntries(entries) : undefined;
    }

    return undefined;
  };

  return (visit(source) ?? {}) as DeepPartial<T>;
}
