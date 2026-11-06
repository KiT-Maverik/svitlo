import type { DefaultSupportedLanguage } from '@svitlo/engine/localization';

const en = {
  language: 'Language',
  theme: { dark: 'Dark theme', light: 'Light theme' },
};

export type NavbarPreferencesMessages = typeof en;
type Locale = NavbarPreferencesMessages;

const zh: Locale = {
  language: '语言',
  theme: { dark: '深色主题', light: '浅色主题' },
};

const hi: Locale = {
  language: 'भाषा',
  theme: { dark: 'गहरा थीम', light: 'हल्का थीम' },
};

const es: Locale = {
  language: 'Idioma',
  theme: { dark: 'Tema oscuro', light: 'Tema claro' },
};

const ar: Locale = {
  language: 'اللغة',
  theme: { dark: 'السمة الداكنة', light: 'السمة الفاتحة' },
};

const fr: Locale = {
  language: 'Langue',
  theme: { dark: 'Thème sombre', light: 'Thème clair' },
};

const bn: Locale = {
  language: 'ভাষা',
  theme: { dark: 'গাঢ় থিম', light: 'হালকা থিম' },
};

const pt: Locale = {
  language: 'Idioma',
  theme: { dark: 'Tema escuro', light: 'Tema claro' },
};

const ur: Locale = {
  language: 'زبان',
  theme: { dark: 'گہری تھیم', light: 'ہلکی تھیم' },
};

const id: Locale = {
  language: 'Bahasa',
  theme: { dark: 'Tema gelap', light: 'Tema terang' },
};

const de: Locale = {
  language: 'Sprache',
  theme: { dark: 'Dunkles Design', light: 'Helles Design' },
};

const ja: Locale = {
  language: '言語',
  theme: { dark: 'ダークテーマ', light: 'ライトテーマ' },
};

const ko: Locale = {
  language: '언어',
  theme: { dark: '어두운 테마', light: '밝은 테마' },
};

const tr: Locale = {
  language: 'Dil',
  theme: { dark: 'Koyu tema', light: 'Açık tema' },
};

const vi: Locale = {
  language: 'Ngôn ngữ',
  theme: { dark: 'Giao diện tối', light: 'Giao diện sáng' },
};

const ta: Locale = {
  language: 'மொழி',
  theme: { dark: 'இருண்ட தீம்', light: 'வெளிர் தீம்' },
};

const te: Locale = {
  language: 'భాష',
  theme: { dark: 'ముదురు థీమ్', light: 'లేత థీమ్' },
};

const mr: Locale = {
  language: 'भाषा',
  theme: { dark: 'गडद थीम', light: 'फिकट थीम' },
};

const ms: Locale = {
  language: 'Bahasa',
  theme: { dark: 'Tema gelap', light: 'Tema cerah' },
};

const he: Locale = {
  language: 'שפה',
  theme: { dark: 'ערכת נושא כהה', light: 'ערכת נושא בהירה' },
};

const pl: Locale = {
  language: 'Język',
  theme: { dark: 'Ciemny motyw', light: 'Jasny motyw' },
};

const uk: Locale = {
  language: 'Мова',
  theme: { dark: 'Темна тема', light: 'Світла тема' },
};

const lt: Locale = { language: 'Kalba', theme: { dark: 'Tamsioji tema', light: 'Šviesioji tema' } };

const lv: Locale = { language: 'Valoda', theme: { dark: 'Tumšais režīms', light: 'Gaišais režīms' } };

const et: Locale = { language: 'Keel', theme: { dark: 'Tume teema', light: 'Hele teema' } };

const be: Locale = { language: 'Мова', theme: { dark: 'Цёмная тэма', light: 'Сьветлая тэма' } };

const ka: Locale = { language: 'ენა', theme: { dark: 'მუქი თემა', light: 'ღია თემა' } };

const kk: Locale = { language: 'Тіл', theme: { dark: 'Қараңғы тақырып', light: 'Ашық тақырып' } };

/** Crimean Tatar (Svitlo qm), Latin script. Requires native-speaker linguistic review. */
const qm: Locale = {
  language: 'Til',
  theme: { dark: 'Qaranlıq tema', light: 'Açıq tema' },
};

/** Complete authored NavbarPreferences messages. Build-time only. */
export const data: Readonly<Record<DefaultSupportedLanguage['language'], NavbarPreferencesMessages>> = {
  en,
  zh,
  hi,
  es,
  ar,
  fr,
  bn,
  pt,
  ur,
  id,
  de,
  ja,
  ko,
  tr,
  vi,
  ta,
  te,
  mr,
  ms,
  he,
  pl,
  uk,
  lt,
  lv,
  et,
  be,
  ka,
  kk,
  qm,
};
