import { defineSkillDomain } from '@svitlo/engine/build';

import { events } from './events';
import { experiments } from './experiments';

export const probability = defineSkillDomain({
  slug: 'probability',
  id: '55bc6d54-f5fc-49fc-8e7f-8d31230e1aca',
  title: {
    ar: 'الاحتمال',
    be: 'Імавернасьць',
    bn: 'সম্ভাবনা',
    de: 'Wahrscheinlichkeit',
    en: 'Probability',
    es: 'Probabilidad',
    et: 'Tõenäosus',
    fr: 'Probabilités',
    he: 'הסתברות',
    hi: 'प्रायिकता',
    id: 'Peluang',
    it: 'Probabilità',
    ja: '確率',
    ka: 'ალბათობა',
    kk: 'Yqtimaldyq',
    ko: '확률',
    lt: 'Tikimybė',
    lv: 'Varbūtība',
    mr: 'संभाव्यता',
    ms: 'Kebarangkalian',
    pl: 'Prawdopodobieństwo',
    pt: 'Probabilidade',
    qm: 'İhtimallıq',
    ta: 'நிகழ்தகவு',
    te: 'సంభావ్యత',
    tr: 'Olasılık',
    uk: 'Ймовірність',
    ur: 'احتمال',
    vi: 'Xác suất',
    zh: '概率',
  },
  groups: {
    events,
    experiments,
  },
  description: {
    methodological:
      'Possible outcomes of random experiments, events and their probabilities, comparisons of chance, independence or dependence of outcomes, and random variability in repeated observations.',
  },
});
