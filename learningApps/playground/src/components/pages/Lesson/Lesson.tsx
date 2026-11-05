'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useColorScheme } from '@mui/material/styles';
import type { Locale } from '@svitlo/engine/localization';
import type { UiKit_Global } from '@svitlo/ui-kit';
import { Lesson, useLessonNavigation } from '@svitlo/ui-kit/lesson';
import { createLessonLearningLayout } from '@svitlo/ui-kit/learning-layout';
import { resolveScene } from '@/components/scenes/sceneLoader';
import { useLessonLocale } from '@/i18n/useLessonLocale';
import type { LessonResponse } from '@/lib/lessons/assembleLessonResponse';

/** Next.js bindings and textbook-owned scene registry: no reusable UI lives here. */
const Layout = createLessonLearningLayout({
  usePathname,
  useLessonNavigation,
  useLocale: useLessonLocale,
  useColorScheme,
  linkComponent: Link,
});

export default function PlaygroundLesson({ response, locale: _locale, href, messages }: {
  response: LessonResponse;
  locale: Locale;
  href: string;
  messages: UiKit_Global<'response'>;
}) {
  return <Lesson response={response} href={href} messages={messages}
    layout={Layout} sceneRegistry={resolveScene} />;
}
