'use client';

import { createContext, useContext } from 'react';

export type LessonNavigationAction =
  | { type: 'next' | 'back' | 'skip' | 'testDone' }
  | { type: 'visit'; step: number }
  | { type: 'restore'; step: number; testDone: boolean };

type Navigation = {
  progress: { ready: boolean; step: number; lastStep: number; testDone: boolean };
  dispatch: (action: LessonNavigationAction) => void;
};

export const LessonNavigationContext = createContext<Navigation | null>(null);
/** Read the navigation state owned and gated by LessonController. */
export function useLessonNavigation() {
  const value = useContext(LessonNavigationContext);
  if (!value) throw new Error('LessonController is required');
  return value;
}
