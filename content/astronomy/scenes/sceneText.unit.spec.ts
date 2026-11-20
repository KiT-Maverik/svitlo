import { describe, expect, it } from 'vitest';
import { sceneText, voiceText } from './sceneText';
import type { SceneLocales } from './sceneText';

describe('Scene localized text', () => {
  it('uses only the selected response and rejects missing or empty leaves', () => {
    const locales = { prompt: 'Порівняй', voiceControls: { speak: 'Прослухати', repeat: 'Повторити', pause: 'Зупинити' } } as SceneLocales;
    expect(sceneText(locales, 'prompt')).toBe('Порівняй');
    expect(voiceText(locales, 'speak')).toBe('Прослухати');
    expect(() => sceneText(locales, 'absent')).toThrow(/Missing localized Scene text/);
    expect(() => sceneText({ prompt: '' } as SceneLocales, 'prompt')).toThrow();
    expect(() => voiceText(locales, 'missing' as 'speak')).toThrow();
  });
});
