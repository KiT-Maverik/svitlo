import { z } from 'zod';

import { createQuestionFields, questionBlockSwitch, questionLocalizationSwitch } from '../question.schemas';

function createOrderSequenceSchema<Mode extends keyof typeof questionBlockSwitch>(mode: Mode) {
  const child = questionBlockSwitch[mode];

  return z.strictObject({
    ...createQuestionFields('orderSequence', mode),
    sequence: z.tuple([child], child),
  });
}

export const orderSequence_Config_Schema = createOrderSequenceSchema('config');
export type Question_OrderSequence_Config = z.infer<typeof orderSequence_Config_Schema>;

export const orderSequence_Props_Schema = createOrderSequenceSchema('props');
export type Question_OrderSequence_Props = z.infer<typeof orderSequence_Props_Schema>;
