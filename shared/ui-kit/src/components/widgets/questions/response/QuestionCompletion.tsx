'use client';

import { createContext } from 'react';

/** Coordinates completion across contract-based question components. */
export const QuestionCompletionContext = createContext<{
  markChecked(id: string): void;
  markUnchecked(id: string): void;
}>({
  markChecked: () => {},
  markUnchecked: () => {},
});
