import type { LanguageCode } from '../languages';
import {NonEmptyArray} from "@/types/misc.types";

type Locale_Config<SupportedLanguages extends LanguageCode> =
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

export type Lesson_Locale<SupportedLanguages extends LanguageCode> = NonEmptyArray<SupportedLanguages>
