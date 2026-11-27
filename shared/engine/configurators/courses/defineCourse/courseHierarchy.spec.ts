import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { mergeForValidation } from '../../_shared__configurators';
import { defineText } from '../../contentBlocks/primitive/defineText/defineText';
import { defineLesson } from '../../lessons/defineLesson';
import { defineContentSection } from '../../sections/defineContentSection/defineContentSection';
import { defineQuizSection } from '../../sections/defineQuizSection/defineQuizSection';
import { defineChapter } from '../defineChapter';
import { defineLessonStub } from '../defineCourseChildStubs';
import { defineModule } from '../defineModule';
import { placeLesson } from '../placeLesson';
import { defineCourse } from './defineCourse';
import { course_Config_Schema, course_Data_Schema } from './defineCourse.schemas';

describe('Configurators', () => {
  describe('Courses', () => {
    describe('defineCourse', () => {
      const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
      const languages = ['en', 'uk'] as const;
      const chapterLanguages = ['en', 'uk', 'pl'] as const;

      /** Empty Chapter avoids coupling this Agent 3 suite to Agent 1's evolving Lesson API. */
      const chapter = defineChapter<'chapter', {}, typeof chapterLanguages>({
        id: id('c2'),
        type: 'chapter',
        slug: 'chapter',
        params: { iconKey: 'book' },
        locale: { title: { en: 'Chapter', uk: 'Розділ', pl: 'Rozdział' } },
        children: [],
      });
      const chapterModule = defineModule<'module', { chapter: typeof chapter }, typeof languages>({
        id: id('c3'),
        type: 'module',
        slug: 'module',
        params: {},
        locale: { title: 'Module' },
        children: ['chapter'], chapter,
      });
      const courseInput = {
        id: id('c4'),
        type: 'course' as const,
        slug: 'course' as const,
        params: { languages, scenarioMode: 'story' as const },
        locale: { title: { en: 'Course', uk: 'Курс' }, description: 'Course introduction' },
        children: ['module'] as ('module')[], module: chapterModule,
      };
      const course = defineCourse<'course', { module: typeof chapterModule }, typeof languages>(courseInput);

      test('Course hierarchy retains literal slugs and publishes ordered plain Props', () => {
        assert.equal(course.slug, 'course');
        assert.equal(course.module, chapterModule);
        assert.equal(chapterModule.chapter, chapter);
        const resource = course.build.data({ languages: ['en', 'uk'] });
        assert.equal(resource.base.params.scenarioMode, 'story');
        assert.deepEqual(
          resource.base.children,
          ['module'],
        );
        assert.deepEqual(
          Object.keys(resource.locale?.uk ?? {}).filter(key => key !== 'locale'),
          ['module'],
        );
        assert.ok(JSON.stringify(resource.locale?.uk).includes('Розділ'));
        assert.equal('content' in resource.base.module!, false);
        assert.equal(JSON.stringify(resource).includes('"order"'), false);
        assert.equal(JSON.stringify(resource).includes('"build"'), false);
        assert.deepEqual(course.config.locales(), { locale: { title: { en: 'Course', uk: 'Курс' } } });
        assert.equal(course_Config_Schema.safeParse(courseInput).success, true);
        assert.equal(
          course_Data_Schema.safeParse(
            mergeForValidation<Record<string, unknown>>(
              resource.base as Record<string, unknown>,
              (resource.locale?.uk ?? {}) as Record<string, unknown>,
            ),
          ).success,
          true,
        );
      });

      test('Course overrides preserve sparse metadata and replace nested ordered child Props atomically', () => {
        const scalar = course.build.overrides(
          { locale: { title: { uk: 'Оновлений курс' } } },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(scalar.base, {});
        assert.deepEqual(scalar.locale, { uk: { locale: { title: 'Оновлений курс' } } });

        const nested = course.build.overrides(
          {
            module: { locale: { title: 'Unit' } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          Object.keys(nested.base),
          ['module'],
        );
        assert.equal((nested.base.module as { locale: { title: string } }).locale.title, 'Unit');
        assert.equal(course.build.data({ languages: ['en', 'uk'] }).base.module.locale?.title, 'Module');

        const removed = course.build.overrides(
          { children: [], module: false },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(removed.base.children, []);
        assert.equal(removed.base.module, false);
        assert.equal(removed.locale, undefined, 'invariant deletion must not emit unnecessary locale files');

        assert.throws(
          () => course.build.overrides({ module: false }, { languages: ['en', 'uk'] }),
          /children is required/,
        );
        assert.throws(
          () => course.build.overrides({ children: ['module', 'module'] }, { languages: ['en', 'uk'] }),
          /Duplicate slug/,
        );
        assert.throws(
          () => course.build.overrides({ params: { languages: ['en'] } } as never, { languages: ['en', 'uk'] }),
          /Invalid Course overrides/,
        );
        assert.throws(
          () => course.build.overrides({ slug: 'newSlug' } as never, { languages: ['en', 'uk'] }),
          /Invalid Course overrides/,
        );
      });

      test('Course supports typed additional Chapters without mutating its original Module', () => {
        const extra = defineChapter<'extra', {}, typeof languages>({
          id: id('c5'),
          slug: 'extra',
          type: 'chapter',
          params: {},
          locale: { title: { en: 'Extra', uk: 'Додатковий' } },
          children: [],
        });
        const patch = course.build.overrides(
          {
            children: ['extra', 'module'], extra,
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          patch.base.children,
          ['extra', 'module'],
        );
        assert.deepEqual(
          Object.keys(patch.locale?.uk ?? {}).filter(key => key !== 'locale'),
          ['extra'],
        );
        assert.deepEqual(
          course.build.data({ languages: ['en', 'uk'] }).base.children,
          ['module'],
        );
        assert.throws(
          () =>
            course.build.overrides(
              { children: ['module', 'extraAlias'], extraAlias: extra } as never,
              { languages: ['en', 'uk'] },
            ),
          /Duplicate|does not match/,
        );
      });

      test('Independent Course Build calls do not mutate original children or authored input', () => {
        const first = course.build.data({ languages: ['en', 'uk'] });
        first.base.module.slug = 'mutated';
        assert.equal(course.build.data({ languages: ['en', 'uk'] }).base.module.slug, 'module');
        const patch = course.build.overrides({ locale: { title: 'Replacement' } }, { languages: ['en', 'uk'] });
        assert.equal(patch.base.locale?.title, 'Replacement');
        assert.equal(course.build.data({ languages: ['en', 'uk'] }).locale?.uk?.locale?.title, 'Курс');

        const authoredContent = course.children;
        authoredContent.push('module');
        assert.throws(() => course.validate({ ...courseInput, children: authoredContent } as never), /Duplicate slug/);
        assert.deepEqual(
          course.build.data({ languages: ['en', 'uk'] }).base.children,
          ['module'],
        );
        assert.deepEqual(courseInput.children, ['module']);
      });

      test('Course, Module and Chapter reject wrong child types and duplicate slugs', () => {
        assert.throws(
          () =>
            defineCourse({
              ...courseInput,
              children: ['wrongKey'], wrongKey: chapterModule,
            }).build.data({ languages: ['en'] }),
          /does not match configurator slug/,
        );
        assert.throws(
          () =>
            defineModule({
              id: id('c6'),
              slug: 'invalid',
              type: 'module',
              params: {},
              locale: { title: 'Invalid' },
              children: ['module'], module: chapterModule,
            } as never).build.data({ languages: ['en'] }),
          /Unsupported Module child type/,
        );
        assert.throws(
          () =>
            defineChapter({
              id: id('c7'),
              slug: 'invalid',
              type: 'chapter',
              params: {},
              locale: { title: 'Invalid' },
              children: ['chapter'], chapter,
            } as never).build.data({ languages: ['en'] }),
          /Unsupported Chapter child type/,
        );
        assert.throws(
          () =>
            defineCourse({
              ...courseInput,
              params: { languages: ['en', 'en'] as unknown as typeof languages },
            }).build.data({ languages: ['en'] }),
          /unique/,
        );
        const duplicate = defineChapter<'copy', {}, typeof languages>({
          id: id('c3'),
          slug: 'copy',
          type: 'chapter',
          params: {},
          locale: { title: 'Duplicate ID' },
          children: [],
        });
        assert.throws(
          () =>
            defineCourse({
              ...courseInput,
              children: ['module', 'copy'], module: chapterModule, copy: duplicate,
            }).build.data({ languages: ['en'] }),
          /duplicate Course child ID/,
        );
      });

      test('Course scope excludes extra Chapter translations and propagates selected languages', () => {
        const standalone = chapter.build.data({ languages: ['pl'] });
        assert.deepEqual(Object.keys(standalone.locale ?? {}), ['pl']);
        assert.equal(standalone.locale?.pl?.locale?.title, 'Rozdział');

        const resource = course.build.data({ languages: ['uk'] });
        assert.deepEqual(Object.keys(resource.locale ?? {}), ['uk']);
        assert.deepEqual(resource.base.params.languages, ['uk'], 'frontend must not advertise unpublished locales');
        assert.equal(JSON.stringify(resource).includes('Rozdział'), false);
        assert.equal(JSON.stringify(resource).includes('"pl"'), false);
        assert.ok(JSON.stringify(resource.locale?.uk).includes('Розділ'));

        const override = course.build.overrides(
          {
            module: { locale: { title: { uk: 'Розділ модуля', en: 'Hidden' } } },
          },
          { languages: ['uk'] },
        );
        assert.deepEqual(Object.keys(override.locale ?? {}), ['uk']);
        assert.equal(JSON.stringify(override).includes('Hidden'), false);

        assert.throws(() => course.build.data({ languages: ['pl'] } as never), /does not support publication language/);
        assert.throws(() => course.build.data({ languages: [] }), /nonempty languages/);
      });
    });
  });
});

test('Course publishes optional outcomes, EducationStandard references and learner audience', () => {
  const id = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
  const skillId = 'd3048d21-8690-5255-b62c-984c69ac272c';
  const standardId = '82104b25-1a51-4b24-8160-98c4ce912f10';
  const input = {
    id,
    slug: 'courseOutcomes',
    type: 'course' as const,
    params: {
      languages: ['en', 'uk'] as const,
      outcomes: { skills: [skillId], skillGroups: [], skillDomains: [] },
      prerequisites: { skills: [] },
      educationStandards: [standardId],
      age: { min: 6, max: 10 },
      grade: { min: 1, max: 4 },
    },
    locale: {
      title: { en: 'Learning', uk: 'Навчання' },
      description: 'An accessible course',
      outcomesText: { en: 'Explain light', uk: 'Пояснювати світло' },
    },
    children: [],
  };
  assert.equal(course_Config_Schema.safeParse(input).success, true);
  const course = defineCourse(input);
  const published = course.build.data({ languages: ['uk'] });
  assert.deepEqual(published.base.params.outcomes?.skills, [skillId]);
  assert.deepEqual(published.base.params.educationStandards, [standardId]);
  assert.deepEqual(published.base.params.age, { min: 6, max: 10 });
  assert.equal(published.locale?.uk?.locale?.outcomesText, 'Пояснювати світло');
  assert.equal(JSON.stringify(published).includes('Explain light'), false);
  const patch = course.build.overrides(
    {
      params: { outcomes: { skills: [skillId] }, grade: { min: 2 } },
      locale: { outcomesText: { uk: 'Нова мета' } },
    },
    { languages: ['uk'] },
  );
  assert.deepEqual(patch.base.params?.outcomes?.skills, [skillId]);
  assert.equal(patch.locale?.uk?.locale?.outcomesText, 'Нова мета');
  assert.equal(course.build.data({ languages: ['uk'] }).locale?.uk?.locale?.outcomesText, 'Пояснювати світло');

  assert.equal(
    course_Config_Schema.safeParse({
      ...input,
      params: { ...input.params, age: { min: 12, max: 7 } },
    }).success,
    false,
  );
  assert.equal(
    course_Config_Schema.safeParse({
      ...input,
      params: { ...input.params, grade: { min: -1, max: 2 } },
    }).success,
    false,
  );
  assert.throws(
    () =>
      course.build.overrides(
        {
          params: { age: { min: 11, max: 9 } },
        },
        { languages: ['uk'] },
      ),
    /invalid|minimum|minimum must not exceed|greater/i,
  );
  assert.equal(
    course_Config_Schema.safeParse({
      ...input,
      params: { ...input.params, educationStandards: [standardId, standardId] },
    }).success,
    false,
  );
  assert.equal(
    course_Config_Schema.safeParse({
      ...input,
      params: { ...input.params, outcomes: { skills: ['not-a-uuid'] } },
    }).success,
    false,
  );
  assert.equal(
    course_Config_Schema.safeParse({
      ...input,
      params: { ...input.params, outcomes: { skills: [skillId], courses: [id] } },
    }).success,
    false,
    'Outcomes cannot implicitly mark a prerequisite Course as completed',
  );
});

test('Course, Module and Chapter embed independent Lesson under contextual placement keys', () => {
  const languages = ['en', 'uk'] as const;
  const lesson = defineLesson({
    id: 'bb75647f-203d-481a-a1c7-4d331c779d21',
    slug: 'standaloneLesson',
    type: 'lesson',
    skills: [],
    params: {
      languages,
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { en: 'Standalone', uk: 'Самостійний' } },
    children: [],
  });
  const chapter = defineChapter<'chapterContext', { caseStudy: typeof lesson }, typeof languages>({
    id: 'bb75647f-203d-481a-a1c7-4d331c779d22',
    slug: 'chapterContext',
    type: 'chapter',
    params: {},
    locale: { title: { en: 'Chapter', uk: 'Розділ' } },
    children: ['caseStudy'], caseStudy: lesson,
  });
  const module = defineModule<'moduleContext', { chapterContext: typeof chapter }, typeof languages>({
    id: 'bb75647f-203d-481a-a1c7-4d331c779d23',
    slug: 'moduleContext',
    type: 'module',
    params: {},
    locale: { title: { en: 'Module', uk: 'Модуль' } },
    children: ['chapterContext'], chapterContext: chapter,
  });
  const course = defineCourse<
    'courseContext',
    { moduleContext: typeof module; courseReview: typeof lesson },
    typeof languages
  >({
    id: 'bb75647f-203d-481a-a1c7-4d331c779d24',
    slug: 'courseContext',
    type: 'course',
    params: { languages },
    locale: { title: { en: 'Course', uk: 'Курс' }, description: 'Testing placement aliases' },
    children: ['moduleContext', 'courseReview'], moduleContext: module, courseReview: lesson,
  });
  const original = lesson.build.data({ languages });
  const embedded = course.build.data({ languages });
  assert.equal(original.base.slug, 'standaloneLesson');
  assert.equal(lesson.slug, 'standaloneLesson');
  assert.equal(embedded.base.moduleContext.slug, 'moduleContext');
  assert.match(JSON.stringify(embedded.base.moduleContext), /caseStudy/);
  assert.equal(embedded.base.courseReview.slug, 'standaloneLesson');
  assert.match(JSON.stringify(embedded.base.moduleContext), new RegExp(lesson.id));
  assert.equal(embedded.base.courseReview.id, lesson.id);
  const patch = course.build.overrides(
    {
      moduleContext: {
            chapterContext: {
                  caseStudy: { locale: { title: { uk: 'Інша назва' } } },
                },
          },
          courseReview: { locale: { title: { en: 'Course review' } } },
    },
    { languages },
  );
  assert.deepEqual(patch.base.children, undefined);
  assert.ok('courseReview' in patch.base);
  assert.match(JSON.stringify(patch.locale?.uk?.moduleContext), /caseStudy/);
  assert.match(JSON.stringify(patch.locale?.uk?.moduleContext), /Інша назва/);
  assert.equal(original.locale?.uk?.locale?.title, 'Самостійний', 'standalone Lesson title is immutable');
});

test('Lesson placement patch resolves through original Build, survives nested Course Build and leaves source intact', () => {
  const languages = ['en', 'uk'] as const;
  const original = defineLesson({
    id: 'c775647f-203d-481a-a1c7-4d331c779d21',
    slug: 'originalLesson',
    type: 'lesson',
    skills: [],
    params: {
      languages,
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { en: 'Original', uk: 'Оригінал' } },
    children: [],
  });
  const raw = {
    params: { sections: { allowSkipping: false } },
    locale: { title: { uk: 'Контекстний урок' } },
  } as const;
  const shadow = placeLesson(original, raw);
  const chapter = defineChapter<'contextChapter', { shadow: typeof shadow }, typeof languages>({
    id: 'c775647f-203d-481a-a1c7-4d331c779d22',
    slug: 'contextChapter',
    type: 'chapter',
    params: {},
    locale: { title: 'Chapter' },
    children: ['shadow'], shadow,
  });
  const module = defineModule<'contextModule', { contextChapter: typeof chapter }, typeof languages>({
    id: 'c775647f-203d-481a-a1c7-4d331c779d23',
    slug: 'contextModule',
    type: 'module',
    params: {},
    locale: { title: 'Module' },
    children: ['contextChapter'], contextChapter: chapter,
  });
  const course = defineCourse<
    'contextCourse',
    { contextModule: typeof module; direct: typeof original },
    typeof languages
  >({
    id: 'c775647f-203d-481a-a1c7-4d331c779d24',
    slug: 'contextCourse',
    type: 'course',
    params: { languages },
    locale: { title: 'Course', description: 'Lesson placements' },
    children: ['contextModule', 'direct'], contextModule: module, direct: original,
  });
  const expectedSparse = original.build.overrides(raw, { languages });
  assert.deepEqual(shadow.build.overrides({}, { languages }), expectedSparse);
  assert.deepEqual(shadow.placement.patch, raw);
  const publication = course.build.data({ languages });
  const shadowBase = (
    publication.base as unknown as {
      contextModule: { contextChapter: { shadow: { params: { sections: { allowSkipping: boolean } }; slug: string } } };
    }
  ).contextModule.contextChapter.shadow;
  assert.equal(shadowBase.slug, 'originalLesson');
  assert.equal(shadowBase.params.sections.allowSkipping, false);
  assert.equal(publication.base.direct.slug, 'originalLesson');
  assert.match(JSON.stringify(publication.locale?.uk), /Контекстний урок/);
  assert.equal(JSON.stringify(publication.locale?.en).includes('Контекстний урок'), false);
  assert.equal(original.build.data({ languages }).base.params.sections.allowSkipping, true);
  assert.equal(original.build.data({ languages }).base.slug, 'originalLesson');
  assert.equal(shadow.placement.source, original);

  const additional = shadow.build.overrides({ params: { sections: { allowNavigation: false } } }, { languages });
  assert.equal(additional.base.params?.sections?.allowSkipping, false);
  assert.equal(additional.base.params?.sections?.allowNavigation, false);
  assert.deepEqual(shadow.build.overrides({}, { languages }), expectedSparse);
  assert.throws(() => shadow.build.data({ languages: ['pl'] } as never), /does not support publication language/);
  assert.throws(
    () => placeLesson(original, { params: { languages: ['uk'] } } as never).build.data({ languages }),
    /Invalid Lesson overrides/,
  );
  assert.throws(
    () => placeLesson(original, { id: 'c775647f-203d-481a-a1c7-4d331c779d99' } as never).build.data({ languages }),
    /Unsafe or immutable Lesson placement field: id/,
  );
  assert.throws(
    () =>
      placeLesson(original, { base: { params: { sections: { allowSkipping: false } } } } as never).build.data({
        languages,
      }),
    /Invalid Lesson overrides/,
  );
  assert.throws(() => placeLesson(original, { locale: { title: () => 'bad' } } as never), /plain JSON Config patch/);
});

test('F4: English Course placement composes a multilingual required-Quiz Lesson with an English-only additional Section', () => {
  const bilingual = ['en', 'zh'] as const;
  const english = ['en'] as const;
  const missingTranslation = defineText<'missingTranslation', typeof bilingual>({
    id: 'f775647f-203d-481a-a1c7-4d331c779d21',
    slug: 'missingTranslation',
    type: 'text',
    params: {},
    locale: { value: { en: 'English source' } as never },
  });
  const intro = defineContentSection<'intro', { missingTranslation: typeof missingTranslation }, typeof bilingual>({
    id: 'f775647f-203d-481a-a1c7-4d331c779d22',
    slug: 'intro',
    type: 'content',
    params: {},
    locale: { title: 'Introduction', navigationLabel: 'Intro' },
    children: ['missingTranslation'], missingTranslation,
  });
  const quiz = defineQuizSection<'quiz', {}, typeof bilingual>({
    id: 'f775647f-203d-481a-a1c7-4d331c779d23',
    slug: 'quiz',
    type: 'quiz',
    params: {
      selection: { mode: 'all', questionIds: ['f775647f-203d-481a-a1c7-4d331c779d24'] },
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
    locale: { title: 'Check', navigationLabel: 'Quiz' },
    children: [],
  });
  const lesson = defineLesson({
    id: 'f775647f-203d-481a-a1c7-4d331c779d25',
    slug: 'sourceLesson',
    type: 'lesson',
    skills: [],
    params: {
      languages: bilingual,
      quizRequiredForCompletion: true,
      sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
    },
    locale: { title: 'Standalone' },
    children: ['intro', 'quiz'], intro, quiz,
  });
  const exhibitionNotes = defineContentSection<'exhibitionNotes', {}, typeof english>({
    id: 'f775647f-203d-481a-a1c7-4d331c779d26',
    slug: 'exhibitionNotes',
    type: 'content',
    params: {},
    locale: { title: { en: 'English-only notes' }, navigationLabel: 'Notes' },
    children: [],
  });
  const placement = placeLesson(lesson, {
    children: ['intro', 'quiz', 'exhibitionNotes'], exhibitionNotes,
  } as never);
  const course = defineCourse<'englishCourse', { placement: typeof placement }, typeof english>({
    id: 'f775647f-203d-481a-a1c7-4d331c779d27',
    slug: 'englishCourse',
    type: 'course',
    params: { languages: english },
    locale: { title: 'Course', description: 'English preview' },
    children: ['placement'], placement,
  });

  for (const mode of ['draft', 'production'] as const) {
    const result = course.build.data({ languages: ['en'], mode });
    assert.match(JSON.stringify(result), /English-only notes/);
    assert.equal(result.locale?.zh, undefined);
    const patch = course.build.overrides(
      { placement: { locale: { title: 'Placed Lesson' } } },
      { languages: ['en'], mode },
    );
    assert.match(JSON.stringify(patch), /Placed Lesson/);
    assert.equal(patch.locale?.zh, undefined);
  }

  assert.deepEqual(
    lesson.build.data({ languages: ['en'] }).base.children,
    ['intro', 'quiz'],
  );
  assert.throws(() => lesson.build.data({ languages: ['zh'] }), /Invalid publication/);
  assert.throws(
    () =>
      placement.build.overrides({ quiz: false, children: ['intro', 'exhibitionNotes'] } as never, {
        languages: ['en'],
      }),
    /at least one enabled Quiz/,
  );
});


test('Completed Lesson UUID can be reused as distinct Course, Module and Chapter placements', () => {
  const languages = ['en', 'uk'] as const;
  const lesson = defineLesson({
    id: 'bd75647f-203d-481a-a1c7-4d331c779d91',
    slug: 'sourceLesson',
    type: 'lesson',
    skills: [],
    params: {
      languages,
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { en: 'Original', uk: 'Оригінал' } },
    children: [],
  });
  const secondPlacement = placeLesson(lesson, { locale: { title: { uk: 'Повторення' } } });
  const placements = { first: lesson, second: secondPlacement };
  const chapter = defineChapter<'chapter', typeof placements, typeof languages>({
    id: 'bd75647f-203d-481a-a1c7-4d331c779d92',
    type: 'chapter',
    slug: 'chapter',
    params: {},
    locale: { title: 'Chapter' },
    children: ['first', 'second'], ...placements,
  });
  const module = defineModule<'module', { chapter: typeof chapter; first: typeof lesson; second: typeof secondPlacement }, typeof languages>({
    id: 'bd75647f-203d-481a-a1c7-4d331c779d93',
    type: 'module',
    slug: 'module',
    params: {},
    locale: { title: 'Module' },
    children: ['chapter', 'first', 'second'], chapter, ...placements,
  });
  const course = defineCourse<'course', { module: typeof module; first: typeof lesson; second: typeof secondPlacement }, typeof languages>({
    id: 'bd75647f-203d-481a-a1c7-4d331c779d94',
    type: 'course',
    slug: 'course',
    params: { languages },
    locale: { title: 'Course', description: 'Reusable placement' },
    children: ['module', 'first', 'second'], module, ...placements,
  });
  const all = [chapter.build.data({ languages }), module.build.data({ languages }), course.build.data({ languages })];
  for (const built of all) {
    const base = built.base as unknown as Record<string, unknown> & {
      children: string[];
      first: { id: string; slug: string };
      second: { id: string; slug: string };
    };
    assert.equal(base.first.id, lesson.id);
    assert.equal(base.second.id, lesson.id);
    assert.equal(base.first.slug, 'sourceLesson');
    assert.equal(base.second.slug, 'sourceLesson');
    assert.deepEqual(base.children.slice(-2), ['first', 'second']);
    assert.match(JSON.stringify(built.locale?.uk), /Повторення/);
  }
  assert.equal(lesson.build.data({ languages }).locale?.uk?.locale?.title, 'Оригінал');
  assert.equal(course_Data_Schema.safeParse(course.build.data({ languages }).base).success, true);
  assert.equal(
    course_Data_Schema.safeParse({
      ...course.build.data({ languages }).base,
      second: { ...course.build.data({ languages }).base.second, slug: 'changedSource' },
    }).success,
    false,
    'reusing a UUID with a different source slug violates immutable identity',
  );

  const duplicateChapter = defineChapter({
    id: chapter.id,
    type: 'chapter',
    slug: 'chapterCopy',
    params: {},
    locale: { title: 'Other' },
    children: [],
  });
  assert.throws(
    () => defineCourse({
      id: 'bd75647f-203d-481a-a1c7-4d331c779d95',
      type: 'course',
      slug: 'badCourse',
      params: { languages },
      locale: { title: 'Course', description: 'Duplicate owners' },
      children: ['chapter', 'chapterCopy'], chapter, chapterCopy: duplicateChapter,
    }).build.data({ languages }),
    /duplicate Course child ID/,
  );

  const stubId = 'bd75647f-203d-481a-a1c7-4d331c779d96';
  const draftFirst = defineLessonStub({ id: stubId, slug: 'first' });
  const draftSecond = defineLessonStub({ id: stubId, slug: 'second' });
  assert.equal(
    course_Data_Schema.safeParse({
      ...course.build.data({ languages }).base,
      children: ['first', 'second'],
      first: draftFirst.build.data({ languages: ['en'] }).base,
      second: draftSecond.build.data({ languages: ['en'] }).base,
    }).success,
    false,
    'draft Lesson stubs cannot share a UUID even under distinct placement keys',
  );
  assert.throws(
    () => defineChapter({
      id: 'bd75647f-203d-481a-a1c7-4d331c779d97',
      type: 'chapter',
      slug: 'badChapter',
      params: {},
      locale: { title: 'Chapter' },
      children: ['first', 'second'], first: draftFirst, second: draftSecond,
    }).build.data({ languages: ['en'] }),
    /duplicate Chapter child ID/,
  );
});

test('Slug-addressed Data validates placement ordering, reserved keys and immutable child identity', () => {
  const child = defineChapter({
    id: 'b775647f-203d-481a-a1c7-4d331c779d88',
    slug: 'unit',
    type: 'chapter',
    params: {},
    locale: { title: 'Chapter' },
    children: [],
  });
  const course = defineCourse({
    id: 'b775647f-203d-481a-a1c7-4d331c779d89',
    slug: 'keyedCourse',
    type: 'course',
    params: { languages: ['en'] as const },
    locale: { title: 'Course', description: 'Addressable course' },
    children: ['unit'], unit: child,
  });
  const data = course.build.data({ languages: ['en'] }).base;
  const valid = (source: unknown) => course_Data_Schema.safeParse(source).success;
  assert.equal(valid(data), true);

  const failures: [string, Record<string, unknown>][] = [
    ['duplicate placement', { ...data, children: ['unit', 'unit'] }],
    ['missing placement', { ...data, children: [] }],
    ['unknown placement', { ...data, children: ['unit', 'notPresent'] }],
    ['disabled child', { ...data, unit: false }],
    ['stale child', { ...data, children: [], unit: data.unit }],
    ['invalid type', { ...data, unit: { ...data.unit, type: 'question' } }],
    ['wrong identity', { ...data, unit: { ...data.unit, slug: 'anotherChapter' } }],
    ['missing child id', { ...data, unit: { ...data.unit, id: undefined } }],
    ['invalid UUID', { ...data, unit: { ...data.unit, id: 'not-a-uuid' } }],
    ['invalid authored slug', { ...data, unit: { ...data.unit, slug: 'not-valid' } }],
    ['invalid key', { ...data, children: ['invalid-key'], 'invalid-key': data.unit }],
    ['retired content', { ...data, content: { items: {}, order: [] } }],
    ['reserved params', { ...data, children: ['params'] }],
    ['unsafe JS key', Object.fromEntries([...Object.entries(data), ['constructor', data.unit]])],
  ];
  for (const [name, candidate] of failures) {
    assert.equal(valid(candidate), false, name);
  }
  const copied = { ...data.unit, id: 'b775647f-203d-481a-a1c7-4d331c779d88', slug: 'copy' };
  assert.equal(valid({ ...data, children: ['unit', 'copy'], copy: copied }), false, 'duplicate IDs');
  assert.equal(
    valid({ ...data, unit: { ...data.unit, content: { someChildOwnedField: 'opaque' } } }),
    true,
    'Course validates the direct child boundary, not child-owned internals',
  );

  const chapterWithReservedChild = defineChapter({
    id: 'b775647f-203d-481a-a1c7-4d331c779d90',
    slug: 'invalidChapter',
    type: 'chapter',
    params: {},
    locale: { title: 'Chapter' },
    children: ['content'], content: course as never,
  } as never);
  assert.throws(() => chapterWithReservedChild.build.data({ languages: ['en'] }), /Reserved child placement slug/);
  assert.throws(
    () => course.build.overrides({ children: ['unit', 'content'], content: child } as never, { languages: ['en'] }),
    /Reserved child placement slug/,
  );
});
