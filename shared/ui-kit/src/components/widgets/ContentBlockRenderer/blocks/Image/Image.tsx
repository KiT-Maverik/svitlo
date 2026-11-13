'use client';

import type { Image_Locale } from '../../../../../../data/locale/image';

import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';

import type { ContentBlock_Image_Props } from '@svitlo/engine/runtime';

import { localizedAttributes, resolveOptionalLocalizedText } from '../../utils';
import { useContentLanguage } from '../../ContentLanguageContext';
import { imageUnoptimized, type ImageFailureKind } from './Image.utils';
import { useImageRenderer } from './ImageRenderer';
import styles from './Image.module.css';

type ImageFailure = { source: string; kind: ImageFailureKind };

export const Image = (props: ContentBlock_Image_Props & { messages: Image_Locale }) => {
  const { src, alt, caption, fallback } = props.locale;
  const { sizes, unoptimized, fill, aspectRatio, width, height, objectFit } = props.params;
  const { messages } = props;
  const Renderer = useImageRenderer();
  const contentLanguage = useContentLanguage();
  const resolvedCaption = resolveOptionalLocalizedText(caption, contentLanguage, 'image.caption');
  const imageRef = useRef<HTMLImageElement>(null);
  const [failure, setFailure] = useState<ImageFailure | null>(null);
  const [attempt, setAttempt] = useState(0);
  const failureKind = failure?.source === src ? failure.kind : null;
  const onError = () => setFailure({ source: src, kind: navigator.onLine ? 'unavailable' : 'offline' });

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) {
      setFailure({ source: src, kind: navigator.onLine ? 'unavailable' : 'offline' });
    }
  }, [src, attempt]);

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

  return (
    <figure {...localizedAttributes({ locale: { code: contentLanguage } })} className={styles.figure}>
      {failureKind ? (
        <div
          className={styles.placeholder}
          role="alert"
          style={{ aspectRatio: fill ? aspectRatio : `${width} / ${height}` }}
        >
          {alt && <strong>{alt}</strong>}
          <span>{resolveOptionalLocalizedText(fallback?.[failureKind], contentLanguage, 'image.fallback.' + failureKind) ?? messages[failureKind]}</span>
          <Button type="button" variant="outlined" onClick={retry}>
            {resolveOptionalLocalizedText(fallback?.retry, contentLanguage, 'image.fallback.retry') ?? messages.retry}
          </Button>
        </div>
      ) : fill ? (
        <div className={styles.fillFrame} style={{ aspectRatio: aspectRatio }}>
          <Renderer
            key={`${src}:${attempt}`}
            ref={imageRef}
            fill
            unoptimized={imageUnoptimized(src, unoptimized)}
            className={styles.fillImage}
            src={src}
            alt={alt}
            sizes={sizes ?? '100vw'}
            style={{ objectFit: objectFit ?? 'contain', width: '100%', height: '100%' }}
            loading="lazy"
            decoding="async"
            onError={onError}
          />
        </div>
      ) : (
        <Renderer
          key={`${src}:${attempt}`}
          ref={imageRef}
          unoptimized={imageUnoptimized(src, unoptimized)}
          className={styles.image}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes ?? `(max-width: ${width}px) 100vw, ${width}px`}
          loading="lazy"
          decoding="async"
          onError={onError}
        />
      )}
      {resolvedCaption && <figcaption>{resolvedCaption}</figcaption>}
    </figure>
  );
};
