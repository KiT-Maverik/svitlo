import { z } from 'zod';

import { contentBlockLocalizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import {Configurator_Mode} from "../../configurator.schemas";

export const sectionTypes = ['practice', 'codingTask', 'flow', 'flashcards', 'quiz', 'content'] as const;

export type Section_Type = (typeof sectionTypes)[number];

export const createSectionMetaSchema = (type: Section_Type, mode: Configurator_Mode) => {
  const meta = {
    type: z.literal(type),
    id: z.uuid(),
    slug: z.string().min(1),
    title: contentBlockLocalizationSwitch[mode]
  };

  const params = {
    navigationLabel: contentBlockLocalizationSwitch[mode],
    skippable: z.literal(true).optional(),
  }

  return {
    config: z.object({
      ...meta,
      title: contentBlockLocalizationSwitch.config,
      params,
    }),
    props: z.object({
      ...meta,
      title: contentBlockLocalizationSwitch.props,
      params: z.object({
        ...params,
        disable: z.literal(true).optional(),
      }),
    }),
  };
};
