import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { argumentation_SkillGroup_Data } from './argumentation/argumentation.data';
import { verification_SkillGroup_Data } from './verification/verification.data';
import { logic_SkillGroup_Data } from './logic/logic.data';
import { representations_SkillGroup_Data } from './representations/representations.data';

export const reasoning_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'reasoning',
  id: '91e2d845-0c04-4a81-b126-8bad16300cad',
  name: {
    en: 'Reasoning',
    qm: 'Fikir yürsetüv',
    lt: 'Samprotavimas',
    lv: 'Spriešana',
    et: 'Arutlemine',
    be: 'Разважаньне',
    ka: 'მსჯელობა',
    kk: 'Пайымдау',
    zh: '推理',
    hi: 'तर्क',
    es: 'Razonamiento',
    ar: 'الاستدلال',
    fr: 'Raisonnement',
    bn: 'যুক্তি',
    pt: 'Raciocínio',
    ur: 'استدلال',
    id: 'Penalaran',
    de: 'Schlussfolgern',
    ja: '推論',
    ko: '추론',
    tr: 'Akıl yürütme',
    vi: 'Lập luận',
    ta: 'பகுத்தறிதல்',
    te: 'తార్కిక ఆలోచన',
    mr: 'तर्कविचार',
    ms: 'Penaakulan',
    he: 'הסקת מסקנות',
    pl: 'Rozumowanie',
    uk: 'Міркування',
  },
  groups: {
    argumentation: argumentation_SkillGroup_Data,
    verification: verification_SkillGroup_Data,
    logic: logic_SkillGroup_Data,
    representations: representations_SkillGroup_Data,
  },
  description: {
    methodological:
      'Justifying mathematical statements, finding counterexamples, drawing logical conclusions, checking solutions, and translating between representations.',
  },
});
