'use client';

import { createContext, useContext } from 'react';
import type { LessonActions } from './LessonController';

/** Optional for content blocks that can also render outside a LessonController (e.g. Storybook). */
export const LessonOperationsContext = createContext<LessonActions | null>(null);

export function useOptionalLessonActions(): LessonActions | null {
  return useContext(LessonOperationsContext);
}
