import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { defineText } from '../../contentBlocks/primitive/defineText/defineText';
import { defineContentSection } from '../defineContentSection/defineContentSection';
import { defineQuizSection } from './defineQuizSection';
import { quizSection_Config_Schema } from './defineQuizSection.schemas';

describe('Configurators', () => {
  describe('Sections', () => {
    describe('defineQuizSection', () => {
      const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
      const prompt = defineText<'prompt', ['en', 'uk']>({
        id: id('b1'),
        slug: 'prompt',
        type: 'text',
        params: {},
        locale: { value: { en: 'Read', uk: 'Читай' } },
      });
      const quizParams = {
        selection: { mode: 'sample' as const, questionIds: [id('c2'), id('c3'), id('c4')], count: 3 },
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
        defineQuizSection<'quiz', { prompt: typeof prompt }, ['en', 'uk']>({
          type: 'quiz',
          id: id('b4'),
          slug: 'quiz',
          params: quizParams,
          locale: { title: 'Quiz', navigationLabel: 'Q' },
          children: ['prompt'],
          prompt,
        });

      test('Content Section rejects authored raw blocks and allows valid build overrides', () => {
        const section = defineContentSection<'intro', { prompt: typeof prompt }, ['en', 'uk']>({
          type: 'content',
          id: id('b2'),
          slug: 'intro',
          params: {},
          locale: { title: { en: 'Theory', uk: 'Теорія' }, navigationLabel: '1' },
          children: ['prompt'],
          prompt,
        });
        assert.equal(section.build.data({ languages: ['en', 'uk'] }).base.slug, 'intro');
        assert.deepEqual(section.build.overrides({ children: ['prompt'] }, { languages: ['en', 'uk'] }).base.children, [
          'prompt',
        ]);
        assert.deepEqual(section.config.locales(), { locale: { title: { en: 'Theory', uk: 'Теорія' } } });
        assert.throws(() =>
          defineContentSection({
            type: 'content',
            id: id('b3'),
            slug: 'bad',
            params: {},
            locale: { title: 'Invalid', navigationLabel: 'X' },
            children: ['prompt'],
            // @ts-expect-error Raw data is not a ContentBlock configurator.
            prompt: prompt.config.base,
          }).build.data({ languages: ['en'] }),
        );
      });

      test('Quiz preserves named screen references and scoring semantics', () => {
        const quiz = makeQuiz();
        assert.equal(quiz.type, 'quiz');
        assert.deepEqual(quiz.build.data({ languages: ['en', 'uk'] }).base.params.screen?.starting?.content, [
          'prompt',
        ]);
        assert.equal(quiz.build.data({ languages: ['en', 'uk'] }).base.params.interaction.retries, 1);
        assert.deepEqual(
          quiz.build.overrides({ params: { skippable: false } }, { languages: ['en', 'uk'] }).base.params,
          {
            skippable: false,
          },
        );
        assert.deepEqual(
          quiz.build.overrides({ params: { skippable: true } }, { languages: ['en', 'uk'] }).base.params,
          {
            skippable: true,
          },
        );
        assert.deepEqual(
          quiz.build.overrides({ params: { interaction: { retries: 2 } } }, { languages: ['en', 'uk'] }).base.params
            ?.interaction,
          { retries: 2 },
        );
        const overridden = quiz.build.overrides(
          {
            prompt: { locale: { value: { uk: 'Читай далі' } } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(overridden.locale?.uk?.prompt, { locale: { value: 'Читай далі' } });
        assert.equal(
          quizSection_Config_Schema.safeParse({
            ...quiz.config.base,
            children: quiz.children,
            prompt,
            locale: { title: 'Quiz', navigationLabel: 'Q' },
            params: { ...quizParams, interaction: { ...quizParams.interaction, retries: -1 } },
          }).success,
          false,
        );
        assert.throws(
          () =>
            makeQuiz().build.overrides(
              {
                children: [],
                prompt: false,
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
            defineQuizSection<'badQuiz', { prompt: typeof prompt }, ['en', 'uk']>({
              type: 'quiz',
              id: id('b5'),
              slug: 'badQuiz',
              params: { ...quizParams, screen: { starting: { content: ['notPresent'] } } },
              locale: { title: 'Quiz', navigationLabel: 'Q' },
              children: ['prompt'],
              prompt,
            }).build.data({ languages: ['en'] }),
          /unknown ContentBlock/,
        );
      });

      test('Quiz requires stable explicit unique Question UUIDs and valid sample bounds', () => {
        const quiz = makeQuiz();
        assert.deepEqual(quiz.build.data({ languages: ['en'] }).base.params.selection.questionIds, [
          id('c2'),
          id('c3'),
          id('c4'),
        ]);
        assert.throws(
          () => quiz.build.overrides({ params: { selection: { questionIds: [] } } }, { languages: ['en'] }),
          /nonempty|too_small|Invalid|array/i,
        );
        assert.throws(
          () =>
            quiz.build.overrides(
              { params: { selection: { questionIds: [id('c2'), id('c2')] } } },
              { languages: ['en'] },
            ),
          /unique|Duplicate|Invalid/,
        );
        assert.throws(
          () => quiz.build.overrides({ params: { selection: { count: 4 } } }, { languages: ['en'] }),
          /sample count/,
        );
        assert.throws(
          () => quiz.build.overrides({ params: { selection: { questionIds: ['not-a-uuid'] } } }, { languages: ['en'] }),
          /uuid|Invalid/,
        );
      });

      test('Quiz grading thresholds require nonnegative points and percentage within 0–100', () => {
        const quiz = makeQuiz();
        const build = (mode: 'percentage' | 'points', successThreshold: number) =>
          quiz.build.overrides({ params: { grading: { mode, successThreshold } } }, { languages: ['en', 'uk'] });
        assert.doesNotThrow(() => build('percentage', 0));
        assert.doesNotThrow(() => build('percentage', 100));
        assert.doesNotThrow(() => build('points', 101));
        assert.throws(() => build('percentage', -1), /Invalid Quiz|Invalid.*override|successThreshold/);
        assert.throws(() => build('percentage', 101), /Invalid Quiz|Invalid.*override|successThreshold/);
        assert.throws(() => build('points', -1), /Invalid Quiz|Invalid.*override|successThreshold/);
      });

      test('Quiz screens cannot reference authored or overridden disabled ContentBlocks', () => {
        const disabledPrompt = defineText({
          id: id('b6'),
          slug: 'prompt',
          type: 'text',
          params: { disabled: true },
          locale: { value: 'Unavailable' },
        });
        const deferredQuiz = defineQuizSection<'badDisabledQuiz', { prompt: typeof disabledPrompt }, ['en', 'uk']>({
          type: 'quiz',
          id: id('b8'),
          slug: 'badDisabledQuiz',
          params: quizParams,
          locale: { title: 'Quiz', navigationLabel: 'Q' },
          children: ['prompt'],
          prompt: disabledPrompt,
        });
        assert.equal(deferredQuiz.slug, 'badDisabledQuiz');
        assert.throws(
          () => deferredQuiz.build.data({ languages: ['en', 'uk'] }),
          /screen starting references disabled ContentBlock: prompt/,
        );
        assert.throws(
          () => deferredQuiz.build.overrides({}, { languages: ['en', 'uk'] }),
          /screen starting references disabled ContentBlock: prompt/,
        );

        const quiz = makeQuiz();
        assert.throws(
          () =>
            quiz.build.overrides(
              {
                prompt: { params: { disabled: true } },
              },
              { languages: ['en', 'uk'] },
            ),
          /screen starting references disabled ContentBlock: prompt/,
        );
        // A rejected override cannot alter the authored configurator.
        assert.equal(
          (quiz.build.data({ languages: ['uk'] }).base.prompt as { params: { disabled?: boolean } })?.params.disabled,
          undefined,
        );
      });

      test('Quiz accepts atomic screen-reference removal together with nested disable or structural removal', () => {
        const quiz = makeQuiz();
        const disabled = quiz.build.overrides(
          {
            params: { screen: { starting: { content: [] } } },
            prompt: { params: { disabled: true } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(disabled.base.params?.screen?.starting?.content, []);
        assert.equal((disabled.base.prompt as { params?: { disabled?: boolean } })?.params?.disabled, true);
        assert.equal(
          Object.hasOwn(disabled.base.prompt as object, 'slug'),
          false,
          'sparse child patches cannot repeat identity',
        );
        assert.equal(
          (quiz.build.data({ languages: ['uk'] }).base.prompt as { params: { disabled?: boolean } })?.params.disabled,
          undefined,
        );

        const removed = quiz.build.overrides(
          {
            params: { screen: { starting: { content: [] } } },
            children: [],
            prompt: false,
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(removed.base.children, []);
        assert.equal(removed.base.prompt, false);
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
        const quiz = defineQuizSection<'withExtra', { prompt: typeof prompt; other: typeof other }, ['en', 'uk']>({
          type: 'quiz',
          id: id('b9'),
          slug: 'withExtra',
          params: quizParams,
          locale: { title: 'Quiz', navigationLabel: 'Q' },
          children: ['prompt', 'other'],
          prompt,
          other,
        });
        const result = quiz.build.overrides(
          {
            other: { params: { disabled: true } },
          },
          { languages: ['uk'] },
        );
        assert.equal((result.base.other as { params?: { disabled?: boolean } })?.params?.disabled, true);
        assert.deepEqual(quiz.build.data({ languages: ['uk'] }).base.params.screen?.starting?.content, ['prompt']);
      });

      test('Quiz ending success/fail/retry screens must not target effectively disabled ContentBlocks', () => {
        for (const location of ['success', 'fail', 'retry'] as const) {
          const quiz = defineQuizSection<'endingQuiz', { prompt: typeof prompt }, ['en', 'uk']>({
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
            children: ['prompt'],
            prompt,
          });
          assert.throws(
            () =>
              quiz.build.overrides(
                {
                  prompt: { params: { disabled: true } },
                },
                { languages: ['uk'] },
              ),
            new RegExp('screen ending\\.' + location + ' references disabled ContentBlock: prompt'),
          );
        }
      });
    });
  });
});
