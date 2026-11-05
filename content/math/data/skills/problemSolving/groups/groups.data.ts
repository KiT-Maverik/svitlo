import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { correspondenceCombinations_Skill_Data, equalGroups_Skill_Data } from './skills';

export const groups_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'groups',
  id: 'fae06e19-607b-485c-88d4-cfe38e26e343',
  name: {
    en: 'Grouping problems',
    qm: 'Toparlav meseleleri',
    lt: 'Grupavimo uždaviniai',
    lv: 'Grupēšanas uzdevumi',
    et: 'Rühmitamisülesanded',
    be: 'Задачы на групаваньне',
    ka: 'დაჯგუფების ამოცანები',
    kk: 'Топтастыру есептері',
    zh: '分组类应用题',
    hi: 'समूहों की समस्याएँ',
    es: 'Problemas de agrupación',
    ar: 'مسائل المجموعات',
    fr: 'Problèmes de groupement',
    bn: 'দলভিত্তিক সমস্যা',
    pt: 'Problemas de agrupamento',
    ur: 'گروہوں کے مسائل',
    id: 'Soal pengelompokan',
    de: 'Gruppierungsaufgaben',
    ja: 'グループの文章題',
    ko: '묶음 문제',
    tr: 'Gruplama problemleri',
    vi: 'Bài toán chia nhóm',
    ta: 'குழுவாக்கக் கணக்குகள்',
    te: 'సమూహ సమస్యలు',
    mr: 'गटांच्या समस्या',
    ms: 'Masalah pengelompokan',
    he: 'בעיות קבוצות',
    pl: 'Zadania o grupach',
    uk: 'Задачі на групування',
  },
  skills: {
    correspondenceCombinations: correspondenceCombinations_Skill_Data,
    equalGroups: equalGroups_Skill_Data,
  },
  description: {
    methodological:
      'Situations involving equal groups and independent selections from two sets, distinguishing multiplication from counting combinations.',
  },
});
