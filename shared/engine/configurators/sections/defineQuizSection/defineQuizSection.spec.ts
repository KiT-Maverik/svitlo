import assert from 'node:assert/strict';
import test from 'node:test';
import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineContentSection } from '../defineContentSection/defineContentSection';
import { defineQuizSection } from './defineQuizSection';
import { quizSection_Config_Schema } from './defineQuizSection.schemas';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const prompt = defineText({
  id: id('b1'), slug: 'prompt', type: 'text', params: {},
  locale: { value: { en: 'Read', uk: 'Читай' } },
});
const quizParams = {
  selection: { mode: 'sample' as const, count: 3 },
  layout: { mode: 'stepper' as const, showProgress: true },
  feedbackMode: 'after-completion' as const,
  interaction: {
    retries: 1, showErrors: true, showCorrectAnswers: false,
    allowExplanations: true, allowDeferring: false, allowQuestionNavigation: true, skippable: false,
  },
  results: { visibility: 'immediate' as const, showScore: true },
  screen: { starting: { content: ['prompt'] } },
};
const makeQuiz = () => defineQuizSection({
  type: 'quiz', id: id('b4'), slug: 'quiz', params: quizParams,
  locale: { title: 'Quiz', navigationLabel: 'Q' },
  content: { items: { prompt }, order: ['prompt'] },
});

test('Content Section rejects authored raw blocks and allows valid build overrides', () => {
  const section = defineContentSection({
    type: 'content', id: id('b2'), slug: 'intro', params: {},
    locale: { title: { en: 'Theory', uk: 'Теорія' }, navigationLabel: '1' },
    content: { items: { prompt }, order: ['prompt'] },
  });
  assert.equal(section.build.props().base.slug, 'intro');
  assert.deepEqual(section.build.overrides({ content: { order: ['prompt'] } }).base.content?.map(x => x.slug), ['prompt']);
  assert.deepEqual(section.config.locales(), { locale: { title: { en: 'Theory', uk: 'Теорія' } } });
  assert.throws(() => defineContentSection({
    type: 'content', id: id('b3'), slug: 'bad', params: {},
    locale: { title: 'Invalid', navigationLabel: 'X' },
    content: {
      // @ts-expect-error Raw data is not a ContentBlock configurator.
      items: { prompt: prompt.config.base },
      order: ['prompt'],
    },
  }));
});

test('Quiz preserves named screen references and scoring semantics', () => {
  const quiz = makeQuiz();
  assert.equal(quiz.type, 'quiz');
  assert.deepEqual(quiz.build.props().base.params.screen.starting?.content, ['prompt']);
  assert.equal(quiz.build.props().base.params.interaction.retries, 1);
  assert.deepEqual(quiz.build.overrides({ params: { interaction: { retries: 2 } } }).base.params?.interaction, { retries: 2 });
  const overridden = quiz.build.overrides({
    content: { items: { prompt: { locale: { value: { uk: 'Читай далі' } } } } },
  });
  const firstBlock = overridden.locale?.uk?.content?.[0];
  assert.equal(firstBlock?.type, 'text');
  assert.equal((firstBlock?.locale as { value?: string } | undefined)?.value, 'Читай далі');
  assert.equal(quizSection_Config_Schema.safeParse({
    ...quiz.config.base,
    content: quiz.content,
    locale: { title: 'Quiz', navigationLabel: 'Q' },
    params: { ...quizParams, interaction: { ...quizParams.interaction, retries: -1 } },
  }).success, false);
  assert.throws(() => makeQuiz().build.overrides({
    content: { items: { prompt: false }, order: [] },
  }), /unknown ContentBlock/);
  assert.throws(() => makeQuiz().build.overrides({
    params: { screen: { starting: { content: ['missing'] } } },
  }), /unknown ContentBlock/);
  assert.throws(() => defineQuizSection({
    type: 'quiz', id: id('b5'), slug: 'badQuiz',
    params: { ...quizParams, screen: { starting: { content: ['notPresent'] } } },
    locale: { title: 'Quiz', navigationLabel: 'Q' },
    content: { items: { prompt }, order: ['prompt'] },
  }), /unknown ContentBlock/);
});
