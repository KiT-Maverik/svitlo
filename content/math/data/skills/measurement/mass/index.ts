import { defineSkillGroup } from '@svitlo/engine/build';

import { centnerKilogram } from './centnerKilogram';
import { compareMass } from './compareMass';
import { kilogramGram } from './kilogramGram';
import { weighObject } from './weighObject';

export const mass = defineSkillGroup({
  slug: 'mass',
  id: 'd4886ce5-e4e4-4df9-8482-244fed0d7e3c',
  name: {
    ar: 'الكتلة',
    be: 'Маса',
    bn: 'ভর',
    de: 'Masse',
    en: 'Mass',
    es: 'Masa',
    et: 'Mass',
    fr: 'Masse',
    he: 'מסה',
    hi: 'द्रव्यमान',
    id: 'Massa',
    it: 'Massa',
    ja: '質量',
    ka: 'მასა',
    kk: 'Massa',
    ko: '질량',
    lt: 'Masė',
    lv: 'Masa',
    mr: 'वस्तुमान',
    ms: 'Jisim',
    pl: 'Masa',
    pt: 'Massa',
    qm: 'Kütle',
    ta: 'நிறை',
    te: 'ద్రవ్యరాశి',
    tr: 'Kütle',
    uk: 'Маса',
    ur: 'کمیت',
    vi: 'Khối lượng',
    zh: '质量',
  },
  skills: {
    centnerKilogram,
    compareMass,
    kilogramGram,
    weighObject,
  },
  description: {
    methodological:
      'Mass as a physical quantity, its comparison with balances, reading its numerical value from instruments, and relationships among established units of mass. Mass is not identical to weight as a force.',
  },
});
