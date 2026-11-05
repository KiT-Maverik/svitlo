import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Question, Locale_Languages } from '@svitlo/engine/content';
import { QuestionRenderer } from './questions/response/QuestionRenderer';
import { parseQuestionNumber } from './questions/AnswerWithNumber/AnswerWithNumber';
import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';

const text = (id: string, value: string) => ({ id, type: 'text' as const, value });
const common = {
  id: 'question-1', assessmentMethod: 'retrieval' as const, restrictions: [],
  question: [text('prompt', 'What is the answer?')] as [ReturnType<typeof text>],
};
const one: Question<'response', Locale_Languages> = {
  ...common, type: 'selectOneAnswer',
  answers: {
    correct: { yes: text('yes', 'Yes') },
    incorrect: { no: text('no', 'No') }, distractors: {},
  },
  hint: [text('hint', 'Helpful hint')],
  explanation: [text('explanation', 'Because it is yes.')],
};

describe('QuestionRenderer — contract responses', () => {
  it('renders nothing for an empty array', () => {
    const { container } = render(<QuestionRenderer messages={enUiKitMessages} questions={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders prompts, hints, choices and explanations without converting to legacy questions', () => {
    render(<QuestionRenderer messages={enUiKitMessages} questions={[one]} />);
    expect(screen.getByText('What is the answer?')).toBeVisible();
    const hint = screen.getByText('Hint');
    fireEvent.click(hint);
    expect(screen.getByText('Helpful hint')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(screen.getByRole('status')).toHaveTextContent('Correct!');
    fireEvent.click(screen.getByText('Explanation'));
    expect(screen.getByText('Because it is yes.')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders every contract question type and keeps attempts independent', () => {
    const block = text('answer', 'Answer');
    const definitions: Question<'response', Locale_Languages>[] = [
      one,
      { ...common, type: 'selectMultipleAnswers',
        answers: { correct: { a: block }, incorrect: {}, distractors: {} } },
      { ...common, type: 'matchBlocks', pairs: { first: { left: block, right: text('right', 'Right') } } },
      { ...common, type: 'answerWithText', correctAnswers: ['Answer'], placeholder: 'Write' },
      { ...common, type: 'answerWithNumber', correctAnswers: [1, 2], placeholder: 'Number' },
      { ...common, type: 'orderSequence', sequence: [block] },
      { ...common, type: 'buildAnswerWithBlocks', correctSequence: [block], distractors: [], placeholder: 'Build' },
      { ...common, type: 'fillBlanksWithBlocks',
        slots: [{ selector: 'first', correctAnswer: block }], distractors: [], placeholder: 'Choose' },
      { ...common, type: 'fillBlanksWithText',
        slots: [{ selector: 'first', correctAnswers: ['Answer'] }], placeholder: 'Fill' },
    ];
    const questions = definitions.map((question, index) => ({ ...question, id: 'question-' + index }));
    const { container } = render(<QuestionRenderer messages={enUiKitMessages} questions={questions} />);
    expect(within(container).getAllByRole('region')).toHaveLength(9);
    expect(within(container).getAllByRole('button', { name: 'Check' })).toHaveLength(9);
  });

  it('signals completion only after every contract response has been checked', async () => {
    const onComplete = vi.fn();
    const another: Question<'response', Locale_Languages> = {
      ...one,
      id: 'question-2',
      question: [text('second-prompt', 'Another question')],
    };
    render(<QuestionRenderer messages={enUiKitMessages} questions={[one, another]} onComplete={onComplete} />);
    const yesButtons = screen.getAllByRole('button', { name: 'Yes' });
    fireEvent.click(yesButtons[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Check' })[0]);
    expect(onComplete).not.toHaveBeenCalled();
    fireEvent.click(yesButtons[1]);
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
  });

  it('resets attempt state when a question ID changes', () => {
    const { rerender } = render(<QuestionRenderer messages={enUiKitMessages} questions={[one]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
    rerender(<QuestionRenderer messages={enUiKitMessages} questions={[{ ...one, id: 'another-id',
      question: [text('other', 'Replacement prompt')] }]} />);
    expect(screen.queryByText('What is the answer?')).toBeNull();
    expect(screen.getByText('Replacement prompt')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Yes' })).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('numeric response grading', () => {
  it('accepts decimal comma and rejects empty, infinite, and malformed values', () => {
    expect(parseQuestionNumber('6,28')).toBe(6.28);
    expect(parseQuestionNumber('')).toBeNull();
    expect(parseQuestionNumber('Infinity')).toBeNull();
    expect(parseQuestionNumber('1,2,3')).toBeNull();
  });
});
