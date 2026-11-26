import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { UNRESOLVED_YOUTUBE_HREF } from '../../../schemas/media.schemas';
import { defineScene } from '../../contentBlocks/defineScene/defineScene';
import { defineYoutube } from '../../contentBlocks/defineYoutube/defineYoutube';
import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineContentSection } from '../../sections/defineContentSection/defineContentSection';
import { defineFlashcardsSection } from '../../sections/defineFlashcardsSection/defineFlashcardsSection';
import { defineQuizSection } from '../../sections/defineQuizSection/defineQuizSection';
import { defineLesson } from './defineLesson';
import { lesson_Config_Schema, lesson_Props_Schema, lessonConfigurator_Schema } from './defineLesson.schemas';

describe('Configurators', () => {
  describe('Lessons', () => {
    describe('defineLesson', () => {
      const id = (suffix: string) => '663572e7-bd85-4516-86e2-3de07d209e' + suffix;
      const text = defineText<'paragraph', ['en', 'uk']>({
        type: 'text',
        id: id('01'),
        slug: 'paragraph',
        params: {},
        locale: { value: { en: 'Hello', uk: 'Привіт' } },
      });
      const section = defineContentSection<'intro', { paragraph: typeof text }, ['en', 'uk']>({
        type: 'content',
        id: id('02'),
        slug: 'intro',
        params: {},
        locale: { title: { en: 'Introduction', uk: 'Вступ' }, navigationLabel: '1' },
        content: { items: { paragraph: text }, order: ['paragraph'] },
      });
      const textValue = (blocks: { type: string; locale?: unknown }[] | undefined): string | undefined => {
        const block = blocks?.[0];
        if (block?.type !== 'text') return undefined;
        return (block.locale as { value?: string } | undefined)?.value;
      };
      const makeLesson = () =>
        defineLesson({
          id: id('03'),
          slug: 'exampleLesson',
          type: 'lesson',
          skills: [],
          params: {
            quizRequiredForCompletion: false,
            languages: ['en', 'uk'] as const,
            sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
          },
          locale: { title: { en: 'Example', uk: 'Приклад' } },
          section: { items: { intro: section }, order: ['intro'] },
        });

      test('Draft Lesson carries unresolved YouTube and Scene through nested Section and restores strict publication', () => {
        const video = defineYoutube<'pendingVideo', ['en', 'uk']>({
          id: id('a1'),
          slug: 'pendingVideo',
          type: 'youtube',
          params: { mode: 'link' },
          locale: {
            href: UNRESOLVED_YOUTUBE_HREF,
            label: { en: 'Watch', uk: 'Переглянути' },
          },
        });
        const scene = defineScene<'pendingScene', ['en', 'uk']>({
          id: id('a2'),
          slug: 'pendingScene',
          type: 'scene',
          params: {},
          locale: { value: { en: 'Explore', uk: 'Досліджуй' } },
        });
        const media = defineContentSection<'media', { pendingVideo: typeof video; pendingScene: typeof scene }, ['en', 'uk']>({
          id: id('a3'),
          slug: 'media',
          type: 'content',
          params: {},
          locale: { title: 'Media', navigationLabel: '1' },
          content: { items: { pendingVideo: video, pendingScene: scene }, order: ['pendingVideo', 'pendingScene'] },
        });
        const lesson = defineLesson({
          id: id('a4'),
          slug: 'mediaLesson',
          type: 'lesson',
          skills: [],
          params: {
            quizRequiredForCompletion: false,
            languages: ['en', 'uk'] as const,
            sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
          },
          locale: { title: 'Draft media' },
          section: { items: { media }, order: ['media'] },
        });
        const draft = lesson.build.props({ languages: ['uk'], mode: 'draft' });
        assert.match(JSON.stringify(draft.base), new RegExp(UNRESOLVED_YOUTUBE_HREF));
        assert.equal(draft.locale?.en, undefined);
        assert.equal(draft.locale?.uk?.section?.[0]?.content?.length, 2);
        assert.throws(() => lesson.build.props({ languages: ['uk'] }), /unresolved video reference|Scene/i);
        assert.deepEqual(lesson.build.props({ languages: ['uk'], mode: 'draft' }), draft);
        assert.throws(() => scene.build.props({ languages: ['uk'] }), /Scene/i);
      });

      test('Lesson Build overrides carry the owning ID outside the sparse Props patch', () => {
        const lesson = makeLesson();
        const noChanges = lesson.build.overrides({}, { languages: ['en'] });
        assert.deepEqual(noChanges, { id: lesson.id, base: {}, locale: undefined });
        assert.equal('id' in noChanges.base, false);

        const adapted = lesson.build.overrides(
          { params: { sections: { allowSkipping: true } } },
          { languages: ['uk'] },
        );
        assert.equal(adapted.id, lesson.id);
        assert.equal('id' in adapted.base, false);
        assert.equal('id' in (adapted.locale?.uk ?? {}), false);
        assert.equal(lesson.build.props({ languages: ['uk'] }).base.id, lesson.id);
        assert.deepEqual(lesson.build.overrides({}, { languages: ['en'] }), noChanges);
      });

      test('Lesson accepts optional audience ranges and validates their publication and sparse overrides', () => {
        const input = {
          id: id('70'),
          slug: 'audienceLesson',
          type: 'lesson' as const,
          skills: [],
          params: {
            languages: ['en', 'uk'] as const,
            quizRequiredForCompletion: false,
            sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
            age: { min: 6, max: 10 },
            grade: { min: 1, max: 4 },
          },
          locale: { title: 'For early learners' },
          section: { items: { intro: section }, order: ['intro'] },
        };
        const lesson = defineLesson(input);
        const built = lesson.build.props({ languages: ['en'] });
        assert.deepEqual(built.base.params.age, { min: 6, max: 10 });
        assert.deepEqual(built.base.params.grade, { min: 1, max: 4 });
        assert.equal(lesson_Config_Schema.safeParse(input).success, true);

        const patch = lesson.build.overrides({ params: { age: { min: 7 }, grade: { max: 5 } } }, { languages: ['en'] });
        assert.equal(patch.id, lesson.id);
        assert.equal('id' in patch.base, false, 'identity must never enter the sparse Props patch');
        assert.deepEqual(patch.base.params, { age: { min: 7 }, grade: { max: 5 } });
        assert.equal(patch.locale, undefined);
        assert.throws(() => lesson.build.overrides({ params: { age: { min: 11 } } }, { languages: ['en'] }));
        assert.equal(
          lesson_Config_Schema.safeParse({ ...input, params: { ...input.params, age: { min: 11, max: 10 } } }).success,
          false,
        );
        assert.equal(
          lesson_Config_Schema.safeParse({ ...input, params: { ...input.params, grade: { min: 1, max: 41 } } }).success,
          false,
        );
      });

      test('Lesson emits plain Section Props arrays with correct own and nested locale paths', () => {
        const lesson = makeLesson();
        const built = lesson.build.props({ languages: ['en', 'uk'] });
        assert.equal('programId' in lesson.config.base, false);
        assert.equal('programId' in lesson.build.props({ languages: ['en'] }).base, false);
        assert.deepEqual(lesson.config.locales(), { locale: { title: { en: 'Example', uk: 'Приклад' } } });
        assert.equal(lesson.section.items.intro, section);
        assert.equal(built.base.section[0]?.slug, 'intro');
        assert.equal(built.base.section[0]?.content?.[0]?.slug, 'paragraph');
        assert.equal(built.locale?.uk?.locale?.title, 'Приклад');
        assert.equal(textValue(built.locale?.uk?.section?.[0]?.content), 'Привіт');
        assert.equal(built.locale?.en?.section?.[0]?.locale?.title, 'Introduction');
        assert.equal('flashcards' in built.base, false);
        assert.equal('questions' in built.base, false);
        assert.equal(lessonConfigurator_Schema.safeParse(lesson).success, true);
        assert.equal(
          lesson_Props_Schema.safeParse(built.base).success,
          false,
          'untranslated base fragment need not satisfy fully resolved Props schema',
        );
        assert.doesNotThrow(() => JSON.stringify(built));
        assert.equal('override' in lesson, false);
        assert.equal('overrides' in lesson.config, false);
        assert.equal(lesson_Config_Schema.safeParse(lesson.config.base).success, false);
      });

      test('Lesson accepts Quiz and Flashcards Section references without embedding assessment banks', () => {
        const input = {
          id: id('61'),
          slug: 'banklessLesson',
          type: 'lesson' as const,
          skills: [],
          params: {
            quizRequiredForCompletion: false,
            languages: ['en', 'uk'] as const,
            sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
          },
          locale: { title: 'Bankless Lesson' },
          section: { items: { intro: section }, order: ['intro'] },
        };
        const lesson = defineLesson(input);
        const built = lesson.build.props({ languages: ['en'] });
        assert.equal('questions' in built.base, false);
        assert.equal('flashcards' in built.base, false);
        assert.equal(lesson_Config_Schema.safeParse(input).success, true);
        const quiz = defineQuizSection<'banklessQuiz', {}, ['en', 'uk']>({
          id: id('62'),
          slug: 'banklessQuiz',
          type: 'quiz',
          params: {
            selection: { mode: 'all', questionIds: [id('64')] },
            layout: { mode: 'stack' },
            feedbackMode: 'after-completion',
            interaction: {
              retries: 0,
              showErrors: true,
              showCorrectAnswers: false,
              allowExplanations: false,
              allowDeferring: false,
              allowQuestionNavigation: false,
              skippable: false,
            },
            results: { visibility: 'after-review', showScore: true },
          },
          locale: { title: 'Quiz', navigationLabel: 'Quiz' },
          content: { items: {}, order: [] },
        });
        const recall = defineFlashcardsSection<'banklessRecall', {}, ['en', 'uk']>({
          id: id('63'),
          slug: 'banklessRecall',
          type: 'flashcards',
          params: { selection: { flashcardIds: [id('65')] } },
          locale: { title: 'Recall', navigationLabel: 'Cards' },
          content: { items: {}, order: [] },
        });
        const withQuiz = defineLesson({
          ...input,
          section: { items: { intro: section, banklessQuiz: quiz }, order: ['intro', 'banklessQuiz'] },
        });
        const withRecall = defineLesson({
          ...input,
          section: { items: { intro: section, banklessRecall: recall }, order: ['intro', 'banklessRecall'] },
        });
        assert.equal(withQuiz.build.props({ languages: ['en'] }).base.section[1]?.type, 'quiz');
        assert.equal(withRecall.build.props({ languages: ['en'] }).base.section[1]?.type, 'flashcards');
        assert.deepEqual(quiz.build.props({ languages: ['en'] }).base.params.selection, {
          mode: 'all',
          questionIds: [id('64')],
        });
        assert.deepEqual(recall.build.props({ languages: ['en'] }).base.params.selection, { flashcardIds: [id('65')] });
        assert.deepEqual(
          lesson.build
            .overrides(
              { section: { additionalItems: { banklessQuiz: quiz }, order: ['intro', 'banklessQuiz'] } },
              { languages: ['en'] },
            )
            .base.section?.map(item => item.slug),
          ['intro', 'banklessQuiz'],
        );
        assert.throws(
          () => lesson.build.overrides({ questions: {} } as never, { languages: ['en'] }),
          /Unknown Lesson override field/,
        );
        assert.throws(
          () => lesson.build.overrides({ flashcards: {} } as never, { languages: ['en'] }),
          /Unknown Lesson override field/,
        );
        assert.equal(
          lesson_Config_Schema.safeParse({ ...input, questions: {} }).success,
          false,
          'Lesson Config must reject legacy banks',
        );
        assert.deepEqual(lesson.build.props({ languages: ['en'] }), built);
      });

      test('Unscoped children still validate each requested language before publishing Lesson Props', () => {
        const sparseText = defineText<'sparseText', ['uk']>({
          id: id('81'),
          slug: 'sparseText',
          type: 'text',
          params: {},
          locale: { value: { uk: 'Тільки українська' } },
        });
        const unscopedSection = defineContentSection<'unscoped', { sparseText: typeof sparseText }, ['uk']>({
          id: id('82'),
          slug: 'unscoped',
          type: 'content',
          params: {},
          locale: { title: 'Unscoped section', navigationLabel: '1' },
          content: { items: { sparseText }, order: ['sparseText'] },
        });
        const lesson = defineLesson({
          id: id('83'),
          slug: 'incompleteLesson',
          type: 'lesson',
          skills: [],
          params: {
            quizRequiredForCompletion: false,
            languages: ['en', 'uk'] as const,
            sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
          },
          locale: { title: 'Lesson' },
          section: {
            items: {
              // @ts-expect-error Intentionally bypass the incompatible child scope to test runtime validation.
              unscoped: unscopedSection,
            },
            order: ['unscoped'],
          },
        });

        assert.doesNotThrow(() => lesson.build.props({ languages: ['uk'] }));
        assert.throws(
          () => lesson.build.props({ languages: ['en', 'uk'] }),
          /Invalid publication for language en/,
          'An unscoped authoring child cannot publish a missing translation to a scoped parent',
        );
      });

      test('source-only drafts may pass Config shape but cannot publish missing intended locales', () => {
        // A source-only scaffold is intentionally not a fully typed Lesson. Test the
        // runtime Config boundary without weakening RequireLanguages in authored code.
        const draft = {
          id: id('91'),
          slug: 'sourceOnlyDraft',
          type: 'lesson' as const,
          skills: [],
          params: {
            quizRequiredForCompletion: false,
            languages: ['en', 'uk'] as const,
            sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
          },
          locale: { title: { en: 'Source language only' } },
          section: { items: {}, order: [] },
        };
        assert.equal(lesson_Config_Schema.safeParse(draft).success, true, 'Config permits sparse locale dictionaries');
        const lesson = defineLesson(draft as never);
        assert.doesNotThrow(() => lesson.config.validate(draft as never));
        const source = lesson.build.props({ languages: ['en'] });
        assert.equal(source.locale?.en?.locale?.title, 'Source language only');
        assert.deepEqual(source.base.params.languages, ['en'], 'A scoped Build describes only its requested languages');
        assert.throws(
          () => lesson.build.props({ languages: ['en', 'uk'] }),
          /Invalid Lesson Props for language uk/,
          'A source-only Build must never be interpreted as complete for the declared locale set',
        );
      });

      test('all-language Props validation does not supply independent editorial review evidence', () => {
        const lesson = makeLesson();
        const publication = lesson.build.props({ languages: ['en', 'uk'] });
        assert.equal(publication.locale?.en?.locale?.title, 'Example');
        assert.equal(publication.locale?.uk?.locale?.title, 'Приклад');
        assert.equal(Object.hasOwn(publication.base, 'review'), false);
        assert.equal(Object.hasOwn(lesson.config.base, 'production'), false);
        assert.equal(Object.hasOwn(publication.base, 'completed'), false);
        // Passing this check is technical Props completeness, not a readiness
        // judgment: neither editorial approval nor Scene/media availability is input.
      });

      test('Lesson independently overrides Sections, nested ContentBlocks, languages and metadata', () => {
        const lesson = makeLesson();
        const updated = lesson.build.overrides(
          {
            section: {
              items: {
                intro: {
                  content: {
                    items: {
                      paragraph: { locale: { value: { uk: 'Новий текст' } } },
                    },
                  },
                },
              },
            },
            locale: { title: { uk: 'Новий заголовок' } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          updated.base.section?.map(item => item.slug),
          ['intro'],
        );
        assert.equal(textValue(updated.locale?.uk?.section?.[0]?.content), 'Новий текст');
        assert.deepEqual(updated.locale?.uk?.locale, { title: 'Новий заголовок' });
        assert.equal(
          textValue(lesson.build.props({ languages: ['en', 'uk'] }).locale?.uk?.section?.[0]?.content),
          'Привіт',
        );

        const second = defineContentSection<'extra', {}, ['en', 'uk']>({
          type: 'content',
          id: id('05'),
          slug: 'extra',
          params: {},
          locale: { title: 'Extra', navigationLabel: '2' },
          content: { items: {}, order: [] },
        });
        const changed = lesson.build.overrides(
          {
            section: { items: { intro: false }, additionalItems: { extra: second }, order: ['extra'] },
            params: { sections: { allowSkipping: true } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          changed.base.section?.map(item => item.slug),
          ['extra'],
        );
        assert.equal(changed.locale, undefined);
        assert.deepEqual(changed.base.params?.sections, { allowSkipping: true });
        assert.deepEqual(lesson.section.order, ['intro']);
        assert.deepEqual(
          lesson.build.props({ languages: ['en', 'uk'] }).base.section.map(item => item.slug),
          ['intro'],
        );
        assert.throws(
          () => lesson.build.overrides({ section: { items: { intro: false } } }, { languages: ['en', 'uk'] }),
          /order is required/,
        );
        assert.throws(
          () => lesson.build.overrides({ id: id('09') } as never, { languages: ['en', 'uk'] }),
          /Invalid Lesson overrides/,
        );
        assert.throws(
          () => lesson.build.overrides({ params: { languages: ['pl'] } } as never, { languages: ['en', 'uk'] }),
          /Invalid Lesson overrides/,
        );
      });

      test('Lesson event overrides remain sparse and bank fields are forbidden', () => {
        const lesson = makeLesson();
        const events = {
          lessonStarted: false,
          lessonCompleted: { action: 'notify' },
        };
        const patch = lesson.build.overrides({ events }, { languages: ['uk'] });
        assert.equal(patch.id, lesson.id);
        assert.deepEqual(Object.keys(patch).sort(), ['base', 'id', 'locale']);
        assert.deepEqual(patch.base.events, events);
        assert.equal(lesson.build.props({ languages: ['uk'] }).base.events, undefined);
        assert.equal(patch.locale, undefined);
        assert.throws(
          () => lesson.build.overrides({ events: { lessonStarted: () => false } } as never, { languages: ['uk'] }),
          /Invalid Lesson overrides/,
        );
        assert.equal(
          lesson_Props_Schema.safeParse({
            ...lesson.build.props({ languages: ['uk'] }).base,
          }).success,
          false,
          'Lesson Props must not accept embedded Question banks',
        );
      });

      test('Lesson rejects obsolete programId ownership metadata', () => {
        const lesson = makeLesson();
        assert.throws(
          () =>
            defineLesson({
              ...lesson.config.base,
              programId: id('04'),
              locale: { title: 'Legacy' },
              section: { items: { intro: section }, order: ['intro'] },
            } as never).build.props({ languages: ['en'] }),
          /programId/,
        );
      });

      test('Lesson rejects wrong section keys and unsupported child types', () => {
        assert.throws(
          () =>
            defineLesson({
              id: id('03'),
              slug: 'wrong',
              type: 'lesson',
              skills: [],
              params: {
                quizRequiredForCompletion: false,
                languages: ['en', 'uk'] as const,
                sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
              },
              locale: { title: 'Wrong' },
              section: { items: { wrongKey: section }, order: ['wrongKey'] },
            }).build.props({ languages: ['en'] }),
          /matching .* configurator/,
        );
      });

      test('quizRequiredForCompletion demands an enabled Quiz when authored and after Section overrides', () => {
        const lessonInput = {
          id: id('07'),
          slug: 'quizRequiredLesson',
          type: 'lesson' as const,
          skills: [],
          params: {
            quizRequiredForCompletion: true,
            languages: ['en', 'uk'] as const,
            sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
          },
          locale: { title: { en: 'Quiz required', uk: 'Квіз обов’язковий' } },
        };

        const deferred = defineLesson({
          ...lessonInput,
          section: { items: { intro: section }, order: ['intro'] },
        });
        assert.equal(deferred.slug, 'quizRequiredLesson');
        assert.throws(() => deferred.build.props({ languages: ['en', 'uk'] }), /at least one enabled Quiz/);
        assert.throws(() => deferred.build.overrides({}, { languages: ['en', 'uk'] }), /at least one enabled Quiz/);

        const quiz = defineQuizSection<'knowledgeQuiz', {}, ['en', 'uk']>({
          id: id('08'),
          slug: 'knowledgeQuiz',
          type: 'quiz',
          params: {
            selection: { mode: 'all', questionIds: [id('64')] },
            layout: { mode: 'stack' },
            feedbackMode: 'after-completion',
            interaction: {
              retries: 0,
              showErrors: true,
              showCorrectAnswers: false,
              allowExplanations: false,
              allowDeferring: false,
              allowQuestionNavigation: false,
              skippable: false,
            },
            results: { visibility: 'after-review', showScore: true },
          },
          locale: { title: 'Knowledge check', navigationLabel: 'Quiz' },
          content: { items: {}, order: [] },
        });
        const required = defineLesson({
          ...lessonInput,
          section: {
            items: { intro: section, knowledgeQuiz: quiz },
            order: ['intro', 'knowledgeQuiz'],
          },
        });
        assert.doesNotThrow(() => required.build.props({ languages: ['en', 'uk'] }));
        assert.throws(
          () =>
            required.build.overrides(
              {
                section: { items: { knowledgeQuiz: false }, order: ['intro'] },
              },
              { languages: ['en', 'uk'] },
            ),
          /at least one enabled Quiz/,
        );
        assert.throws(
          () =>
            required.build.overrides(
              {
                section: { items: { knowledgeQuiz: { params: { disabled: true } } } },
              },
              { languages: ['en', 'uk'] },
            ),
          /at least one enabled Quiz/,
        );
        assert.doesNotThrow(() =>
          required.build.overrides(
            {
              section: { items: { intro: false }, order: ['knowledgeQuiz'] },
            },
            { languages: ['en', 'uk'] },
          ),
        );

        const disabledQuiz = defineQuizSection<'disabledQuiz', {}, ['en', 'uk']>({
          id: id('09'),
          slug: 'disabledQuiz',
          type: 'quiz',
          params: { ...quiz.config.base.params, disabled: true },
          locale: { title: 'Disabled quiz', navigationLabel: 'Q' },
          content: { items: {}, order: [] },
        });
        assert.throws(
          () =>
            defineLesson({
              ...lessonInput,
              section: { items: { disabledQuiz }, order: ['disabledQuiz'] },
            }).build.props({ languages: ['en'] }),
          /at least one enabled Quiz/,
        );
      });

      test('Lesson publication language options are mandatory and scoped recursively', () => {
        const lesson = makeLesson();
        const single = lesson.build.props({ languages: ['uk'] });
        assert.deepEqual(single.base.params.languages, ['uk']);
        assert.deepEqual(Object.keys(single.locale ?? {}), ['uk']);
        assert.equal(single.locale?.en, undefined);
        assert.equal(textValue(single.locale?.uk?.section?.[0]?.content), 'Привіт');
        const patched = lesson.build.overrides(
          {
            section: { items: { intro: { locale: { title: { uk: 'Новий' } } } } },
          },
          { languages: ['uk'] },
        );
        assert.deepEqual(Object.keys(patched.locale ?? {}), ['uk']);
        assert.throws(() => lesson.build.props({ languages: [] }), /nonempty languages/);
        assert.throws(() => lesson.build.props({ languages: ['uk', 'uk'] }), /unique/);
        assert.throws(
          () => lesson.build.props({ languages: ['pl'] as never }),
          /does not support publication language/,
        );
      });
    });
  });
});
