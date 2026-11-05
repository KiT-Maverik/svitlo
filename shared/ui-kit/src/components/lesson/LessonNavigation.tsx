'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

export type LessonNavigationAction =
  | { type: 'next' | 'back' | 'skip' | 'testDone' }
  | { type: 'visit'; step: number };

type Navigation = {
  progress: { ready: true; step: number; lastStep: number; testDone: boolean };
  dispatch: (action: LessonNavigationAction) => void;
};

const Context = createContext<Navigation | null>(null);

export function LessonNavigationProvider({ children, sectionCount }: {
  children: ReactNode;
  sectionCount: number;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [testDone, setTestDone] = useState(false);
  const lastStep = sectionCount - 1;
  const dispatch = useCallback((action: LessonNavigationAction) => {
    if (action.type === 'testDone') {
      setTestDone(true);
      return;
    }
    setCurrentStep(step => {
      const target = action.type === 'visit' ? action.step
        : action.type === 'back' ? step - 1 : step + 1;
      return Number.isInteger(target) && target >= 0 && target <= lastStep ? target : step;
    });
  }, [lastStep]);

  return <Context.Provider value={{
    progress: { ready: true, step: currentStep, lastStep, testDone },
    dispatch,
  }}>{children}</Context.Provider>;
}

export function useLessonNavigation() {
  const value = useContext(Context);
  if (!value) throw new Error('LessonNavigationProvider is required');
  return value;
}
