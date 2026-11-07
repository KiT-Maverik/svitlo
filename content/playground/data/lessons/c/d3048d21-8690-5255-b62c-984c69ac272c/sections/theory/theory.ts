import type { HowLightMoves_Languages } from '../../constants';
import { createSection, createContentBlock } from '@svitlo/engine/builders';
import { checkpointData } from './checkpoints/checkpoint';
import { lightPropagationSimulationData } from './scenes/lightPropagationSimulation';
import { lightRayDiagramData } from './scenes/lightRayDiagram';
import { getMarkdownLocale } from '@svitlo/engine/utils';

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

export const theory_Section_Creator = createSection<HowLightMoves_Languages>()({
  id: '32376510-b49a-5da8-91d7-e13cf162c9f9',
  type: 'theory',
  slug: 'theory' as const,
  title,
  navigationLabel: title,
  content: [
    createContentBlock<HowLightMoves_Languages>()({
      type: 'markdown',
      id: 'how-light-moves-p1',
      slug: 'p1',
      locales: getMarkdownLocale(new URL('./markdown/p1/', import.meta.url)),
    }),
    createContentBlock<HowLightMoves_Languages>()(lightRayDiagramData),
    createContentBlock<HowLightMoves_Languages>()({
      type: 'markdown',
      id: 'how-light-moves-p2',
      slug: 'p2',
      locales: getMarkdownLocale(new URL('./markdown/p2/', import.meta.url)),
    }),
    createContentBlock<HowLightMoves_Languages>()(lightPropagationSimulationData),
    createContentBlock<HowLightMoves_Languages>()({
      type: 'markdown',
      id: 'how-light-moves-p3',
      slug: 'p3',
      locales: getMarkdownLocale(new URL('./markdown/p3/', import.meta.url)),
    }),
    createContentBlock<HowLightMoves_Languages>()(checkpointData),
  ],
});

export const theory_Section = theory_Section_Creator.getData();
