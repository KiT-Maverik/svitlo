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

export const Youtube = ({ href, mode, title, hint, fallback: fallbackMessages, locale }: ContentBlock_Youtube_Response) => {
  const online = useSyncExternalStore(subscribeConnectionChange, getConnectionSnapshot, getServerConnectionSnapshot);
  const playerHost = useRef<HTMLDivElement>(null);
  const [failedHref, setFailedHref] = useState<string | null>(null);
  const unavailable = mode === 'embed' && failedHref === href;
  const attributes = localizedAttributes({ locale });
  const label = title || hint || href;

  if (mode === 'link') youtubeVideoId(href);
  else {
    youtubeEmbedUrl(href);
    if (!title && !hint) throw new Error('Embedded YouTube blocks require an accessible title or hint');
  }

  useEffect(() => {
    if (mode !== 'embed' || online !== true || unavailable) return;
    const host = playerHost.current;
    if (!host) return;

    let active = true;
    let player: YoutubePlayer | undefined;
    const iframe = createYoutubeIframe(href, label);
    host.replaceChildren(iframe);
    const timeout = window.setTimeout(() => {
      if (active) setFailedHref(href);
    }, 20_000);

    loadYoutubeApi().then(api => {
      if (!active) return;
      player = new api.Player(iframe, {
        events: {
          onReady: () => window.clearTimeout(timeout),
          onError: () => {
            window.clearTimeout(timeout);
            if (active) setFailedHref(href);
          },
        },
      });
    }).catch(() => {
      if (active) setFailedHref(href);
    });

    return () => {
      active = false;
      window.clearTimeout(timeout);
      player?.destroy();
      host.replaceChildren();
    };
  }, [href, mode, label, online, unavailable]);

  const fallbackKind: FallbackKind | null = online === null ? 'loading' : !online ? 'offline' : unavailable ? 'unavailable' : null;
  const fallbackText = fallbackKind === 'loading'
    ? youtubeFallbackText(locale.code, 'loading')
    : fallbackKind
      ? fallbackMessages?.[fallbackKind] || youtubeFallbackText(locale.code, fallbackKind)
      : null;
  const fallback = fallbackKind && (
    <div key="fallback" className={styles.placeholder} role="status">
      <strong>{label}</strong>
      <span>{fallbackText}</span>
      {fallbackKind === 'unavailable' && (
        <button type="button" onClick={() => setFailedHref(null)}>
          {fallbackMessages?.retry || youtubeFallbackText(locale.code, 'retry')}
        </button>
      )}
    </div>
  );

  if (mode === 'link') {
    return fallbackKind ? (
      <div {...attributes} className={styles.linkFallback}>{fallback}</div>
    ) : (
      <a {...attributes} href={href} rel="noopener noreferrer" target="_blank">
        {label}
      </a>
    );
  }

  return (
    <figure {...attributes} className={styles.figure}>
      {fallback || <div key="player" ref={playerHost} className={styles.player} />}
      {hint && <figcaption>{hint}</figcaption>}
    </figure>
  );
};
