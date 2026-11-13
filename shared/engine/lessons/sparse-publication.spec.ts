import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createContentBlock } from './createContentBlock';
import { createSectionConfigurator } from './createSection';
import { splitLessonValue } from './splitLessonValue';

const languages = ['en', 'uk'] as const;

describe('Legacy Lesson authoring and sparse publication', () => {
  it('materializes ContentBlock creators without retaining methods or copying invariant values into translations', () => {
    const source = {
      id: 'text-id',
      slug: 'introduction',
      type: 'text' as const,
      value: { en: 'Light', uk: 'Світло' },
    };
    const block = createContentBlock<typeof languages>()(source);
    assert.equal(block.getData(), source);
    assert.deepEqual(block.getBase({ languages }), { id: 'text-id', slug: 'introduction', type: 'text' });
    assert.deepEqual(block.getLocale({ languages, language: 'uk' }), { value: 'Світло' });
    assert.deepEqual(block.getLocale({ languages, language: 'en' }), { value: 'Light' });
    assert.throws(
      () => block.getLocale({ languages, language: 'de' as never }),
      /Unsupported ContentBlock language/,
    );
  });

  it('materializes nested Section ContentBlocks and preserves sparse numeric array patches', () => {
    const block = createContentBlock<typeof languages>()({
      id: 'block-id',
      slug: 'intro',
      type: 'text',
      value: { en: 'Start', uk: 'Початок' },
    });
    const section = createSectionConfigurator<typeof languages>()({
      id: 'section-id',
      slug: 'theory',
      type: 'theory',
      title: { en: 'Theory', uk: 'Теорія' },
      navigationLabel: '1',
      content: [block],
    });
    assert.deepEqual(section.getData().content[0], block.getData());
    assert.equal(JSON.stringify(section.getData()).includes('getBase'), false);
    assert.deepEqual(section.getLocale({ languages, language: 'uk' }), {
      title: 'Теорія',
      content: { '0': { value: 'Початок' } },
    });
    assert.throws(
      () => section.getLocale({ languages, language: 'de' as never }),
      /Unsupported Section language/,
    );
  });

  it('tracks escaped JSON pointers and retains the structure of localized arrays', () => {
    const source = { 'text/a~b': [{ en: 'Hello', uk: 'Привіт' }, 'constant'] };
    const result = splitLessonValue(source, languages);
    assert.deepEqual(result.base, { 'text/a~b': [null, 'constant'] });
    assert.deepEqual(result.locales, {
      en: { 'text/a~b': { '0': 'Hello' } },
      uk: { 'text/a~b': { '0': 'Привіт' } },
    });
    assert.deepEqual(result.pointers, ['/text~1a~0b/0']);
  });

  it('requires complete Scene locale structures and rejects dissimilar translated shapes', () => {
    const source = {
      type: 'scene',
      locales: {
        en: { labels: { title: 'Hello' } },
        uk: { labels: { title: 'Привіт' } },
      },
    };
    const result = splitLessonValue(source, languages);
    assert.deepEqual(result.base, { type: 'scene' });
    assert.deepEqual(result.locales.uk, { locales: { labels: { title: 'Привіт' } } });
    assert.deepEqual(result.pointers, ['/locales']);
    assert.throws(
      () =>
        splitLessonValue(
          { ...source, locales: { ...source.locales, uk: { labels: { other: 'Ні' } } } },
          languages,
        ),
      /Invalid Scene locale shape/,
    );
  });

  it('rejects incomplete dictionaries, fallback payloads and unsupported values', () => {
    assert.throws(() => splitLessonValue({ title: { en: 'Only English' } }, languages), /Incomplete locale dictionary/);
    assert.throws(() => splitLessonValue({ title: { language: 'en', value: 'Hello' } }, languages), /fallback is not allowed/);
    assert.throws(() => splitLessonValue({ title: { fallback: 'English' } }, languages), /fallback is not allowed/);
    assert.throws(() => splitLessonValue({ value: () => 'text' }, languages), /Unsupported lesson value/);
    assert.throws(() => splitLessonValue({ value: 'text' }, ['en', 'en']), /Invalid declared lesson languages/);
    assert.throws(() => splitLessonValue({ value: 'text' }, []), /Invalid declared lesson languages/);
  });
});
