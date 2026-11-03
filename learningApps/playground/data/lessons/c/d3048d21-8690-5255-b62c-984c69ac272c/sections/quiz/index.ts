import {
  defineContentBlockCatalog,
  type Section,
} from '@svitlo/engine/content';

const title = {
  ar: 'اختبار',
  be: 'Тэст',
  bn: 'কুইজ',
  de: 'Quiz',
  en: 'Quiz',
  es: 'Cuestionario',
  et: 'Test',
  fr: 'Quiz',
  he: 'בוחן',
  hi: 'प्रश्नोत्तरी',
  id: 'Kuis',
  ja: 'クイズ',
  ka: 'ტესტი',
  kk: 'Тест',
  ko: '퀴즈',
  lt: 'Testas',
  lv: 'Tests',
  mr: 'प्रश्नमंजुषा',
  ms: 'Kuiz',
  pl: 'Quiz',
  pt: 'Questionário',
  qm: 'Sınav',
  ta: 'வினாடி வினா',
  te: 'క్విజ్',
  tr: 'Kısa sınav',
  uk: 'Тест',
  ur: 'آزمائش',
  vi: 'Bài kiểm tra',
  zh: '测验',
}

export const quiz_Section = {
  id: '2a02b81f-dbd6-58d8-9711-4deb97312a56',
  type: 'quiz' as const,
  slug: 'quiz' as const,
  title,
  navigationLabel: title,
  skippable: true,
  order: [{ type: 'quiz', key: 'quiz' }],
  content: defineContentBlockCatalog({
    quiz: { quiz: quizBlock },
  }
} satisfies Section<'data'> & { order: { type: string; key: string }[] };
