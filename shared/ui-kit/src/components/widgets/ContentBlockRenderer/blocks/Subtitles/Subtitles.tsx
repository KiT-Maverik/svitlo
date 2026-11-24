'use client';

import type { ContentBlock_Subtitles_Props } from '@svitlo/engine/runtime';

import { useContentLanguage } from '../../ContentLanguageContext';
import { localizedAttributes, subtitlesResourceLabel } from '../../utils';

/**
 * A standalone WebVTT response has only a file location (no media player or localized
 * title contract), so expose a visible, keyboard-accessible resource link instead
 * of silently dropping the block. A future paired-player contract can attach
 * it as a <track> without losing the authored captions resource.
 */
export function Subtitles({ locale: { fileLocation } }: ContentBlock_Subtitles_Props) {
  const language = useContentLanguage();
  return (
    <a {...localizedAttributes({ locale: { code: language } })} href={fileLocation}>
      {subtitlesResourceLabel(fileLocation)}
    </a>
  );
}
