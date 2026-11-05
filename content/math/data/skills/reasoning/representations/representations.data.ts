import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { multipleRepresentations_Skill_Data } from './skills';

export const representations_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'representations',
  id: 'efaa3687-e789-421a-996b-78ac52d63f42',
  name: {
    en: 'Mathematical representations',
    qm: 'Matematik tasvirler',
    lt: 'Matematiniai vaizdavimo būdai',
    lv: 'Matemātiskie attēlojumi',
    et: 'Matemaatilised esitused',
    be: 'Матэматычныя прадстаўленьні',
    ka: 'მათემატიკური წარმოდგენები',
    kk: 'Математикалық бейнелеулер',
    zh: '数学表示',
    hi: 'गणितीय निरूपण',
    es: 'Representaciones matemáticas',
    ar: 'التمثيلات الرياضية',
    fr: 'Représentations mathématiques',
    bn: 'গাণিতিক উপস্থাপন',
    pt: 'Representações matemáticas',
    ur: 'ریاضی نمائندگی',
    id: 'Representasi matematika',
    de: 'Mathematische Darstellungen',
    ja: '数学的な表現',
    ko: '수학적 표현',
    tr: 'Matematiksel gösterimler',
    vi: 'Biểu diễn toán học',
    ta: 'கணிதப் பிரதிநிதித்துவங்கள்',
    te: 'గణిత ప్రాతినిధ్యాలు',
    mr: 'गणितीय निरूपणे',
    ms: 'Perwakilan matematik',
    he: 'ייצוגים מתמטיים',
    pl: 'Reprezentacje matematyczne',
    uk: 'Математичні представлення',
  },
  skills: {
    multipleRepresentations: multipleRepresentations_Skill_Data,
  },
  description: {
    methodological:
      'Translating between concrete depictions, diagrams, verbal rules, and symbolic notation while preserving mathematical meaning.',
  },
});
