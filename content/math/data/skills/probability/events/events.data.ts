import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { certainImpossible_Skill_Data, likelihoodLanguage_Skill_Data, listOutcomes_Skill_Data } from './skills';

export const events_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'events',
  id: 'd41710f5-a1ce-4a10-ae8f-65b9ad51026c',
  name: {
    en: 'Random events',
    qm: 'Tesadüfiy vaqialar',
    lt: 'Atsitiktiniai įvykiai',
    lv: 'Nejauši notikumi',
    et: 'Juhuslikud sündmused',
    be: 'Выпадковыя падзеі',
    ka: 'შემთხვევითი მოვლენები',
    kk: 'Кездейсоқ оқиғалар',
    zh: '随机事件',
    hi: 'यादृच्छिक घटनाएँ',
    es: 'Sucesos aleatorios',
    ar: 'الأحداث العشوائية',
    fr: 'Événements aléatoires',
    bn: 'দৈব ঘটনা',
    pt: 'Eventos aleatórios',
    ur: 'اتفاقی واقعات',
    id: 'Kejadian acak',
    de: 'Zufallsereignisse',
    ja: '偶然の出来事',
    ko: '무작위 사건',
    tr: 'Rastgele olaylar',
    vi: 'Biến cố ngẫu nhiên',
    ta: 'சீரற்ற நிகழ்வுகள்',
    te: 'యాదృచ్ఛిక సంఘటనలు',
    mr: 'यादृच्छिक घटना',
    ms: 'Peristiwa rawak',
    he: 'אירועים אקראיים',
    pl: 'Zdarzenia losowe',
    uk: 'Випадкові події',
  },
  skills: {
    certainImpossible: certainImpossible_Skill_Data,
    likelihoodLanguage: likelihoodLanguage_Skill_Data,
    listOutcomes: listOutcomes_Skill_Data,
  },
  description: {
    methodological:
      'Events as subsets of outcomes of a random experiment, identifying possible and impossible occurrences, and comparing chances under specified conditions. Mathematical probability is not restricted to qualitative estimates.',
  },
});
