'use client';

import { createContext } from 'react';
import type { Locale_Languages, Quiz_Parameters } from '@svitlo/engine/content';

/** Coordinates assessment status, feedback and retry policies across Question widgets. */
export const QuestionCompletionContext = createContext<{
  markChecked(id: string, correct: boolean): void;
  markUnchecked(id: string): void;
  parameters?: Quiz_Parameters<'response', Locale_Languages>;
  revealFeedback?: boolean;
  locked?: boolean;
}>({
  markChecked: () => {},
  markUnchecked: () => {},
});
