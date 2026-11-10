import { z } from 'zod';

import { contentBlockLocalizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import { Configurator_Mode } from '../../configurator.schemas';
import {paramsBase_Schema} from "../../../../_shared";

export const sectionTypes = ['practice', 'codingTask', 'flow', 'flashcards', 'quiz', 'content'] as const;

export type Section_Type = (typeof sectionTypes)[number];

const commonParams = paramsBase_Schema.shape.params.extend({
  skippable: z.literal(true).optional(),
})

export const createSectionBaseSchema = (type: Section_Type) => {
  const meta = (mode: Configurator_Mode) => ({
    type: z.literal(type),
    id: z.uuid(),
    slug: z.string().min(1),
    title: contentBlockLocalizationSwitch[mode],
  });

  const params = (mode: Configurator_Mode) => ({
    navigationLabel: contentBlockLocalizationSwitch[mode],
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
