import { z } from 'zod';

import { createQuestionFields, questionBlockSwitch, questionLocalizationSwitch } from '../question.schemas';

function createBuildAnswerWithBlocksSchema<Mode extends keyof typeof questionBlockSwitch>(mode: Mode) {
  const child = questionBlockSwitch[mode];
  const localized = questionLocalizationSwitch[mode];

  return z.strictObject({
    ...createQuestionFields('buildAnswerWithBlocks', mode),
    correctSequence: z.tuple([child], child),
    distractors: z.array(child),
    placeholder: localized,
  });
}

export const buildAnswerWithBlocks_Config_Schema = createBuildAnswerWithBlocksSchema('config');
export type Question_BuildAnswerWithBlocks_Config = z.infer<typeof buildAnswerWithBlocks_Config_Schema>;

export const buildAnswerWithBlocks_Props_Schema = createBuildAnswerWithBlocksSchema('props');
export type Question_BuildAnswerWithBlocks_Props = z.infer<typeof buildAnswerWithBlocks_Props_Schema>;
