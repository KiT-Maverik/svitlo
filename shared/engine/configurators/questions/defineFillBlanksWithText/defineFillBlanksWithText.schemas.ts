import { z } from 'zod';

import { createQuestionFields, questionBlockSwitch, questionLocalizationSwitch } from '../question.schemas';

function createFillBlanksWithTextSchema<Mode extends keyof typeof questionBlockSwitch>(mode: Mode) {
  const child = questionBlockSwitch[mode];
  const localized = questionLocalizationSwitch[mode];

  return z.strictObject({
    ...createQuestionFields('fillBlanksWithText', mode),
    slots: z.array(
      z.strictObject({ selector: z.string(), correctAnswers: z.array(localized) }),
    ),
    placeholder: localized,
  });
}

export const fillBlanksWithText_Config_Schema = createFillBlanksWithTextSchema('config');
export type Question_FillBlanksWithText_Config = z.infer<typeof fillBlanksWithText_Config_Schema>;

export const fillBlanksWithText_Props_Schema = createFillBlanksWithTextSchema('props');
export type Question_FillBlanksWithText_Props = z.infer<typeof fillBlanksWithText_Props_Schema>;
