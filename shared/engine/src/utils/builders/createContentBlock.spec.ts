import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { createContentBlock } from './createContentBlock.utils';

describe('createContentBlock', () => {
  it('builds a typed Markdown Response for the requested language', () => {
    const markdown = createContentBlock({
      type: 'markdown',
      id: 'intro-id',
      slug: 'intro',
      locales: { en: 'Hello', uk: 'Привіт', fallback: 'en' },
    });

    assert.deepEqual(markdown.build('uk'), {
      type: 'markdown',
      id: 'intro-id',
      locale: { code: 'uk' },
      text: 'Привіт',
    });
    assert.deepEqual(markdown.build('de'), {
      type: 'markdown',
      id: 'intro-id',
      locale: { code: 'de', isFallback: true },
      text: 'Hello',
    });

    const built = markdown.build('en');
    if (built) {
      const text: string = built.text;
      assert.equal(text, 'Hello');
    }
  });

  it('preserves original authored content across independent immutable overrides', () => {
    const authored = {
      type: 'text' as const,
      id: 'instruction-id',
      slug: 'instruction',
      value: { language: 'en' as const, value: 'Read carefully' },
      wrap: { enabled: false as const },
    };
    const original = createContentBlock(authored);
    const configured = original.withConfig({
      wrap: { typographyProps: { component: 'h2' } },
    });
    const disabled = configured.disable();

    assert.deepEqual(original.build('en')?.wrap, { enabled: false });
    assert.deepEqual(configured.build('en')?.wrap, {
      enabled: false,
      typographyProps: { component: 'h2' },
    });
    assert.equal(disabled.build('en'), undefined);
    assert.ok(configured.build('en'));
    assert.deepEqual(authored.wrap, { enabled: false });

    assert.throws(
      () => original.withConfig({ value: { language: 'uk', value: 'Changed' } } as never),
      /Cannot override content block field: value/,
    );
    // @ts-expect-error A Text builder cannot receive a Quiz configuration.
    if (false) original.withConfig({ feedbackMode: 'immediate' });
  });

  it('applies image layout overrides without changing its source or alt text', () => {
    const image = createContentBlock({
      type: 'image',
      id: 'diagram-id',
      slug: 'diagram',
      src: { value: '/diagram.png', language: 'en' },
      alt: { value: 'A diagram', language: 'en' },
      width: 600,
      height: 400,
    });
    assert.deepEqual(image.withConfig({ sizes: '100vw', width: 300 }).build('en'), {
      type: 'image',
      id: 'diagram-id',
      locale: { code: 'en' },
      src: '/diagram.png',
      alt: 'A diagram',
      width: 300,
      height: 400,
      sizes: '100vw',
    });
    assert.equal(image.build('en')?.width, 600);
  });

  it('converts nested checkpoint answers to discriminated Responses', () => {
    const checkpoint = createContentBlock({
      type: 'checkpoint',
      id: 'checkpoint-id',
      slug: 'reflection',
      title: { language: 'en', value: 'Check your understanding' },
      items: [{
        question: { language: 'en', value: 'Why?' },
        answer: [{
          type: 'text',
          id: 'answer-id',
          slug: 'answer',
          value: { language: 'en', value: 'Because light travels straight.' },
        }],
      }],
    });
    const response = checkpoint.build('en');
    assert.equal(response?.items[0].answer[0].type, 'text');
    assert.deepEqual(response?.items[0].answer[0], {
      type: 'text',
      id: 'answer-id',
      locale: { code: 'en' },
      value: 'Because light travels straight.',
    });
    assert.deepEqual(checkpoint.build('uk')?.locale, { code: 'uk', isFallback: true });
  });

  it('compacts quiz questions into slugs and builds custom screens', () => {
    const quiz = createContentBlock({
      type: 'quiz',
      id: 'quiz-id',
      slug: 'quiz',
      welcome: { language: 'en', value: 'Welcome' },
      feedbackMode: 'after-completion',
      interaction: {
        retries: 1,
        showErrors: true,
        showCorrectAnswers: true,
        allowExplanations: true,
        allowDeferring: false,
        allowQuestionNavigation: true,
        skippable: false,
      },
      results: { visibility: 'immediate', showScore: true },
      questions: {
        first: { slug: 'first' } as never,
        second: { slug: 'second' } as never,
      },
      screen: {
        starting: {
          showDefaultContent: false,
          content: [{
            type: 'markdown',
            id: 'start-id',
            slug: 'start',
            locales: { language: 'en', value: 'Get ready' },
          }],
        },
      },
    });
    const customized = quiz.withConfig({ interaction: { retries: 3 } });
    const response = customized.build('en');
    assert.deepEqual(response?.questionSlugs, ['first', 'second']);
    assert.deepEqual(response?.screen.starting?.content?.[0], {
      type: 'markdown',
      id: 'start-id',
      locale: { code: 'en' },
      text: 'Get ready',
    });
    assert.equal(customized.build('en')?.interaction.retries, 3);
    assert.equal(quiz.build('en')?.interaction.retries, 1);
    assert.equal('questions' in (response ?? {}), false);
  });

  it('reads a localized code file into the Response', () => {
    const directory = mkdtempSync(join(tmpdir(), 'svitlo-block-'));
    try {
      const file = join(directory, 'source.ts');
      writeFileSync(file, 'console.log("hello");\n');
      const code = createContentBlock({
        type: 'code',
        id: 'code-id',
        slug: 'code',
        language: 'typescript',
        fileLocation: { language: 'en', value: file },
      });
      assert.equal(code.build('en')?.code, 'console.log("hello");\n');
      assert.equal('fileLocation' in (code.build('en') ?? {}), false);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('does not support scene builders until the scene refactor', () => {
    // @ts-expect-error Scene is intentionally excluded from buildable types.
    if (false) createContentBlock({ type: 'scene', id: 's', slug: 'scene', locales: {} });
  });
});
