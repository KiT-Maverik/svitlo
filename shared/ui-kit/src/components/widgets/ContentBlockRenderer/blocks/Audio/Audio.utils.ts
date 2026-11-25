export type AudioFailureKind = 'offline' | 'unavailable' | 'playbackError';

/** Try a cached file first; classify the failure only when loading or playback fails. */
export function classifyAudioError(error: MediaError | null, online: boolean): AudioFailureKind | null {
  if (!error || error.code === 1) return null;
  if (error.code === 3) return 'playbackError';
  if (!online) return 'offline';
  if (error.code === 4) return 'unavailable';
  return 'playbackError';
}

/** Display stable player timestamps without depending on browser locale or media metadata. */
export function formatAudioTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const whole = Math.floor(seconds);
  const minutes = Math.floor(whole / 60);
  const remainingSeconds = String(whole % 60).padStart(2, '0');
  if (minutes >= 60) {
    return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}:${remainingSeconds}`;
  }
  return `${String(minutes).padStart(2, '0')}:${remainingSeconds}`;
}
