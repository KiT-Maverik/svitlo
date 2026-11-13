import type { LanguageCodes } from '../schemas/languages.schemas';

/** Authoring-only type constraints: invariant strings or complete required locale dictionaries. */
export type LocalizedFor<Languages extends readonly LanguageCodes[]> =
  string | (Record<Languages[number], string> & Partial<Record<Exclude<LanguageCodes, Languages[number]>, string>>);

/**
 * Apply the required-language constraint to every localized string dictionary,
 * including nested field dictionaries and keyed variable maps. No runtime language
 * list is needed and sparse overrides retain their independently typed contract.
 */
export type RequireLanguages<Value, Languages extends readonly LanguageCodes[]> = Value extends string
  ? Value
  : Value extends readonly (infer Item)[]
    ? RequireLanguages<Item, Languages>[]
    : Value extends object
      ? [Exclude<keyof Value, LanguageCodes>] extends [never]
        ? LocalizedFor<Languages>
        : { [Key in keyof Value]: RequireLanguages<Value[Key], Languages> }
      : Value;

export type ConfigWithLanguages<Config extends { locale: object }, Languages extends readonly LanguageCodes[]> = Omit<
  Config,
  'locale'
> & { locale: RequireLanguages<Config['locale'], Languages> };

/** Phantom-only language metadata: used exclusively for compile-time parent/child compatibility. */
/** Type-only phantom brand. It is never emitted in published Props or accessed at runtime. */
export type LanguageScope<Languages extends readonly LanguageCodes[]> = {
  readonly __svitloLanguageScope: Languages;
};

/**
 * Every child must cover the parent languages. The default type-level scope
 * is readonly LanguageCodes[] (all supported languages), not an empty tuple.
 * Explicitly scoped children may advertise a smaller set. Actual translated
 * content is still validated when each selected language is published.
 */
export type ChildSupporting<Required extends readonly LanguageCodes[], Child> =
  Child extends LanguageScope<infer Available extends readonly LanguageCodes[]>
    ? Exclude<Required[number], Available[number]> extends never
      ? Child
      : never
    : never;

export type ChildrenSupporting<Required extends readonly LanguageCodes[], Children extends Record<string, object>> = {
  [Key in keyof Children]: ChildSupporting<Required, Children[Key]>;
};

/**
 * Select one or more languages from the declared scope. Without an explicit
 * subset, all supported language codes are allowed, and every localized field
 * is required at authoring time by RequireLanguages. Explicit [] allows none.
 */
export type PublicationLanguageOptions<Languages extends readonly LanguageCodes[] = readonly LanguageCodes[]> = {
  readonly languages: readonly (Languages extends readonly []
    ? never
    : Languages extends readonly [LanguageCodes, ...LanguageCodes[]]
      ? Languages[number]
      : LanguageCodes)[];
};
