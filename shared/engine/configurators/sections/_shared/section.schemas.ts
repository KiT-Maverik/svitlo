import { z } from 'zod';

import { contentBlockLocalizationSwitch } from '../../contentBlocks/contentBlock.schemas';

export const sectionTypes = ['practice', 'codingTask', 'flow', 'flashcards', 'quiz', 'content'] as const;

export type Section_Type = (typeof sectionTypes)[number];

export const createSectionMetaSchema = <const Type extends Section_Type>(type: Type) => {
  const fields = {
    type: z.literal(type),
    id: z.uuid(),
    slug: z.string().min(1),
  };

  return {
    config: z.strictObject({
      ...fields,
      title: contentBlockLocalizationSwitch.config,
      params: z.strictObject({
        navigationLabel: contentBlockLocalizationSwitch.config,
        skippable: z.literal(true).optional(),
      }),
    }),
    props: z.strictObject({
      ...fields,
      title: contentBlockLocalizationSwitch.props,
      params: z.strictObject({
        navigationLabel: contentBlockLocalizationSwitch.props,
        skippable: z.literal(true).optional(),
        disable: z.literal(true).optional(),
      }),
    }),
  };
};
