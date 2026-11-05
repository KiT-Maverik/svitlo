import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { length_SkillGroup_Data } from './length/length.data';
import { mass_SkillGroup_Data } from './mass/mass.data';
import { capacity_SkillGroup_Data } from './capacity/capacity.data';
import { temperature_SkillGroup_Data } from './temperature/temperature.data';
import { general_SkillGroup_Data } from './general/general.data';

export const measurement_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'measurement',
  id: '01fcc12a-a71d-4741-a245-e3a4e045f9cd',
  name: {
    en: 'Measurement',
    qm: 'Ölçüv',
    lt: 'Matavimas',
    lv: 'Mērīšana',
    et: 'Mõõtmine',
    be: 'Вымярэньне',
    ka: 'გაზომვა',
    kk: 'Өлшеу',
    zh: '测量',
    hi: 'मापन',
    es: 'Medición',
    ar: 'القياس',
    fr: 'Mesure',
    bn: 'পরিমাপ',
    pt: 'Medição',
    ur: 'پیمائش',
    id: 'Pengukuran',
    de: 'Messen',
    ja: '測定',
    ko: '측정',
    tr: 'Ölçme',
    vi: 'Đo lường',
    ta: 'அளவீடு',
    te: 'కొలత',
    mr: 'मापन',
    ms: 'Pengukuran',
    he: 'מדידה',
    pl: 'Pomiary',
    uk: 'Вимірювання',
  },
  groups: {
    length: length_SkillGroup_Data,
    mass: mass_SkillGroup_Data,
    capacity: capacity_SkillGroup_Data,
    temperature: temperature_SkillGroup_Data,
    general: general_SkillGroup_Data,
  },
  description: {
    methodological:
      'Measurement of physical quantities by comparison with units, instruments, and scales, covering length, mass, capacity, temperature, and consistent use of units.',
  },
});
