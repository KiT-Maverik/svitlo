const YOUTUBE_API_URL = 'https://www.youtube.com/iframe_api';
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

export function validateYoutubeUrl(href: string): URL {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    throw new Error('Invalid YouTube URL');
  }
  if (url.protocol !== 'https:') throw new Error('YouTube URL must use HTTPS');
  const allowed = ['youtu.be', 'youtube.com', 'www.youtube.com', 'm.youtube.com', 'www.youtube-nocookie.com'];
  if (!allowed.includes(url.hostname.toLowerCase())) throw new Error('URL is not a supported YouTube host');
  return url;
}

export function youtubeVideoId(href: string): string {
  const url = validateYoutubeUrl(href);
  const host = url.hostname.toLowerCase();
  let id: string | undefined;
  if (host === 'youtu.be') id = url.pathname.slice(1);
  else if (url.pathname === '/watch') id = url.searchParams.get('v') ?? undefined;
  else if (url.pathname.startsWith('/embed/')) id = url.pathname.slice('/embed/'.length);
  else if (url.pathname.startsWith('/shorts/')) id = url.pathname.slice('/shorts/'.length);
  if (!id || !VIDEO_ID.test(id)) throw new Error('Unsupported YouTube video identifier');
  return id;
}

export function youtubeEmbedUrl(href: string): string {
  return 'https://www.youtube-nocookie.com/embed/' + youtubeVideoId(href);
}

export function createYoutubeIframe(href: string, title: string): HTMLIFrameElement {
  const url = new URL(youtubeEmbedUrl(href));
  url.searchParams.set('enablejsapi', '1');
  if (window.location.origin.startsWith('http')) url.searchParams.set('origin', window.location.origin);

  const iframe = document.createElement('iframe');
  iframe.src = url.href;
  iframe.title = title;
  iframe.loading = 'eager';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  return iframe;
}

export interface YoutubePlayer {
  destroy(): void;
}

export interface YoutubeApi {
  Player: new (
    iframe: HTMLIFrameElement,
    options: {
      events: {
        onReady: () => void;
        onError: (event: { data: number }) => void;
      };
    },
  ) => YoutubePlayer;
}

declare global {
  interface Window {
    YT?: YoutubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YoutubeApi> | undefined;

/** One script and one readiness promise are shared by every YouTube block on the page. */
export function loadYoutubeApi(): Promise<YoutubeApi> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YoutubeApi>((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${YOUTUBE_API_URL}"]`);
    const script = existingScript ?? document.createElement('script');
    const timer = window.setTimeout(() => fail(new Error('YouTube player did not load')), 12_000);

    function cleanup() {
      window.clearTimeout(timer);
      script.removeEventListener('error', onError);
      if (window.onYouTubeIframeAPIReady === onReady) window.onYouTubeIframeAPIReady = previousReady;
    }
    function fail(error: Error) {
      cleanup();
      if (!existingScript) script.remove();
      reject(error);
    }
    function onError() {
      fail(new Error('YouTube player script failed to load'));
    }
    function onReady() {
      previousReady?.();
      const api = window.YT;
      if (!api?.Player) return fail(new Error('YouTube player API is unavailable'));
      cleanup();
      resolve(api);
    }

    window.onYouTubeIframeAPIReady = onReady;
    script.addEventListener('error', onError);
    if (!existingScript) {
      script.src = YOUTUBE_API_URL;
      script.async = true;
      document.head.append(script);
    }
  }).catch(error => {
    apiPromise = undefined;
    throw error;
  });

  return apiPromise;
}

export function subscribeConnectionChange(listener: () => void): () => void {
  window.addEventListener('online', listener);
  window.addEventListener('offline', listener);
  return () => {
    window.removeEventListener('online', listener);
    window.removeEventListener('offline', listener);
  };
}

export const getConnectionSnapshot = () => navigator.onLine;
export const getServerConnectionSnapshot = (): null => null;
