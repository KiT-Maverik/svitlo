export type AudioFailureKind = 'offline' | 'unavailable' | 'playbackError';

/** Try a cached file first; classify the failure only when loading or playback fails. */
export function classifyAudioError(error: MediaError | null, online: boolean): AudioFailureKind | null {
  if (!error || error.code === 1) return null;
  if (error.code === 3) return 'playbackError';
  if (!online) return 'offline';
  if (error.code === 4) return 'unavailable';
  return 'playbackError';
}

