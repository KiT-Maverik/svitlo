import { describe, expect, it } from 'vitest';
import type { Lesson_Props } from '@svitlo/engine';
import { projectContentBlock, projectLessonProps } from './engineLessonProjection';

const id = (suffix: string) => '663572e7-bd85-4516-86e2-3de07d209e' + suffix;
const text = (suffix: string, value: string) => ({
  id: id(suffix),
  type: 'text' as const,
  slug: 'text' + suffix,
  params: {},
  locale: { value },
});
const question = {
  id: id('11'),
  slug: 'whatIsLight',
  type: 'selectOneAnswer',
  params: { assessmentMethod: 'retrieval', restrictions: [] },
  locale: {},
  content: {
    question: [text('12', 'What is light?')],
    answers: {
      correct: { electromagnetic: text('13', 'Electromagnetic radiation') },
      incorrect: { mechanical: text('14', 'Mechanical wave') },
      distractors: {},
    },
  },
};
function lesson(): Lesson_Props {
  return {
    id: id('15'),
    type: 'lesson',
    slug: 'light',
    skills: [],
    params: {
      requireQuiz: true,
      languages: ['en', 'uk'],
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: 'Light' },
    section: [
      {
        id: id('16'),
        type: 'content',
        slug: 'introduction',
        params: {},
        locale: { title: 'Introduction', navigationLabel: 'Start' },
        content: [text('17', 'Light travels in straight lines')],
      },
      {
        id: id('18'),
        type: 'quiz',
        slug: 'quiz',
        params: {
          selection: { mode: 'all', questionSlugs: ['whatIsLight'] },
          layout: { mode: 'stack' },
          feedbackMode: 'immediate',
          interaction: {
            retries: 1,
            showErrors: true,
            showCorrectAnswers: true,
            allowExplanations: true,
            allowDeferring: false,
            allowQuestionNavigation: false,
            skippable: false,
          },
          results: { visibility: 'immediate', showScore: true },
        },
        locale: { title: 'Quiz', navigationLabel: 'Test' },
        content: [],
      },
    ],
    questions: { selectOneAnswer: [question] },
    flashcards: [],
  } as unknown as Lesson_Props;
}

describe('Engine Props projection into UI Kit widgets', () => {
  it('preserves localized metadata, Section order and nested ContentBlock text', () => {
    const source = lesson();
    const view = projectLessonProps(source, 'en');
    expect(view.title).toBe('Light');
    expect(view.parameters.sections.allowNavigation).toBe(true);
    expect(view.sections.map(section => section.type)).toEqual(['learningFlow', 'quiz']);
    const introduction = view.sections[0];
    if (introduction.type === 'quiz') throw new Error('Expected Content Section');
    expect(introduction.navigationLabel).toBe('Start');
    expect(introduction.content[0]).toMatchObject({ type: 'text', value: 'Light travels in straight lines' });
    expect(source.section[0].type).toBe('content');
  });

  it('prepares a Quiz from the separate Engine Question Bank without copying its authoring shape', () => {
    const view = projectLessonProps(lesson(), 'en');
    const quiz = view.sections[1];
    if (quiz.type !== 'quiz') throw new Error('Expected Quiz Section');
    expect(quiz.questions).toHaveLength(1);
    expect(quiz.questions[0]).toMatchObject({ type: 'selectOneAnswer', slug: 'whatIsLight' });
    const first = quiz.questions[0];
    if (first.type !== 'selectOneAnswer') throw new Error('Expected SelectOneAnswer');
    expect(first.answers.correct.electromagnetic).toMatchObject({ type: 'text', value: 'Electromagnetic radiation' });
    expect(first.answers.incorrect.mechanical).toMatchObject({ type: 'text', value: 'Mechanical wave' });
  });

  it('maps a Checkpoint Item into an actionable nested answer', () => {
    const block = projectContentBlock({
      id: id('21'),
      slug: 'checkpoint',
      type: 'checkpoint',
      params: { enableChecks: true, requireCompletion: true },
      locale: { title: 'Check your learning' },
      content: [{
        id: id('22'),
        type: 'checkpointItem',
        slug: 'why',
        check: true,
        question: text('23', 'Why can we see?'),
        answer: [text('24', 'Because light reaches our eyes.')],
      }],
    } as never);
    if (block.type !== 'checkpoint') throw new Error('Expected Checkpoint');
    expect(block.requireCompletion).toBe(true);
    expect(block.items[0].question).toBe('Why can we see?');
    expect(block.items[0].answer[0]).toMatchObject({ type: 'text', value: 'Because light reaches our eyes.' });
  });

  it('rejects undeclared languages and unrendered Quiz screens', () => {
    expect(() => projectLessonProps(lesson(), 'pl')).toThrow(/does not support selected language/);
    const source = lesson();
    const quiz = source.section[1];
    if (quiz.type !== 'quiz') throw new Error('Expected Quiz');
    quiz.params.screen = { starting: { showDefaultContent: true } };
    expect(() => projectLessonProps(source, 'en')).toThrow(/Quiz screen content is not yet supported/);
  });
});
