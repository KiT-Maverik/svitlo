import { defineContentBlockCatalog, type ContentBlock_Catalog_DataFor, type Section } from '@svitlo/engine/content';
import type { theoryDefinition } from './theory.definition';
import { checkpointData } from './checkpoints/checkpoint';
import { lightPropagationSimulationData } from './scenes/lightPropagationSimulation';
import { lightRayDiagramData } from './scenes/lightRayDiagram';
import {getMarkdownLocale} from "@svitlo/engine/utils";

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

export const theory_Section = {
  id: '32376510-b49a-5da8-91d7-e13cf162c9f9',
  type: 'theory',
  slug: 'theory',
  title,
  navigationLabel: title,
  content: defineContentBlockCatalog({
    checkpoint: { checkpoint: checkpointData },
    markdown: {
      p1: getMarkdownLocale(new URL('./markdown/p1/', import.meta.url)),
      p2: getMarkdownLocale(new URL('./markdown/p2/', import.meta.url)),
      p3: getMarkdownLocale(new URL('./markdown/p3/', import.meta.url)),
    },
    scene: {
      lightPropagationSimulation: lightPropagationSimulationData,
      lightRayDiagram: lightRayDiagramData,
    },
  },
} satisfies Section<'data'>;
