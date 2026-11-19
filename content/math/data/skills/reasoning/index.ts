import { defineSkillDomain } from '@svitlo/engine/build';

import { argumentation } from './argumentation';
import { logic } from './logic';
import { representations } from './representations';
import { verification } from './verification';

export const reasoning = defineSkillDomain({
  slug: 'reasoning',
  id: '91e2d845-0c04-4a81-b126-8bad16300cad',
  title: {
    ar: 'الاستدلال',
    be: 'Разважаньне',
    bn: 'যুক্তি',
    de: 'Schlussfolgern',
    en: 'Reasoning',
    es: 'Razonamiento',
    et: 'Arutlemine',
    fr: 'Raisonnement',
    he: 'הסקת מסקנות',
    hi: 'तर्क',
    id: 'Penalaran',
    it: 'Ragionamento',
    ja: '推論',
    ka: 'მსჯელობა',
    kk: 'Paiymdau',
    ko: '추론',
    lt: 'Samprotavimas',
    lv: 'Spriešana',
    mr: 'तर्कविचार',
    ms: 'Penaakulan',
    pl: 'Rozumowanie',
    pt: 'Raciocínio',
    qm: 'Fikir yürsetüv',
    ta: 'பகுத்தறிதல்',
    te: 'తార్కిక ఆలోచన',
    tr: 'Akıl yürütme',
    uk: 'Міркування',
    ur: 'استدلال',
    vi: 'Lập luận',
    zh: '推理',
  },
  groups: {
    argumentation,
    logic,
    representations,
    verification,
  },
  description: {
    methodological:
      'Justifying mathematical statements, finding counterexamples, drawing logical conclusions, checking solutions, and translating between representations.',
  },
});
