import { defineSkillGroup } from '@svitlo/engine/build';

import { logicalElimination } from './logicalElimination';

export const logic = defineSkillGroup({
  slug: 'logic',
  id: '5f3df23c-87ce-411d-87db-6c76d9cd8a48',
  name: {
    ar: 'التفكير المنطقي',
    be: 'Лягічнае разважаньне',
    bn: 'যৌক্তিক চিন্তা',
    de: 'Logisches Denken',
    en: 'Logical reasoning',
    es: 'Razonamiento lógico',
    et: 'Loogiline arutlus',
    fr: 'Raisonnement logique',
    he: 'חשיבה לוגית',
    hi: 'तार्किक चिंतन',
    id: 'Penalaran logis',
    it: 'Ragionamento logico',
    ja: '論理的推論',
    ka: 'ლოგიკური მსჯელობა',
    kk: 'Logikalyq paiymdau',
    ko: '논리적 추론',
    lt: 'Loginis samprotavimas',
    lv: 'Loģiskā spriešana',
    mr: 'तार्किक विचार',
    ms: 'Penaakulan logik',
    pl: 'Rozumowanie logiczne',
    pt: 'Raciocínio lógico',
    qm: 'Mantıqiy fikir yürsetüv',
    ta: 'தர்க்கரீதியான சிந்தனை',
    te: 'తార్కిక విశ్లేషణ',
    tr: 'Mantıksal akıl yürütme',
    uk: 'Логічне мислення',
    ur: 'منطقی استدلال',
    vi: 'Suy luận logic',
    zh: '逻辑推理',
  },
  skills: {
    logicalElimination,
  },
  description: {
    methodological:
      'Using given constraints to exclude impossible alternatives and identify the sole valid conclusion. Completing numerical patterns belongs to algebraic competencies, not to a separate skill in this group.',
  },
});
