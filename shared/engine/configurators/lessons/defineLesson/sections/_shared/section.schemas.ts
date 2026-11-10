import { z } from 'zod';

import { contentBlockLocalizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import { Configurator_Mode } from '../../configurator.schemas';
import {identityBase_Schema, paramsBase_Schema} from "../../../../_shared";

export const sectionTypes = ['practice', 'codingTask', 'flow', 'flashcards', 'quiz', 'content'] as const;

export type Section_Type = (typeof sectionTypes)[number];

const commonParams = paramsBase_Schema.shape.params.extend({
  skippable: z.literal(true).optional(),
})

export const createSectionBaseSchema = (type: Section_Type) => {
  const identity = () => identityBase_Schema.extend({
    type: z.literal(type),
  });

  return {
    config: z.object({
      ...identity('config'),
      title: contentBlockLocalizationSwitch.config,
      params: params('config'),
    }),
    props: z.object({
      ...identity('props'),
      title: contentBlockLocalizationSwitch.props,
      params: z.object({
        ...params('props'),
        disable: z.literal(true).optional(),
      }),
    }),
  };
};
