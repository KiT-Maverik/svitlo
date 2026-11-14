import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';
import type { LanguageCode } from '@svitlo/engine/runtime';
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
  'carousel',
  'subtitles',
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

/** Authoring dictionaries may remain in transitional Props types; never render one as a React child. */

export type LocalizedText = string | Partial<Record<LanguageCode, string>>;

/** Resolve a selected locale explicitly. A missing translation is an error, not an English fallback. */
export function resolveLocalizedText(value: LocalizedText, language: LanguageCode, field: string): string {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Invalid localized content at ' + field);
  }
  const selected = Object.hasOwn(value, language) ? value[language] : undefined;
  if (typeof selected !== 'string' || selected.length === 0) {
    throw new Error('Missing localized content at ' + field + ' for ' + language);
  }
  return selected;
}

export function resolveOptionalLocalizedText(
  value: LocalizedText | undefined,
  language: LanguageCode,
  field: string,
): string | undefined {
  return value === undefined ? undefined : resolveLocalizedText(value, language, field);
}

export function resolveLocalizedRecord(
  values: Readonly<Record<string, LocalizedText>> | undefined,
  language: LanguageCode,
  field: string,
): Record<string, string> | undefined {
  if (values === undefined) return undefined;
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, resolveLocalizedText(value, language, field + '.' + key)]),
  );
}
