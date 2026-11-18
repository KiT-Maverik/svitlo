import { defineSkillGroup } from '@svitlo/engine/build';

import { compareCategories } from './compareCategories';
import { interpretConclusion } from './interpretConclusion';
import { missingInformation } from './missingInformation';

export const interpretation = defineSkillGroup({
  slug: 'interpretation',
  id: '6a6d3bce-2ed3-42d6-b155-6a50bd403936',
  name: {
    ar: 'تفسير البيانات',
    be: 'Тлумачэньне зьвестак',
    bn: 'উপাত্ত ব্যাখ্যা',
    de: 'Dateninterpretation',
    en: 'Data interpretation',
    es: 'Interpretación de datos',
    et: 'Andmete tõlgendamine',
    fr: 'Interprétation des données',
    he: 'פירוש נתונים',
    hi: 'आँकड़ों की व्याख्या',
    id: 'Interpretasi data',
    it: 'Interpretazione dei dati',
    ja: 'データの解釈',
    ka: 'მონაცემების ინტერპრეტაცია',
    kk: 'Derekterdı tüsındıru',
    ko: '자료 해석',
    lt: 'Duomenų aiškinimas',
    lv: 'Datu interpretācija',
    mr: 'माहितीचे अर्थलक्षण',
    ms: 'Pentafsiran data',
    pl: 'Interpretacja danych',
    pt: 'Interpretação de dados',
    qm: 'Malümatlarnı talil etüv',
    ta: 'தரவு விளக்கம்',
    te: 'దత్తాంశ వివరణ',
    tr: 'Veri yorumlama',
    uk: 'Інтерпретація даних',
    ur: 'اعداد و شمار کی تشریح',
    vi: 'Diễn giải dữ liệu',
    zh: '数据解读',
  },
  skills: {
    compareCategories,
    interpretConclusion,
    missingInformation,
  },
  description: {
    methodological:
      'Drawing conclusions from quantitative data, computing comparisons, and identifying missing information.',
  },
});
