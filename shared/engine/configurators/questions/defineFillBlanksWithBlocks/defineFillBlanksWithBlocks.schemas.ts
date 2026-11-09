import { z } from 'zod';

import { createQuestionFields, questionBlockSwitch, questionLocalizationSwitch } from '../question.schemas';

function createFillBlanksWithBlocksSchema<Mode extends keyof typeof questionBlockSwitch>(mode: Mode) {
  const child = questionBlockSwitch[mode];
  const localized = questionLocalizationSwitch[mode];

  return z.strictObject({
    ...createQuestionFields('fillBlanksWithBlocks', mode),
    slots: z.array(z.strictObject({ selector: z.string(), correctAnswer: child })),
    distractors: z.array(child),
    placeholder: localized,
  });
}

export const fillBlanksWithBlocks_Config_Schema = createFillBlanksWithBlocksSchema('config');
export type Question_FillBlanksWithBlocks_Config = z.infer<typeof fillBlanksWithBlocks_Config_Schema>;

export const fillBlanksWithBlocks_Props_Schema = createFillBlanksWithBlocksSchema('props');
export type Question_FillBlanksWithBlocks_Props = z.infer<typeof fillBlanksWithBlocks_Props_Schema>;
