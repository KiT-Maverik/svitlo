'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useColorScheme } from '@mui/material/styles';
import { createLessonLearningLayout } from '@svitlo/ui-kit/learning-layout';
import { useLessonNavigation } from '@/components/pages/Lesson/LessonNavigation';
import { useLessonLocale } from '@/i18n/useLessonLocale';

/** Next.js hooks/providers stay app-owned; the UI Kit owns all layout behavior. */
const LessonLearningLayout = createLessonLearningLayout({
  usePathname,
  useLessonNavigation,
  useLocale: useLessonLocale,
  useColorScheme,
  linkComponent: Link,
});

export default LessonLearningLayout;
