'use client';

import Link from 'next/link';
import { createLessonLearningLayout } from '@svitlo/ui-kit/learning-layout';
import { useColorScheme } from '@mui/material/styles';
import { useLessonLocale } from '@/i18n/useLessonLocale';

/** Next.js hooks/providers stay app-owned; the UI Kit owns all layout behavior. */
const LessonLearningLayout = createLessonLearningLayout({
  useLocale: useLessonLocale,
  useColorScheme,
  linkComponent: Link,
});

export default LessonLearningLayout;
