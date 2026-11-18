import { defineSkillGroup } from '@svitlo/engine/build';

import { correspondenceCombinations } from './correspondenceCombinations';
import { equalGroups } from './equalGroups';

export const groups = defineSkillGroup({
  slug: 'groups',
  id: 'fae06e19-607b-485c-88d4-cfe38e26e343',
  name: {
    ar: 'مسائل المجموعات',
    be: 'Задачы на групаваньне',
    bn: 'দলভিত্তিক সমস্যা',
    de: 'Gruppierungsaufgaben',
    en: 'Grouping problems',
    es: 'Problemas de agrupación',
    et: 'Rühmitamisülesanded',
    fr: 'Problèmes de groupement',
    he: 'בעיות קבוצות',
    hi: 'समूहों की समस्याएँ',
    id: 'Soal pengelompokan',
    it: 'Problemi di raggruppamento',
    ja: 'グループの文章題',
    ka: 'დაჯგუფების ამოცანები',
    kk: 'Toptastyru esepterı',
    ko: '묶음 문제',
    lt: 'Grupavimo uždaviniai',
    lv: 'Grupēšanas uzdevumi',
    mr: 'गटांच्या समस्या',
    ms: 'Masalah pengelompokan',
    pl: 'Zadania o grupach',
    pt: 'Problemas de agrupamento',
    qm: 'Toparlav meseleleri',
    ta: 'குழுவாக்கக் கணக்குகள்',
    te: 'సమూహ సమస్యలు',
    tr: 'Gruplama problemleri',
    uk: 'Задачі на групування',
    ur: 'گروہوں کے مسائل',
    vi: 'Bài toán chia nhóm',
    zh: '分组类应用题',
  },
  skills: {
    correspondenceCombinations,
    equalGroups,
  },
  description: {
    methodological:
      'Situations involving equal groups and independent selections from two sets, distinguishing multiplication from counting combinations.',
  },
});
