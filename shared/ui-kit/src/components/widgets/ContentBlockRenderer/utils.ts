import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import type { NestedResponse, TaggedResponse } from './types';

export const supportedTypes = new Set<string>([
  'text', 'markdown', 'checkpoint', 'scene', 'code',
  'audio', 'video', 'youtube', 'image', 'quiz',
]);

export function assertNever(value: never): never {
  throw new Error('Unsupported content block type: ' + String((value as { type: string }).type));
}

/**
 * Reject nested blocks without an explicit type. Several response variants
 * have overlapping fields, so their shape cannot identify the block kind.
 */
export function requireTaggedResponse(response: NestedResponse): TaggedResponse {
  if (!('type' in response) || typeof response.type !== 'string' || !supportedTypes.has(response.type)) {
    throw new Error('Nested content block ' + response.id + ' requires a supported response.type discriminator');
  }
  // The serialized nested response is checked at this boundary.
  return response as TaggedResponse;
}
export function localizedAttributes(response: { locale: { code: string } }) {
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === response.locale.code);
  return { lang: language?.locale ?? response.locale.code, dir: language?.direction ?? 'ltr' };
}
