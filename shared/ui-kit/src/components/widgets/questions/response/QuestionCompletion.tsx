'use client';

import { createContext } from 'react';

import type { QuizSection_Data } from '@svitlo/engine/runtime';

/** Coordinates assessment status, feedback and retry policies across Question widgets. */
export const QuestionCompletionContext = createContext<{
  markChecked(id: string, correct: boolean): void;
  markUnchecked(id: string): void;
  parameters?: QuizSection_Data['params'];
  revealFeedback?: boolean;
  locked?: boolean;
}>({
  markChecked: () => {},
  markUnchecked: () => {},
});
