import type { ContentBlockResponse } from '../../types';
import { localizedAttributes } from '../../utils';

function validateYoutubeUrl(href: string): URL {
  let url: URL;
  try { url = new URL(href); }
  catch { throw new Error('Invalid YouTube URL'); }
  if (url.protocol !== 'https:') throw new Error('YouTube URL must use HTTPS');
  const allowed = ['youtu.be', 'youtube.com', 'www.youtube.com', 'm.youtube.com', 'www.youtube-nocookie.com'];
  if (!allowed.includes(url.hostname.toLowerCase())) throw new Error('URL is not a supported YouTube host');
  return url;
}

function youtubeEmbedUrl(href: string): string {
  const url = validateYoutubeUrl(href);
  const host = url.hostname.toLowerCase();
  let id: string | undefined;
  if (host === 'youtu.be') id = url.pathname.slice(1);
  else if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com' || host === 'www.youtube-nocookie.com') {
    if (url.pathname === '/watch') id = url.searchParams.get('v') ?? undefined;
    else if (url.pathname.startsWith('/embed/')) id = url.pathname.slice('/embed/'.length);
    else if (url.pathname.startsWith('/shorts/')) id = url.pathname.slice('/shorts/'.length);
  }
  if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) throw new Error('Unsupported YouTube video identifier');
  return 'https://www.youtube-nocookie.com/embed/' + id;
}

export const ContentBlock_Youtube = ({ response }: { response: ContentBlockResponse<'youtube'> }) => {
  const attributes = localizedAttributes(response);
  if (response.mode === 'link') {
    validateYoutubeUrl(response.href);
    return (
      <a {...attributes} href={response.href} rel="noopener noreferrer" target="_blank">
        {response.title || response.hint || response.href}
      </a>
    );
  }
  if (response.mode === 'embed') {
    const url = youtubeEmbedUrl(response.href);
    if (!response.title && !response.hint) throw new Error('Embedded YouTube blocks require an accessible title or hint');
    return (
      <figure {...attributes}>
        <iframe
          src={url}
          title={response.title || response.hint}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
        {response.hint && <figcaption>{response.hint}</figcaption>}
      </figure>
    );
  }
  throw new Error('Unsupported YouTube display mode');
};
