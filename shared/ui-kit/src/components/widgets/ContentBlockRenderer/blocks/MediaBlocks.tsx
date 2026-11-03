import type { ContentBlockResponse } from '../types';
import { localizedAttributes } from '../utils';

export function AudioBlock({ response }: { response: ContentBlockResponse<'audio'> }) {
  return (
    <figure {...localizedAttributes(response)}>
      <audio controls src={response.fileLocation} aria-label={response.title} preload="metadata" />
      {response.description && <figcaption>{response.description}</figcaption>}
    </figure>
  );
}

export function VideoBlock({ response }: { response: ContentBlockResponse<'video'> }) {
  return (
    <video {...localizedAttributes(response)} controls src={response.fileLocation}
      poster={response.poster} preload="metadata" playsInline />
  );
}

export function ImageBlock({ response }: { response: ContentBlockResponse<'image'> }) {
  return <img {...localizedAttributes(response)} src={response.src} alt={response.alt} loading="lazy" />;
}
