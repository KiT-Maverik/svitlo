'use client';

import type { Locale } from '@svitlo/engine/localization';
import type { UiKit_Global } from '@svitlo/ui-kit';
import { Lesson } from '@svitlo/ui-kit/lesson';
import { ImageRendererProvider } from '@svitlo/ui-kit/widgets';
import { SceneLocaleProvider } from '@svitlo/ui-kit/scene-locale';
import { NextImageRenderer } from '@svitlo/nextjs-adapter/image';
import { resolveScene } from '@/generated/textbook';
import type { LessonResponse } from '@svitlo/engine/lesson';
import Layout from '@/components/layout/LearningLayout/LearningLayout';

/** Next.js bindings and textbook-owned scene registry: no reusable UI lives here. */
export default function WebLesson({
  response,
  locale,
  href,
  messages,
}: {
  response: LessonResponse;
  locale: Locale;
  href: string;
  messages: UiKit_Global<'response'>;
}) {
  return (
    <SceneLocaleProvider locale={locale}>
      <ImageRendererProvider renderer={NextImageRenderer}>
        <Lesson response={response} href={href} messages={messages} layout={Layout} sceneRegistry={resolveScene} />
      </ImageRendererProvider>
    </SceneLocaleProvider>
  );
}
