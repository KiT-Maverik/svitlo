import type { UiKit_Component } from '@svitlo/engine/content';
import type { LanguageCode } from '@svitlo/engine/localization';

/** Complete authored NavbarPreferences messages. Build-time only. */
export const data = {
  en: {
    language: 'Language',
    theme: { dark: 'Dark theme', light: 'Light theme' },
  },
  zh: {
    language: '语言',
    theme: { dark: '深色主题', light: '浅色主题' },
  },
  hi: {
    language: 'भाषा',
    theme: { dark: 'गहरा थीम', light: 'हल्का थीम' },
  },
  es: {
    language: 'Idioma',
    theme: { dark: 'Tema oscuro', light: 'Tema claro' },
  },
  ar: {
    language: 'اللغة',
    theme: { dark: 'السمة الداكنة', light: 'السمة الفاتحة' },
  },
  fr: {
    language: 'Langue',
    theme: { dark: 'Thème sombre', light: 'Thème clair' },
  },
  bn: {
    language: 'ভাষা',
    theme: { dark: 'গাঢ় থিম', light: 'হালকা থিম' },
  },
  pt: {
    language: 'Idioma',
    theme: { dark: 'Tema escuro', light: 'Tema claro' },
  },
  ur: {
    language: 'زبان',
    theme: { dark: 'گہری تھیم', light: 'ہلکی تھیم' },
  },
  id: {
    language: 'Bahasa',
    theme: { dark: 'Tema gelap', light: 'Tema terang' },
  },
  de: {
    language: 'Sprache',
    theme: { dark: 'Dunkles Design', light: 'Helles Design' },
  },
  ja: {
    language: '言語',
    theme: { dark: 'ダークテーマ', light: 'ライトテーマ' },
  },
  ko: {
    language: '언어',
    theme: { dark: '어두운 테마', light: '밝은 테마' },
  },
  tr: {
    language: 'Dil',
    theme: { dark: 'Koyu tema', light: 'Açık tema' },
  },
  vi: {
    language: 'Ngôn ngữ',
    theme: { dark: 'Giao diện tối', light: 'Giao diện sáng' },
  },
  ta: {
    language: 'மொழி',
    theme: { dark: 'இருண்ட தீம்', light: 'வெளிர் தீம்' },
  },
  te: {
    language: 'భాష',
    theme: { dark: 'ముదురు థీమ్', light: 'లేత థీమ్' },
  },
  mr: {
    language: 'भाषा',
    theme: { dark: 'गडद थीम', light: 'फिकट थीम' },
  },
  ms: {
    language: 'Bahasa',
    theme: { dark: 'Tema gelap', light: 'Tema cerah' },
  },
  he: {
    language: 'שפה',
    theme: { dark: 'ערכת נושא כהה', light: 'ערכת נושא בהירה' },
  },
  pl: {
    language: 'Język',
    theme: { dark: 'Ciemny motyw', light: 'Jasny motyw' },
  },
  uk: {
    language: 'Мова',
    theme: { dark: 'Темна тема', light: 'Світла тема' },
  },
  lt: { language: 'Kalba', theme: { dark: 'Tamsioji tema', light: 'Šviesioji tema' } },
  lv: { language: 'Valoda', theme: { dark: 'Tumšais režīms', light: 'Gaišais režīms' } },
  et: { language: 'Keel', theme: { dark: 'Tume teema', light: 'Hele teema' } },
  be: { language: 'Мова', theme: { dark: 'Цёмная тэма', light: 'Сьветлая тэма' } },
  ka: { language: 'ენა', theme: { dark: 'მუქი თემა', light: 'ღია თემა' } },
  kk: { language: 'Тіл', theme: { dark: 'Қараңғы тақырып', light: 'Ашық тақырып' } },
  /** Crimean Tatar (Svitlo qm), Latin script. Requires native-speaker linguistic review. */
  qm: {
    language: 'Til',
    theme: { dark: 'Qaranlıq tema', light: 'Açıq tema' },
  },
} satisfies UiKit_Component<'navbarPreferences', 'data', LanguageCode>;
