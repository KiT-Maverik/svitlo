'use client';

import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_SUPPORTED_LANGUAGES, createAssessmentResourceLoader } from '@svitlo/engine/runtime';
import { Assessment, ImageRendererProvider, SceneLocaleProvider, type AssessmentProps } from '@svitlo/ui-kit';
import { NextImageRenderer } from '@svitlo/adapter-nextjs';
import { preloadScene, resolveScene } from '@/generated/textbookScenes';

function sceneIds(value: unknown): string[] {
  const ids = new Set<string>();
  function visit(node: unknown) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) return void node.forEach(visit);
    const record = node as Record<string, unknown>;
    if (record.type === 'scene' && typeof record.id === 'string') ids.add(record.id);
    Object.values(record).forEach(visit);
  }
  visit(value);
  return [...ids];
}

/** The Web host injects the same published Question loader as Lesson pages. */
export default function WebAssessment(props: Omit<AssessmentProps, 'sceneRegistry' | 'assessmentLoader'>) {
  const descriptor = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === props.language);
  const ids = useMemo(() => sceneIds(props.response.section), [props.response.section]);
  const assessmentLoader = useMemo(
    () =>
      createAssessmentResourceLoader(async (paths, signal) => {
        const entries = await Promise.all(
          paths.map(async path => {
            const result = await fetch('/' + path, { signal });
            if (!result.ok) throw new Error('Failed to load assessment resource: ' + path);
            return [path, await result.json()] as const;
          }),
        );
        return new Map(entries);
      }),
    [],
  );
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
  if (!descriptor) throw Error('Unsupported Assessment locale');
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
        <Assessment {...props} sceneRegistry={resolveScene} assessmentLoader={assessmentLoader} />
      </ImageRendererProvider>
    </SceneLocaleProvider>
  );
}
