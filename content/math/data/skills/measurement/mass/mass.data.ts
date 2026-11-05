import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  centnerKilogram_Skill_Data,
  compareMass_Skill_Data,
  kilogramGram_Skill_Data,
  weighObject_Skill_Data,
} from './skills';

export const mass_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'mass',
  id: 'd4886ce5-e4e4-4df9-8482-244fed0d7e3c',
  name: {
    en: 'Mass',
    qm: 'Kütle',
    lt: 'Masė',
    lv: 'Masa',
    et: 'Mass',
    be: 'Маса',
    ka: 'მასა',
    kk: 'Масса',
    zh: '质量',
    hi: 'द्रव्यमान',
    es: 'Masa',
    ar: 'الكتلة',
    fr: 'Masse',
    bn: 'ভর',
    pt: 'Massa',
    ur: 'کمیت',
    id: 'Massa',
    de: 'Masse',
    ja: '質量',
    ko: '질량',
    tr: 'Kütle',
    vi: 'Khối lượng',
    ta: 'நிறை',
    te: 'ద్రవ్యరాశి',
    mr: 'वस्तुमान',
    ms: 'Jisim',
    he: 'מסה',
    pl: 'Masa',
    uk: 'Маса',
  },
  skills: {
    centnerKilogram: centnerKilogram_Skill_Data,
    compareMass: compareMass_Skill_Data,
    kilogramGram: kilogramGram_Skill_Data,
    weighObject: weighObject_Skill_Data,
  },
  description: {
    methodological:
      'Mass as a physical quantity, its comparison with balances, reading its numerical value from instruments, and relationships among established units of mass. Mass is not identical to weight as a force.',
  },
});
