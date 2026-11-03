import type { BaseQuestion } from './base';
export interface AnswerWithNumberQuestion extends BaseQuestion {
  type: 'numeric';
  expected: number;
  acceptedNumbers?: number[];
  placeholder?: string;
  tolerance: number;
  unit?: string;
}

// todo
