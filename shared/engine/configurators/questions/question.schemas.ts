import { z } from 'zod';
import { assessmentMethods_AssessmentMethod_Ids } from '@svitlo/contracts/content';

import { contentBlockChild } from '../contentBlocks/contentBlockChild/contentBlockChild';
import {
  contentBlockLocalizationSwitch,
  contentBlockResolved_Schema,
} from '../contentBlocks/contentBlock.schemas';

export const questionTypes = [
  'selectOneAnswer',
  'selectMultipleAnswers',
  'matchBlocks',
  'answerWithText',
  'answerWithNumber',
  'orderSequence',
  'buildAnswerWithBlocks',
  'fillBlanksWithBlocks',
  'fillBlanksWithText',
] as const;

export type Question_Type = (typeof questionTypes)[number];

/** Authored Questions hold ContentBlock definitions; published Questions contain resolved props. */
export const questionBlockSwitch = {
  config: contentBlockChild(),
  props: contentBlockResolved_Schema,
} as const;

export const questionLocalizationSwitch = contentBlockLocalizationSwitch;

const assessmentMethods = Object.keys(assessmentMethods_AssessmentMethod_Ids) as [
  keyof typeof assessmentMethods_AssessmentMethod_Ids,
  ...(keyof typeof assessmentMethods_AssessmentMethod_Ids)[],
];

export function createQuestionFields<
  const Kind extends Question_Type,
  Mode extends keyof typeof questionBlockSwitch,
>(kind: Kind, mode: Mode) {
  const child = questionBlockSwitch[mode];

  return {
    id: z.uuid(),
    slug: z.string().min(1),
    type: z.literal(kind),
    assessmentMethod: z.enum(assessmentMethods),
    restrictions: z.array(z.string()),
    question: z.tuple([child], child),
    hint: z.tuple([child], child).optional(),
    explanation: z.tuple([child], child).optional(),
  };
}
