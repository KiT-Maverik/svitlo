'use client';

import { useEffect, useMemo, useState } from 'react';

import { NextImageRenderer } from '@svitlo/adapter-nextjs';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';
import { Episode, ImageRendererProvider, SceneLocaleProvider, type EpisodeProps } from '@svitlo/ui-kit';

import { preloadScene, resolveScene } from '@/generated/textbookScenes';

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

export default function WebEpisode(props: Omit<EpisodeProps, 'sceneRegistry'>) {
  const descriptor = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === props.language);
  const ids = useMemo(() => sceneIds(props.response.section), [props.response.section]);
  const [attempt, setAttempt] = useState(0);
  const key = props.href + ':' + attempt;
  const [status, setStatus] = useState<{ key: string; state: 'ready' | 'error' }>();
  useEffect(() => {
    let active = true;
    Promise.all(ids.map(id => preloadScene(id))).then(
      () => {
        if (active) setStatus({ key, state: 'ready' });
      },
      () => {
        if (active) setStatus({ key, state: 'error' });
      },
    );
    return () => {
      active = false;
    };
  }, [ids, key]);
  if (!descriptor) throw Error('Unsupported Episode locale');
  if (status?.key !== key)
    return (
      <div role="status" aria-busy="true">
        {props.response.locale.title}
      </div>
    );
  if (status.state === 'error')
    return (
      <div role="alert">
        <h1>{props.response.locale.title}</h1>
        <button onClick={() => setAttempt(n => n + 1)}>{props.messages.learningLayout.actions.retry}</button>
        <a href={props.courseHref}>{props.courseTitle}</a>
      </div>
    );
  return (
    <SceneLocaleProvider locale={descriptor.locale}>
      <ImageRendererProvider renderer={NextImageRenderer}>
        <Episode {...props} sceneRegistry={resolveScene} />
      </ImageRendererProvider>
    </SceneLocaleProvider>
  );
}
