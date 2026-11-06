import type { NonEmptyArray } from '../misc.types';
import type { Locale_Languages } from './locale.types';
import type { ContentBlock } from './blocks';

/** A Quiz is a Section, never a ContentBlock. Its parameters are also usable by standalone practice. */
export type Quiz_Screen<Mode extends 'data' | 'response', Languages extends Locale_Languages> =
  | { showDefaultContent: true; content?: readonly ContentBlock<Mode, Languages>[] }
  | { showDefaultContent?: false; content: NonEmptyArray<ContentBlock<Mode, Languages>> };

export type Quiz_Parameters<Mode extends 'data' | 'response', Languages extends Locale_Languages> = {
  /** A blocking Quiz must be passed before progressing beyond its Section. Defaults to false. */
  isBlocker?: boolean;
  /** Total time allowed for this Quiz attempt, in seconds. Omit for no time limit. */
  timeLimitSeconds?: number;
  selection: {
    mode: 'all' | 'sample';
    /** Reference Lesson.questions slugs across all supported Question types. Omit to use the whole bank. */
    questionSlugs?: readonly string[];
    /** Required for sample mode. */
    count?: number;
    shuffle?: boolean;
    /** Deterministic realization for published content and resumed attempts. */
    seed?: number;
  };
  layout: { mode: 'stack' | 'stepper'; showProgress?: boolean };
  feedbackMode: 'immediate' | 'after-completion';
  grading?: { mode: 'percentage' | 'points'; successThreshold: number };
  interaction: {
    /** Additional retries permitted on each Question. */
    retries: number;
    showErrors: boolean;
    showCorrectAnswers: boolean;
    allowExplanations: boolean;
    allowDeferring: boolean;
    allowQuestionNavigation: boolean;
    skippable: boolean;
  };
  questionOptions?: {
    selectOneAnswer?: {
      incorrectCount?: number;
      includeDistractors?: boolean;
      shuffleAnswers?: boolean;
      correctVariant?: 'first' | 'random';
    };
  };
  results: { visibility: 'immediate' | 'after-review' | 'hidden'; showScore: boolean };
  screen: {
    starting?: Quiz_Screen<Mode, Languages>;
    ending?: {
      success: Quiz_Screen<Mode, Languages>;
      fail: Quiz_Screen<Mode, Languages>;
      retry?: Quiz_Screen<Mode, Languages>;
    };
  };
};
