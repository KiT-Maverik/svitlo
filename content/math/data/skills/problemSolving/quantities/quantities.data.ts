import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { measurementContext_Skill_Data, priceQuantityCost_Skill_Data, workRateTime_Skill_Data } from './skills';

export const quantities_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'quantities',
  id: '08a71b06-f1c4-4596-aca4-ff7ec78cce31',
  name: {
    en: 'Quantity problems',
    qm: 'Miqdar meseleleri',
    lt: 'Dydžių uždaviniai',
    lv: 'Lielumu uzdevumi',
    et: 'Suurustega ülesanded',
    be: 'Задачы на велічыні',
    ka: 'სიდიდეების ამოცანები',
    kk: 'Шамаларға арналған есептер',
    zh: '数量关系应用题',
    hi: 'राशियों की समस्याएँ',
    es: 'Problemas de magnitudes',
    ar: 'مسائل الكميات',
    fr: 'Problèmes de grandeurs',
    bn: 'পরিমাণের সমস্যা',
    pt: 'Problemas de grandezas',
    ur: 'مقداروں کے مسائل',
    id: 'Soal besaran',
    de: 'Größenaufgaben',
    ja: '量に関する文章題',
    ko: '양에 관한 문제',
    tr: 'Ölçü ve miktar problemleri',
    vi: 'Bài toán đại lượng',
    ta: 'அளவுக் கணக்குகள்',
    te: 'పరిమాణ సమస్యలు',
    mr: 'परिमाणांच्या समस्या',
    ms: 'Masalah kuantiti',
    he: 'בעיות כמויות',
    pl: 'Zadania o wielkościach',
    uk: 'Задачі на величини',
  },
  skills: {
    workRateTime: workRateTime_Skill_Data,
    priceQuantityCost: priceQuantityCost_Skill_Data,
    measurementContext: measurementContext_Skill_Data,
  },
  description: {
    methodological: 'Practical relationships among work rate, time, price, quantity, mass, capacity, and length.',
  },
});
