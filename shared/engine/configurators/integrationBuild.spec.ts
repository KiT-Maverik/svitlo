import { describe } from 'node:test';
import assert from 'node:assert/strict';
import test from 'node:test';

import { mergeForValidation } from './_shared__configurators';
import { defineText } from './contentBlocks/defineText';
import { defineContentSection } from './sections/defineContentSection';
import { defineLesson } from './lessons/defineLesson';
import { lesson_Props_Schema } from './lessons/defineLesson/defineLesson.schemas';
import { defineFlashcard } from './flashcards/defineFlashcard';
import { defineAnswerWithNumber } from './questions/defineAnswerWithNumber';
import { defineChapter } from './courses/defineChapter';
import { defineModule } from './courses/defineModule';
import { defineCourse, course_Props_Schema } from './courses/defineCourse';
import { defineSkill } from './skills/defineSkill';
import { defineSkillGroup } from './skills/defineSkillGroup';
import { defineSkillDomain, skillDomain_Props_Schema } from './skills/defineSkillDomain';

describe('Configurators', () => {
  describe('Integration', () => {
    describe('build', () => {
      const id = (suffix: string) => '663572e7-bd85-4516-86e2-3de07d209e' + suffix;
      const uk = { languages: ['uk'] as const };

      // Test-only boundary: published resources and patches are JSON objects; avoid
      // expanding every nested configurator's generic type in merge assertions.
      const mergeObjects = (base: unknown, patch: unknown): Record<string, unknown> =>
        mergeForValidation(base as Record<string, unknown>, patch as Record<string, unknown>);

      const paragraph = defineText<'paragraph', ['uk', 'en', 'pl']>({
        id: id('01'),
        slug: 'paragraph',
        type: 'text',
        params: {},
        locale: { value: { uk: 'Привіт', en: 'Hello', pl: 'Cześć' } },
      });
      const introduction = defineContentSection<'intro', { paragraph: typeof paragraph }, ['uk', 'en']>({
        id: id('02'),
        slug: 'intro',
        type: 'content',
        params: {},
        locale: { title: { uk: 'Вступ', en: 'Introduction' }, navigationLabel: '1' },
        content: { items: { paragraph }, order: ['paragraph'] },
      });

      const questionPrompt = defineText<'questionPrompt', ['uk', 'en']>({
        id: id('03'),
        slug: 'questionPrompt',
        type: 'text',
        params: {},
        locale: { value: { uk: 'Скільки?', en: 'How many?' } },
      });
      const questionContent = {
        question: { items: { questionPrompt }, order: ['questionPrompt'] },
      };
      const numeric = defineAnswerWithNumber<'numeric', typeof questionContent, ['uk', 'en']>({
        id: id('04'),
        slug: 'numeric',
        type: 'answerWithNumber',
        params: { assessmentMethod: 'retrieval', restrictions: ['dyslexia'], correctAnswers: [2] },
        locale: { placeholder: 'Enter a number' },
        content: questionContent,
      });

      const front = defineText<'front', ['uk', 'en']>({
        id: id('05'),
        slug: 'front',
        type: 'text',
        params: {},
        locale: { value: { uk: 'Питання', en: 'Prompt' } },
      });
      const back = defineText<'back', ['uk', 'en']>({
        id: id('06'),
        slug: 'back',
        type: 'text',
        params: {},
        locale: { value: { uk: 'Відповідь', en: 'Answer' } },
      });
      const card = defineFlashcard<
        'card',
        { front: typeof front },
        { back: typeof back },
        {},
        { warningFlag: { type: 'warning' } },
        {},
        ['uk', 'en']
      >({
        id: id('07'),
        slug: 'card',
        type: 'flashcard',
        parameters: { tags: [], flags: { items: { warningFlag: { type: 'warning' } }, order: ['warningFlag'] } },
        content: {
          front: { items: { front }, order: ['front'] },
          back: { items: { back }, order: ['back'] },
        },
      });
      const lesson = defineLesson({
        id: id('08'),
        slug: 'lesson',
        type: 'lesson',
        skills: [],
        params: {
          requireQuiz: false,
          languages: ['uk', 'en'] as const,
          sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
        },
        locale: { title: { uk: 'Урок', en: 'Lesson' } },
        section: { items: { intro: introduction }, order: ['intro'] },
        flashcards: { items: { card }, order: ['card'] },
        questions: { answerWithNumber: { numeric } },
      });
      const chapter = defineChapter<'chapter', { lesson: typeof lesson }, ['uk', 'en']>({
        id: id('09'),
        slug: 'chapter',
        type: 'chapter',
        params: {},
        locale: { title: { uk: 'Розділ', en: 'Chapter' } },
        content: { items: { lesson }, order: ['lesson'] },
      });
      const courseModule = defineModule<'module', { chapter: typeof chapter }, ['uk', 'en']>({
        id: id('10'),
        slug: 'module',
        type: 'module',
        params: {},
        locale: { title: { uk: 'Модуль', en: 'Module' } },
        content: { items: { chapter }, order: ['chapter'] },
      });
      const course = defineCourse<'course', ['uk'], { module: typeof courseModule }>({
        id: id('11'),
        slug: 'course',
        type: 'course',
        params: { languages: ['uk'] as const },
        locale: { title: { uk: 'Курс' }, description: 'Universal introduction' },
        content: { items: { module: courseModule }, order: ['module'] },
      });

      test('Course → Module → Chapter → Lesson → Section → ContentBlock and Lesson banks share one publication scope', () => {
        const resource = course.build.props(uk);
        const json = JSON.stringify(resource);
        assert.deepEqual(Object.keys(resource.locale ?? {}), ['uk']);
        assert.equal(json.includes('Hello'), false);
        assert.equal(json.includes('Cześć'), false);
        assert.equal(json.includes('How many?'), false);
        assert.equal(json.includes('Introduction'), false);
        assert.ok(json.includes('Привіт'));
        assert.ok(json.includes('Скільки?'), 'Question Bank must be built within Lesson');
        assert.ok(json.includes('Відповідь'), 'Flashcard must be built within Lesson');
        assert.equal(json.includes('"additionalItems"'), false);
        assert.equal(json.includes('"order"'), false);
        assert.equal(json.includes('"build"'), false);

        const resolved = mergeObjects(resource.base, resource.locale?.uk ?? {});
        assert.doesNotThrow(() => course_Props_Schema.parse(resolved));
        assert.deepEqual(resource.base.params.languages, ['uk']);
        assert.deepEqual(lesson.build.props(uk).base.params.languages, ['uk']);
        assert.deepEqual(Object.keys(paragraph.build.props({ languages: ['pl'] }).locale ?? {}), ['pl']);
        assert.throws(
          () => course.build.props({ languages: ['en'] } as never),
          /does not support publication language/,
        );
      });

      test('Nested Course override composes a complete, language-scoped atomic tree and leaves authored resources untouched', () => {
        const patch = course.build.overrides(
          {
            content: {
              items: {
                module: {
                  content: {
                    items: {
                      chapter: {
                        content: {
                          items: {
                            lesson: {
                              section: {
                                items: {
                                  intro: {
                                    content: { items: { paragraph: { locale: { value: { uk: 'Оновлений текст' } } } } },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          uk,
        );
        assert.deepEqual(Object.keys(patch.locale ?? {}), ['uk']);
        assert.ok(JSON.stringify(patch.locale?.uk).includes('Оновлений текст'));
        assert.equal(JSON.stringify(patch).includes('Cześć'), false);

        const original = course.build.props(uk);
        const withResourceLocale = mergeObjects(original.base, original.locale?.uk ?? {});
        const withOverrideBase = mergeObjects(withResourceLocale, patch.base);
        const effective = mergeObjects(withOverrideBase, patch.locale?.uk ?? {});
        assert.doesNotThrow(() => course_Props_Schema.parse(effective));
        assert.ok(JSON.stringify(effective).includes('Оновлений текст'));
        assert.ok(JSON.stringify(course.build.props(uk)).includes('Привіт'));
        assert.equal(JSON.stringify(course.build.props(uk)).includes('Оновлений текст'), false);

        const removed = lesson.build.overrides(
          {
            section: { items: { intro: false }, order: [] },
          },
          uk,
        );
        assert.deepEqual(removed.base.section, []);
        assert.equal(removed.locale?.uk?.section, undefined);
        const lessonResource = lesson.build.props(uk);
        const lessonResult = mergeObjects(
          mergeObjects(mergeObjects(lessonResource.base, lessonResource.locale?.uk ?? {}), removed.base),
          removed.locale?.uk ?? {},
        );
        assert.deepEqual(lesson_Props_Schema.parse(lessonResult).section, []);
      });

      test('Lesson → Question Bank applies nested question patch for only the requested language', () => {
        const patch = lesson.build.overrides(
          {
            questions: {
              answerWithNumber: {
                items: {
                  numeric: {
                    content: {
                      question: { items: { questionPrompt: { locale: { value: { uk: 'Скільки тепер?' } } } } },
                    },
                  },
                },
              },
            },
          },
          uk,
        );
        assert.ok(JSON.stringify(patch.locale?.uk?.questions).includes('Скільки тепер?'));
        assert.deepEqual(Object.keys(patch.locale ?? {}), ['uk']);
        assert.equal(JSON.stringify(lesson.build.props(uk)).includes('Скільки тепер?'), false);
      });

      test('SkillDomain → SkillGroup → Skill validates resolved multilingual nested overrides', () => {
        const balance = defineSkill<'balance', ['uk', 'en']>({
          id: id('12'),
          slug: 'balance',
          name: { uk: 'Рівновага', en: 'Balance' },
          description: { methodological: 'Describe forces', frontend: { uk: 'Сили', en: 'Forces' } },
        });
        const mechanics = defineSkillGroup<'mechanics', { balance: typeof balance }, ['uk', 'en']>({
          id: id('13'),
          slug: 'mechanics',
          name: { uk: 'Механіка', en: 'Mechanics' },
          description: { methodological: 'Mechanics' },
          skills: { items: { balance }, order: ['balance'] },
        });
        const domain = defineSkillDomain<'physics', { mechanics: typeof mechanics }, {}, ['uk']>({
          id: id('14'),
          slug: 'physics',
          title: { uk: 'Фізика', en: 'Physics' },
          description: { methodological: 'Physics overview' },
          groups: { items: { mechanics }, order: ['mechanics'] },
        });
        const resource = domain.build.props(uk);
        const patch = domain.build.overrides(
          {
            groups: { items: { mechanics: { skills: { items: { balance: { name: { uk: 'Баланс' } } } } } } },
          },
          uk,
        );
        const effective = mergeObjects(
          mergeObjects(mergeObjects(resource.base, resource.locale?.uk ?? {}), patch.base),
          patch.locale?.uk ?? {},
        );
        assert.doesNotThrow(() => skillDomain_Props_Schema.parse(effective));
        assert.ok(JSON.stringify(effective).includes('Баланс'));
        assert.deepEqual(Object.keys(patch.locale ?? {}), ['uk']);
        assert.equal(JSON.stringify(domain.build.props(uk)).includes('Баланс'), false);
        assert.equal(JSON.stringify(resource).includes('Balance'), false);
      });
    });
  });
});
