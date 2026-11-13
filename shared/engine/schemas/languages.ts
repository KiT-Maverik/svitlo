/** Supported text direction for a language. */
export const textDirection = ['ltr', 'rtl'];
export type TextDirection = typeof textDirection[number];

/** Shape required for every language descriptor. */
export interface LanguageDefinition {
  readonly locale: string;
  readonly language: string;
  readonly name: string;
  readonly nativeName: string;
  readonly nameUk: string;
  readonly direction: TextDirection;
}

/** Default language set shipped with the project. */
export const DEFAULT_SUPPORTED_LANGUAGES = [
  { locale: 'en-US', language: 'en', name: 'English', nativeName: 'English', nameUk: 'Англійська', direction: 'ltr' },
  {
    locale: 'zh-Hans-CN',
    language: 'zh',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    nameUk: 'Китайська (спрощене письмо)',
    direction: 'ltr',
  },
  { locale: 'hi-IN', language: 'hi', name: 'Hindi', nativeName: 'हिन्दी', nameUk: 'Гінді', direction: 'ltr' },
  { locale: 'es-ES', language: 'es', name: 'Spanish', nativeName: 'Español', nameUk: 'Іспанська', direction: 'ltr' },
  { locale: 'ar-SA', language: 'ar', name: 'Arabic', nativeName: 'العربية', nameUk: 'Арабська', direction: 'rtl' },
  { locale: 'fr-FR', language: 'fr', name: 'French', nativeName: 'Français', nameUk: 'Французька', direction: 'ltr' },
  { locale: 'bn-BD', language: 'bn', name: 'Bengali', nativeName: 'বাংলা', nameUk: 'Бенгальська', direction: 'ltr' },
  {
    locale: 'pt-BR',
    language: 'pt',
    name: 'Portuguese (Brazil)',
    nativeName: 'Português do Brasil',
    nameUk: 'Португальська (Бразилія)',
    direction: 'ltr',
  },
  { locale: 'ur-PK', language: 'ur', name: 'Urdu', nativeName: 'اردو', nameUk: 'Урду', direction: 'rtl' },
  {
    locale: 'id-ID',
    language: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    nameUk: 'Індонезійська',
    direction: 'ltr',
  },
  { locale: 'de-DE', language: 'de', name: 'German', nativeName: 'Deutsch', nameUk: 'Німецька', direction: 'ltr' },
  { locale: 'ja-JP', language: 'ja', name: 'Japanese', nativeName: '日本語', nameUk: 'Японська', direction: 'ltr' },
  { locale: 'ko-KR', language: 'ko', name: 'Korean', nativeName: '한국어', nameUk: 'Корейська', direction: 'ltr' },
  { locale: 'tr-TR', language: 'tr', name: 'Turkish', nativeName: 'Türkçe', nameUk: 'Турецька', direction: 'ltr' },
  {
    locale: 'vi-VN',
    language: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    nameUk: 'В’єтнамська',
    direction: 'ltr',
  },
  { locale: 'ta-IN', language: 'ta', name: 'Tamil', nativeName: 'தமிழ்', nameUk: 'Тамільська', direction: 'ltr' },
  { locale: 'te-IN', language: 'te', name: 'Telugu', nativeName: 'తెలుగు', nameUk: 'Телугу', direction: 'ltr' },
  { locale: 'mr-IN', language: 'mr', name: 'Marathi', nativeName: 'मराठी', nameUk: 'Маратхі', direction: 'ltr' },
  {
    locale: 'ms-MY',
    language: 'ms',
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
    nameUk: 'Малайська',
    direction: 'ltr',
  },
  { locale: 'he-IL', language: 'he', name: 'Hebrew', nativeName: 'עברית', nameUk: 'Іврит', direction: 'rtl' },
  { locale: 'pl-PL', language: 'pl', name: 'Polish', nativeName: 'Polski', nameUk: 'Польська', direction: 'ltr' },
  {
    locale: 'uk-UA',
    language: 'uk',
    name: 'Ukrainian',
    nativeName: 'Українська',
    nameUk: 'Українська',
    direction: 'ltr',
  },
  {
    locale: 'lt-LT',
    language: 'lt',
    name: 'Lithuanian',
    nativeName: 'Lietuvių',
    nameUk: 'Литовська',
    direction: 'ltr',
  },
  { locale: 'lv-LV', language: 'lv', name: 'Latvian', nativeName: 'Latviešu', nameUk: 'Латиська', direction: 'ltr' },
  { locale: 'et-EE', language: 'et', name: 'Estonian', nativeName: 'Eesti', nameUk: 'Естонська', direction: 'ltr' },
  {
    locale: 'be-tarask',
    language: 'be',
    name: 'Belarusian (Taraškievica)',
    nativeName: 'Беларуская',
    nameUk: 'Білоруська (тарашкевиця)',
    direction: 'ltr',
  },
  { locale: 'ka-GE', language: 'ka', name: 'Georgian', nativeName: 'ქართული', nameUk: 'Грузинська', direction: 'ltr' },
  {
    locale: 'kk-Cyrl-KZ',
    language: 'kk',
    name: 'Kazakh (Cyrillic)',
    nativeName: 'Қазақша',
    nameUk: 'Казахська',
    direction: 'ltr',
  },
  // Svitlo-specific internal language key: 'qm' = Crimean Tatar (not an ISO 639 code).
  // Use the standard BCP 47 locale 'crh-Latn-UA' for external language identification.
  {
    locale: 'crh-Latn-UA',
    language: 'qm',
    name: 'Crimean Tatar',
    nativeName: 'Qırımtatar tili',
    nameUk: 'Кримськотатарська',
    direction: 'ltr',
  },
] as const satisfies readonly LanguageDefinition[];

export type DefaultSupportedLanguage = (typeof DEFAULT_SUPPORTED_LANGUAGES)[number];
export type SupportedLanguage = DefaultSupportedLanguage | AdditionalLanguage;
export type Locale = SupportedLanguage['locale'];
export type LanguageCode = SupportedLanguage['language'];

/** English is used whenever a requested language is unavailable. */
export const FALLBACK_LANGUAGE = 'en' as const;
export const FALLBACK_LOCALE = 'en-US' as const;

export type LanguageFor<L extends Locale> = Extract<SupportedLanguage, { readonly locale: L }>;

export type LocalizedContent<T> = {
  [L in Locale]: {
    locale: L;
    language: LanguageFor<L>;
    content: T;
  };
}[Locale];

export interface LanguageConfiguration {
  /** Languages are appended after the defaults unless replaceDefaults is true. */
  additionalLanguages?: readonly LanguageDefinition[];
  /** When true, use only additionalLanguages and omit the defaults. */
  replaceDefaults?: boolean;
}
