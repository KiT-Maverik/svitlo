import assert from 'node:assert/strict';
import test from 'node:test';
import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineContentSection } from '../defineContentSection/defineContentSection';
import { defineQuizSection } from './defineQuizSection';
import { quizSection_Config_Schema } from './defineQuizSection.schemas';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const prompt = defineText({
  id: id('b1'), slug: 'prompt', type: 'text', params: {}, locale: { value: { en: 'Read', uk: 'Читай' } },
});

const quizParams = {
  selection: { mode: 'sample' as const, count: 3 },
  layout: { mode: 'stepper' as const, showProgress: true },
  feedbackMode: 'after-completion' as const,
  interaction: {
    retries: 1, showErrors: true, showCorrectAnswers: false, allowExplanations: true,
    allowDeferring: false, allowQuestionNavigation: true, skippable: false,
  },
  results: { visibility: 'immediate' as const, showScore: true },
  screen: { starting: { content: ['prompt'] } },
};

test('Content Section retains configurators and sparse content overrides', () => {
  const section = defineContentSection({
    type: 'content', id: id('b2'), slug: 'intro', params: {},
    locale: { title: { en: 'Theory', uk: 'Теорія' }, navigationLabel: '1' },
    content: { items: { prompt }, order: ['prompt'] },
  });
  assert.equal(section.config.base.slug, 'intro');
  assert.equal(section.config.base.locale.navigationLabel, '1');
  assert.deepEqual(section.config.locales(), { locale: { title: { en: 'Theory', uk: 'Теорія' } } });
  assert.equal(section.content.items.prompt, prompt);
  section.override.content.order(['prompt']);
  assert.deepEqual(section.config.overrides.content?.order, ['prompt']);
  section.override.content.disable(['prompt']);
  assert.deepEqual(section.config.overrides.content?.items?.prompt, false);
  assert.deepEqual(section.content.order, ['prompt'], 'authored content stays unchanged');
  assert.deepEqual(section.config.overrides.content?.order, []);

  assert.throws(() => defineContentSection({
    type: 'content', id: id('b3'), slug: 'bad', params: {},
    locale: { title: 'Invalid', navigationLabel: 'X' },
    content: {
      // @ts-expect-error Raw authored data is not a ContentBlock configurator.
      items: { prompt: prompt.config.base }, order: ['prompt'],
    },
  }));
});

test('Quiz screen references blocks in Section.content and validates metadata', () => {
  const section = defineQuizSection({
    type: 'quiz', id: id('b4'), slug: 'quiz', params: quizParams,
    locale: { title: 'Quiz', navigationLabel: 'Q' },
    content: { items: { prompt }, order: ['prompt'] },
  });
  assert.equal(section.type, 'quiz');
  assert.equal(section.content.items.prompt, prompt);
  assert.deepEqual(section.config.base.params.screen.starting?.content, ['prompt']);
  assert.equal(quizSection_Config_Schema.safeParse({
    type: 'quiz', id: id('b4'), slug: 'quiz', params: {
      ...quizParams, interaction: { ...quizParams.interaction, retries: -1 },
    },
    locale: { title: 'Quiz', navigationLabel: 'Q' },
  }).success, false);
  assert.throws(() => defineQuizSection({
    type: 'quiz', id: id('b5'), slug: 'badQuiz',
    params: { ...quizParams, screen: { starting: { content: ['notPresent'] } } },
    locale: { title: 'Quiz', navigationLabel: 'Q' },
    content: { items: { prompt }, order: ['prompt'] },
  }), /unknown ContentBlock/);
});
