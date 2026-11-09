import { z } from 'zod';

import { createQuestionFields, questionBlockSwitch, questionLocalizationSwitch } from '../question.schemas';

function createMatchBlocksSchema<Mode extends keyof typeof questionBlockSwitch>(mode: Mode) {
  const child = questionBlockSwitch[mode];

  return z.strictObject({
    ...createQuestionFields('matchBlocks', mode),
    pairs: z.record(z.string(), z.strictObject({ left: child, right: child })),
  });
}

export const matchBlocks_Config_Schema = createMatchBlocksSchema('config');
export type Question_MatchBlocks_Config = z.infer<typeof matchBlocks_Config_Schema>;

export const matchBlocks_Props_Schema = createMatchBlocksSchema('props');
export type Question_MatchBlocks_Props = z.infer<typeof matchBlocks_Props_Schema>;
