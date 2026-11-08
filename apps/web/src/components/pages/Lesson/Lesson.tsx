'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Locale } from '@svitlo/contracts/localization';
import { type UiKitMessages, type Topic, Lesson, ImageRendererProvider, SceneLocaleProvider } from '@svitlo/ui-kit';
import { NextImageRenderer } from '@svitlo/adapter-nextjs';
import { preloadScene, resolveScene } from '@/generated/textbookScenes';
import type { LessonResponse } from '@svitlo/engine';
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
  lessonLocale,
  href,
  messages,
  topics,
}: {
  response: LessonResponse;
  locale: Locale;
  lessonLocale?: Locale;
  href: string;
  messages: UiKitMessages;
  topics?: readonly Topic[];
}) {
  const contentLocale = lessonLocale ?? locale;
  const ids = useMemo(() => sceneIds([response.sections, response.events]), [response.sections, response.events]);
  const requestKey = `${href}:${response.id}:${contentLocale}`;
  const [prepared, setPrepared] = useState<{
    key: string;
    status: 'loading' | 'ready' | 'error';
    attempt: number;
  }>({ key: requestKey, status: 'loading', attempt: 0 });
  const current = prepared.key === requestKey ? prepared : { status: 'loading' as const, attempt: 0 };
  const retry = () => {
    setPrepared(previous => ({
      key: requestKey,
      status: 'loading',
      attempt: previous.key === requestKey ? previous.attempt + 1 : 1,
    }));
  };

  useEffect(() => {
    let active = true;
    Promise.all(ids.map(id => preloadScene(id))).then(
      () => {
        if (active) setPrepared({ key: requestKey, status: 'ready', attempt: current.attempt });
      },
      () => {
        if (active) setPrepared({ key: requestKey, status: 'error', attempt: current.attempt });
      },
    );
    return () => {
      active = false;
    };
  }, [ids, requestKey, current.attempt]);

  return (
    <SceneLocaleProvider locale={contentLocale}>
      <ImageRendererProvider renderer={NextImageRenderer}>
        <Lesson
          response={response}
          href={href}
          messages={messages}
          topics={topics}
          layout={Layout}
          sceneRegistry={resolveScene}
          contentLoading={current.status !== 'ready'}
          contentError={current.status === 'error'}
          onRetryContent={retry}
        />
      </ImageRendererProvider>
    </SceneLocaleProvider>
  );
}
