import { defineSkillGroup } from '@svitlo/engine/build';

import { experimentVariation } from './experimentVariation';

export const experiments = defineSkillGroup({
  slug: 'experiments',
  id: 'cbaceeaf-fdb7-44c1-8c11-8b10c20f80ea',
  name: {
    ar: 'التجارب العشوائية',
    be: 'Выпадковыя досьледы',
    bn: 'দৈব পরীক্ষা',
    de: 'Zufallsexperimente',
    en: 'Random experiments',
    es: 'Experimentos aleatorios',
    et: 'Juhukatsed',
    fr: 'Expériences aléatoires',
    he: 'ניסויים אקראיים',
    hi: 'यादृच्छिक प्रयोग',
    id: 'Percobaan acak',
    it: 'Esperimenti casuali',
    ja: '確率の実験',
    ka: 'შემთხვევითი ექსპერიმენტები',
    kk: 'Kezdeisoq täjıribeler',
    ko: '무작위 실험',
    lt: 'Atsitiktiniai bandymai',
    lv: 'Nejauši eksperimenti',
    mr: 'यादृच्छिक प्रयोग',
    ms: 'Eksperimen rawak',
    pl: 'Doświadczenia losowe',
    pt: 'Experimentos aleatórios',
    qm: 'Tesadüfiy tecribeler',
    ta: 'சீரற்ற சோதனைகள்',
    te: 'యాదృచ్ఛిక ప్రయోగాలు',
    tr: 'Rastgele deneyler',
    uk: 'Експерименти',
    ur: 'اتفاقی تجربات',
    vi: 'Thí nghiệm ngẫu nhiên',
    zh: '随机试验',
  },
  skills: {
    experimentVariation,
  },
  description: {
    methodological:
      'Variation in observed outcome frequencies across repeated series of random trials even when their conditions remain the same.',
  },
});
