'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Locale } from '@svitlo/engine/localization';
import type { UiKitMessages } from '@svitlo/ui-kit';
import { Lesson } from '@svitlo/ui-kit/lesson';
import { ImageRendererProvider } from '@svitlo/ui-kit/widgets';
import { SceneLocaleProvider } from '@svitlo/ui-kit/scene-locale';
import { NextImageRenderer } from '@svitlo/adapter-nextjs/image';
import { preloadScene, resolveScene } from '@/generated/textbookScenes';
import type { LessonResponse } from '@svitlo/engine/lesson';
import Layout from '@/components/layout/LearningLayout/LearningLayout';

function sceneIds(value: unknown): string[] {
  const ids = new Set<string>();
  function visit(node: unknown) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    const record = node as Record<string, unknown>;
    if (record.type === 'scene' && typeof record.id === 'string') ids.add(record.id);
    Object.values(record).forEach(visit);
  }
  visit(value);
  return [...ids];
}

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
  messages: UiKitMessages;
}) {
  const ids = useMemo(() => sceneIds(response.sections), [response.sections]);
  const requestKey = `${response.id}:${locale}`;
  const [prepared, setPrepared] = useState<{ key: string; ready: boolean }>({ key: requestKey, ready: false });
  const ready = prepared.key === requestKey && prepared.ready;

  useEffect(() => {
    let active = true;
    Promise.all(ids.map(id => preloadScene(id))).then(
      () => {
        if (active) setPrepared({ key: requestKey, ready: true });
      },
      () => {
        if (active) setPrepared({ key: requestKey, ready: true });
      },
    );
    return () => {
      active = false;
    };
  }, [ids, requestKey]);

  return (
    <SceneLocaleProvider locale={locale}>
      <ImageRendererProvider renderer={NextImageRenderer}>
        <Lesson
          response={response}
          href={href}
          messages={messages}
          layout={Layout}
          sceneRegistry={resolveScene}
          contentLoading={!ready}
        />
      </ImageRendererProvider>
    </SceneLocaleProvider>
  );
}
