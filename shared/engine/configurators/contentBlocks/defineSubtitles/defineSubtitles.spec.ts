import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { defineSubtitles } from './defineSubtitles';
import { contentBlockTypes } from '../contentBlock.constants';

const scope = { languages: ['uk'] as const };
const id = 'e5235ac2-2c44-4c10-8c48-3c7bad649015';
const make = () => defineSubtitles<'captions', ['en', 'uk']>({
  id, slug: 'captions', type: 'subtitles', params: {},
  locale: { fileLocation: { en: 'https://example.org/en.vtt', uk: 'https://example.org/uk.vtt' } },
});

describe('Configurators > ContentBlocks > defineSubtitles', () => {
  test('registers a general ContentBlock and publishes scoped WebVTT locations', () => {
    const subtitles = make();
    assert.equal(contentBlockTypes.includes('subtitles'), true);
    assert.equal(subtitles.build.props(scope).base.type, 'subtitles');
    assert.deepEqual(subtitles.build.props(scope).locale, { uk: { locale: { fileLocation: 'https://example.org/uk.vtt' } } });
  });
  test('keeps sparse overrides stateless and identity immutable', () => {
    const subtitles = make();
    const original = JSON.stringify(subtitles.build.props(scope));
    assert.deepEqual(subtitles.build.overrides({ locale: { fileLocation: { uk: 'https://example.org/new.vtt' } } }, scope).locale,
      { uk: { locale: { fileLocation: 'https://example.org/new.vtt' } } });
    assert.equal(JSON.stringify(subtitles.build.props(scope)), original);
    assert.throws(() => subtitles.build.overrides({ slug: 'other' } as never, scope));
  });
});
