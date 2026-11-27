'use client';

import Button from '@mui/material/Button';
import { useEffect, useRef, useState, type SyntheticEvent } from 'react';

import { UNRESOLVED_RESOURCE_UUID, type ContentBlock_Video_Data } from '@svitlo/engine/runtime';

import type { Video_Locale } from '../../../../../../data/locale/video';
import { useOptionalMediaSettings } from '../../../../lesson/MediaSettings';
import { useContentLanguage } from '../../ContentLanguageContext';
import { localizedAttributes, resolveOptionalLocalizedText } from '../../utils';
import styles from './Video.module.css';
import { classifyVideoError, type VideoFailureKind } from './Video.utils';

type VideoFailure = { source: string; kind: VideoFailureKind };

export const Video = ({
  locale: { fileLocation, poster, title, label, fallback },
  messages,
}: ContentBlock_Video_Data & {
  messages: Video_Locale;
}) => {
  const contentLanguage = useContentLanguage();
  const resolvedTitle = resolveOptionalLocalizedText(title, contentLanguage, 'video.title');
  const mediaSettings = useOptionalMediaSettings();
  const volume = mediaSettings?.volume ?? 100;
  const muted = mediaSettings?.muted ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failure, setFailure] = useState<VideoFailure | null>(null);
  const [attempt, setAttempt] = useState(0);
  const pending = fileLocation.includes(UNRESOLVED_RESOURCE_UUID);
  const failureKind = pending ? 'unavailable' : failure?.source === fileLocation ? failure.kind : null;

  // Apply shared settings to the current DOM element, including after a failed source is retried.
  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    element.volume = volume / 100;
    element.muted = muted;
  }, [volume, muted, fileLocation, attempt, failureKind]);

  useEffect(() => {
    const error = videoRef.current?.error;
    if (!error) return;
    const kind = classifyVideoError(error, navigator.onLine);
    if (kind) setFailure({ source: fileLocation, kind });
  }, [fileLocation, attempt]);

  useEffect(() => {
    if (failureKind !== 'offline') return;
    const retryWhenOnline = () => {
      setFailure(null);
      setAttempt(value => value + 1);
    };
    window.addEventListener('online', retryWhenOnline);
    return () => window.removeEventListener('online', retryWhenOnline);
  }, [failureKind]);

  const retry = () => {
    setFailure(null);
    setAttempt(value => value + 1);
  };
  const failIfOffline = () => {
    if (!navigator.onLine) setFailure({ source: fileLocation, kind: 'offline' });
  };
  const handleError = (event: SyntheticEvent<HTMLVideoElement>) => {
    const kind = classifyVideoError(event.currentTarget.error, navigator.onLine);
    if (kind) setFailure({ source: fileLocation, kind });
  };

  return (
    <figure {...localizedAttributes({ locale: { code: contentLanguage } })} className={styles.figure}>
      {failureKind ? (
        <div className={styles.placeholder} role={pending ? 'status' : 'alert'}>
          <strong>{label}</strong>
          <span>
            {resolveOptionalLocalizedText(fallback?.[failureKind], contentLanguage, 'video.fallback.' + failureKind) ??
              messages[failureKind]}
          </span>
          {!pending && (
            <Button type="button" variant="outlined" onClick={retry}>
              {resolveOptionalLocalizedText(fallback?.retry, contentLanguage, 'video.fallback.retry') ?? messages.retry}
            </Button>
          )}
        </div>
      ) : (
        <video
          key={`${fileLocation}:${attempt}`}
          ref={videoRef}
          className={styles.video}
          controls
          src={fileLocation}
          poster={poster?.includes(UNRESOLVED_RESOURCE_UUID) ? undefined : poster}
          preload="metadata"
          playsInline
          aria-label={label}
          onError={handleError}
          onStalled={failIfOffline}
          onWaiting={failIfOffline}
        />
      )}
      {resolvedTitle && <figcaption>{resolvedTitle}</figcaption>}
    </figure>
  );
};
