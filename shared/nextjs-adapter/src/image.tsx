'use client';

import NextImage from 'next/image';
import type { ImageRendererProps } from '@svitlo/ui-kit';

/**
 * Adapt the portable HTML image contract to Next's stricter ImageProps.
 * Do not forward arbitrary DOM attributes: some conflict with NextImage's types.
 */
export function NextImageRenderer({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  unoptimized,
  className,
  style,
  onError,
  loading,
  decoding,
  ref,
}: ImageRendererProps) {
  const shared = {
    src,
    alt,
    sizes,
    unoptimized,
    className,
    style,
    onError,
    loading,
    decoding,
    ref,
  };
  if (fill) {
    return <NextImage {...shared} fill />;
  }
  const actualWidth = Number(width);
  const actualHeight = Number(height);
  if (!Number.isFinite(actualWidth) || actualWidth <= 0 || !Number.isFinite(actualHeight) || actualHeight <= 0) {
    throw new Error('NextImageRenderer requires positive image dimensions when fill is false');
  }
  return <NextImage {...shared} width={actualWidth} height={actualHeight} />;
}
