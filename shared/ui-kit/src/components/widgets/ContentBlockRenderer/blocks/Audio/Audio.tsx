'use client';

import type { Audio_Locale } from '../../../../../../data/locale/audio';

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import VolumeOffRounded from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import type { ContentBlock_Audio_Response } from '@svitlo/engine/content';

import { Flag } from '../../../Flag/Flag';
import { localizedAttributes } from '../../utils';
import { useContentLanguage } from '../../ContentLanguageContext';
import { classifyAudioError, formatAudioTime, type AudioFailureKind } from './Audio.utils';
import styles from './Audio.module.css';

type AudioFailure = { source: string; kind: AudioFailureKind };

// A lightweight, decorative waveform: it needs no extra media download or audio decoding.
// The seek slider (not the visual bars) is the accessible source of playback progress.
const WAVEFORM_HEIGHTS = Array.from({ length: 72 }, (_, index) => {
  const envelope = 0.3 + 0.7 * Math.abs(Math.sin(index * 0.18 + 0.4) * Math.cos(index * 0.065 + 0.8));
  const texture = 0.35 + 0.65 * Math.abs(Math.sin(index * 1.37 + 0.5));
  return Math.round(12 + envelope * texture * 88);
});
const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;

export const Audio = ({
  fileLocation,
  title,
  description,
  fallback,
  messages,
}: ContentBlock_Audio_Response & {
  messages: Audio_Locale;
}) => {
  const contentLanguage = useContentLanguage();
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === contentLanguage);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [failure, setFailure] = useState<AudioFailure | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const failureKind = failure?.source === fileLocation ? failure.kind : null;

  useEffect(() => {
    setPosition(0);
    setDuration(0);
    setPlaying(false);
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
  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setFailure({ source: fileLocation, kind: navigator.onLine ? 'playbackError' : 'offline' });
    }
  };
  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(duration) || duration <= 0) return;
    const nextPosition = Math.min(duration, Math.max(0, value));
    audio.currentTime = nextPosition;
    setPosition(nextPosition);
  };
  const updateVolume = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value;
    audio.muted = false;
    setVolume(value);
    setMuted(false);
  };
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };
  const changeSpeed = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = value;
    setSpeed(value);
  };
  const syncDuration = (event: SyntheticEvent<HTMLAudioElement>) => {
    const nextDuration = event.currentTarget.duration;
    setDuration(Number.isFinite(nextDuration) && nextDuration > 0 ? nextDuration : 0);
  };
  const progress = duration > 0 ? Math.min(1, Math.max(0, position / duration)) : 0;

  return (
    <figure {...localizedAttributes({ locale: { code: contentLanguage } })} className={styles.figure}>
      {failureKind ? (
        <div className={styles.placeholder} role="alert">
          {title && <strong>{title}</strong>}
          <span>{fallback?.[failureKind] || messages[failureKind]}</span>
          <Button type="button" variant="outlined" onClick={retry}>
            {fallback?.retry || messages.retry}
          </Button>
        </div>
      ) : (
        <div className={styles.player}>
          <audio
            key={`${fileLocation}:${attempt}`}
            ref={audioRef}
            className={styles.nativeAudio}
            src={fileLocation}
            preload="metadata"
            aria-label={title}
            onError={handleError}
            onStalled={failIfOffline}
            onWaiting={failIfOffline}
            onLoadedMetadata={syncDuration}
            onDurationChange={syncDuration}
            onTimeUpdate={event => setPosition(event.currentTarget.currentTime)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onVolumeChange={event => {
              setVolume(event.currentTarget.volume);
              setMuted(event.currentTarget.muted);
            }}
            onRateChange={event => setSpeed(event.currentTarget.playbackRate)}
          />

          <IconButton
            type="button"
            className={styles.playButton}
            aria-label={playing ? messages.pause : messages.play}
            onClick={() => void togglePlayback()}
          >
            {playing ? <PauseRounded fontSize="large" /> : <PlayArrowRounded fontSize="large" />}
          </IconButton>

          <div className={styles.content}>
            <div className={styles.waveformRow}>
              <div className={styles.timeline}>
                <div className={styles.bars} aria-hidden="true">
                  {WAVEFORM_HEIGHTS.map((height, index) => (
                    <span
                      key={index}
                      className={index / WAVEFORM_HEIGHTS.length < progress ? styles.playedBar : styles.bar}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <input
                  className={styles.seekInput}
                  type="range"
                  min={0}
                  max={duration || 1}
                  step="0.1"
                  value={Math.min(position, duration || 0)}
                  disabled={duration <= 0}
                  onChange={event => seek(Number(event.target.value))}
                  aria-label={messages.seek}
                  aria-valuetext={`${formatAudioTime(position)} / ${formatAudioTime(duration)}`}
                />
              </div>
              {language && (
                <span className={styles.language} title={language.nativeName} aria-label={language.nativeName}>
                  <Flag locale={language.locale} width={20} height={14} alt="" />
                  <span aria-hidden="true">{contentLanguage.toUpperCase()}</span>
                </span>
              )}
            </div>

            <div className={styles.footer}>
              <span className={styles.time} dir="ltr">
                {formatAudioTime(position)} <span className={styles.timeDivider}>/</span> {formatAudioTime(duration)}
              </span>
              <div className={styles.controls}>
                <div className={styles.volume}>
                  <IconButton
                    type="button"
                    size="small"
                    aria-label={muted || volume === 0 ? messages.unmute : messages.mute}
                    onClick={toggleMute}
                  >
                    {muted || volume === 0 ? <VolumeOffRounded /> : <VolumeUpRounded />}
                  </IconButton>
                  <input
                    type="range"
                    className={styles.volumeInput}
                    min={0}
                    max={1}
                    step={0.05}
                    value={volume}
                    onChange={event => updateVolume(Number(event.target.value))}
                    aria-label={messages.volume}
                  />
                </div>
                <select
                  className={styles.speed}
                  value={speed}
                  onChange={event => changeSpeed(Number(event.target.value))}
                  aria-label={messages.speed}
                >
                  {SPEEDS.map(value => (
                    <option key={value} value={value}>
                      {value}×
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      {description && <figcaption className={styles.caption}>{description}</figcaption>}
    </figure>
  );
};
