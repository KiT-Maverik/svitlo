import { z } from 'zod';
import { disability_Schema } from '#schemas';

import { assessmentMethodSlug_Schema } from './assessmentMethod.schemas';
import { questionTypes, type Question_Type } from './question.constants';

import {
  contentBlockConfigurator_Schema,
  contentBlockResolved_Schema,
  localizationSwitch,
} from '../contentBlocks';

/** Authored Questions hold ContentBlock definitions; published Questions contain resolved props. */
export const questionBlockSwitch = {
  config: contentBlockConfigurator_Schema,
  props: contentBlockResolved_Schema,
} as const;

export const questionLocalizationSwitch = localizationSwitch;

export function createQuestionFields<const Kind extends Question_Type, Mode extends keyof typeof questionBlockSwitch>(
  kind: Kind,
  mode: Mode,
) {
  const child = questionBlockSwitch[mode];

  return {
    id: z.uuid(),
    slug: z.string().min(1),
    type: z.literal(kind),
    assessmentMethod: assessmentMethodSlug_Schema,
    restrictions: z.array(disability_Schema),
    question: z.tuple([child], child),
    hint: z.tuple([child], child).optional(),
    explanation: z.tuple([child], child).optional(),
  };
}
