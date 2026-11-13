import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { assertLessonData } from './assertLessonData';
import { createLessonFromUnknown } from './createLesson';

const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const skillId = '663572e7-bd85-4516-86e2-3de07d209e03';

const valid = () => ({
  id: lessonId,
  slug: 'lightLesson',
  title: { en: 'Light', uk: 'Світло' },
  parameters: { languages: ['en', 'uk'], requireQuiz: false },
  skills: [skillId],
  questions: {},
  flashcards: [],
  sections: [
    {
      id: 'section-id',
      slug: 'introduction',
      type: 'theory',
      content: [{ id: 'block-id', slug: 'prompt', type: 'text', value: 'Invariant' }],
    },
  ],
});

describe('Lesson authored input validation', () => {
  it('accepts a valid Lesson without altering the original source object', () => {
    const source = valid();
    const before = structuredClone(source);
    assert.doesNotThrow(() => assertLessonData(source));
    assert.deepEqual(source, before);
  });

  it('rejects an invalid slug, empty language scope and malformed collection shapes', () => {
    assert.throws(() => assertLessonData({ ...valid(), slug: 'Not-camel-case' }), /camelCase slug/);
    assert.throws(
      () => assertLessonData({ ...valid(), parameters: { languages: [] } }),
      /parameters.languages/,
    );
    assert.throws(() => assertLessonData({ ...valid(), flashcards: {} }), /missing flashcards/);
    assert.throws(() => assertLessonData({ ...valid(), questions: [] }), /missing flashcards/);
  });

  it('rejects duplicate Skill IDs, duplicate Section slugs and duplicate ContentBlock keys', () => {
    assert.throws(
      () => assertLessonData({ ...valid(), skills: [skillId, skillId] }),
      /Invalid Lesson Skill IDs/,
    );
    const duplicateSection = valid();
    duplicateSection.sections.push({ ...duplicateSection.sections[0], id: 'other-section' });
    assert.throws(() => assertLessonData(duplicateSection), /Duplicate section slug/);

    const duplicateBlock = valid();
    duplicateBlock.sections[0].content.push({ id: 'new-id', slug: 'prompt', type: 'text', value: 'Other' });
    assert.throws(() => assertLessonData(duplicateBlock), /Duplicate content block/);
  });

  it('rejects a Quiz with ordinary ContentBlocks and a regular Section without ContentBlocks', () => {
    const invalidQuiz = {
      ...valid(),
      sections: [{ type: 'quiz', slug: 'assessment', parameters: {}, content: [] }],
    };
    assert.throws(() => assertLessonData(invalidQuiz), /Invalid ordered section/);
    const missingContent = { ...valid(), sections: [{ type: 'theory', slug: 'introduction' }] };
    assert.throws(() => assertLessonData(missingContent), /Invalid ordered section/);
  });

  it('permits disabling standard events but requires Scenes for custom events', () => {
    assert.doesNotThrow(() => assertLessonData({ ...valid(), events: { lessonCompleted: false } }));
    assert.throws(
      () => assertLessonData({ ...valid(), events: { userAction: false } }),
      /authored Scene/,
    );
    assert.throws(
      () => assertLessonData({ ...valid(), events: { 'not.valid': false } }),
      /Invalid lesson event ID/,
    );
  });

  it('validates unknown inputs before exposing a Lesson creator', () => {
    const creator = createLessonFromUnknown(valid());
    const base = creator.getBase();
    assert.equal((base.config.data as { id: string }).id, lessonId);
    assert.deepEqual((creator.getLocale('uk').config.data as { title: string }).title, 'Світло');
    assert.throws(() => createLessonFromUnknown({ ...valid(), sections: null }), /missing flashcards/);
  });
});
