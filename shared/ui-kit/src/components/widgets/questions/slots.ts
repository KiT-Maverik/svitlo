import type { FeedbackVisibility } from './feedback';
import type { ReactNode } from 'react';
import type { BoxProps, PaperProps, StackProps } from '@mui/material';
import type { QuestionOf, QuestionType } from './types';
import type { AttemptOptions, AttemptState } from './attempt-model';

export interface QuestionSlotContext<K extends QuestionType> extends Readonly<AttemptState<K>> {
  question: QuestionOf<K>;
  props: Readonly<QuestionAttemptProps<K>>;
  isLocked: boolean;
  canCheck: boolean;
  setAnswer: (answer: AttemptState<K>['answer']) => void;
  check: () => void;
  retry: () => void;
  reset: () => void;
  /** The standard content for this slot, including its behavior and accessibility. */
  children: ReactNode;
  /** Spread on a custom root to retain default semantics and slotProps.root. */
  rootProps: PaperProps;
}
export type QuestionSlot<K extends QuestionType> = (context: QuestionSlotContext<K>) => ReactNode;
export type SlotProps<P, K extends QuestionType> = P | ((context: QuestionSlotContext<K>) => P);
export interface QuestionSlots<K extends QuestionType> {
  root?: QuestionSlot<K>;
  question?: QuestionSlot<K>;
  answers?: QuestionSlot<K>;
  actions?: QuestionSlot<K>;
}
export interface QuestionSlotProps<K extends QuestionType> {
  root?: SlotProps<PaperProps, K>;
  question?: SlotProps<BoxProps, K>;
  answers?: SlotProps<BoxProps, K>;
  actions?: SlotProps<StackProps, K>;
}
export interface QuestionAttemptOptions<K extends QuestionType> extends AttemptOptions<K>, FeedbackVisibility {
  explanationContent?: ReactNode;
  showLetters?: boolean;
  /** Optional content for the three regions of the shared actions panel. */
  actionSlots?: { left?: QuestionSlot<K>; center?: QuestionSlot<K>; right?: QuestionSlot<K> };
  showResult?: boolean;
  showExplanation?: boolean;
  slots?: QuestionSlots<K>;
  slotProps?: QuestionSlotProps<K>;
}
export type QuestionAttemptProps<K extends QuestionType> = { question: QuestionOf<K> } & QuestionAttemptOptions<
  NoInfer<K>
>;
