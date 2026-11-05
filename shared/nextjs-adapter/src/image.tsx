'use client';

import NextImage from 'next/image';
import type { ImageRendererProps } from '@svitlo/ui-kit';

/** Inject Next.js optimization into the otherwise framework-neutral UI Kit. */
export function NextImageRenderer(props: ImageRendererProps) {
  return <NextImage {...props} />;
}
