import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareCategories_Skill_Data, interpretConclusion_Skill_Data, missingInformation_Skill_Data } from './skills';

export const interpretation_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'interpretation',
  id: '6a6d3bce-2ed3-42d6-b155-6a50bd403936',
  name: {
    en: 'Data interpretation',
    qm: 'Malümatlarnı talil etüv',
    lt: 'Duomenų aiškinimas',
    lv: 'Datu interpretācija',
    et: 'Andmete tõlgendamine',
    be: 'Тлумачэньне зьвестак',
    ka: 'მონაცემების ინტერპრეტაცია',
    kk: 'Деректерді түсіндіру',
    zh: '数据解读',
    hi: 'आँकड़ों की व्याख्या',
    es: 'Interpretación de datos',
    ar: 'تفسير البيانات',
    fr: 'Interprétation des données',
    bn: 'উপাত্ত ব্যাখ্যা',
    pt: 'Interpretação de dados',
    ur: 'اعداد و شمار کی تشریح',
    id: 'Interpretasi data',
    de: 'Dateninterpretation',
    ja: 'データの解釈',
    ko: '자료 해석',
    tr: 'Veri yorumlama',
    vi: 'Diễn giải dữ liệu',
    ta: 'தரவு விளக்கம்',
    te: 'దత్తాంశ వివరణ',
    mr: 'माहितीचे अर्थलक्षण',
    ms: 'Pentafsiran data',
    he: 'פירוש נתונים',
    pl: 'Interpretacja danych',
    uk: 'Інтерпретація даних',
  },
  skills: {
    compareCategories: compareCategories_Skill_Data,
    interpretConclusion: interpretConclusion_Skill_Data,
    missingInformation: missingInformation_Skill_Data,
  },
  description: {
    methodological:
      'Drawing conclusions from quantitative data, computing comparisons, and identifying missing information.',
  },
});
