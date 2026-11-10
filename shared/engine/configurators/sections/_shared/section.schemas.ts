import { z } from 'zod';

import { contentBlockLocalizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import {Configurator_Mode} from "../../configurator.schemas";

export const sectionTypes = ['practice', 'codingTask', 'flow', 'flashcards', 'quiz', 'content'] as const;

export type Section_Type = (typeof sectionTypes)[number];

export const createSectionMetaSchema = (type: Section_Type) => {
  const meta = (mode: Configurator_Mode) => ({
    type: z.literal(type),
    id: z.uuid(),
    slug: z.string().min(1),
    title: contentBlockLocalizationSwitch[mode]
  });

  const params =  (mode: Configurator_Mode) => ({
    navigationLabel: contentBlockLocalizationSwitch[mode],
    skippable: z.literal(true).optional(),
  });

  return {
    config: z.object({
      ...meta('config'),
      title: contentBlockLocalizationSwitch.config,
      params: params('config'),
    }),
    props: z.object({
      ...meta('props'),
      title: contentBlockLocalizationSwitch.props,
      params: z.object({
        ...params('props'),
        disable: z.literal(true).optional(),
      }),
    }),
  };
};
