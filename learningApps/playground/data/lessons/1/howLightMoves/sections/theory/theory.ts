import { checkpoint } from './checkpoints/checkpoint';
import lightPropagationSimulation from './scenes/lightPropagationSimulation';
import { lightRayDiagram } from './scenes/lightRayDiagram';
import { getMarkdownLocale } from '@svitlo/engine/utils';

export const theory = {
  name: {
    ar: 'النظرية',
    be: 'Тэорыя',
    bn: 'তত্ত্ব',
    de: 'Theorie',
    en: 'Theory',
    es: 'Teoría',
    et: 'Teooria',
    fr: 'Théorie',
    he: 'תיאוריה',
    hi: 'सिद्धांत',
    id: 'Teori',
    ja: '理論',
    ka: 'თეორია',
    kk: 'Теория',
    ko: '이론',
    lt: 'Teorija',
    lv: 'Teorija',
    mr: 'सिद्धांत',
    ms: 'Teori',
    pl: 'Teoria',
    pt: 'Teoria',
    qm: 'Nazariye',
    ta: 'கோட்பாடு',
    te: 'సిద్ధాంతం',
    tr: 'Teori',
    uk: 'Теорія',
    ur: 'نظریہ',
    vi: 'Lý thuyết',
    zh: '理论',
  },
  markdown: {
    p1: getMarkdownLocale(new URL('./markdown/p1/', import.meta.url)),
    p2: getMarkdownLocale(new URL('./markdown/p2/', import.meta.url)),
    p3: getMarkdownLocale(new URL('./markdown/p3/', import.meta.url)),
  },
  scene: {
    checkpoint,
    lightRayDiagram,
    lightPropagationSimulation,
  },
};
