import { defineSkillGroup } from '@svitlo/engine/build';

import { additiveComparison } from './additiveComparison';
import { increaseDecreaseFactor } from './increaseDecreaseFactor';
import { increaseDecreaseNumber } from './increaseDecreaseNumber';
import { multiplicativeComparison } from './multiplicativeComparison';

export const comparisons = defineSkillGroup({
  slug: 'comparisons',
  id: '3a803d9d-9b01-444c-8581-2be710069c94',
  name: {
    ar: 'مسائل المقارنة',
    be: 'Задачы на параўнаньне',
    bn: 'তুলনামূলক সমস্যা',
    de: 'Vergleichsaufgaben',
    en: 'Comparison problems',
    es: 'Problemas de comparación',
    et: 'Võrdlusülesanded',
    fr: 'Problèmes de comparaison',
    he: 'בעיות השוואה',
    hi: 'तुलना की समस्याएँ',
    id: 'Soal perbandingan',
    it: 'Problemi di confronto',
    ja: '比較の文章題',
    ka: 'შედარების ამოცანები',
    kk: 'Salystyru esepterı',
    ko: '비교 문제',
    lt: 'Palyginimo uždaviniai',
    lv: 'Salīdzināšanas uzdevumi',
    mr: 'तुलनेच्या समस्या',
    ms: 'Masalah perbandingan',
    pl: 'Zadania na porównywanie',
    pt: 'Problemas de comparação',
    qm: 'Qıyaslav meseleleri',
    ta: 'ஒப்பீட்டுக் கணக்குகள்',
    te: 'పోలిక సమస్యలు',
    tr: 'Karşılaştırma problemleri',
    uk: 'Задачі на порівняння',
    ur: 'موازنے کے مسائل',
    vi: 'Bài toán so sánh',
    zh: '比较类应用题',
  },
  skills: {
    additiveComparison,
    increaseDecreaseFactor,
    increaseDecreaseNumber,
    multiplicativeComparison,
  },
  description: {
    methodological:
      "Distinguishing additive comparison ('how many more or fewer') from multiplicative comparison ('how many times as many') and from problems describing a change in a quantity.",
  },
});
