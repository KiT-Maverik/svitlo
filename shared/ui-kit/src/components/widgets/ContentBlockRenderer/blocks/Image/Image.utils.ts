export type ImageFailureKind = 'offline' | 'unavailable';

/** Remote URLs need an allowlisted host for Next optimization; preserve them by default. */
export function imageUnoptimized(src: string, configured?: boolean): boolean {
  return configured ?? /^https?:\/\//i.test(src);
}

