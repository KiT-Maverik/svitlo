'use client';

import type { VideoMessages } from '../../../../../../data/locale/video';

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import type { ContentBlock_Video_Response } from '@svitlo/engine/content';

import { localizedAttributes } from '../../utils';
import { useContentLanguage } from '../../ContentLanguageContext';
import { classifyVideoError, type VideoFailureKind } from './Video.utils';
import styles from './Video.module.css';

type VideoFailure = { source: string; kind: VideoFailureKind };

export const Video = ({
  fileLocation,
  poster,
  title,
  fallback,
  messages,
}: ContentBlock_Video_Response & {
  messages: VideoMessages;
}) => {
  const contentLanguage = useContentLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failure, setFailure] = useState<VideoFailure | null>(null);
  const [attempt, setAttempt] = useState(0);
  const failureKind = failure?.source === fileLocation ? failure.kind : null;

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
        <div className={styles.placeholder} role="alert">
          {title && <strong>{title}</strong>}
          <span>{fallback?.[failureKind] || messages[failureKind]}</span>
          <Button type="button" variant="outlined" onClick={retry}>
            {fallback?.retry || messages['retry']}
          </Button>
        </div>
      ) : (
        <video
          key={`${fileLocation}:${attempt}`}
          ref={videoRef}
          className={styles.video}
          controls
          src={fileLocation}
          poster={poster}
          preload="metadata"
          playsInline
          aria-label={title}
          onError={handleError}
          onStalled={failIfOffline}
          onWaiting={failIfOffline}
        />
      )}
      {title && <figcaption>{title}</figcaption>}
    </figure>
  );
};
