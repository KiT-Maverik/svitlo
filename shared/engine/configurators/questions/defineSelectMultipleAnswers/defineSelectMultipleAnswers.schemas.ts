import { z } from 'zod';

import { createQuestionFields, questionBlockSwitch, questionLocalizationSwitch } from '../question.schemas';

function createSelectMultipleAnswersSchema<Mode extends keyof typeof questionBlockSwitch>(mode: Mode) {
  const child = questionBlockSwitch[mode];

  return z.strictObject({
    ...createQuestionFields('selectMultipleAnswers', mode),
    answers: z.strictObject({
      correct: z.record(z.string(), child),
      incorrect: z.record(z.string(), child),
      distractors: z.record(z.string(), child),
    }),
  });
}

export const selectMultipleAnswers_Config_Schema = createSelectMultipleAnswersSchema('config');
export type Question_SelectMultipleAnswers_Config = z.infer<typeof selectMultipleAnswers_Config_Schema>;

export const selectMultipleAnswers_Props_Schema = createSelectMultipleAnswersSchema('props');
export type Question_SelectMultipleAnswers_Props = z.infer<typeof selectMultipleAnswers_Props_Schema>;
