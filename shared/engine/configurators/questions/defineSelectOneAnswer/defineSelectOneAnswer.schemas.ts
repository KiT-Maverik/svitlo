import { z } from 'zod';

import { createQuestionFields, questionBlockSwitch, questionLocalizationSwitch } from '../question.schemas';

function createSelectOneAnswerSchema<Mode extends keyof typeof questionBlockSwitch>(mode: Mode) {
  const child = questionBlockSwitch[mode];

  return z.strictObject({
    ...createQuestionFields('selectOneAnswer', mode),
    answers: z.strictObject({
      correct: z.record(z.string(), child),
      incorrect: z.record(z.string(), child),
      distractors: z.record(z.string(), child),
    }),
  });
}

export const selectOneAnswer_Config_Schema = createSelectOneAnswerSchema('config');
export type Question_SelectOneAnswer_Config = z.infer<typeof selectOneAnswer_Config_Schema>;

export const selectOneAnswer_Props_Schema = createSelectOneAnswerSchema('props');
export type Question_SelectOneAnswer_Props = z.infer<typeof selectOneAnswer_Props_Schema>;
