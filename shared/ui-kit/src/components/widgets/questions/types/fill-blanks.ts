import type { BaseQuestion, Item, TextNormalization } from './base';

export type FillBlankPart = { type: 'text'; text: string } | { type: 'blank'; id: string };

export interface FillBlanksWithBlocksQuestion extends BaseQuestion {
  type: 'fill-blanks-drag';
  parts: FillBlankPart[];
  blocks: Item[];
  correctBlocks: Record<string, string>;
  placeholder?: string;
}

export interface FillBlanksWithTextQuestion extends BaseQuestion {
  type: 'fill-blanks-text';
  parts: FillBlankPart[];
  acceptedAnswers: Record<string, string[]>;
  normalization: TextNormalization;
  placeholder?: string;
}
