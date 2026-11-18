import { defineSkillGroup } from '@svitlo/engine/build';

import { addSubtractLengths } from './addSubtractLengths';
import { compareLength } from './compareLength';
import { decimeters } from './decimeters';
import { drawSegmentCentimeters } from './drawSegmentCentimeters';
import { estimateLength } from './estimateLength';
import { kilometers } from './kilometers';
import { measureCentimeters } from './measureCentimeters';
import { meters } from './meters';
import { millimeters } from './millimeters';
import { nonstandardLength } from './nonstandardLength';
import { useRuler } from './useRuler';

export const length = defineSkillGroup({
  slug: 'length',
  id: 'fd424287-b12e-47a3-92e7-931819d5e3df',
  name: {
    ar: 'الطول',
    be: 'Даўжыня',
    bn: 'দৈর্ঘ্য',
    de: 'Länge',
    en: 'Length',
    es: 'Longitud',
    et: 'Pikkus',
    fr: 'Longueur',
    he: 'אורך',
    hi: 'लंबाई',
    id: 'Panjang',
    it: 'Lunghezza',
    ja: '長さ',
    ka: 'სიგრძე',
    kk: 'Ūzyndyq',
    ko: '길이',
    lt: 'Ilgis',
    lv: 'Garums',
    mr: 'लांबी',
    ms: 'Panjang',
    pl: 'Długość',
    pt: 'Comprimento',
    qm: 'Uzunlıq',
    ta: 'நீளம்',
    te: 'పొడవు',
    tr: 'Uzunluk',
    uk: 'Довжина',
    ur: 'لمبائی',
    vi: 'Độ dài',
    zh: '长度',
  },
  skills: {
    addSubtractLengths,
    compareLength,
    decimeters,
    drawSegmentCentimeters,
    estimateLength,
    kilometers,
    measureCentimeters,
    meters,
    millimeters,
    nonstandardLength,
    useRuler,
  },
  description: {
    methodological:
      'Direct and instrument-based comparison of lengths, metric units of differing magnitudes, and operations on homogeneous length quantities.',
  },
});
