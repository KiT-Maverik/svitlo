import assert from 'node:assert/strict';
import test from 'node:test';
import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineContentSection } from '../defineContentSection/defineContentSection';
import { defineQuizSection } from './defineQuizSection';
import { quizSection_Config_Schema } from './defineQuizSection.schemas';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const prompt = defineText({
  id: id('b1'),
  slug: 'prompt',
  type: 'text',
  params: {},
  locale: { value: { en: 'Read', uk: 'Читай' } },
});
const quizParams = {
  selection: { mode: 'sample' as const, count: 3 },
  layout: { mode: 'stepper' as const, showProgress: true },
  feedbackMode: 'after-completion' as const,
  interaction: {
    retries: 1,
    showErrors: true,
    showCorrectAnswers: false,
    allowExplanations: true,
    allowDeferring: false,
    allowQuestionNavigation: true,
    skippable: false,
  },
  results: { visibility: 'immediate' as const, showScore: true },
  screen: { starting: { content: ['prompt'] } },
};
const makeQuiz = () =>
  defineQuizSection({
    type: 'quiz',
    id: id('b4'),
    slug: 'quiz',
    params: quizParams,
    locale: { title: 'Quiz', navigationLabel: 'Q' },
    content: { items: { prompt }, order: ['prompt'] },
  });

test('Content Section rejects authored raw blocks and allows valid build overrides', () => {
  const section = defineContentSection({
    type: 'content',
    id: id('b2'),
    slug: 'intro',
    params: {},
    locale: { title: { en: 'Theory', uk: 'Теорія' }, navigationLabel: '1' },
    content: { items: { prompt }, order: ['prompt'] },
  });
  assert.equal(section.build.props({ languages: ['en', 'uk'] }).base.slug, 'intro');
  assert.deepEqual(
    section.build
      .overrides({ content: { order: ['prompt'] } }, { languages: ['en', 'uk'] })
      .base.content?.map(x => x.slug),
    ['prompt'],
  );
  assert.deepEqual(section.config.locales(), { locale: { title: { en: 'Theory', uk: 'Теорія' } } });
  assert.throws(() =>
    defineContentSection({
      type: 'content',
      id: id('b3'),
      slug: 'bad',
      params: {},
      locale: { title: 'Invalid', navigationLabel: 'X' },
      content: {
        // @ts-expect-error Raw data is not a ContentBlock configurator.
        items: { prompt: prompt.config.base },
        order: ['prompt'],
      },
    }),
  );
});

test('Quiz preserves named screen references and scoring semantics', () => {
  const quiz = makeQuiz();
  assert.equal(quiz.type, 'quiz');
  assert.deepEqual(quiz.build.props({ languages: ['en', 'uk'] }).base.params.screen?.starting?.content, ['prompt']);
  assert.equal(quiz.build.props({ languages: ['en', 'uk'] }).base.params.interaction.retries, 1);
  assert.deepEqual(
    quiz.build.overrides({ params: { interaction: { retries: 2 } } }, { languages: ['en', 'uk'] }).base.params
      ?.interaction,
    { retries: 2 },
  );
  const overridden = quiz.build.overrides(
    {
      content: { items: { prompt: { locale: { value: { uk: 'Читай далі' } } } } },
    },
    { languages: ['en', 'uk'] },
  );
  const firstBlock = overridden.locale?.uk?.content?.[0];
  assert.equal(firstBlock?.type, 'text');
  assert.equal((firstBlock?.locale as { value?: string } | undefined)?.value, 'Читай далі');
  assert.equal(
    quizSection_Config_Schema.safeParse({
      ...quiz.config.base,
      content: quiz.content,
      locale: { title: 'Quiz', navigationLabel: 'Q' },
      params: { ...quizParams, interaction: { ...quizParams.interaction, retries: -1 } },
    }).success,
    false,
  );
  assert.throws(
    () =>
      makeQuiz().build.overrides(
        {
          content: { items: { prompt: false }, order: [] },
        },
        { languages: ['en', 'uk'] },
      ),
    /unknown ContentBlock/,
  );
  assert.throws(
    () =>
      makeQuiz().build.overrides(
        {
          params: { screen: { starting: { content: ['missing'] } } },
        },
        { languages: ['en', 'uk'] },
      ),
    /unknown ContentBlock/,
  );
  assert.throws(
    () =>
      defineQuizSection({
        type: 'quiz',
        id: id('b5'),
        slug: 'badQuiz',
        params: { ...quizParams, screen: { starting: { content: ['notPresent'] } } },
        locale: { title: 'Quiz', navigationLabel: 'Q' },
        content: { items: { prompt }, order: ['prompt'] },
      }),
    /unknown ContentBlock/,
  );
});

test('Quiz screens cannot reference authored or overridden disabled ContentBlocks', () => {
  const disabledPrompt = defineText({
    id: id('b6'),
    slug: 'prompt',
    type: 'text',
    params: { disabled: true },
    locale: { value: 'Unavailable' },
  });
  assert.throws(
    () =>
      defineQuizSection({
        type: 'quiz',
        id: id('b8'),
        slug: 'badDisabledQuiz',
        params: quizParams,
        locale: { title: 'Quiz', navigationLabel: 'Q' },
        content: { items: { prompt: disabledPrompt }, order: ['prompt'] },
      }),
    /screen starting references disabled ContentBlock: prompt/,
  );

  const quiz = makeQuiz();
  assert.throws(
    () =>
      quiz.build.overrides(
        {
          content: { items: { prompt: { params: { disabled: true } } } },
        },
        { languages: ['en', 'uk'] },
      ),
    /screen starting references disabled ContentBlock: prompt/,
  );
  // A rejected override cannot alter the authored configurator.
  assert.equal(quiz.build.props({ languages: ['uk'] }).base.content[0]?.params.disabled, undefined);
});

test('Quiz accepts atomic screen-reference removal together with nested disable or structural removal', () => {
  const quiz = makeQuiz();
  const disabled = quiz.build.overrides(
    {
      params: { screen: { starting: { content: [] } } },
      content: { items: { prompt: { params: { disabled: true } } } },
    },
    { languages: ['en', 'uk'] },
  );
  assert.deepEqual(disabled.base.params?.screen?.starting?.content, []);
  assert.equal(disabled.base.content?.[0]?.params.disabled, true);
  assert.equal(disabled.base.content?.[0]?.slug, 'prompt');
  assert.equal(quiz.build.props({ languages: ['uk'] }).base.content[0]?.params.disabled, undefined);

  const removed = quiz.build.overrides(
    {
      params: { screen: { starting: { content: [] } } },
      content: { items: { prompt: false }, order: [] },
    },
    { languages: ['en', 'uk'] },
  );
  assert.deepEqual(removed.base.content, []);
  assert.deepEqual(removed.base.params?.screen?.starting?.content, []);
});

test('Quiz allows disabling an unreferenced ContentBlock', () => {
  const other = defineText({
    id: id('b7'),
    slug: 'other',
    type: 'text',
    params: {},
    locale: { value: 'Unreferenced' },
  });
  const quiz = defineQuizSection({
    type: 'quiz',
    id: id('b9'),
    slug: 'withExtra',
    params: quizParams,
    locale: { title: 'Quiz', navigationLabel: 'Q' },
    content: { items: { prompt, other }, order: ['prompt', 'other'] },
  });
  const result = quiz.build.overrides(
    {
      content: { items: { other: { params: { disabled: true } } } },
    },
    { languages: ['uk'] },
  );
  assert.equal(result.base.content?.find(block => block.slug === 'other')?.params.disabled, true);
  assert.deepEqual(quiz.build.props({ languages: ['uk'] }).base.params.screen?.starting?.content, ['prompt']);
});

test('Quiz ending success/fail/retry screens must not target effectively disabled ContentBlocks', () => {
  for (const location of ['success', 'fail', 'retry'] as const) {
    const quiz = defineQuizSection({
      type: 'quiz',
      id: id('c1'),
      slug: 'endingQuiz',
      params: {
        ...quizParams,
        screen: {
          starting: { content: [] },
          ending: {
            success: { content: location === 'success' ? ['prompt'] : [] },
            fail: { content: location === 'fail' ? ['prompt'] : [] },
            retry: { content: location === 'retry' ? ['prompt'] : [] },
          },
        },
      },
      locale: { title: 'Quiz', navigationLabel: 'Q' },
      content: { items: { prompt }, order: ['prompt'] },
    });
    assert.throws(
      () =>
        quiz.build.overrides(
          {
            content: { items: { prompt: { params: { disabled: true } } } },
          },
          { languages: ['uk'] },
        ),
      new RegExp('screen ending\\.' + location + ' references disabled ContentBlock: prompt'),
    );
  }
});
