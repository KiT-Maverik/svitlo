import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { capacityConcept_Skill_Data, liter_Skill_Data, milliliter_Skill_Data } from './skills';

export const capacity_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'capacity',
  id: '4ab3d3b7-3c90-4805-ad05-cf27cb9ae725',
  name: {
    en: 'Capacity',
    qm: 'Sıyımlılıq',
    lt: 'Talpa',
    lv: 'Ietilpība',
    et: 'Mahutavus',
    be: 'Умяшчальнасьць',
    ka: 'ტევადობა',
    kk: 'Сыйымдылық',
    zh: '容量',
    hi: 'धारिता',
    es: 'Capacidad',
    ar: 'السعة',
    fr: 'Capacité',
    bn: 'ধারণক্ষমতা',
    pt: 'Capacidade',
    ur: 'گنجائش',
    id: 'Kapasitas',
    de: 'Fassungsvermögen',
    ja: '容量',
    ko: '들이',
    tr: 'Kapasite',
    vi: 'Dung tích',
    ta: 'கொள்ளளவு',
    te: 'ధారిత',
    mr: 'क्षमता',
    ms: 'Kapasiti',
    he: 'קיבולת',
    pl: 'Pojemność',
    uk: 'Місткість',
  },
  skills: {
    capacityConcept: capacityConcept_Skill_Data,
    liter: liter_Skill_Data,
    milliliter: milliliter_Skill_Data,
  },
  description: {
    methodological:
      'The volume of liquid that a container can hold, its measurement in liters and milliliters, and comparisons of capacities.',
  },
});
