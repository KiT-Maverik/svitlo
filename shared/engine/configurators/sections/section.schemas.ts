import { z } from 'zod';

import { contentBlockLocalizationSwitch } from '../contentBlocks/contentBlock.schemas';
import {Configurator_Mode} from "../configurator.schemas";

export const sectionTypes = [
  'practice',
  'codingTask',
  'flow',
  'flashcards',
  'quiz',
  'content',
] as const;

export type Section_Type = (typeof sectionTypes)[number];

export const createSectionMetaSchema = (type: Section_Type, mode: Configurator_Mode) => {

  const localized = contentBlockLocalizationSwitch[mode];

  return {
    type: z.literal(type),
    id: z.uuid(),
    slug: z.string().min(1),
    title: localized,
  };
}

export const sectionCommonParams_Schema = z.object({
  navigationLabel: z.string().min(1),
  skippable: z.literal(true).optional(),
});
