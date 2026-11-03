'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import NextImage from 'next/image';

import type { ContentBlock_Image_Response } from '@svitlo/engine/content';

import { localizedAttributes } from '../../utils';
import { imageFallbackText, imageUnoptimized, type ImageFailureKind } from './Image.utils';
import styles from './Image.module.css';

type ImageFailure = { source: string; kind: ImageFailureKind };

export const Image = (props: ContentBlock_Image_Response) => {
  const { src, alt, caption, sizes, unoptimized, fallback, locale } = props;
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
    <figure {...localizedAttributes({ locale })} className={styles.figure}>
      {failureKind ? (
        <div className={styles.placeholder} role="alert" style={{ aspectRatio: props.fill ? props.aspectRatio : `${props.width} / ${props.height}` }}>
          {alt && <strong>{alt}</strong>}
          <span>{fallback?.[failureKind] || imageFallbackText(locale.code, failureKind)}</span>
          <Button type="button" variant="outlined" onClick={retry}>
            {fallback?.retry || imageFallbackText(locale.code, 'retry')}
          </Button>
        </div>
      ) : props.fill ? (
        <div className={styles.fillFrame} style={{ aspectRatio: props.aspectRatio }}>
          <NextImage
            key={`${src}:${attempt}`}
            ref={imageRef}
            className={styles.fillImage}
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? '100vw'}
            style={{ objectFit: props.objectFit ?? 'contain' }}
            unoptimized={imageUnoptimized(src, unoptimized)}
            onError={onError}
          />
        </div>
      ) : (
        <NextImage
          key={`${src}:${attempt}`}
          ref={imageRef}
          className={styles.image}
          src={src}
          alt={alt}
          width={props.width}
          height={props.height}
          sizes={sizes ?? `(max-width: ${props.width}px) 100vw, ${props.width}px`}
          unoptimized={imageUnoptimized(src, unoptimized)}
          onError={onError}
        />
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};
