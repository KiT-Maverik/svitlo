import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import type { ContentBlockResponse } from './types';

export const supportedTypes = new Set<string>([
  'text',
  'markdown',
  'checkpoint',
  'scene',
  'code',
  'audio',
  'video',
  'youtube',
  'image',
]);

export function assertNever(value: never): never {
  throw new Error('Unsupported content block type: ' + String((value as { type: string }).type));
}

/**
 * Reject blocks without an explicit type. Several response variants
 * have overlapping fields, so their shape cannot identify the block kind.
 */
export function requireTaggedResponse(response: ContentBlockResponse): ContentBlockResponse {
  if (!('type' in response) || typeof response.type !== 'string' || !supportedTypes.has(response.type)) {
    throw new Error('Content block ' + response.id + ' requires a supported response.type discriminator');
  }
  return response;
}
export function localizedAttributes(response: { locale: { code: string } }) {
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === response.locale.code);
  return { lang: language?.locale ?? response.locale.code, dir: language?.direction ?? 'ltr' };
}
