export function resolveLocale<const T extends string>(
  requested: string | string[] | undefined,
  available: readonly T[],
  fallback: T,
): T {
  return available.find(locale => locale === requested) ?? fallback;
}
