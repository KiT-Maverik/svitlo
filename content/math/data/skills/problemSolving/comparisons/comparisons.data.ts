import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  additiveComparison_Skill_Data,
  increaseDecreaseFactor_Skill_Data,
  increaseDecreaseNumber_Skill_Data,
  multiplicativeComparison_Skill_Data,
} from './skills';

export const comparisons_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'comparisons',
  id: '3a803d9d-9b01-444c-8581-2be710069c94',
  name: {
    en: 'Comparison problems',
    qm: 'Qıyaslav meseleleri',
    lt: 'Palyginimo uždaviniai',
    lv: 'Salīdzināšanas uzdevumi',
    et: 'Võrdlusülesanded',
    be: 'Задачы на параўнаньне',
    ka: 'შედარების ამოცანები',
    kk: 'Салыстыру есептері',
    zh: '比较类应用题',
    hi: 'तुलना की समस्याएँ',
    es: 'Problemas de comparación',
    ar: 'مسائل المقارنة',
    fr: 'Problèmes de comparaison',
    bn: 'তুলনামূলক সমস্যা',
    pt: 'Problemas de comparação',
    ur: 'موازنے کے مسائل',
    id: 'Soal perbandingan',
    de: 'Vergleichsaufgaben',
    ja: '比較の文章題',
    ko: '비교 문제',
    tr: 'Karşılaştırma problemleri',
    vi: 'Bài toán so sánh',
    ta: 'ஒப்பீட்டுக் கணக்குகள்',
    te: 'పోలిక సమస్యలు',
    mr: 'तुलनेच्या समस्या',
    ms: 'Masalah perbandingan',
    he: 'בעיות השוואה',
    pl: 'Zadania na porównywanie',
    uk: 'Задачі на порівняння',
  },
  skills: {
    additiveComparison: additiveComparison_Skill_Data,
    increaseDecreaseNumber: increaseDecreaseNumber_Skill_Data,
    multiplicativeComparison: multiplicativeComparison_Skill_Data,
    increaseDecreaseFactor: increaseDecreaseFactor_Skill_Data,
  },
  description: {
    methodological:
      "Distinguishing additive comparison ('how many more or fewer') from multiplicative comparison ('how many times as many') and from problems describing a change in a quantity.",
  },
});
