import { defineSkillGroup } from '@svitlo/engine/build';

import { measurementContext } from './measurementContext';
import { priceQuantityCost } from './priceQuantityCost';
import { workRateTime } from './workRateTime';

export const quantities = defineSkillGroup({
  slug: 'quantities',
  id: '08a71b06-f1c4-4596-aca4-ff7ec78cce31',
  name: {
    ar: 'مسائل الكميات',
    be: 'Задачы на велічыні',
    bn: 'পরিমাণের সমস্যা',
    de: 'Größenaufgaben',
    en: 'Quantity problems',
    es: 'Problemas de magnitudes',
    et: 'Suurustega ülesanded',
    fr: 'Problèmes de grandeurs',
    he: 'בעיות כמויות',
    hi: 'राशियों की समस्याएँ',
    id: 'Soal besaran',
    it: 'Problemi con grandezze',
    ja: '量に関する文章題',
    ka: 'სიდიდეების ამოცანები',
    kk: 'Şamalarğa arnalğan esepter',
    ko: '양에 관한 문제',
    lt: 'Dydžių uždaviniai',
    lv: 'Lielumu uzdevumi',
    mr: 'परिमाणांच्या समस्या',
    ms: 'Masalah kuantiti',
    pl: 'Zadania o wielkościach',
    pt: 'Problemas de grandezas',
    qm: 'Miqdar meseleleri',
    ta: 'அளவுக் கணக்குகள்',
    te: 'పరిమాణ సమస్యలు',
    tr: 'Ölçü ve miktar problemleri',
    uk: 'Задачі на величини',
    ur: 'مقداروں کے مسائل',
    vi: 'Bài toán đại lượng',
    zh: '数量关系应用题',
  },
  skills: {
    measurementContext,
    priceQuantityCost,
    workRateTime,
  },
  description: {
    methodological: 'Practical relationships among work rate, time, price, quantity, mass, capacity, and length.',
  },
});
