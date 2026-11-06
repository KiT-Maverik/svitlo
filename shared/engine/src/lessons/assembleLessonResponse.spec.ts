import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { assembleLessonResponse } from './assembleLessonResponse';

const id = 'd3048d21-8690-5255-b62c-984c69ac272c';
const quiz = (slug: string, isBlocker: boolean) => ({
  id: slug, slug, type: 'quiz', title: 'Quiz', navigationLabel: 'Quiz',
  parameters: {
    isBlocker, timeLimitSeconds: 120,
    selection: { mode: 'all', questionSlugs: ['one'] },
    layout: { mode: 'stack' }, feedbackMode: 'immediate',
    interaction: { retries: 0, showErrors: true, showCorrectAnswers: true, allowExplanations: true,
      allowDeferring: false, allowQuestionNavigation: false, skippable: false },
    results: { visibility: 'immediate', showScore: true }, screen: {},
  },
});
const lesson = {
  id, slug: 'howLightMoves', title: 'Light', skills: ['00000000-0000-4000-8000-000000000015'],
  parameters: { requireQuiz: true, languages: ['en'], sections: {
    allowNavigation: true, allowSkipping: true, showIndexes: true,
  } },
  sections: [quiz('first', true), quiz('second', false)],
};
const questions = {
  data: { selectOneAnswer: { one: {
    id: 'q1', slug: 'one', type: 'selectOneAnswer', assessmentMethod: 'retrieval', restrictions: [],
    question: [{ id: 'prompt', type: 'text', value: 'Question' }],
    answers: { correct: {}, incorrect: {}, distractors: {} },
  } } },
  localeSources: {},
};

describe('assembleLessonResponse', () => {
  it('assembles multiple independent quiz sections with Skill IDs', () => {
    const response = assembleLessonResponse(id, 'en', {
      config: { data: lesson, localeSources: {} }, flashcards: { data: [], localeSources: {} }, questions,
    });
    assert.deepEqual(response.skills, lesson.skills);
    assert.equal(response.sections.length, 2);
    assert.ok(response.sections.every(section => section.type === 'quiz' && section.questions.length === 1));
    const first = response.sections[0];
    assert.equal(first.type, 'quiz');
    if (first.type === 'quiz') {
      assert.equal(first.parameters.isBlocker, true);
      assert.equal(first.parameters.timeLimitSeconds, 120);
    }
  });

  it('rejects legacy nested Quiz ContentBlocks', () => {
    const invalid = { ...lesson, sections: [{ ...quiz('old', true), content: [{ type: 'quiz' }] }] };
    assert.throws(() => assembleLessonResponse(id, 'en', {
      config: { data: invalid, localeSources: {} }, flashcards: { data: [], localeSources: {} }, questions,
    }), /must not contain ContentBlocks/);
  });
});
