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

type NonLocalizable = string;

type Locale_Options<T extends LanguageCode> = New_Locale_Config<T> | NonLocalizable;

const buildLocaleConfig = (
  config: New_Locale_Config<LanguageCode>,
  fallback: LanguageCode = 'en'
) => {
  if (typeof config === 'string') {
    return config;
  }

  return {
    ...config,
    fallback,
  };
}
