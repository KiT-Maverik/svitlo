import type { LanguageCode } from '../languages';

/** Non-empty tuple of language codes declared by a content source. */
export type Locale_Languages = readonly [LanguageCode, ...LanguageCode[]];

type Locale_Config<SupportedLanguages extends Locale_Languages> = Record<SupportedLanguages[number], string>;

/**
 * Language-independent text.
 *
 * Use only when the exact same value is intentionally
 * displayed in every supported language.
 *
 * Do not use to bypass missing translations.
 */
type NonLocalizable = string;

/**
 * Text that is either:
 * - Fully localized for all supported languages.
 * - Intentionally language-independent.
 */
export type Locale_Options<SupportedLanguages extends Locale_Languages> =
  Locale_Config<SupportedLanguages> | NonLocalizable;

/** Ordered, non-empty list of languages supported by a lesson. */
export type Lesson_Locale = Locale_Languages;
