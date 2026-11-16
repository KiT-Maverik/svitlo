import { defineSkillGroup } from '@svitlo/engine/build';

import {
  constructInverseProblem_Skill_Data,
  explainAnswerUnits_Skill_Data,
  multipleSolutionStrategies_Skill_Data,
  threeStepPlan_Skill_Data,
  twoStepPlan_Skill_Data,
} from './skills';

export const planning_SkillGroup_Data = defineSkillGroup({
  slug: 'planning',
  id: 'e6efe33e-ba9c-44c1-85c9-92ac9f83a74e',
  name: {
    en: 'Solution planning',
    it: 'Pianificare la soluzione',
    qm: 'Çezimni planlaştırmaq',
    lt: 'Sprendimo planavimas',
    lv: 'Risinājuma plānošana',
    et: 'Lahenduse kavandamine',
    be: 'Плянаваньне рашэньня',
    ka: 'ამოხსნის დაგეგმვა',
    kk: 'Шешімді жоспарлау',
    zh: '解题规划',
    hi: 'समाधान की योजना',
    es: 'Planificación de soluciones',
    ar: 'تخطيط الحل',
    fr: 'Planification de la résolution',
    bn: 'সমাধানের পরিকল্পনা',
    pt: 'Planejamento de soluções',
    ur: 'حل کی منصوبہ بندی',
    id: 'Perencanaan penyelesaian',
    de: 'Lösungsplanung',
    ja: '解決手順の計画',
    ko: '풀이 계획',
    tr: 'Çözüm planlama',
    vi: 'Lập kế hoạch giải',
    ta: 'தீர்வைத் திட்டமிடுதல்',
    te: 'పరిష్కార ప్రణాళిక',
    mr: 'उपायाचे नियोजन',
    ms: 'Perancangan penyelesaian',
    he: 'תכנון פתרון',
    pl: 'Planowanie rozwiązania',
    uk: 'Планування розв’язання',
  },
  skills: {
    items: {
      twoStepPlan: twoStepPlan_Skill_Data,
      threeStepPlan: threeStepPlan_Skill_Data,
      constructInverseProblem: constructInverseProblem_Skill_Data,
      explainAnswerUnits: explainAnswerUnits_Skill_Data,
      multipleSolutionStrategies: multipleSolutionStrategies_Skill_Data,
    },
    order: [
      'twoStepPlan',
      'threeStepPlan',
      'constructInverseProblem',
      'explainAnswerUnits',
      'multipleSolutionStrategies',
    ],
  },
  description: {
    methodological:
      'Constructing and justifying a sequence of solution steps, checking units and answers, and considering alternative methods.',
  },
});
