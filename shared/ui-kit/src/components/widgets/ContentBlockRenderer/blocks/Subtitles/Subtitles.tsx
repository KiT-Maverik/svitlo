'use client';

import { UNRESOLVED_RESOURCE_UUID, type ContentBlock_Subtitles_Props } from '@svitlo/engine/runtime';

import { useContentLanguage } from '../../ContentLanguageContext';
import { localizedAttributes, subtitlesResourceLabel } from '../../utils';

/**
 * A standalone WebVTT response has only a file location (no media player or localized
 * title contract), so expose a visible, keyboard-accessible resource link instead
 * of silently dropping the block. A future paired-player contract can attach
 * it as a <track> without losing the authored captions resource.
 */
export function Subtitles({
  locale: { fileLocation },
  unavailableMessage,
}: ContentBlock_Subtitles_Props & { unavailableMessage?: string }) {
  const language = useContentLanguage();
  if (fileLocation.includes(UNRESOLVED_RESOURCE_UUID)) {
    return (
      <span {...localizedAttributes({ locale: { code: language } })} role="status">
        {unavailableMessage ?? 'Captions are unavailable'}
      </span>
    );
  }
  return (
    <a {...localizedAttributes({ locale: { code: language } })} href={fileLocation}>
      {subtitlesResourceLabel(fileLocation)}
    </a>
  );
}
