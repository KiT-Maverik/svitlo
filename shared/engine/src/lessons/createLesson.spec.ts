import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createContentBlock } from './createContentBlock';
import { createSection } from './createSection';
import { createLesson } from './createLesson';
import { linkFlashcards } from './linkFlashcards';
import { splitLessonValue } from './splitLessonValue';
import { renderLessonFiles } from '../utils/generators/lessons/generateLessons.utils';
import { createChapter } from '../course/createCourseEntities';
import { createCourse } from '../course/createCourse';
import { assembleLessonResponse } from './assembleLessonResponse';
import { mergeLessonResources } from './mergeLessonResources';
import { createLessonOverrides } from './createLessonOverrides';

const languages = ['en', 'uk'] as const;
const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';

const title = { en: 'How light moves', uk: 'Як рухається світло' };
const text = createContentBlock<typeof languages>()({
  id: 'text-id',
  slug: 'intro',
  type: 'text',
  value: { en: 'Ray', uk: 'Промінь' },
});
const invariant = createContentBlock<typeof languages>()({
  id: 'invariant-id',
  slug: 'invariant',
  type: 'text',
  value: 'H₂O',
});
const markdown = createContentBlock<typeof languages>()({
  id: 'markdown-id',
  slug: 'details',
  type: 'markdown',
  locales: { en: '**Light**', uk: '**Світло**' },
});
const scene = createContentBlock<typeof languages>()({
  id: 'scene-id',
  slug: 'rayScene',
  type: 'scene',
  locales: { labels: { source: { en: 'Source', uk: 'Джерело' } } },
});
const theory = createSection<typeof languages>()({
  type: 'theory',
  id: 'theory-id',
  slug: 'theory',
  title: { en: 'Theory', uk: 'Теорія' },
  navigationLabel: '1',
  content: [text, invariant, markdown, scene],
});
const quiz = createSection<typeof languages>()({
  type: 'quiz',
  id: 'quiz-id',
  slug: 'quiz',
  title: { en: 'Quiz', uk: 'Тест' },
  navigationLabel: '2',
  parameters: {
    isBlocker: true,
    selection: { mode: 'all', questionSlugs: ['one'] },
    layout: { mode: 'stack' },
    feedbackMode: 'immediate',
    interaction: {
      retries: 0,
      showErrors: true,
      showCorrectAnswers: true,
      allowExplanations: true,
      allowDeferring: false,
      allowQuestionNavigation: true,
      skippable: false,
    },
    results: { visibility: 'after-review', showScore: true },
    screen: {},
  },
});
const creator = createLesson<typeof languages>()({
  id: lessonId,
  slug: 'howLightMoves',
  title,
  skills: [],
  flashcards: [],
  parameters: {
    languages,
    requireQuiz: true,
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
  },
  questions: {
    selectOneAnswer: {
      one: {
        id: 'question-id',
        slug: 'one',
        type: 'selectOneAnswer',
        assessmentMethod: 'retrieval',
        restrictions: [],
        question: [{ id: 'prompt-id', slug: 'prompt', type: 'text', value: { en: 'Light?', uk: 'Світло?' } }],
        answers: {
          correct: { yes: { id: 'yes-id', slug: 'yes', type: 'text', value: 'Yes' } },
          incorrect: { no: { id: 'no-id', slug: 'no', type: 'text', value: 'No' } },
          distractors: {},
        },
      },
    },
  },
  sections: [theory, quiz],
});

describe('composable Lesson creators', () => {
  it('composes ContentBlocks into ordinary Sections and Quiz Sections without leaking methods', () => {
    const lesson = creator.getData();
    assert.equal(lesson.sections.length, 2);
    assert.equal(lesson.sections[0].type, 'theory');
    assert.equal(lesson.sections[1].type, 'quiz');
    assert.deepEqual(JSON.parse(JSON.stringify(lesson)).sections, lesson.sections);
    assert.equal(JSON.stringify(lesson).includes('getData'), false);
    assert.equal(JSON.stringify(lesson).includes('toResource'), false);
    assert.deepEqual(lesson.sections[0].type === 'theory' ? lesson.sections[0].content[0] : null, text.getData());
    assert.deepEqual(quiz.getData().parameters.isBlocker, true);
    assert.deepEqual(scene.getData().locales, { labels: { source: { en: 'Source', uk: 'Джерело' } } });
  });

  it('retains language-invariant fields and strict sparse localization', () => {
    const base = text.getBase({ languages });
    assert.equal(base && typeof base === 'object' && 'value' in base, false);
    assert.deepEqual(text.getLocale({ languages, language: 'uk' }), { value: 'Промінь' });
    assert.equal(typeof invariant.getBase({ languages }), 'object');

    assert.deepEqual(theory.getLocale({ languages, language: 'uk' }), {
      title: 'Теорія',
      content: {
        '0': { value: 'Промінь' },
        '2': { locales: '**Світло**' },
        '3': { locales: { labels: { source: 'Джерело' } } },
      },
    });
    assert.equal(creator.getLocale('uk').config.localeSources['/sections/0/content/0/value'].code, 'uk');
    assert.throws(() => splitLessonValue({ value: { en: 'Only English' } }, languages), /Incomplete locale dictionary/);
  });

  it('preserves generator JSON bytes, locale paths, and response assembly for scenes and Quiz', () => {
    const files = renderLessonFiles(creator.getData());
    assert.equal(files.size, 9);
    const serialized = JSON.parse(files.get(`c/${lessonId}/config/uk.json`)!);
    assert.deepEqual(serialized, creator.getLocale('uk').config);
    const names = [...files.keys()];
    assert.equal(names[0], `c/${lessonId}/config/base.json`);
    assert.ok(names.includes(`c/${lessonId}/flashcards/uk.json`));
    assert.ok(names.includes(`c/${lessonId}/questions/en.json`));

    const base = creator.getBase();
    const locale = creator.getLocale('uk');
    const response = assembleLessonResponse(creator.getData().id, 'uk', {
      config: mergeLessonResources(base.config, locale.config),
      flashcards: mergeLessonResources(base.flashcards, locale.flashcards),
      questions: mergeLessonResources(base.questions, locale.questions),
    });
    assert.equal(response.title, 'Як рухається світло');
    assert.equal(response.locale.code, 'uk');
    const theoryResponse = response.sections[0];
    assert.equal(theoryResponse.type, 'theory');
    if (theoryResponse.type === 'theory') {
      assert.equal(theoryResponse.content[0].type, 'text');
      assert.deepEqual(theoryResponse.content[0].type === 'text' && theoryResponse.content[0].value, 'Промінь');
      assert.equal(theoryResponse.content[1].type === 'text' && theoryResponse.content[1].value, 'H₂O');
      assert.equal(theoryResponse.content[2].type === 'markdown' && theoryResponse.content[2].text, '**Світло**');
      assert.equal(theoryResponse.content[3].type === 'scene' && theoryResponse.content[3].rendererKey, 'scene-id');
    }
    const quizResponse = response.sections[1];
    assert.equal(quizResponse.type, 'quiz');
    if (quizResponse.type === 'quiz') {
      assert.equal(quizResponse.parameters.isBlocker, true);
      assert.equal(quizResponse.questions.length, 1);
    }
  });

  it('preserves both Flashcard relation endpoints through locale publication and response assembly', () => {
    const flashcards = linkFlashcards<typeof languages>(
      [
        { id: 'card-a', front: [], back: [], hint: [], tags: [], flags: [] },
        { id: 'card-b', front: [], back: [], hint: [], tags: [], flags: [] },
      ],
      [{
        relationshipId: 'bidirectional-recall',
        type: 'reverse',
        sourceFlashcardId: 'card-a',
        targetFlashcardId: 'card-b',
      }],
    );
    const linkedLesson = createLesson<typeof languages>()({ ...creator.getData(), flashcards });
    const base = linkedLesson.getBase();
    const locale = linkedLesson.getLocale('uk');
    const response = assembleLessonResponse(lessonId, 'uk', {
      config: mergeLessonResources(base.config, locale.config),
      flashcards: mergeLessonResources(base.flashcards, locale.flashcards),
      questions: mergeLessonResources(base.questions, locale.questions),
    });
    const published = response.flashcards as typeof flashcards;
    assert.deepEqual(published[0].relationships, [{
      relationshipId: 'bidirectional-recall',
      type: 'reverse',
      relatedFlashcardId: 'card-b',
      position: 'peer',
    }]);
    assert.deepEqual(published[1].relationships, [{
      relationshipId: 'bidirectional-recall',
      type: 'reverse',
      relatedFlashcardId: 'card-a',
      position: 'peer',
    }]);
  });

  it('is consumed by Course creators and Course-local Lesson overrides', () => {
    const chapter = createChapter<typeof languages>({
      type: 'chapter',
      id: 'chapter-id',
      title: { type: 'text', id: 'chapter-title', slug: 'chapterTitle', value: 'Chapter' },
      content: [creator],
    });
    assert.deepEqual(chapter.getData().content[0], creator.getData());
    assert.deepEqual(
      chapter.getContentEntries().lessons.map(item => item.id),
      [lessonId],
    );
    const course = createCourse<typeof languages>({
      type: 'course',
      id: 'course-id',
      parameters: { languages },
      title: { type: 'text', id: 'course-title', slug: 'courseTitle', value: 'Course' },
      description: { type: 'markdown', id: 'course-desc', slug: 'courseDescription', locales: 'Description' },
      content: [chapter],
    });
    assert.deepEqual(
      course.getContentEntries().lessons.map(item => item.id),
      [lessonId],
    );
    assert.deepEqual(course.toToc({ language: 'uk' }).children[0].type, 'chapter');

    const override = createLessonOverrides(creator.getData()).sections.setOrder(['quiz', 'theory']).build();
    assert.equal(override.lesson.id, lessonId);
    assert.deepEqual(override.overrides.sections?.order, ['quiz', 'theory']);
  });
});
