import { defineSkillGroup } from '@svitlo/engine/build';

import { constructInverseProblem } from './constructInverseProblem';
import { explainAnswerUnits } from './explainAnswerUnits';
import { multipleSolutionStrategies } from './multipleSolutionStrategies';
import { threeStepPlan } from './threeStepPlan';
import { twoStepPlan } from './twoStepPlan';

export const planning = defineSkillGroup({
  slug: 'planning',
  id: 'e6efe33e-ba9c-44c1-85c9-92ac9f83a74e',
  name: {
    ar: 'تخطيط الحل',
    be: 'Плянаваньне рашэньня',
    bn: 'সমাধানের পরিকল্পনা',
    de: 'Lösungsplanung',
    en: 'Solution planning',
    es: 'Planificación de soluciones',
    et: 'Lahenduse kavandamine',
    fr: 'Planification de la résolution',
    he: 'תכנון פתרון',
    hi: 'समाधान की योजना',
    id: 'Perencanaan penyelesaian',
    it: 'Pianificare la soluzione',
    ja: '解決手順の計画',
    ka: 'ამოხსნის დაგეგმვა',
    kk: 'Şeşımdı josparlau',
    ko: '풀이 계획',
    lt: 'Sprendimo planavimas',
    lv: 'Risinājuma plānošana',
    mr: 'उपायाचे नियोजन',
    ms: 'Perancangan penyelesaian',
    pl: 'Planowanie rozwiązania',
    pt: 'Planejamento de soluções',
    qm: 'Çezimni planlaştırmaq',
    ta: 'தீர்வைத் திட்டமிடுதல்',
    te: 'పరిష్కార ప్రణాళిక',
    tr: 'Çözüm planlama',
    uk: 'Планування розв’язання',
    ur: 'حل کی منصوبہ بندی',
    vi: 'Lập kế hoạch giải',
    zh: '解题规划',
  },
  skills: {
    constructInverseProblem,
    explainAnswerUnits,
    multipleSolutionStrategies,
    threeStepPlan,
    twoStepPlan,
  },
  description: {
    methodological:
      'Constructing and justifying a sequence of solution steps, checking units and answers, and considering alternative methods.',
  },
});
