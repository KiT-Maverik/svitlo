import { z } from 'zod';

export const allLocales = [
  'en-US',
  'zh-Hans-CN',
  'hi-IN',
  'es-ES',
  'ar-SA',
  'fr-FR',
  'bn-BD',
  'pt-BR',
  'ur-PK',
  'id-ID',
  'it-IT',
  'de-DE',
  'ja-JP',
  'ko-KR',
  'tr-TR',
  'vi-VN',
  'ta-IN',
  'te-IN',
  'mr-IN',
  'ms-MY',
  'he-IL',
  'pl-PL',
  'uk-UA',
  'lt-LT',
  'lv-LV',
  'et-EE',
  'be-tarask',
  'ka-GE',
  'kk-Cyrl-KZ',
  'crh-Latn-UA',
] as const;
export type Locale = (typeof allLocales)[number];
export const locale_Schema = z.enum(allLocales);

export const allLanguageCodes = [
  'ar',
  'be',
  'bn',
  'de',
  'en',
  'es',
  'et',
  'fr',
  'he',
  'hi',
  'id',
  'it',
  'ja',
  'ka',
  'kk',
  'ko',
  'lt',
  'lv',
  'mr',
  'ms',
  'pl',
  'pt',
  'qm',
  'ta',
  'te',
  'tr',
  'uk',
  'ur',
  'vi',
  'zh',
] as const;
/** Canonical nonempty language tuple for default authoring scopes. */
export type AllLanguageCodes = typeof allLanguageCodes;
export type LanguageCode = (typeof allLanguageCodes)[number];
export const languageCode_Schema = z.enum(allLanguageCodes);

export const allLanguageEnglishNames = [
  'English',
  'Chinese (Simplified)',
  'Hindi',
  'Spanish',
  'Arabic',
  'French',
  'Bengali',
  'Portuguese (Brazil)',
  'Urdu',
  'Indonesian',
  'Italian',
  'German',
  'Japanese',
  'Korean',
  'Turkish',
  'Vietnamese',
  'Tamil',
  'Telugu',
  'Marathi',
  'Malay',
  'Hebrew',
  'Polish',
  'Ukrainian',
  'Lithuanian',
  'Latvian',
  'Estonian',
  'Belarusian (Taraškievica)',
  'Georgian',
  'Kazakh (Cyrillic)',
  'Crimean Tatar',
] as const;
export type LanguageEnglishName = (typeof allLanguageEnglishNames)[number];
export const languageEnglishName_Schema = z.enum(allLanguageEnglishNames);

export const allLanguagesNativeNames = [
  'English',
  '简体中文',
  'हिन्दी',
  'Español',
  'العربية',
  'Français',
  'বাংলা',
  'Português do Brasil',
  'اردو',
  'Bahasa Indonesia',
  'Italiano',
  'Deutsch',
  '日本語',
  '한국어',
  'Türkçe',
  'Tiếng Việt',
  'தமிழ்',
  'తెలుగు',
  'मराठी',
  'Bahasa Melayu',
  'עברית',
  'Polski',
  'Українська',
  'Lietuvių',
  'Latviešu',
  'Eesti',
  'Беларуская',
  'ქართული',
  'Қазақша',
  'Qırımtatar tili',
] as const;
export type LanguageNativeName = (typeof allLanguagesNativeNames)[number];
export const languageNativeName_Schema = z.enum(allLanguagesNativeNames);

export const allTextDirections = ['ltr', 'rtl'] as const;
export type TextDirection = (typeof allTextDirections)[number];
export const textDirection_Schema = z.enum(allTextDirections);

export const languageDefinition_Schema = z.strictObject({
  locale: locale_Schema,
  language: languageCode_Schema,
  name: languageEnglishName_Schema,
  nativeName: languageNativeName_Schema,
  direction: textDirection_Schema,
});
export type LanguageDefinition = z.infer<typeof languageDefinition_Schema>;

/** Default language set shipped with the project. */
export const DEFAULT_SUPPORTED_LANGUAGES = [
  { locale: 'en-US', language: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  {
    locale: 'zh-Hans-CN',
    language: 'zh',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    direction: 'ltr',
  },
  { locale: 'hi-IN', language: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr' },
  { locale: 'es-ES', language: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr' },
  { locale: 'ar-SA', language: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
  { locale: 'fr-FR', language: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr' },
  { locale: 'bn-BD', language: 'bn', name: 'Bengali', nativeName: 'বাংলা', direction: 'ltr' },
  {
    locale: 'pt-BR',
    language: 'pt',
    name: 'Portuguese (Brazil)',
    nativeName: 'Português do Brasil',
    direction: 'ltr',
  },
  { locale: 'ur-PK', language: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl' },
  {
    locale: 'id-ID',
    language: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    direction: 'ltr',
  },
  { locale: 'it-IT', language: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr' },
  { locale: 'de-DE', language: 'de', name: 'German', nativeName: 'Deutsch', direction: 'ltr' },
  { locale: 'ja-JP', language: 'ja', name: 'Japanese', nativeName: '日本語', direction: 'ltr' },
  { locale: 'ko-KR', language: 'ko', name: 'Korean', nativeName: '한국어', direction: 'ltr' },
  { locale: 'tr-TR', language: 'tr', name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr' },
  {
    locale: 'vi-VN',
    language: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    direction: 'ltr',
  },
  { locale: 'ta-IN', language: 'ta', name: 'Tamil', nativeName: 'தமிழ்', direction: 'ltr' },
  { locale: 'te-IN', language: 'te', name: 'Telugu', nativeName: 'తెలుగు', direction: 'ltr' },
  { locale: 'mr-IN', language: 'mr', name: 'Marathi', nativeName: 'मराठी', direction: 'ltr' },
  {
    locale: 'ms-MY',
    language: 'ms',
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
    direction: 'ltr',
  },
  { locale: 'he-IL', language: 'he', name: 'Hebrew', nativeName: 'עברית', direction: 'rtl' },
  { locale: 'pl-PL', language: 'pl', name: 'Polish', nativeName: 'Polski', direction: 'ltr' },
  {
    locale: 'uk-UA',
    language: 'uk',
    name: 'Ukrainian',
    nativeName: 'Українська',
    direction: 'ltr',
  },
  {
    locale: 'lt-LT',
    language: 'lt',
    name: 'Lithuanian',
    nativeName: 'Lietuvių',
    direction: 'ltr',
  },
  { locale: 'lv-LV', language: 'lv', name: 'Latvian', nativeName: 'Latviešu', direction: 'ltr' },
  { locale: 'et-EE', language: 'et', name: 'Estonian', nativeName: 'Eesti', direction: 'ltr' },
  {
    locale: 'be-tarask',
    language: 'be',
    name: 'Belarusian (Taraškievica)',
    nativeName: 'Беларуская',
    direction: 'ltr',
  },
  { locale: 'ka-GE', language: 'ka', name: 'Georgian', nativeName: 'ქართული', direction: 'ltr' },
  {
    locale: 'kk-Cyrl-KZ',
    language: 'kk',
    name: 'Kazakh (Cyrillic)',
    nativeName: 'Қазақша',
    direction: 'ltr',
  },
  // Svitlo-specific internal language key: 'qm' = Crimean Tatar (not an ISO 639 code).
  // Use the standard BCP 47 locale 'crh-Latn-UA' for external language identification.
  {
    locale: 'crh-Latn-UA',
    language: 'qm',
    name: 'Crimean Tatar',
    nativeName: 'Qırımtatar tili',
    direction: 'ltr',
  },
] as const satisfies readonly LanguageDefinition[];

export type DefaultSupportedLanguage = (typeof DEFAULT_SUPPORTED_LANGUAGES)[number];

/** English is used whenever a requested language is unavailable. */
export const FALLBACK_LANGUAGE = 'en' satisfies LanguageCode;
export const FALLBACK_LOCALE = 'en-US' satisfies Locale;
