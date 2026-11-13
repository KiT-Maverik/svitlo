import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { LessonResponse } from './assembleLessonResponse';
import { applyCourseLessonOverride } from './applyCourseLessonOverride';

const base = {
  id: 'lesson-id',
  slug: 'light',
  title: 'Light',
  locale: { code: 'en' },
  parameters: {
    requireQuiz: false,
    languages: ['en'],
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
  },
  flashcards: [],
  skills: [],
  questions: {},
  localeSources: { config: {}, flashcards: {}, questions: {} },
  sections: [
    {
      id: 'theory-id',
      slug: 'theory',
      type: 'theory',
      title: 'Theory',
      navigationLabel: 'Theory',
      content: [],
      questions: [],
    },
    {
      id: 'practice-id',
      slug: 'practice',
      type: 'practice',
      title: 'Practice',
      navigationLabel: 'Practice',
      content: [],
      questions: [],
    },
  ],
} as unknown as LessonResponse;

test('Course patch composes new Sections and reorders existing Sections without mutation', () => {
  const original = JSON.stringify(base);
  const patch = {
    type: 'lessonOverride' as const,
    lessonId: 'lesson-id',
    overrides: {
      parameters: { sections: { allowSkipping: false } },
      sections: {
        order: ['practice', 'story', 'theory'],
        added: [
          {
            source: { type: 'course' as const },
            section: {
              id: 'story-id',
              slug: 'story',
              type: 'scenario' as const,
              title: 'Story',
              navigationLabel: 'Story',
              content: [{ id: 'story-text', slug: 'storyText', type: 'markdown' as const, locales: 'Lorem ipsum' }],
            },
          },
        ],
      },
    },
  };
  const composed = applyCourseLessonOverride(base, patch);
  assert.deepEqual(
    composed.sections.map(section => section.slug),
    ['practice', 'story', 'theory'],
  );
  const story = composed.sections[1];
  assert.equal(story.type, 'scenario');
  if (story.type !== 'scenario') throw new Error('Expected scenario');
  assert.equal(story.content[0].type, 'markdown');
  assert.equal((story.content[0] as { text: string }).text, 'Lorem ipsum');
  assert.equal(composed.parameters.sections.allowSkipping, false);
  assert.equal(JSON.stringify(base), original);
});

test('Course override preserves explicit Section skippable: false', () => {
  const changed = applyCourseLessonOverride(base, {
    type: 'lessonOverride',
    lessonId: base.id,
    overrides: { sections: { bySlug: { theory: { skippable: false } } } },
  });
  assert.equal(changed.sections[0]?.skippable, false);
  assert.equal(base.sections[0]?.skippable, undefined);
});

test('Course patch rejects missing order entries', () => {
  assert.throws(
    () =>
      applyCourseLessonOverride(base, {
        type: 'lessonOverride',
        lessonId: 'lesson-id',
        overrides: { sections: { order: ['theory'] } },
      }),
    /Incomplete Course Section order/,
  );
});
