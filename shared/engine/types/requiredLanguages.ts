import type { LanguageCode } from '../schemas/languages.schemas';

/** Authoring-only type constraints: invariant strings or complete required locale dictionaries. */
export type LocalizedFor<Languages extends readonly LanguageCode[]> =
  string | (Record<Languages[number], string> & Partial<Record<Exclude<LanguageCode, Languages[number]>, string>>);

/**
 * Apply the required-language constraint to every localized string dictionary,
 * including nested field dictionaries and keyed variable maps. No runtime language
 * list is needed and sparse overrides retain their independently typed contract.
 */
export type RequireLanguages<Value, Languages extends readonly LanguageCode[]> = Value extends string
  ? Value
  : Value extends readonly (infer Item)[]
    ? RequireLanguages<Item, Languages>[]
    : Value extends object
      ? [Exclude<keyof Value, LanguageCode>] extends [never]
        ? LocalizedFor<Languages>
        : { [Key in keyof Value]: RequireLanguages<Value[Key], Languages> }
      : Value;

export type ConfigWithLanguages<Config extends { locale: object }, Languages extends readonly LanguageCode[]> = Omit<
  Config,
  'locale'
> & { locale: RequireLanguages<Config['locale'], Languages> };

/** Phantom-only language metadata: used exclusively for compile-time parent/child compatibility. */
/** Type-only phantom brand. It is never emitted in published Props or accessed at runtime. */
export type LanguageScope<Languages extends readonly LanguageCode[]> = {
  readonly __svitloLanguageScope: Languages;
};

/** The parent cannot advertise a language absent from its child. */
export type ChildSupporting<Required extends readonly LanguageCode[], Child> =
  Child extends LanguageScope<infer Available extends readonly LanguageCode[]>
    ? Exclude<Required[number], Available[number]> extends never
      ? Child
      : never
    : never;

export type ChildrenSupporting<Required extends readonly LanguageCode[], Children extends Record<string, object>> = {
  [Key in keyof Children]: ChildSupporting<Required, Children[Key]>;
};

/**
 * Languages to materialize for one Build call, limited to an explicit authored tuple.
 * A default/empty tuple is unscoped, and broad readonly LanguageCode[] is also
 * unscoped. Test for a nonempty tuple rather than checking Languages[number]
 * for never: the latter breaks structural assignability of default [] children
 * to collection configurator constraints under TypeScript's generic variance.
 */
export type PublicationLanguageOptions<Languages extends readonly LanguageCode[] = readonly LanguageCode[]> = {
  readonly languages: readonly (Languages extends readonly [LanguageCode, ...LanguageCode[]]
    ? Languages[number]
    : LanguageCode)[];
};
