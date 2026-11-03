import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { QuestionResponse } from './questions/response/toQuestionAttempt';
import { toQuestionAttempt } from './questions/response/toQuestionAttempt';
import { QuestionRenderer } from './questions/response/QuestionRenderer';

const locale = { code: 'en' as const };
const text = (id: string, value: string) => ({ id, type: 'text' as const, locale, value });
const common = {
  id: 'question-1',
  locale,
  assessmentMethod: 'retrieval' as const,
  restrictions: [],
  question: [text('prompt-1', 'First prompt'), text('prompt-2', 'Second prompt')] as [ReturnType<typeof text>, ReturnType<typeof text>],
};

const selectOne: QuestionResponse = {
  ...common,
  type: 'selectOneAnswer',
  hint: [text('hint', 'Helpful hint')],
  explanation: [text('explanation-1', 'First explanation'), text('explanation-2', 'Second explanation')],
  answers: {
    correct: { yes: text('yes', 'Correct answer') },
    incorrect: { no: text('no', 'Incorrect answer') },
    distractors: {},
  },
};

describe('QuestionRenderer', () => {
  it('renders nothing for an empty array', () => {
    const { container } = render(<QuestionRenderer questions={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders multiple prompt, hint, answer and explanation blocks', () => {
    render(<QuestionRenderer questions={[selectOne]} />);
    expect(screen.getByText('First prompt')).toBeVisible();
    expect(screen.getByText('Second prompt')).toBeVisible();
    expect(screen.getByText('Helpful hint')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Correct answer' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Correct answer' }));
    fireEvent.click(screen.getByRole('button', { name: 'Перевірити' }));
    fireEvent.click(screen.getByRole('button', { name: 'Показати пояснення' }));
    expect(screen.getByText('First explanation')).toBeVisible();
    expect(screen.getByText('Second explanation')).toBeVisible();
  });

  it('uses the supplied array when questions change', () => {
    const { rerender } = render(<QuestionRenderer questions={[selectOne]} />);
    rerender(<QuestionRenderer questions={[{ ...selectOne, id: 'question-2',
      question: [text('replacement', 'Replacement prompt')] }]} />);
    expect(screen.queryByText('First prompt')).toBeNull();
    expect(screen.getByText('Replacement prompt')).toBeVisible();
  });
});

describe('contract response adapters', () => {
  it('routes every contract question type to an interaction', () => {
    const block = text('answer', 'Answer');
    const samples: QuestionResponse[] = [
      selectOne,
      { ...common, type: 'selectMultipleAnswers', answers: { correct: { a: block }, incorrect: {}, distractors: {} } },
      { ...common, type: 'matchBlocks', pairs: { one: { left: block, right: text('right', 'Right') } } },
      { ...common, type: 'answerWithText', correctAnswers: ['Answer'], placeholder: 'Type here' },
      { ...common, type: 'answerWithNumber', correctAnswers: [1, 2], placeholder: 'Number' },
      { ...common, type: 'orderSequence', sequence: [block] },
      { ...common, type: 'buildAnswerWithBlocks', correctSequence: [block], distractors: [], placeholder: 'Build' },
      { ...common, type: 'fillBlanksWithBlocks', slots: [{ selector: 'first', correctAnswer: block }],
        distractors: [], placeholder: 'Choose' },
      { ...common, type: 'fillBlanksWithText', slots: [{ selector: 'first', correctAnswers: ['Answer'] }],
        placeholder: 'Type' },
    ];
    expect(samples.map(sample => toQuestionAttempt(sample).type)).toEqual([
      'single-select', 'multiple-select', 'matching', 'short-text', 'numeric', 'ordering',
      'block-builder', 'fill-blanks-drag', 'fill-blanks-text',
    ]);
  });
});
