import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { mergeForValidation } from '../../_shared__configurators';
import { UNRESOLVED_YOUTUBE_HREF } from '../../../schemas/media.schemas';
import { defineScene } from '../../contentBlocks/primitive/defineScene/defineScene';
import { defineText } from '../../contentBlocks/primitive/defineText/defineText';
import { defineYoutube } from '../../contentBlocks/primitive/defineYoutube/defineYoutube';
import { defineContentSection } from '../../sections/defineContentSection/defineContentSection';
import { defineFlashcardsSection } from '../../sections/defineFlashcardsSection/defineFlashcardsSection';
import { defineQuizSection } from '../../sections/defineQuizSection/defineQuizSection';
import { defineLesson } from './defineLesson';
import {
  lesson_Completed_Data_Schema,
  lesson_Draft_Data_Schema,
  lesson_Data_Schema,
  lesson_Config_Schema,
  lessonConfigurator_Schema,
} from './defineLesson.schemas';

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
        children: ['paragraph'], paragraph: text,
      });
      const textValue = (block: unknown): string | undefined => {
        if (block === undefined || block === null || typeof block !== 'object' ||
            !('locale' in block)) return undefined;
        return (block.locale as {value?: string} | undefined)?.value;
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
          children: ['intro' as const], intro: section,
        });

      test('completed Lesson Data rejects Draft markers, and Draft requires a valid Content Section and Text placeholder', () => {
        const lesson = makeLesson();
        const built = lesson.build.data({ languages: ['en'] });
        const completed = mergeForValidation(built.base, built.locale?.en ?? {});
        assert.equal(lesson_Completed_Data_Schema.safeParse(completed).success, true);

        // Draft must never fall through the completed arm of the union.
        const missingPlaceholder = { ...completed, draft: true };
        assert.equal(lesson_Completed_Data_Schema.safeParse(missingPlaceholder).success, false);
        assert.equal(lesson_Draft_Data_Schema.safeParse(missingPlaceholder).success, false);
        assert.equal(lesson_Data_Schema.safeParse(missingPlaceholder).success, false);

        const intro = completed.intro as Record<string, unknown>;
        const paragraph = intro.paragraph as Record<string, unknown>;
        const validDraft = {
          ...completed,
          draft: true,
          intro: {
            ...intro,
            paragraph: { ...paragraph, locale: { value: 'Not implemented' } },
          },
        };
        assert.equal(lesson_Completed_Data_Schema.safeParse(validDraft).success, false);
        assert.equal(lesson_Draft_Data_Schema.safeParse(validDraft).success, true);
        assert.equal(lesson_Data_Schema.safeParse(validDraft).success, true);

        // A structural parent cannot treat an arbitrary Section or forged Text as a draft.
        const invalidKind = { ...validDraft, intro: { ...validDraft.intro, type: 'quiz' } };
        assert.equal(lesson_Draft_Data_Schema.safeParse(invalidKind).success, false);
        assert.equal(lesson_Data_Schema.safeParse(invalidKind).success, false);
        const forgedText = {
          ...validDraft,
          intro: { ...validDraft.intro, paragraph: { type: 'text', locale: { value: 'Not implemented' } } },
        };
        assert.equal(lesson_Draft_Data_Schema.safeParse(forgedText).success, false);
        assert.equal(lesson_Data_Schema.safeParse(forgedText).success, false);
        const disabled = { ...validDraft, intro: { ...validDraft.intro, params: { disabled: true } } };
        assert.equal(lesson_Data_Schema.safeParse(disabled).success, false);
        // Unlike completed Lessons, the previous explicit Draft schema never owned events.
        assert.equal(lesson_Draft_Data_Schema.safeParse({ ...validDraft, events: { enter: true } }).success, false);
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
        const media = defineContentSection<
          'media',
          { pendingVideo: typeof video; pendingScene: typeof scene },
          ['en', 'uk']
        >({
          id: id('a3'),
          slug: 'media',
          type: 'content',
          params: {},
          locale: { title: 'Media', navigationLabel: '1' },
          children: ['pendingVideo', 'pendingScene'], pendingVideo: video, pendingScene: scene,
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
          children: ['media'], media,
        });
        const draft = lesson.build.data({ languages: ['uk'], mode: 'draft' });
        assert.match(JSON.stringify(draft.base), new RegExp(UNRESOLVED_YOUTUBE_HREF));
        assert.equal(draft.locale?.en, undefined);
        assert.equal((draft.locale?.uk?.media as {children?: string[]})?.children?.length, 2);
        assert.throws(() => lesson.build.data({ languages: ['uk'] }), /unresolved video reference|Scene/i);
        assert.deepEqual(lesson.build.data({ languages: ['uk'], mode: 'draft' }), draft);
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
        assert.equal(lesson.build.data({ languages: ['uk'] }).base.id, lesson.id);
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
          children: ['intro' as const], intro: section,
        };
        const lesson = defineLesson(input);
        const built = lesson.build.data({ languages: ['en'] });
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
        const built = lesson.build.data({ languages: ['en', 'uk'] });
        assert.equal('programId' in lesson.config.base, false);
        assert.equal('programId' in lesson.build.data({ languages: ['en'] }).base, false);
        assert.deepEqual(lesson.config.locales(), { locale: { title: { en: 'Example', uk: 'Приклад' } } });
        assert.equal(lesson.intro, section);
        assert.equal((built.base.intro as {slug?: string})?.slug, 'intro');
        assert.equal((built.base.intro as {children?: string[]})?.children?.[0], 'paragraph');
        assert.equal(built.locale?.uk?.locale?.title, 'Приклад');
        assert.equal(textValue((built.locale?.uk?.intro as { paragraph?: unknown })?.paragraph), 'Привіт');
        assert.equal((built.locale?.en?.intro as {locale?: {title?: string}})?.locale?.title, 'Introduction');
        assert.equal('flashcards' in built.base, false);
        assert.equal('questions' in built.base, false);
        assert.equal(lessonConfigurator_Schema.safeParse(lesson).success, true);
        assert.equal(
          lesson_Data_Schema.safeParse(built.base).success,
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
          children: ['intro' as const], intro: section,
        };
        const lesson = defineLesson(input);
        const built = lesson.build.data({ languages: ['en'] });
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
          children: [],
        });
        const recall = defineFlashcardsSection<'banklessRecall', {}, ['en', 'uk']>({
          id: id('63'),
          slug: 'banklessRecall',
          type: 'flashcards',
          params: { selection: { flashcardIds: [id('65')] } },
          locale: { title: 'Recall', navigationLabel: 'Cards' },
          children: [],
        });
        const withQuiz = defineLesson({
          ...input,
          children: ['intro', 'banklessQuiz'], intro: section, banklessQuiz: quiz,
        });
        const withRecall = defineLesson({
          ...input,
          children: ['intro', 'banklessRecall'], intro: section, banklessRecall: recall,
        });
        assert.equal((withQuiz.build.data({ languages: ['en'] }).base.banklessQuiz as {type?: string})?.type, 'quiz');
        assert.equal((withRecall.build.data({ languages: ['en'] }).base.banklessRecall as {type?: string})?.type, 'flashcards');
        assert.deepEqual(quiz.build.data({ languages: ['en'] }).base.params.selection, {
          mode: 'all',
          questionIds: [id('64')],
        });
        assert.deepEqual(recall.build.data({ languages: ['en'] }).base.params.selection, { flashcardIds: [id('65')] });
        assert.deepEqual(
          lesson.build
            .overrides(
              { children: ['intro', 'banklessQuiz'], banklessQuiz: quiz },
              { languages: ['en'] },
            )
            .base.children,
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
        assert.deepEqual(lesson.build.data({ languages: ['en'] }), built);
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
          children: ['sparseText'], sparseText,
        });
        // @ts-expect-error Intentionally incompatible child scope must fail at the authoring call.
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
          children: ['unscoped'],
          unscoped: unscopedSection,
        });

        assert.doesNotThrow(() => lesson.build.data({ languages: ['uk'] }));
        assert.throws(
          () => lesson.build.data({ languages: ['en', 'uk'] }),
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
          children: [],
        };
        assert.equal(lesson_Config_Schema.safeParse(draft).success, true, 'Config permits sparse locale dictionaries');
        const lesson = defineLesson<'sourceOnly', typeof draft.params.languages, {}>(draft as never);
        assert.doesNotThrow(() => lesson.config.validate(draft as never));
        const source = lesson.build.data({ languages: ['en'] });
        assert.equal(source.locale?.en?.locale?.title, 'Source language only');
        assert.deepEqual(source.base.params.languages, ['en'], 'A scoped Build describes only its requested languages');
        assert.throws(
          () => lesson.build.data({ languages: ['en', 'uk'] }),
          /Invalid Lesson Props for language uk/,
          'A source-only Build must never be interpreted as complete for the declared locale set',
        );
      });

      test('all-language Props validation does not supply independent editorial review evidence', () => {
        const lesson = makeLesson();
        const publication = lesson.build.data({ languages: ['en', 'uk'] });
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
            intro: {
              paragraph: { locale: { value: { uk: 'Новий текст' } } },
            },
            locale: { title: { uk: 'Новий заголовок' } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          Object.keys(updated.base).filter(key => key === 'intro'),
          ['intro'],
        );
        assert.equal(textValue((updated.locale?.uk?.intro as {paragraph?: unknown})?.paragraph), 'Новий текст');
        assert.deepEqual(updated.locale?.uk?.locale, { title: 'Новий заголовок' });
        assert.equal(
          textValue((lesson.build.data({ languages: ['en', 'uk'] }).locale?.uk?.intro as {paragraph?: unknown})?.paragraph),
          'Привіт',
        );

        const second = defineContentSection<'extra', {}, ['en', 'uk']>({
          type: 'content',
          id: id('05'),
          slug: 'extra',
          params: {},
          locale: { title: 'Extra', navigationLabel: '2' },
          children: [],
        });
        const changed = lesson.build.overrides(
          {
            children: ['extra'], intro: false, extra: second,
            params: { sections: { allowSkipping: true } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          changed.base.children,
          ['extra'],
        );
        assert.equal(changed.locale, undefined);
        assert.deepEqual(changed.base.params?.sections, { allowSkipping: true });
        assert.deepEqual(lesson.children, ['intro']);
        assert.deepEqual(
          lesson.build.data({ languages: ['en', 'uk'] }).base.children,
          ['intro'],
        );
        assert.throws(
          () => lesson.build.overrides({ intro: false }, { languages: ['en', 'uk'] }),
          /children.*required/,
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
        assert.equal(lesson.build.data({ languages: ['uk'] }).base.events, undefined);
        assert.equal(patch.locale, undefined);
        assert.throws(
          () => lesson.build.overrides({ events: { lessonStarted: () => false } } as never, { languages: ['uk'] }),
          /Invalid Lesson overrides/,
        );
        assert.equal(
          lesson_Data_Schema.safeParse({
            ...lesson.build.data({ languages: ['uk'] }).base,
          }).success,
          false,
          'Lesson Props must not accept embedded Question banks',
        );
      });

      test('Lesson rejects obsolete programId ownership metadata', () => {
        const lesson = makeLesson();
        assert.throws(
          () =>
            defineLesson<'exampleLesson', ['en', 'uk'], { intro: typeof section }>({
              ...lesson.config.base,
              programId: id('04'),
              locale: { title: 'Legacy' },
              children: ['intro' as const], intro: section,
            } as never).build.data({ languages: ['en'] }),
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
              children: ['wrongKey'], wrongKey: section,
            }).build.data({ languages: ['en'] }),
          /matching .* configurator/,
        );
      });

      test('F4: required Quiz checks do not build unused zh translations in an English publication', () => {
        const text = defineText<'englishOnly', ['en', 'zh']>({
          id: id('b1'),
          slug: 'englishOnly',
          type: 'text',
          params: {},
          // Incomplete editorial locale is valid source, not valid requested zh publication.
          locale: { value: { en: 'English content' } as never },
        });
        const english = defineContentSection<'english', { englishOnly: typeof text }, ['en', 'zh']>({
          id: id('b2'),
          slug: 'english',
          type: 'content',
          params: {},
          locale: { title: 'English', navigationLabel: '1' },
          children: ['englishOnly'], englishOnly: text,
        });
        const quiz = defineQuizSection<'review', {}, ['en', 'zh']>({
          id: id('b3'),
          slug: 'review',
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
          locale: { title: 'Review', navigationLabel: 'Quiz' },
          children: [],
        });
        const lesson = defineLesson({
          id: id('b4'),
          slug: 'englishScopeLesson',
          type: 'lesson',
          skills: [],
          params: {
            languages: ['en', 'zh'] as const,
            quizRequiredForCompletion: true,
            sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
          },
          locale: { title: 'English scope' },
          children: ['english', 'review'], english, review: quiz,
        });
        assert.doesNotThrow(() => lesson.build.data({ languages: ['en'], mode: 'draft' }));
        assert.doesNotThrow(() => lesson.build.data({ languages: ['en'] }));
        assert.doesNotThrow(() => lesson.build.overrides({}, { languages: ['en'], mode: 'draft' }));
        assert.doesNotThrow(() => lesson.build.overrides({}, { languages: ['en'] }));
        assert.throws(() => lesson.build.data({ languages: ['en', 'zh'] }), /Invalid publication/);
        assert.throws(() => lesson.build.overrides({}, { languages: ['en', 'zh'] }), /Invalid publication/);
        assert.throws(
          () =>
            lesson.build.overrides(
              { children: ['english'], review: false },
              { languages: ['en'] },
            ),
          /at least one enabled Quiz/,
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
          children: ['intro' as const], intro: section,
        });
        assert.equal(deferred.slug, 'quizRequiredLesson');
        assert.throws(() => deferred.build.data({ languages: ['en', 'uk'] }), /at least one enabled Quiz/);
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
          children: [],
        });
        const required = defineLesson({
          ...lessonInput,
          children: ['intro', 'knowledgeQuiz'], intro: section, knowledgeQuiz: quiz,
        });
        assert.doesNotThrow(() => required.build.data({ languages: ['en', 'uk'] }));
        assert.throws(
          () =>
            required.build.overrides(
              {
                children: ['intro'], knowledgeQuiz: false,
              },
              { languages: ['en', 'uk'] },
            ),
          /at least one enabled Quiz/,
        );
        assert.throws(
          () =>
            required.build.overrides(
              {
                knowledgeQuiz: { params: { disabled: true } },
              },
              { languages: ['en', 'uk'] },
            ),
          /at least one enabled Quiz/,
        );
        assert.doesNotThrow(() =>
          required.build.overrides(
            {
              children: ['knowledgeQuiz'], intro: false,
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
          children: [],
        });
        assert.throws(
          () =>
            defineLesson({
              ...lessonInput,
              children: ['disabledQuiz'], disabledQuiz,
            }).build.data({ languages: ['en'] }),
          /at least one enabled Quiz/,
        );
      });

      test('Lesson publication language options are mandatory and scoped recursively', () => {
        const lesson = makeLesson();
        const single = lesson.build.data({ languages: ['uk'] });
        assert.deepEqual(single.base.params.languages, ['uk']);
        assert.deepEqual(Object.keys(single.locale ?? {}), ['uk']);
        assert.equal(single.locale?.en, undefined);
        assert.equal(textValue((single.locale?.uk?.intro as {paragraph?: unknown})?.paragraph), 'Привіт');
        const patched = lesson.build.overrides(
          {
            intro: { locale: { title: { uk: 'Новий' } } },
          },
          { languages: ['uk'] },
        );
        assert.deepEqual(Object.keys(patched.locale ?? {}), ['uk']);
        assert.throws(() => lesson.build.data({ languages: [] }), /nonempty languages/);
        assert.throws(() => lesson.build.data({ languages: ['uk', 'uk'] }), /unique/);
        assert.throws(() => lesson.build.data({ languages: ['pl'] as never }), /does not support publication language/);
      });
    });
  });
});
