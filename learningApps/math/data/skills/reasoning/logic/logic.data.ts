import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { logicalElimination_Skill_Data } from './skills';

export const logic_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'logic',
  id: '5f3df23c-87ce-411d-87db-6c76d9cd8a48',
  name: {
    en: 'Logical reasoning',
    qm: 'Mantıqiy fikir yürsetüv',
    lt: 'Loginis samprotavimas',
    lv: 'Loģiskā spriešana',
    et: 'Loogiline arutlus',
    be: 'Лягічнае разважаньне',
    ka: 'ლოგიკური მსჯელობა',
    kk: 'Логикалық пайымдау',
    zh: '逻辑推理',
    hi: 'तार्किक चिंतन',
    es: 'Razonamiento lógico',
    ar: 'التفكير المنطقي',
    fr: 'Raisonnement logique',
    bn: 'যৌক্তিক চিন্তা',
    pt: 'Raciocínio lógico',
    ur: 'منطقی استدلال',
    id: 'Penalaran logis',
    de: 'Logisches Denken',
    ja: '論理的推論',
    ko: '논리적 추론',
    tr: 'Mantıksal akıl yürütme',
    vi: 'Suy luận logic',
    ta: 'தர்க்கரீதியான சிந்தனை',
    te: 'తార్కిక విశ్లేషణ',
    mr: 'तार्किक विचार',
    ms: 'Penaakulan logik',
    he: 'חשיבה לוגית',
    pl: 'Rozumowanie logiczne',
    uk: 'Логічне мислення',
  },
  skills: {
    logicalElimination: logicalElimination_Skill_Data,
  },
  description: {
    methodological:
      'Using given constraints to exclude impossible alternatives and identify the sole valid conclusion. Completing numerical patterns belongs to algebraic competencies, not to a separate skill in this group.',
  },
});
