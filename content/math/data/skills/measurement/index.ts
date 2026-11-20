import { defineSkillDomain } from '@svitlo/engine/build';

import { capacity } from './capacity';
import { general } from './general';
import { length } from './length';
import { mass } from './mass';
import { temperature } from './temperature';

export const measurement = defineSkillDomain({
  slug: 'measurement',
  id: '01fcc12a-a71d-4741-a245-e3a4e045f9cd',
  title: {
    ar: 'القياس',
    be: 'Вымярэньне',
    bn: 'পরিমাপ',
    de: 'Messen',
    en: 'Measurement',
    es: 'Medición',
    et: 'Mõõtmine',
    fr: 'Mesure',
    he: 'מדידה',
    hi: 'मापन',
    id: 'Pengukuran',
    it: 'Misure',
    ja: '測定',
    ka: 'გაზომვა',
    kk: 'Ölşeu',
    ko: '측정',
    lt: 'Matavimas',
    lv: 'Mērīšana',
    mr: 'मापन',
    ms: 'Pengukuran',
    pl: 'Pomiary',
    pt: 'Medição',
    qm: 'Ölçüv',
    ta: 'அளவீடு',
    te: 'కొలత',
    tr: 'Ölçme',
    uk: 'Вимірювання',
    ur: 'پیمائش',
    vi: 'Đo lường',
    zh: '测量',
  },
  groups: {
    capacity,
    general,
    length,
    mass,
    temperature,
  },
  description: {
    methodological:
      'Measurement of physical quantities by comparison with units, instruments, and scales, covering length, mass, capacity, temperature, and consistent use of units.',
  },
});
