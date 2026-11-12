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

/** The parent cannot advertise a language absent from its child. */
export type ChildSupporting<Required extends readonly LanguageCodes[], Child> =
  Child extends LanguageScope<infer Available extends readonly LanguageCodes[]>
    ? Exclude<Required[number], Available[number]> extends never
      ? Child
      : never
    : never;

export type ChildrenSupporting<Required extends readonly LanguageCodes[], Children extends Record<string, object>> = {
  [Key in keyof Children]: ChildSupporting<Required, Children[Key]>;
};
