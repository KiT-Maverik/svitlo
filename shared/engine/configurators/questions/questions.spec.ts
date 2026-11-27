import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { defineText } from '../contentBlocks/primitive/defineText';
import {
  answerWithNumber_Config_Schema,
  defineAnswerWithNumber,
  defineAnswerWithText,
  defineBuildAnswerWithBlocks,
  defineFillBlanksWithBlocks,
  defineFillBlanksWithText,
  defineMatchBlocks,
  defineOrderSequence,
  defineSelectMultipleAnswers,
  defineSelectOneAnswer,
  selectOneAnswer_Data_Schema,
} from './index';

describe('Configurators', () => {
  describe('Questions', () => {
    describe('question configurators', () => {
      const scope = { languages: ['en', 'uk'] as const };
      const atPath = (value: unknown, ...keys: string[]): unknown => {
        let current: unknown = value;
        for (const key of keys) {
          assert.ok(current !== null && typeof current === 'object' && key in current,
            'Missing output property: ' + key);
          current = (current as Record<string, unknown>)[key];
        }
        return current;
      };
      const id = 'b775647f-203d-481a-a1c7-4d331c779d6a';
      const block = <const Slug extends string>(slug: Slug, text: string) =>
        defineText({ id, slug, type: 'text', params: {}, locale: { value: text } });
      const promptBlock = block('promptBlock', 'Question?');
      const yes = block('yes', 'Yes');
      const no = block('no', 'No');
      const maybe = block('maybe', 'Maybe');
      const extra = block('extra', 'Extra');
      const collection = <const Slug extends string, T extends { slug: Slug }>(value: T) =>
        ({ children: [value.slug], [value.slug]: value }) as { children: Slug[] } & Record<Slug, T>;
      const prompt = { question: collection(promptBlock) };
      const params = { assessmentMethod: 'retrieval' as const, restrictions: ['dyslexia' as const] };
      const localized = { en: 'Answer', uk: 'Відповідь' } as const;
      const common = <const Type extends string>(type: Type) => ({
        id,
        slug: 'questionOne' as const,
        type,
        params,
        locale: {},
        content: prompt,
      });
      const answers = {
        correct: collection(yes),
        incorrect: collection(no),
        distractors: collection(maybe),
      };

      test('all nine Questions expose immutable stateless Build instead of mutable overrides', () => {
        const instances = [
          (() => {
            const config = { ...common('selectOneAnswer'), content: { ...prompt, answers } };
            return defineSelectOneAnswer<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
          })(),
          (() => {
            const config = { ...common('selectMultipleAnswers'), content: { ...prompt, answers } };
            return defineSelectMultipleAnswers<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
          })(),
          (() => {
            const config = {
              ...common('matchBlocks'),
              content: { ...prompt, pairs: {  pairOne: { left: yes, right: no } , children: ['pairOne'] } },
            };
            return defineMatchBlocks<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
          })(),
          (() => {
            const config = {
              ...common('answerWithText'),
              locale: { correctAnswers: { first: 'Yes', second: localized }, placeholder: localized },
            };
            return defineAnswerWithText<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
          })(),
          (() => {
            const config = {
              ...common('answerWithNumber'),
              params: { ...params, correctAnswers: [42] },
              locale: { placeholder: localized },
            };
            return defineAnswerWithNumber<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
          })(),
          (() => {
            const config = {
              ...common('orderSequence'),
              content: { ...prompt, sequence: collection(yes) },
            };
            return defineOrderSequence<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
          })(),
          (() => {
            const config = {
              ...common('buildAnswerWithBlocks'),
              locale: { placeholder: localized },
              content: { ...prompt, correctSequence: collection(yes), distractors: collection(no) },
            };
            return defineBuildAnswerWithBlocks<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
          })(),
          (() => {
            const config = {
              ...common('fillBlanksWithBlocks'),
              locale: { placeholder: localized },
              content: {
                ...prompt,
                slots: {  slotOne: { correctAnswer: yes } , children: ['slotOne'] },
                distractors: collection(no),
              },
            };
            return defineFillBlanksWithBlocks<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
          })(),
          (() => {
            const config = {
              ...common('fillBlanksWithText'),
              locale: { placeholder: localized },
              content: {
                ...prompt,
                slots: {
                   slotOne: { correctAnswers: { first: 'Yes', second: localized } } ,
                  children: ['slotOne'],
                },
              },
            };
            return defineFillBlanksWithText<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
          })(),
        ];

        for (const question of instances) {
          assert.equal(question.id, id);
          assert.equal(question.slug, 'questionOne');
          assert.equal(question.config.base.type, question.type);
          assert.equal(typeof question.build.data, 'function');
          assert.equal(typeof question.build.overrides, 'function');
          assert.equal('override' in question, false);
          assert.equal('disable' in question, false);
          assert.equal('overrides' in question.config, false);
          const a = question.build.data(scope);
          const b = question.build.data(scope);
          assert.deepEqual(a, b);
          assert.equal(atPath(a.base.content, 'question', 'promptBlock', 'slug'), 'promptBlock');
          assert.doesNotThrow(() => JSON.stringify(a));
          const override = question.build.overrides as (patch: never, options: typeof scope) => unknown;
          assert.doesNotThrow(() => JSON.stringify(override({ params: { disabled: true } } as never, scope)));
          assert.throws(() => override({ type: 'modified' } as never, scope), /overrides/);
          assert.throws(() => override({ locale: { unexpected: 'X' } } as never, scope), /overrides/);
        }
        assert.equal(
          (
            instances[0].build.data(scope).base.content as unknown as {
              answers: { correct: { yes: { slug: string } } };
            }
          ).answers.correct.yes.slug,
          'yes',
        );
        assert.equal(
          (
            instances[2].build.data(scope).base.content as unknown as {
              pairs: { pairOne: { left: { slug: string } } };
            }
          ).pairs.pairOne.left.slug,
          'yes',
        );
        assert.equal(
          atPath(instances[5].build.data(scope).base.content, 'sequence', 'yes', 'slug'),
          'yes',
        );
        assert.equal(
          atPath(instances[6].build.data(scope).base.content, 'correctSequence', 'yes', 'slug'),
          'yes',
        );
        assert.equal(
          (
            instances[7].build.data(scope).base.content as {
              slots: { children: string[] };
            }
          ).slots.children[0],
          'slotOne',
        );
      });

      test('Question prompt collections support additions, disables, ordering, and identity guards', () => {
        const question = (() => {
          const config = {
            ...common('answerWithNumber'),
            params: { ...params, correctAnswers: [5] },
            locale: { placeholder: localized },
          };
          return defineAnswerWithNumber<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        const override = question.build.overrides(
          {
            content: {
              question: {
                 promptBlock: false ,
                 extra ,
                children: ['extra'],
              },
            },
          },
          scope,
        );
        assert.deepEqual(
          (override.base.content as { question: { children: string[] } }).question.children,
          ['extra'],
        );
        assert.throws(
          () =>
            question.build.overrides(
              {
                content: { question: {  promptBlock: false  } },
              },
              scope,
            ),
          /children/,
        );
        assert.throws(
          () =>
            question.build.overrides(
              {
                content: { question: { children: ['notFound'] as never } },
              },
              scope,
            ),
          /Unknown or disabled child/,
        );
        assert.throws(
          () =>
            question.build.overrides(
              {
                content: { question: {  promptBlock: { id: 'changed' } as never  } },
              },
              scope,
            ),
          /overrides/,
        );
        assert.deepEqual(
          atPath(question.build.data(scope).base.content, 'question', 'promptBlock', 'slug'),
          'promptBlock',
        );
      });

      test('Question prompt and scoring groups publish only explicit sparse child patches', () => {
        const note = defineText<'note', ['en', 'uk']>({
          id: 'b775647f-203d-481a-a1c7-4d331c779d6b',
          slug: 'note',
          type: 'text',
          params: {},
          locale: { value: { en: 'Read carefully', uk: 'Читайте уважно' } },
        });
        const config = {
          ...common('answerWithNumber'),
          params: { ...params, correctAnswers: [5] },
          locale: { placeholder: localized },
          content: {
            question: { children: ['promptBlock', 'note'], promptBlock, note },
          },
        };
        const question = defineAnswerWithNumber<typeof config.slug, typeof config.content, ['en', 'uk']>(config);

        assert.deepEqual(question.build.overrides({}, scope), { base: {}, locale: undefined });
        assert.deepEqual(
          question.build.overrides({ content: { question: {} } }, scope),
          { base: {}, locale: undefined },
        );
        const oneChild = question.build.overrides(
          { content: { question: { promptBlock: { params: { disabled: true } } } } },
          scope,
        );
        assert.deepEqual(oneChild.base, {
          content: { question: { promptBlock: { params: { disabled: true } } } },
        });
        assert.equal(oneChild.locale, undefined);
        const localizedPatch = question.build.overrides(
          { content: { question: { note: { locale: { value: { uk: 'Оновлено' } } } } } },
          { languages: ['uk'] },
        );
        assert.deepEqual(localizedPatch.base, {});
        assert.deepEqual(localizedPatch.locale?.uk, {
          content: { question: { note: { locale: { value: 'Оновлено' } } } },
        });
        assert.equal(localizedPatch.locale?.en, undefined);
        const structural = question.build.overrides(
          { content: { question: { note: false, children: ['promptBlock'] } } },
          scope,
        );
        assert.deepEqual(
          (structural.base.content as { question: { children: string[] } }).question.children,
          ['promptBlock'],
        );
        assert.equal('note' in (structural.base.content as { question: Record<string, unknown> }).question, false);
        assert.deepEqual(
          (question.build.data(scope).base.content as { question: { children: string[] } }).question.children,
          ['promptBlock', 'note'],
        );

        const selectConfig = { ...common('selectOneAnswer'), content: { ...prompt, answers } };
        const select = defineSelectOneAnswer<
          typeof selectConfig.slug, typeof selectConfig.content, ['en', 'uk']
        >(selectConfig);
        assert.deepEqual(
          select.build.overrides({ content: { answers: { correct: {} } } }, scope),
          { base: {}, locale: undefined },
        );
        assert.deepEqual(
          select.build.overrides({
            content: { answers: { incorrect: { no: { params: { disabled: true } } } } },
          }, scope).base,
          { content: { answers: { incorrect: { no: { params: { disabled: true } } } } } },
        );
      });

      test('Question matching pairs keep semantic child roles sparse', () => {
        const config = {
          ...common('matchBlocks'),
          content: {
            ...prompt,
            pairs: { children: ['pairOne'], pairOne: { left: yes, right: no } },
          },
        };
        const question = defineMatchBlocks<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        assert.deepEqual(
          question.build.overrides({ content: { pairs: {} } }, scope),
          { base: {}, locale: undefined },
        );
        const localized = question.build.overrides(
          { content: { pairs: { pairOne: { left: { locale: { value: { uk: 'Ліворуч' } } } } } } },
          { languages: ['uk'] },
        );
        assert.deepEqual(localized.base, {});
        assert.deepEqual(localized.locale?.uk, {
          content: { pairs: { pairOne: { left: { locale: { value: 'Ліворуч' } } } } },
        });
        assert.equal(JSON.stringify(localized).includes('"right"'), false);
        assert.deepEqual(
          (question.build.data(scope).base.content as { pairs: { children: string[] } }).pairs.children,
          ['pairOne'],
        );
      });

      test('Question localized answers and slots preserve semantic Data groups and sparse languages', () => {
        const text = (() => {
          const config = {
            ...common('answerWithText'),
            locale: { correctAnswers: { first: 'Yes', second: localized }, placeholder: localized },
          };
          return defineAnswerWithText<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        const props = text.build.data(scope);
        assert.deepEqual((props.locale?.uk as { locale: { correctAnswers: string[] } }).locale.correctAnswers, [
          'Yes',
          'Відповідь',
        ]);
        assert.deepEqual((props.locale?.en as { locale: { correctAnswers: string[] } }).locale.correctAnswers, [
          'Yes',
          'Answer',
        ]);
        assert.equal(JSON.stringify(props).includes('"first"'), false);
        const patch = text.build.overrides({ locale: { correctAnswers: { second: { uk: 'Так' } } } }, scope);
        assert.equal(patch.locale?.en, undefined);
        assert.deepEqual((patch.locale?.uk as { locale: { correctAnswers: string[] } }).locale.correctAnswers, [
          'Yes',
          'Так',
        ]);

        const blanks = (() => {
          const config = {
            ...common('fillBlanksWithText'),
            locale: { placeholder: localized },
            content: {
              ...prompt,
              slots: {  one: { correctAnswers: { yes: 'Yes', another: localized } } , children: ['one'] },
            },
          };
          return defineFillBlanksWithText<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        assert.deepEqual((blanks.build.data(scope).locale?.uk as {
          locale: { slots: { children: string[]; one: { correctAnswers: string[] } } };
        }).locale.slots, {
          children: ['one'], one: { correctAnswers: ['Yes', 'Відповідь'] },
        });
        const sparse = blanks.build.overrides(
          { content: { slots: {  one: { correctAnswers: { another: { uk: 'Так' } } }  } } },
          scope,
        );
        assert.equal(sparse.locale?.en, undefined);
        assert.deepEqual((sparse.locale?.uk as {
          locale: { slots: { children: string[]; one: { correctAnswers: string[] } } };
        }).locale.slots, {
          children: ['one'], one: { correctAnswers: ['Yes', 'Так'] },
        });
      });

      test('numeric scoring values remain atomic and Question build results are isolated', () => {
        const input = {
          ...common('answerWithNumber'),
          params: { ...params, correctAnswers: [1, 2] },
          locale: { placeholder: localized },
        };
        const question = defineAnswerWithNumber<typeof input.slug, typeof input.content, ['en', 'uk']>(input);
        assert.equal(answerWithNumber_Config_Schema.safeParse(input).success, true);
        const first = question.build.data(scope);
        const patch = question.build.overrides({ params: { correctAnswers: [7], restrictions: [] } }, scope);
        assert.deepEqual((patch.base.params as { correctAnswers: number[] }).correctAnswers, [7]);
        (patch.base.params as { correctAnswers: number[] }).correctAnswers.push(8);
        assert.deepEqual(
          (question.build.data(scope).base.params as { correctAnswers: number[] }).correctAnswers,
          [1, 2],
        );
        (first.base.params as { correctAnswers: number[] }).correctAnswers.push(3);
        assert.deepEqual(
          (question.build.data(scope).base.params as { correctAnswers: number[] }).correctAnswers,
          [1, 2],
        );
        assert.throws(() => question.build.overrides({ params: { correctAnswers: ['two'] } } as never, scope));
      });

      test('scored answers remain enabled after nested child overrides', () => {
        const one = (() => {
          const config = { ...common('selectOneAnswer'), content: { ...prompt, answers } };
          return defineSelectOneAnswer<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        assert.throws(
          () =>
            one.build.overrides(
              { content: { answers: { correct: {  yes: { params: { disabled: true } }  } } } },
              scope,
            ),
          /enabled ContentBlock/,
        );

        const multiple = (() => {
          const config = {
            ...common('selectMultipleAnswers'),
            content: { ...prompt, answers },
          };
          return defineSelectMultipleAnswers<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        assert.throws(
          () =>
            multiple.build.overrides(
              { content: { answers: { correct: {  yes: { params: { disabled: true } }  } } } },
              scope,
            ),
          /enabled ContentBlock/,
        );

        const match = (() => {
          const config = {
            ...common('matchBlocks'),
            content: { ...prompt, pairs: {  pairOne: { left: yes, right: no } , children: ['pairOne'] } },
          };
          return defineMatchBlocks<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        assert.throws(
          () =>
            match.build.overrides(
              { content: { pairs: {  pairOne: { left: { params: { disabled: true } } }  } } },
              scope,
            ),
          /enabled ContentBlock/,
        );

        const blanks = (() => {
          const config = {
            ...common('fillBlanksWithBlocks'),
            locale: { placeholder: 'Fill' },
            content: {
              ...prompt,
              slots: {  slotOne: { correctAnswer: yes } , children: ['slotOne'] },
              distractors: collection(no),
            },
          };
          return defineFillBlanksWithBlocks<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        assert.throws(
          () =>
            blanks.build.overrides(
              {
                content: { slots: {  slotOne: { correctAnswer: { params: { disabled: true } } }  } },
              },
              scope,
            ),
          /enabled ContentBlock/,
        );

        const sequence = (() => {
          const config = {
            ...common('orderSequence'),
            content: { ...prompt, sequence: collection(yes) },
          };
          return defineOrderSequence<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        assert.throws(
          () =>
            sequence.build.overrides(
              { content: { sequence: {  yes: { params: { disabled: true } }  } } },
              scope,
            ),
          /enabled ContentBlock/,
        );

        const built = (() => {
          const config = {
            ...common('buildAnswerWithBlocks'),
            locale: { placeholder: 'Build' },
            content: { ...prompt, correctSequence: collection(yes), distractors: collection(no) },
          };
          return defineBuildAnswerWithBlocks<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        assert.throws(
          () =>
            built.build.overrides(
              { content: { correctSequence: {  yes: { params: { disabled: true } }  } } },
              scope,
            ),
          /enabled ContentBlock/,
        );
      });

      test('SelectMultipleAnswers rejects partially disabled correct answer sets', () => {
        const secondCorrect = block('secondCorrect', 'Second correct answer');
        const multi = (() => {
          const config = {
            ...common('selectMultipleAnswers'),
            content: {
              ...prompt,
              answers: {
                correct: {  yes, secondCorrect , children: ['yes', 'secondCorrect'] },
                incorrect: collection(no),
                distractors: collection(maybe),
              },
            },
          };
          return defineSelectMultipleAnswers<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        assert.throws(
          () =>
            multi.build.overrides(
              {
                content: { answers: { correct: {  yes: { params: { disabled: true } }  } } },
              },
              scope,
            ),
          /enabled ContentBlock/,
        );
      });

      test('invariant-only Questions publish a required empty locale Props object', () => {
        const question = (() => {
          const config = {
            ...common('selectOneAnswer'),
            content: { ...prompt, answers },
          };
          return defineSelectOneAnswer<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        const built = question.build.data(scope);
        assert.deepEqual(built.base.locale, {});
        assert.equal(built.locale, undefined);
        assert.equal(selectOneAnswer_Data_Schema.safeParse(built.base).success, true);
        // A sparse patch must not inject empty locale data.
        const patch = question.build.overrides({ params: { restrictions: [] } }, scope);
        assert.equal(Object.hasOwn(patch.base, 'locale'), false);
      });

      test('explicit publication languages limit resource and override locale files', () => {
        const question = (() => {
          const config = {
            ...common('answerWithText'),
            locale: {
              placeholder: { en: 'Answer', uk: 'Відповідь', pl: 'Odpowiedź' },
              correctAnswers: {
                first: { en: 'Yes', uk: 'Так', pl: 'Tak' },
                second: 'OK',
              },
            },
          };
          return defineAnswerWithText<typeof config.slug, typeof config.content, ['en', 'uk', 'pl']>(config);
        })();
        const published = question.build.data({ languages: ['uk'] });
        assert.deepEqual(Object.keys(published.locale ?? {}), ['uk']);
        assert.deepEqual((published.locale?.uk as { locale: { correctAnswers: string[] } }).locale.correctAnswers, [
          'Так',
          'OK',
        ]);
        const patch = question.build.overrides(
          { locale: { correctAnswers: { first: { en: 'Sure', uk: 'Авжеж', pl: 'Pewnie' } } } },
          { languages: ['uk'] },
        );
        assert.deepEqual(Object.keys(patch.locale ?? {}), ['uk']);
        assert.deepEqual((patch.locale?.uk as { locale: { correctAnswers: string[] } }).locale.correctAnswers, [
          'Авжеж',
          'OK',
        ]);
        assert.equal(
          question.build.overrides({ locale: { correctAnswers: { first: { pl: 'Pewnie' } } } }, { languages: ['uk'] })
            .locale,
          undefined,
        );

        assert.throws(() => question.build.data({ languages: [] }), /nonempty languages/);
        assert.throws(() => question.build.data({ languages: ['uk', 'uk'] }), /unique/);
        assert.throws(() => question.build.data({ languages: ['bad'] as never }));
        assert.throws(() => (question.build.data as (options?: unknown) => unknown)(), /languages/);
      });

      test('publication validates selected child translations without requiring unselected ones', () => {
        const localizedPrompt = defineText<'translatedPrompt', ['en', 'uk', 'pl']>({
          id,
          slug: 'translatedPrompt',
          type: 'text',
          params: {},
          locale: { value: { uk: 'Питання', en: 'Question', pl: 'Pytanie' } },
        });
        const question = (() => {
          const config = {
            ...common('answerWithNumber'),
            params: { ...params, correctAnswers: [4] },
            locale: { placeholder: 'Number' },
            content: { question: collection(localizedPrompt) },
          };
          return defineAnswerWithNumber<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        assert.deepEqual(Object.keys(question.build.data({ languages: ['uk'] }).locale ?? {}), ['uk']);

        const missing = defineText<'missingEnglish', ['uk']>({
          id,
          slug: 'missingEnglish',
          type: 'text',
          params: {},
          locale: { value: { uk: 'Лише українською' } },
        });
        const badQuestion = (() => {
          const config = {
            ...common('answerWithNumber'),
            params: { ...params, correctAnswers: [4] },
            locale: { placeholder: 'Number' },
            content: { question: collection(missing) },
          };
          return defineAnswerWithNumber<typeof config.slug, typeof config.content, ['uk']>(config);
        })();
        assert.doesNotThrow(() => badQuestion.build.data({ languages: ['uk'] }));
        // Requesting an unsupported locale here is intentional: exercise the runtime guard.
        assert.throws(
          () => badQuestion.build.data({ languages: ['en' as never] }),
          /ContentBlock publication|Invalid publication for language en/,
        );
      });

      test('invariant child collections emit no redundant locale files', () => {
        const question = (() => {
          const config = {
            ...common('orderSequence'),
            content: { ...prompt, sequence: collection(yes) },
          };
          return defineOrderSequence<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        assert.equal(question.build.data({ languages: ['uk', 'en'] }).locale, undefined);
      });

      test('nested child overrides publish only the explicitly requested locale', () => {
        const translated = defineText<'translatedPrompt', ['en', 'uk', 'pl']>({
          id,
          slug: 'translatedPrompt',
          type: 'text',
          params: {},
          locale: { value: { uk: 'Запитання', en: 'Question', pl: 'Pytanie' } },
        });
        const question = (() => {
          const config = {
            ...common('answerWithNumber'),
            params: { ...params, correctAnswers: [1] },
            locale: { placeholder: 'Number' },
            content: { question: collection(translated) },
          };
          return defineAnswerWithNumber<typeof config.slug, typeof config.content, ['en', 'uk']>(config);
        })();
        const patch = question.build.overrides(
          {
            content: {
              question: {
                
                  translatedPrompt: { locale: { value: { uk: 'Оновлено', en: 'Updated', pl: 'Zmienione' } } },

              },
            },
          },
          { languages: ['uk'] },
        );
        assert.deepEqual(Object.keys(patch.locale ?? {}), ['uk']);
        assert.equal(atPath(patch.locale?.uk, 'content', 'question', 'translatedPrompt', 'locale', 'value'), 'Оновлено');
      });

      test('localized answer and text-slot projections reject only missing selected translations', () => {
        const answer = (() => {
          const config = {
            ...common('answerWithText'),
            locale: { correctAnswers: { yes: { uk: 'Так' } }, placeholder: 'Answer' },
          };
          return defineAnswerWithText<typeof config.slug, typeof config.content, ['uk']>(config);
        })();
        assert.doesNotThrow(() => answer.build.data({ languages: ['uk'] }));
        // Explicitly bypass the compile-time scope to verify the runtime rejection.
        assert.throws(() => answer.build.data({ languages: ['en' as never] }), /Incomplete accepted-answer set/);

        const slot = (() => {
          const config = {
            ...common('fillBlanksWithText'),
            locale: { placeholder: 'Answer' },
            content: {
              ...prompt,
              slots: {  firstSlot: { correctAnswers: { yes: { uk: 'Так' } } } , children: ['firstSlot'] },
            },
          };
          return defineFillBlanksWithText<typeof config.slug, typeof config.content, ['uk']>(config);
        })();
        assert.doesNotThrow(() => slot.build.data({ languages: ['uk'] }));
        assert.throws(() => slot.build.data({ languages: ['en' as never] }), /Incomplete text slot/);
      });
    });
  });
});
