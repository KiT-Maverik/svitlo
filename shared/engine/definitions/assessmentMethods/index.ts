import { z } from 'zod';

import { locale_All_Schema } from '#schemas';

import type { TaggedDefinition } from '../structured';
import {textProps_Schema} from "../contentBlocks/defineText/defineText.schema";

export const assessmentMethodSchema = z.strictObject({
  description: locale_All_Schema,
  id: z.uuid(),
  slug: z.string().min(1),
  title: locale_All_Schema,
});

export type AssessmentMethod_Config = z.infer<typeof assessmentMethodSchema>;

export function defineAssessmentMethod(config: AssessmentMethod_Config) {
  const { id, description, slug, title } = config;

  const base: Partial<AssessmentMethod_Config> = {
    id,
    slug,
  } as const;

  if (typeof title === 'string') base.title = title;
  if (typeof description === 'string') base.description = description;

  return {
    config: {
      base,
      locales: () => {
        const result = {};

        if (typeof title !== 'string') result.title = title;
        if (typeof description !== 'string') result.description = title;

        return result
      },
      test: {
        config: () =>
          assessmentMethodSchema.safeParse(config).success,
        props: (props: unknown) => textProps_Schema.safeParse(props).success,
      },
    },
  };
}

export type AssessmentMethodDefinition = TaggedDefinition<'assessmentMethod'>;
