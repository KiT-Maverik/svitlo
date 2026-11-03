'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import type { ContentBlock_Youtube_Response } from '@svitlo/engine/content';
import { localizedAttributes } from '../../utils';
import {
  createYoutubeIframe,
  getConnectionSnapshot,
  getServerConnectionSnapshot,
  loadYoutubeApi,
  subscribeConnectionChange,
  youtubeEmbedUrl,
  youtubeFallbackText,
  youtubeVideoId,
  type YoutubePlayer,
} from './Youtube.utils';
import styles from './Youtube.module.css';

type FallbackKind = 'loading' | 'offline' | 'unavailable';

export const ContentBlock_Youtube = ({ response }: { response: ContentBlock_Youtube_Response }) => {
  const online = useSyncExternalStore(subscribeConnectionChange, getConnectionSnapshot, getServerConnectionSnapshot);
  const playerHost = useRef<HTMLDivElement>(null);
  const [failedHref, setFailedHref] = useState<string | null>(null);
  const unavailable = response.mode === 'embed' && failedHref === response.href;
  const attributes = localizedAttributes(response);
  const label = response.title || response.hint || response.href;

  if (response.mode === 'link') youtubeVideoId(response.href);
  else {
    youtubeEmbedUrl(response.href);
    if (!response.title && !response.hint) throw new Error('Embedded YouTube blocks require an accessible title or hint');
  }

  useEffect(() => {
    if (response.mode !== 'embed' || online !== true || unavailable) return;
    const host = playerHost.current;
    if (!host) return;

    let active = true;
    let player: YoutubePlayer | undefined;
    const iframe = createYoutubeIframe(response.href, label);
    host.replaceChildren(iframe);
    const timeout = window.setTimeout(() => {
      if (active) setFailedHref(response.href);
    }, 20_000);

    loadYoutubeApi().then(api => {
      if (!active) return;
      player = new api.Player(iframe, {
        events: {
          onReady: () => window.clearTimeout(timeout),
          onError: () => {
            window.clearTimeout(timeout);
            if (active) setFailedHref(response.href);
          },
        },
      });
    }).catch(() => {
      if (active) setFailedHref(response.href);
    });

    return () => {
      active = false;
      window.clearTimeout(timeout);
      player?.destroy();
      host.replaceChildren();
    };
  }, [response.href, response.mode, label, online, unavailable]);

  const fallbackKind: FallbackKind | null = online === null ? 'loading' : !online ? 'offline' : unavailable ? 'unavailable' : null;
  const fallbackText = fallbackKind === 'loading'
    ? youtubeFallbackText(response.locale.code, 'loading')
    : fallbackKind
      ? response.fallback?.[fallbackKind] || youtubeFallbackText(response.locale.code, fallbackKind)
      : null;
  const fallback = fallbackKind && (
    <div key="fallback" className={styles.placeholder} role="status">
      <strong>{label}</strong>
      <span>{fallbackText}</span>
      {fallbackKind === 'unavailable' && (
        <button type="button" onClick={() => setFailedHref(null)}>
          {response.fallback?.retry || youtubeFallbackText(response.locale.code, 'retry')}
        </button>
      )}
    </div>
  );

  if (response.mode === 'link') {
    return fallbackKind ? (
      <div {...attributes} className={styles.linkFallback}>{fallback}</div>
    ) : (
      <a {...attributes} href={response.href} rel="noopener noreferrer" target="_blank">
        {label}
      </a>
    );
  }

  return (
    <figure {...attributes} className={styles.figure}>
      {fallback || <div key="player" ref={playerHost} className={styles.player} />}
      {response.hint && <figcaption>{response.hint}</figcaption>}
    </figure>
  );
};
