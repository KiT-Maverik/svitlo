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
