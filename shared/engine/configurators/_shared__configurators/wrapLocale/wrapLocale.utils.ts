import type { LanguageCodes } from '#schemas';

export type WrappedLocaleFiles<Locale> = Partial<Record<LanguageCodes, { locale: Locale }>>;

/** Stable named overload type for the two resource publication representations. */
export type ResourceAssembler<Base, Locale> = {
  (): { base: Base; locale: Partial<Record<LanguageCodes, Locale>> | undefined };
  (options: { embed: true }): { base: Base; locale: WrappedLocaleFiles<Locale> | undefined };
};

/** Wrap per-language file bodies as Props-shaped fragments for nested assembly. */
export const wrapLocale = <Locale>(
  files: Partial<Record<LanguageCodes, Locale>> | undefined,
): WrappedLocaleFiles<Locale> | undefined => {
  if (!files) return undefined;

  const wrapped: WrappedLocaleFiles<Locale> = {};
  for (const language of Object.keys(files) as LanguageCodes[]) {
    const value = files[language];
    if (value !== undefined) wrapped[language] = { locale: value };
  }
  return Object.keys(wrapped).length ? wrapped : undefined;
};
