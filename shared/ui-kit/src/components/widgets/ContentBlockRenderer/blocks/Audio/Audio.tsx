'use client';

import type { AudioMessages } from '../../../../../../data/locale/audio';

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import type { ContentBlock_Audio_Response } from '@svitlo/engine/content';

import { localizedAttributes } from '../../utils';
import { useContentLanguage } from '../../ContentLanguageContext';
import { classifyAudioError, type AudioFailureKind } from './Audio.utils';
import styles from './Audio.module.css';

type AudioFailure = { source: string; kind: AudioFailureKind };

export const Audio = ({
  fileLocation,
  title,
  description,
  fallback,
  messages,
}: ContentBlock_Audio_Response & {
  messages: AudioMessages;
}) => {
  const contentLanguage = useContentLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [failure, setFailure] = useState<AudioFailure | null>(null);
  const [attempt, setAttempt] = useState(0);
  const failureKind = failure?.source === fileLocation ? failure.kind : null;

  useEffect(() => {
    const kind = classifyAudioError(audioRef.current?.error ?? null, navigator.onLine);
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
  const handleError = (event: SyntheticEvent<HTMLAudioElement>) => {
    const error = event.currentTarget.error;
    const kind =
      classifyAudioError(error, navigator.onLine) ?? (error ? null : navigator.onLine ? 'playbackError' : 'offline');
    if (kind) setFailure({ source: fileLocation, kind });
  };

  return (
    <figure {...localizedAttributes({ locale: { code: contentLanguage } })} className={styles.figure}>
      {failureKind ? (
        <div className={styles.placeholder} role="alert">
          <strong>{title}</strong>
          <span>{fallback?.[failureKind] || messages[failureKind]}</span>
          <Button type="button" variant="outlined" onClick={retry}>
            {fallback?.retry || messages['retry']}
          </Button>
        </div>
      ) : (
        <audio
          key={`${fileLocation}:${attempt}`}
          ref={audioRef}
          className={styles.audio}
          controls
          src={fileLocation}
          preload="metadata"
          aria-label={title}
          onError={handleError}
          onStalled={failIfOffline}
          onWaiting={failIfOffline}
        />
      )}
      {description && <figcaption className={styles.caption}>{description}</figcaption>}
    </figure>
  );
};
