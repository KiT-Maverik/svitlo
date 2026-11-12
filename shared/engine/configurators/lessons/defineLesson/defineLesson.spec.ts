import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineContentSection } from '../../sections/defineContentSection/defineContentSection';
import { defineQuizSection } from '../../sections/defineQuizSection/defineQuizSection';
import { defineLesson } from './defineLesson';
import { lesson_Config_Schema, lesson_Props_Schema, lessonConfigurator_Schema } from './defineLesson.schemas';

const id = (suffix: string) => '663572e7-bd85-4516-86e2-3de07d209e' + suffix;
const text = defineText<'paragraph', ['en', 'uk']>({
  type: 'text', id: id('01'), slug: 'paragraph', params: {},
  locale: { value: { en: 'Hello', uk: 'Привіт' } },
});
const section = defineContentSection<'intro', { paragraph: typeof text }, ['en', 'uk']>({
  type: 'content', id: id('02'), slug: 'intro', params: {},
  locale: { title: { en: 'Introduction', uk: 'Вступ' }, navigationLabel: '1' },
  content: { items: { paragraph: text }, order: ['paragraph'] },
});
const textValue = (blocks: { type: string; locale?: unknown }[] | undefined): string | undefined => {
  const block = blocks?.[0];
  if (block?.type !== 'text') return undefined;
  return (block.locale as { value?: string } | undefined)?.value;
};
const makeLesson = () => defineLesson({
  id: id('03'), slug: 'exampleLesson', type: 'lesson', programId: id('04'), skills: [],
  params: {
    requireQuiz: false, languages: ['en', 'uk'] as const,
    sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
  },
  locale: { title: { en: 'Example', uk: 'Приклад' } },
  section: { items: { intro: section }, order: ['intro'] },
  flashcards: { items: {}, order: [] },
});

test('Lesson emits plain Section Props arrays with correct own and nested locale paths', () => {
  const lesson = makeLesson();
  const built = lesson.build.props({ languages: ['en', 'uk'] });
  assert.equal(lesson.config.base.programId, id('04'));
  assert.deepEqual(lesson.config.locales(), { locale: { title: { en: 'Example', uk: 'Приклад' } } });
  assert.equal(lesson.section.items.intro, section);
  assert.equal(built.base.section[0]?.slug, 'intro');
  assert.equal(built.base.section[0]?.content?.[0]?.slug, 'paragraph');
  assert.equal(built.locale?.uk?.locale?.title, 'Приклад');
  assert.equal(textValue(built.locale?.uk?.section?.[0]?.content), 'Привіт');
  assert.equal(built.locale?.en?.section?.[0]?.locale?.title, 'Introduction');
  assert.deepEqual(built.base.flashcards, []);
  assert.equal(lessonConfigurator_Schema.safeParse(lesson).success, true);
  assert.equal(lesson_Props_Schema.safeParse(built.base).success, false,
    'untranslated base fragment need not satisfy fully resolved Props schema');
  assert.doesNotThrow(() => JSON.stringify(built));
  assert.equal('override' in lesson, false);
  assert.equal('overrides' in lesson.config, false);
  assert.equal(lesson_Config_Schema.safeParse(lesson.config.base).success, false);
});

test('Lesson independently overrides Sections, nested ContentBlocks, languages and metadata', () => {
  const lesson = makeLesson();
  const updated = lesson.build.overrides({
    section: { items: { intro: { content: { items: {
      paragraph: { locale: { value: { uk: 'Новий текст' } } },
    } } } } },
    locale: { title: { uk: 'Новий заголовок' } },
  }, { languages: ['en', 'uk'] });
  assert.deepEqual(updated.base.section?.map(item => item.slug), ['intro']);
  assert.equal(textValue(updated.locale?.uk?.section?.[0]?.content), 'Новий текст');
  assert.deepEqual(updated.locale?.uk?.locale, { title: 'Новий заголовок' });
  assert.equal(textValue(lesson.build.props({ languages: ['en', 'uk'] }).locale?.uk?.section?.[0]?.content), 'Привіт');

  const second = defineContentSection<'extra', {}, ['en', 'uk']>({
    type: 'content', id: id('05'), slug: 'extra', params: {},
    locale: { title: 'Extra', navigationLabel: '2' },
    content: { items: {}, order: [] },
  });
  const changed = lesson.build.overrides({
    section: { items: { intro: false }, additionalItems: { extra: second }, order: ['extra'] },
    params: { sections: { allowSkipping: true } },
  }, { languages: ['en', 'uk'] });
  assert.deepEqual(changed.base.section?.map(item => item.slug), ['extra']);
  assert.equal(changed.locale, undefined);
  assert.deepEqual(changed.base.params?.sections, { allowSkipping: true });
  assert.deepEqual(lesson.section.order, ['intro']);
  assert.deepEqual(lesson.build.props({ languages: ['en', 'uk'] }).base.section.map(item => item.slug), ['intro']);
  assert.throws(() => lesson.build.overrides({ section: { items: { intro: false } } }, { languages: ['en', 'uk'] }), /order is required/);
  assert.throws(() => lesson.build.overrides({ id: id('09') } as never, { languages: ['en', 'uk'] }), /Invalid Lesson overrides/);
  assert.throws(() => lesson.build.overrides({ params: { languages: ['pl'] } } as never, { languages: ['en', 'uk'] }), /Invalid Lesson overrides/);
});

test('Lesson rejects wrong section keys and unsupported child types', () => {
  assert.throws(() => defineLesson({
    id: id('03'), slug: 'wrong', type: 'lesson', skills: [],
    params: {
      requireQuiz: false, languages: ['en', 'uk'] as const,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
    },
    locale: { title: 'Wrong' },
    section: { items: { wrongKey: section }, order: ['wrongKey'] },
    flashcards: { items: {}, order: [] },
  }), /matching .* configurator/);
});

test('requireQuiz demands an enabled Quiz when authored and after Section overrides', () => {
  const lessonInput = {
    id: id('07'), slug: 'quizRequiredLesson', type: 'lesson' as const, skills: [],
    params: {
      requireQuiz: true, languages: ['en', 'uk'] as const,
      sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
    },
    locale: { title: { en: 'Quiz required', uk: 'Квіз обов’язковий' } },
    flashcards: { items: {}, order: [] },
  };

  assert.throws(() => defineLesson({
    ...lessonInput,
    section: { items: { intro: section }, order: ['intro'] },
  }), /at least one enabled Quiz/);

  const quiz = defineQuizSection<'knowledgeQuiz', {}, ['en', 'uk']>({
    id: id('08'), slug: 'knowledgeQuiz', type: 'quiz',
    params: {
      selection: { mode: 'all' },
      layout: { mode: 'stack' },
      feedbackMode: 'after-completion',
      interaction: {
        retries: 0, showErrors: true, showCorrectAnswers: false,
        allowExplanations: false, allowDeferring: false,
        allowQuestionNavigation: false, skippable: false,
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
  assert.throws(() => required.build.overrides({
    section: { items: { knowledgeQuiz: false }, order: ['intro'] },
  }, { languages: ['en', 'uk'] }), /at least one enabled Quiz/);
  assert.throws(() => required.build.overrides({
    section: { items: { knowledgeQuiz: { params: { disabled: true } } } },
  }, { languages: ['en', 'uk'] }), /at least one enabled Quiz/);
  assert.doesNotThrow(() => required.build.overrides({
    section: { items: { intro: false }, order: ['knowledgeQuiz'] },
  }, { languages: ['en', 'uk'] }));

  const disabledQuiz = defineQuizSection<'disabledQuiz', {}, ['en', 'uk']>({
    id: id('09'), slug: 'disabledQuiz', type: 'quiz',
    params: { ...quiz.config.base.params, disabled: true },
    locale: { title: 'Disabled quiz', navigationLabel: 'Q' },
    content: { items: {}, order: [] },
  });
  assert.throws(() => defineLesson({
    ...lessonInput,
    section: { items: { disabledQuiz }, order: ['disabledQuiz'] },
  }), /at least one enabled Quiz/);
});
