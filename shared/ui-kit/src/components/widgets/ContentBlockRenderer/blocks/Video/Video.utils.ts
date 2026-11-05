export type VideoFailureKind = 'offline' | 'unavailable' | 'playbackError';

/** A video can be cached while offline, so connection state matters only after loading fails. */
export function classifyVideoError(error: MediaError | null, online: boolean): VideoFailureKind | null {
  if (error?.code === 1) return null;
  if (error?.code === 3) return 'playbackError';
  if (!online) return 'offline';
  if (error?.code === 4) return 'unavailable';
  return 'playbackError';
}

