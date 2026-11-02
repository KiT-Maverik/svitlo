import type { Disability } from '../../disabilities.types';
import type { AssessmentMethodKey } from '../assessmentMethod.types';
import type { Locale_ResponseParams } from '../locale.types';

export type Question_Type =
  | 'selectOneAnswer'
  | 'selectMultipleAnswers'
  | 'matchBlocks'
  | 'answerWithText'
  | 'answerWithNumber'
  | 'orderSequence'
  | 'buildAnswerWithBlocks'
  | 'fillBlanksWithBlocks'
  | 'fillBlanksWithText';

export type Question_Definition_Meta<Type extends Question_Type> = {
  type: Type;
};

export type Question_Data_Meta<Type extends Question_Type> = {
  id: string;
  slug: string;
  type: Type;
  assessmentMethod: AssessmentMethodKey;
  restrictions: Disability[];
};

export type Question_Response_Meta<Type extends Question_Type> = Locale_ResponseParams & {
  id: string;
  type: Type;
  assessmentMethod: AssessmentMethodKey;
  restrictions: Disability[];
};
