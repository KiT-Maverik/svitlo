import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { experimentVariation_Skill_Data } from './skills';

export const experiments_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'experiments',
  id: 'cbaceeaf-fdb7-44c1-8c11-8b10c20f80ea',
  name: {
    en: 'Random experiments',
    qm: 'Tesadüfiy tecribeler',
    lt: 'Atsitiktiniai bandymai',
    lv: 'Nejauši eksperimenti',
    et: 'Juhukatsed',
    be: 'Выпадковыя досьледы',
    ka: 'შემთხვევითი ექსპერიმენტები',
    kk: 'Кездейсоқ тәжірибелер',
    zh: '随机试验',
    hi: 'यादृच्छिक प्रयोग',
    es: 'Experimentos aleatorios',
    ar: 'التجارب العشوائية',
    fr: 'Expériences aléatoires',
    bn: 'দৈব পরীক্ষা',
    pt: 'Experimentos aleatórios',
    ur: 'اتفاقی تجربات',
    id: 'Percobaan acak',
    de: 'Zufallsexperimente',
    ja: '確率の実験',
    ko: '무작위 실험',
    tr: 'Rastgele deneyler',
    vi: 'Thí nghiệm ngẫu nhiên',
    ta: 'சீரற்ற சோதனைகள்',
    te: 'యాదృచ్ఛిక ప్రయోగాలు',
    mr: 'यादृच्छिक प्रयोग',
    ms: 'Eksperimen rawak',
    he: 'ניסויים אקראיים',
    pl: 'Doświadczenia losowe',
    uk: 'Експерименти',
  },
  skills: {
    experimentVariation: experimentVariation_Skill_Data,
  },
  description: {
    methodological:
      'Variation in observed outcome frequencies across repeated series of random trials even when their conditions remain the same.',
  },
});
