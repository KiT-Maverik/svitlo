import { defineSkillDomain } from '@svitlo/engine/build';

import { comparisons } from './comparisons';
import { conditions } from './conditions';
import { groups } from './groups';
import { models } from './models';
import { parts } from './parts';
import { planning } from './planning';
import { quantities } from './quantities';

export const problemSolving = defineSkillDomain({
  slug: 'problemSolving',
  id: '695fd427-aaea-4cbb-bd07-2d1702f36a17',
  title: {
    ar: 'حل المسائل',
    be: 'Рашэньне задачаў',
    bn: 'সমস্যা সমাধান',
    de: 'Sachaufgaben lösen',
    en: 'Problem solving',
    es: 'Resolución de problemas',
    et: 'Ülesannete lahendamine',
    fr: 'Résolution de problèmes',
    he: 'פתרון בעיות',
    hi: 'समस्या समाधान',
    id: 'Pemecahan masalah',
    it: 'Risoluzione di problemi',
    ja: '問題解決',
    ka: 'ამოცანების ამოხსნა',
    kk: 'Esepterdı şeşu',
    ko: '문제 해결',
    lt: 'Uždavinių sprendimas',
    lv: 'Uzdevumu risināšana',
    mr: 'समस्या सोडवणे',
    ms: 'Penyelesaian masalah',
    pl: 'Rozwiązywanie zadań',
    pt: 'Resolução de problemas',
    qm: 'Mesele çezüv',
    ta: 'சிக்கல் தீர்த்தல்',
    te: 'సమస్య పరిష్కారం',
    tr: 'Problem çözme',
    uk: 'Розв’язування задач',
    ur: 'مسئلہ حل کرنا',
    vi: 'Giải quyết vấn đề',
    zh: '解决问题',
  },
  groups: {
    comparisons,
    conditions,
    groups,
    models,
    parts,
    planning,
    quantities,
  },
  description: {
    methodological:
      'Translating real-life situations into mathematical models, selecting operations, planning multi-step solutions, and checking whether answers make sense.',
  },
});
