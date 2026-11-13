import { describe, expect, it } from 'vitest';
import { resolveLocalizedRecord, resolveLocalizedText, resolveOptionalLocalizedText } from './utils';

describe('ContentBlock locale resolution', () => {
  it('keeps assembled invariant strings unchanged', () => {
    expect(resolveLocalizedText('Never translate code identifiers', 'uk', 'code.title')).toBe(
      'Never translate code identifiers',
    );
    expect(resolveOptionalLocalizedText(undefined, 'uk', 'image.caption')).toBeUndefined();
    expect(resolveLocalizedRecord(undefined, 'uk', 'markdown.variables')).toBeUndefined();
  });

  it('selects only the requested translation for optional fields and template variables', () => {
    expect(resolveOptionalLocalizedText({ en: 'Photo', uk: 'Фото' }, 'uk', 'image.caption')).toBe('Фото');
    expect(resolveLocalizedRecord({ TITLE: { en: 'Light', ar: 'الضوء' }, UNIT: 'm/s' }, 'ar', 'markdown.variables')).toEqual({
      TITLE: 'الضوء',
      UNIT: 'm/s',
    });
  });

  it('does not silently substitute a different language or stringify missing values', () => {
    expect(() => resolveLocalizedText({ en: 'Sound' }, 'uk', 'audio.title')).toThrow(
      'Missing localized content at audio.title for uk',
    );
    expect(() => resolveOptionalLocalizedText({ en: 'Offline' }, 'ar', 'video.fallback.offline')).toThrow(
      'Missing localized content at video.fallback.offline for ar',
    );
    expect(() => resolveLocalizedText({ uk: '' }, 'uk', 'image.alt')).toThrow('Missing localized content');
  });
});
