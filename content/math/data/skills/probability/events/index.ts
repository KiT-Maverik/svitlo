import { defineSkillGroup } from '@svitlo/engine/build';

import { certainImpossible } from './certainImpossible';
import { likelihoodLanguage } from './likelihoodLanguage';
import { listOutcomes } from './listOutcomes';

export const events = defineSkillGroup({
  slug: 'events',
  id: 'd41710f5-a1ce-4a10-ae8f-65b9ad51026c',
  name: {
    ar: 'الأحداث العشوائية',
    be: 'Выпадковыя падзеі',
    bn: 'দৈব ঘটনা',
    de: 'Zufallsereignisse',
    en: 'Random events',
    es: 'Sucesos aleatorios',
    et: 'Juhuslikud sündmused',
    fr: 'Événements aléatoires',
    he: 'אירועים אקראיים',
    hi: 'यादृच्छिक घटनाएँ',
    id: 'Kejadian acak',
    it: 'Eventi casuali',
    ja: '偶然の出来事',
    ka: 'შემთხვევითი მოვლენები',
    kk: 'Kezdeisoq oqiğalar',
    ko: '무작위 사건',
    lt: 'Atsitiktiniai įvykiai',
    lv: 'Nejauši notikumi',
    mr: 'यादृच्छिक घटना',
    ms: 'Peristiwa rawak',
    pl: 'Zdarzenia losowe',
    pt: 'Eventos aleatórios',
    qm: 'Tesadüfiy vaqialar',
    ta: 'சீரற்ற நிகழ்வுகள்',
    te: 'యాదృచ్ఛిక సంఘటనలు',
    tr: 'Rastgele olaylar',
    uk: 'Випадкові події',
    ur: 'اتفاقی واقعات',
    vi: 'Biến cố ngẫu nhiên',
    zh: '随机事件',
  },
  skills: {
    certainImpossible,
    likelihoodLanguage,
    listOutcomes,
  },
  description: {
    methodological:
      'Events as subsets of outcomes of a random experiment, identifying possible and impossible occurrences, and comparing chances under specified conditions. Mathematical probability is not restricted to qualitative estimates.',
  },
});
