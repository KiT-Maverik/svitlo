import type { LanguageCode } from '../languages';

export type Locales_All<Value = string> = Record<LanguageCode, Value>;

export type Locales_Subset<Languages extends LanguageCode, Value = string> = Record<Languages, Value> & {
  fallback: Languages;
};

export type Locales_Partial<Value = string> = {
  [FallbackLanguage in LanguageCode]: {
    fallback: FallbackLanguage;
  } & Record<FallbackLanguage, Value> &
    Partial<Record<Exclude<LanguageCode, FallbackLanguage>, Value>>;
}[LanguageCode];

export type Locales_Single<Value = string> = {
  value: Value;
  language: LanguageCode;
};

export type Locale_ResponseParams = {
  locale: {
    code: LanguageCode;
    isFallback?: true;
  };
};

export type Locale_Config = Locales_All | Locales_Subset<LanguageCode> | Locales_Single | Locales_Partial;

type New_Locale_Config<Languages extends LanguageCode = LanguageCode> =
  Record<Languages, string>;

/**
 * Language-independent text.
 *
 * Use only when the exact same value is intentionally
 * displayed in every supported language.
 *
 * Do not use to bypass missing translations.
 */
type New_NonLocalizable = string;

/**
 * Text that is either:
 * - Fully localized for all supported languages.
 * - Intentionally language-independent.
 */
type New_Locale_Options<T extends LanguageCode> = New_Locale_Config<T> | New_NonLocalizable;
