import { defineSkillGroup } from '@svitlo/engine/build';

import { capacityConcept } from './capacityConcept';
import { liter } from './liter';
import { milliliter } from './milliliter';

export const capacity = defineSkillGroup({
  slug: 'capacity',
  id: '4ab3d3b7-3c90-4805-ad05-cf27cb9ae725',
  name: {
    ar: 'السعة',
    be: 'Умяшчальнасьць',
    bn: 'ধারণক্ষমতা',
    de: 'Fassungsvermögen',
    en: 'Capacity',
    es: 'Capacidad',
    et: 'Mahutavus',
    fr: 'Capacité',
    he: 'קיבולת',
    hi: 'धारिता',
    id: 'Kapasitas',
    it: 'Capacità',
    ja: '容量',
    ka: 'ტევადობა',
    kk: 'Syiymdylyq',
    ko: '들이',
    lt: 'Talpa',
    lv: 'Ietilpība',
    mr: 'क्षमता',
    ms: 'Kapasiti',
    pl: 'Pojemność',
    pt: 'Capacidade',
    qm: 'Sıyımlılıq',
    ta: 'கொள்ளளவு',
    te: 'ధారిత',
    tr: 'Kapasite',
    uk: 'Місткість',
    ur: 'گنجائش',
    vi: 'Dung tích',
    zh: '容量',
  },
  skills: {
    capacityConcept,
    liter,
    milliliter,
  },
  description: {
    methodological:
      'The volume of liquid that a container can hold, its measurement in liters and milliliters, and comparisons of capacities.',
  },
});
