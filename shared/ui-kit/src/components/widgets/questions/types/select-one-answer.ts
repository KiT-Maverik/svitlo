import type { BaseQuestion, Item } from './base';
export interface SelectOneAnswerQuestion extends BaseQuestion {
  type: 'single-select';
  options: Item[];
  correctId: string;
  /** Additional accepted options when a response has more than one correct entry. */
  acceptedIds?: string[];
}
