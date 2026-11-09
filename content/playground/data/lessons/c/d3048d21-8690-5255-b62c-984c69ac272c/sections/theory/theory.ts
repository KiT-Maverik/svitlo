import type { HowLightMoves_Languages } from '../../constants';
import { createSectionConfigurator, createContentBlock, getMarkdownLocale } from '@svitlo/engine';
import { checkpoint } from './checkpoints/checkpoint';
import { lightPropagationSimulation } from './scenes/lightPropagationSimulation';
import { lightRayDiagram } from './scenes/lightRayDiagram';

const title = {
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
};

export const theory_Section_Configurator = createSectionConfigurator<HowLightMoves_Languages>()({
  id: '32376510-b49a-5da8-91d7-e13cf162c9f9',
  type: 'theory',
  slug: 'theory',
  title,
  navigationLabel: title,
  content: [
    createContentBlock<HowLightMoves_Languages>()({
      type: 'markdown',
      id: '11b1f7f2-9ef2-4c79-9a84-d809165c50d7',
      slug: 'p1',
      locales: getMarkdownLocale(new URL('./markdown/p1/', import.meta.url)),
    }),
    createContentBlock<HowLightMoves_Languages>()(lightRayDiagram),
    createContentBlock<HowLightMoves_Languages>()({
      type: 'markdown',
      id: 'c0b0d3f7-3507-4331-9852-23fd57e49ba7',
      slug: 'p2',
      locales: getMarkdownLocale(new URL('./markdown/p2/', import.meta.url)),
    }),
    createContentBlock<HowLightMoves_Languages>()(lightPropagationSimulation),
    createContentBlock<HowLightMoves_Languages>()({
      type: 'markdown',
      id: '4f3ff32e-a70c-49a0-b730-dfe27f685106',
      slug: 'p3',
      locales: getMarkdownLocale(new URL('./markdown/p3/', import.meta.url)),
    }),
    createContentBlock<HowLightMoves_Languages>()(checkpoint),
  ],
});

export const theory_Section = theory_Section_Configurator.getData();
