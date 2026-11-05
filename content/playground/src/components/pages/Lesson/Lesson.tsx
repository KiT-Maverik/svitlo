'use client';

import type { Locale } from '@svitlo/engine/localization';
import type { UiKit_Global } from '@svitlo/ui-kit';
import { Lesson } from '@svitlo/ui-kit/lesson';
import { ImageRendererProvider } from '@svitlo/ui-kit/widgets';
import { NextImageRenderer } from '@svitlo/nextjs-adapter/image';
import { resolveScene } from '@/components/scenes/sceneLoader';
import type { LessonResponse } from '@svitlo/engine/lesson';
import Layout from '@/components/layout/LearningLayout/LearningLayout';

/** Next.js bindings and textbook-owned scene registry: no reusable UI lives here. */
export default function PlaygroundLesson({
  response,
  locale: _locale,
  href,
  messages,
}: {
  response: LessonResponse;
  locale: Locale;
  href: string;
  messages: UiKit_Global<'response'>;
}) {
  return (
    <ImageRendererProvider renderer={NextImageRenderer}>
      <Lesson response={response} href={href} messages={messages} layout={Layout} sceneRegistry={resolveScene} />
    </ImageRendererProvider>
  );
}
