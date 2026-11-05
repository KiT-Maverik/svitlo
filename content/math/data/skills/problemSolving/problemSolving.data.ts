import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { conditions_SkillGroup_Data } from './conditions/conditions.data';
import { models_SkillGroup_Data } from './models/models.data';
import { planning_SkillGroup_Data } from './planning/planning.data';
import { comparisons_SkillGroup_Data } from './comparisons/comparisons.data';
import { parts_SkillGroup_Data } from './parts/parts.data';
import { groups_SkillGroup_Data } from './groups/groups.data';
import { quantities_SkillGroup_Data } from './quantities/quantities.data';

export const problemSolving_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'problemSolving',
  id: '695fd427-aaea-4cbb-bd07-2d1702f36a17',
  name: {
    en: 'Problem solving',
    qm: 'Mesele çezüv',
    lt: 'Uždavinių sprendimas',
    lv: 'Uzdevumu risināšana',
    et: 'Ülesannete lahendamine',
    be: 'Рашэньне задачаў',
    ka: 'ამოცანების ამოხსნა',
    kk: 'Есептерді шешу',
    zh: '解决问题',
    hi: 'समस्या समाधान',
    es: 'Resolución de problemas',
    ar: 'حل المسائل',
    fr: 'Résolution de problèmes',
    bn: 'সমস্যা সমাধান',
    pt: 'Resolução de problemas',
    ur: 'مسئلہ حل کرنا',
    id: 'Pemecahan masalah',
    de: 'Sachaufgaben lösen',
    ja: '問題解決',
    ko: '문제 해결',
    tr: 'Problem çözme',
    vi: 'Giải quyết vấn đề',
    ta: 'சிக்கல் தீர்த்தல்',
    te: 'సమస్య పరిష్కారం',
    mr: 'समस्या सोडवणे',
    ms: 'Penyelesaian masalah',
    he: 'פתרון בעיות',
    pl: 'Rozwiązywanie zadań',
    uk: 'Розв’язування задач',
  },
  groups: {
    conditions: conditions_SkillGroup_Data,
    models: models_SkillGroup_Data,
    planning: planning_SkillGroup_Data,
    comparisons: comparisons_SkillGroup_Data,
    parts: parts_SkillGroup_Data,
    groups: groups_SkillGroup_Data,
    quantities: quantities_SkillGroup_Data,
  },
  description: {
    methodological:
      'Translating real-life situations into mathematical models, selecting operations, planning multi-step solutions, and checking whether answers make sense.',
  },
});
