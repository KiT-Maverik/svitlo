import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { mergeForValidation } from '../../_shared__configurators';
import { defineText } from '../../contentBlocks/defineText';
import { defineChapter } from '../../courses/defineChapter';
import { defineCourse } from '../../courses/defineCourse';
import { defineModule } from '../../courses/defineModule';
import { defineContentSection } from '../../sections/defineContentSection';
import { defineQuizSection } from '../../sections/defineQuizSection';
import { defineAssessment } from './defineAssessment';
import { assessment_Props_Schema, assessmentConfigurator_Schema } from './defineAssessment.schemas';
import { defineAssessmentDraft } from './defineAssessmentDraft';

describe('Course-owned Assessment Configurator', () => {
  const id = (suffix: string) => 'c275647f-203d-481a-a1c7-4d331c779d' + suffix;
  const languages = ['en', 'uk'] as const;
  const text = defineText<'instructions', ['en', 'uk']>({
    id: id('01'),
    slug: 'instructions',
    type: 'text',
    params: {},
    locale: { value: { en: 'Choose an answer', uk: 'Оберіть відповідь' } },
  });
  const intro = defineContentSection<'intro', { instructions: typeof text }, typeof languages>({
    id: id('02'),
    slug: 'intro',
    type: 'content',
    params: {},
    locale: { title: 'Instructions', navigationLabel: '1' },
    content: { items: { instructions: text }, order: ['instructions'] },
  });
  const makeQuiz = (suffix: string) =>
    defineQuizSection({
      id: id(suffix),
      slug: 'quiz',
      type: 'quiz',
      params: {
        selection: { mode: 'all', questionIds: [id('90')] },
        layout: { mode: 'stack' },
        feedbackMode: 'after-completion',
        interaction: {
          retries: 1,
          showErrors: true,
          showCorrectAnswers: true,
          allowExplanations: true,
          allowDeferring: false,
          allowQuestionNavigation: true,
          skippable: false,
        },
        results: { visibility: 'immediate', showScore: true },
      },
      locale: { title: 'Quiz', navigationLabel: 'Q' },
      content: { items: {}, order: [] },
    });
  const makeAssessment = <S extends string>(slug: S, suffix: string, quizSuffix: string) => {
    const quiz = makeQuiz(quizSuffix);
    return defineAssessment({
      id: id(suffix),
      slug,
      type: 'assessment',
      params: { languages },
      locale: { title: { en: 'Review', uk: 'Перевірка' } },
      before: { items: { intro }, order: ['intro'] },
      quiz,
      after: { items: {}, order: [] },
    });
  };

  test('builds a complete localized Assessment reusing Content and Quiz', () => {
    const assessment = makeAssessment('finalAssessment', '10', '11');
    const result = assessment.build.props({ languages: ['en', 'uk'] });
    assert.equal(assessmentConfigurator_Schema.safeParse(assessment).success, true);
    assert.deepEqual(
      result.base.section.map(s => s.type),
      ['content', 'quiz'],
    );
    assert.equal(result.locale?.uk?.locale?.title, 'Перевірка');
    assert.ok(JSON.stringify(result.locale?.uk?.section).includes('Оберіть відповідь'));
    assert.equal(
      assessment_Props_Schema.safeParse(mergeForValidation(result.base, result.locale?.uk ?? {})).success,
      true,
    );
    assert.equal('questions' in result.base, false);
    assert.equal('flashcards' in result.base, false);
    assert.equal('events' in result.base, false);
    assert.doesNotThrow(() => JSON.stringify(result));
  });

  test('rejects a missing, disabled, or removed Quiz', () => {
    const assessment = makeAssessment('endOfModule', '12', '13');
    assert.throws(
      () =>
        defineAssessment({
          id: id('14'),
          slug: 'noQuiz',
          type: 'assessment',
          params: { languages },
          locale: { title: 'Incomplete' },
          before: { items: { intro }, order: ['intro'] },
          quiz: undefined as never,
        }).build.props({ languages: ['en'] }),
      /Quiz/,
    );
    assert.throws(() => assessment.build.overrides({ quiz: false as never }, { languages: ['en'] }), /Quiz/);
    assert.throws(
      () => assessment.build.overrides({ quiz: { params: { disabled: true } } }, { languages: ['en'] }),
      /Quiz/,
    );
  });

  test('permits supporting Sections to be removed without disabling the one Quiz', () => {
    const assessment = makeAssessment('withOptionalIntro', '15', '16');
    const patch = assessment.build.overrides({ before: { items: { intro: false }, order: [] } }, { languages: ['en'] });
    assert.deepEqual(
      patch.base.section?.map(item => item.type),
      ['quiz'],
    );
    assert.throws(
      () =>
        defineAssessment({
          id: id('17'),
          slug: 'duplicatePhases',
          type: 'assessment',
          params: { languages },
          locale: { title: 'Review' },
          before: { items: { intro }, order: ['intro'] },
          quiz: makeQuiz('18'),
          after: { items: { intro }, order: ['intro'] },
        }).build.props({ languages: ['en'] }),
      /unique/,
    );
  });

  test('a draft publishes a real Not implemented Text block, not a Quiz', () => {
    const message = defineText({
      id: id('51'),
      slug: 'message',
      type: 'text',
      params: {},
      locale: { value: 'Not implemented' },
    });
    const preview = defineContentSection({
      id: id('52'),
      slug: 'preview',
      type: 'content',
      params: {},
      locale: { title: 'Preview', navigationLabel: 'Preview' },
      content: { items: { message }, order: ['message'] },
    });
    const draft = defineAssessmentDraft({
      id: id('53'),
      slug: 'draftReview',
      type: 'assessment',
      params: { languages },
      locale: { title: 'Not implemented' },
      preview,
    });
    const result = draft.build.props({ languages: ['en'] });
    assert.equal(result.base.draft, true);
    assert.equal(result.base.section.length, 1);
    assert.equal(result.base.section[0]?.type, 'content');
    assert.deepEqual(
      result.base.section[0]?.content.map(block => block.type),
      ['text'],
    );
    assert.equal(assessment_Props_Schema.safeParse(result.base).success, true);
    assert.throws(() => draft.build.overrides({} as never, { languages: ['en'] }), /cannot be overridden/);
  });

  test('preserves identity and isolates localized overrides', () => {
    const assessment = makeAssessment('review', '20', '21');
    const original = assessment.build.props({ languages: ['en', 'uk'] });
    const patch = assessment.build.overrides({ locale: { title: { uk: 'Підсумок' } } }, { languages: ['uk'] });
    assert.deepEqual(patch.base, {});
    assert.equal(patch.locale?.uk?.locale?.title, 'Підсумок');
    assert.deepEqual(assessment.build.props({ languages: ['en', 'uk'] }), original);
    assert.throws(
      () => assessment.build.overrides({ id: id('22') } as never, { languages: ['en'] }),
      /Unknown Assessment override field/,
    );
  });

  test('supports direct Course, Module and Chapter placements without wrappers', () => {
    const finalAssessment = makeAssessment('finalAssessment', '30', '31');
    const moduleAssessment = makeAssessment('moduleAssessment', '32', '33');
    const chapterAssessment = makeAssessment('chapterAssessment', '34', '35');
    const chapter = defineChapter<'chapter', { chapterAssessment: typeof chapterAssessment }, typeof languages>({
      id: id('40'),
      slug: 'chapter',
      type: 'chapter',
      params: {},
      locale: { title: 'Chapter' },
      content: { items: { chapterAssessment }, order: ['chapterAssessment'] },
    });
    const module = defineModule<
      'module',
      { chapter: typeof chapter; moduleAssessment: typeof moduleAssessment },
      typeof languages
    >({
      id: id('41'),
      slug: 'module',
      type: 'module',
      params: {},
      locale: { title: 'Module' },
      content: { items: { chapter, moduleAssessment }, order: ['chapter', 'moduleAssessment'] },
    });
    const course = defineCourse({
      id: id('42'),
      slug: 'course',
      type: 'course',
      params: { languages },
      locale: { title: 'Course', description: 'Course description' },
      content: { items: { module, finalAssessment }, order: ['module', 'finalAssessment'] },
    });
    const result = course.build.props({ languages: ['en', 'uk'] });
    assert.equal(result.base.content[1]?.type, 'assessment');
    const moduleContent = result.base.content[0] as {
      content: Array<{ type: string; content?: Array<{ type: string }> }>;
    };
    assert.deepEqual(
      moduleContent.content.map(item => item.type),
      ['chapter', 'assessment'],
    );
    assert.equal(moduleContent.content[0]?.content?.[0]?.type, 'assessment');
  });
});
