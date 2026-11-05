import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { events_SkillGroup_Data } from './events/events.data';
import { experiments_SkillGroup_Data } from './experiments/experiments.data';

export const probability_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'probability',
  id: '55bc6d54-f5fc-49fc-8e7f-8d31230e1aca',
  name: {
    en: 'Probability',
    qm: 'İhtimallıq',
    lt: 'Tikimybė',
    lv: 'Varbūtība',
    et: 'Tõenäosus',
    be: 'Імавернасьць',
    ka: 'ალბათობა',
    kk: 'Ықтималдық',
    zh: '概率',
    hi: 'प्रायिकता',
    es: 'Probabilidad',
    ar: 'الاحتمال',
    fr: 'Probabilités',
    bn: 'সম্ভাবনা',
    pt: 'Probabilidade',
    ur: 'احتمال',
    id: 'Peluang',
    de: 'Wahrscheinlichkeit',
    ja: '確率',
    ko: '확률',
    tr: 'Olasılık',
    vi: 'Xác suất',
    ta: 'நிகழ்தகவு',
    te: 'సంభావ్యత',
    mr: 'संभाव्यता',
    ms: 'Kebarangkalian',
    he: 'הסתברות',
    pl: 'Prawdopodobieństwo',
    uk: 'Ймовірність',
  },
  groups: {
    events: events_SkillGroup_Data,
    experiments: experiments_SkillGroup_Data,
  },
  description: {
    methodological:
      'Possible outcomes of random experiments, events and their probabilities, comparisons of chance, independence or dependence of outcomes, and random variability in repeated observations.',
  },
});
