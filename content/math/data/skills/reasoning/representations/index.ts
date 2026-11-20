import { defineSkillGroup } from '@svitlo/engine/build';

import { multipleRepresentations } from './multipleRepresentations';

export const representations = defineSkillGroup({
  slug: 'representations',
  id: 'efaa3687-e789-421a-996b-78ac52d63f42',
  name: {
    ar: 'التمثيلات الرياضية',
    be: 'Матэматычныя прадстаўленьні',
    bn: 'গাণিতিক উপস্থাপন',
    de: 'Mathematische Darstellungen',
    en: 'Mathematical representations',
    es: 'Representaciones matemáticas',
    et: 'Matemaatilised esitused',
    fr: 'Représentations mathématiques',
    he: 'ייצוגים מתמטיים',
    hi: 'गणितीय निरूपण',
    id: 'Representasi matematika',
    it: 'Rappresentazioni matematiche',
    ja: '数学的な表現',
    ka: 'მათემატიკური წარმოდგენები',
    kk: 'Matematikalyq beineleuler',
    ko: '수학적 표현',
    lt: 'Matematiniai vaizdavimo būdai',
    lv: 'Matemātiskie attēlojumi',
    mr: 'गणितीय निरूपणे',
    ms: 'Perwakilan matematik',
    pl: 'Reprezentacje matematyczne',
    pt: 'Representações matemáticas',
    qm: 'Matematik tasvirler',
    ta: 'கணிதப் பிரதிநிதித்துவங்கள்',
    te: 'గణిత ప్రాతినిధ్యాలు',
    tr: 'Matematiksel gösterimler',
    uk: 'Математичні представлення',
    ur: 'ریاضی نمائندگی',
    vi: 'Biểu diễn toán học',
    zh: '数学表示',
  },
  skills: {
    multipleRepresentations,
  },
  description: {
    methodological:
      'Translating between concrete depictions, diagrams, verbal rules, and symbolic notation while preserving mathematical meaning.',
  },
});
