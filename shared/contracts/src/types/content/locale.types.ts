import type { LanguageCode } from '../languages';

type Locale_Config<SupportedLanguages extends LanguageCode = LanguageCode> =
  Record<SupportedLanguages, string>;

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
export type Locale_Options<SupportedLanguages extends LanguageCode> = Locale_Config<SupportedLanguages> | NonLocalizable;

export type Locale_Subset<SupportedLanguages extends LanguageCode> = Record<SupportedLanguages, string>;
