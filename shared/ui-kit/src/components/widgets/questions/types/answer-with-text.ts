import type { BaseQuestion, TextNormalization } from './base';
export interface AnswerWithTextQuestion extends BaseQuestion {
  type: 'short-text';
  acceptedAnswers: string[];
  placeholder?: string;
  normalization: TextNormalization;
}
