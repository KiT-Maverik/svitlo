import type { LanguageCode } from '../schemas/languages.schemas';

/** A locale dictionary contains only supported language keys and string values. */
type IsLocalizedText<T> = keyof T extends never
  ? false
  : Exclude<keyof T, LanguageCode> extends never
    ? T extends Partial<Record<LanguageCode, string>>
      ? true
      : false
    : false;

/**
 * Describe the resolved (single-language) shape of an authored locale object.
 *
 * A locale dictionary such as `{ en: 'Hello', uk: 'Привіт' }` becomes
 * `string`. Ordinary strings and nested object keys are preserved; readonly
 * arrays and tuples are mapped at the type level only.
 *
 * This utility does not resolve translations or validate their completeness.
 * The publishing pipeline remains responsible for applying locale patches.
 */
export type ResolveLocale<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? { [Key in keyof T]: ResolveLocale<T[Key]> }
    : T extends object
      ? IsLocalizedText<T> extends true
        ? string
        : { [Key in keyof T]: ResolveLocale<T[Key]> }
      : T;
