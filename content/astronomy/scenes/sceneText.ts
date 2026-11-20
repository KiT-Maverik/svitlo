import type { ContentBlock_Scene_Props } from '@svitlo/engine/runtime';

/** Only the selected locale's published response reaches each Scene. */
export type SceneLocales = ContentBlock_Scene_Props['locale']['value'];

export function sceneText(locales: SceneLocales, key: string): string {
  if (typeof locales !== 'object' || locales === null || Array.isArray(locales)) {
    throw new Error('Invalid localized Scene response');
  }
  const value: unknown = (locales as Record<string, unknown>)[key];
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error('Missing localized Scene text: ' + key);
  }
  return value;
}

export function voiceText(locales: SceneLocales, key: 'speak' | 'repeat' | 'pause'): string {
  if (typeof locales !== 'object' || locales === null || Array.isArray(locales)) {
    throw new Error('Invalid localized Scene response');
  }
  const voice: unknown = (locales as Record<string, unknown>).voiceControls;
  if (typeof voice !== 'object' || voice === null || Array.isArray(voice)) {
    throw new Error('Missing localized Scene voiceControls');
  }
  const value: unknown = (voice as Record<string, unknown>)[key];
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error('Missing localized voice control: ' + key);
  }
  return value;
}

/**
 * TODO (BLOCKER): Stage 6 Scene narration (Lesson #661) requires verified,
 * locally packaged recordings for each approved source-locale key, including
 * labels, descriptions, feedback and per-photo metadata. The absence of
 * recordings must not be masked by network TTS, fake URLs or silent playback.
 * A device TTS alternative requires tested offline Ukrainian voice support.
 */
