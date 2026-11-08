import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Question, Locale_Languages, Quiz_Parameters } from '@svitlo/contracts/content';
import { QuestionRenderer } from './questions/response/QuestionRenderer';
import { parseQuestionNumber } from './questions/AnswerWithNumber/AnswerWithNumber';
import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';

const text = (id: string, value: string) => ({ id, type: 'text' as const, value });
const common = {
  id: 'question-1',
  assessmentMethod: 'retrieval' as const,
  restrictions: [],
  question: [text('prompt', 'What is the answer?')] as [ReturnType<typeof text>],
};
const one: Question<'response', Locale_Languages> = {
  ...common,
  type: 'selectOneAnswer',
  answers: {
    correct: { yes: text('yes', 'Yes') },
    incorrect: { no: text('no', 'No') },
    distractors: {},
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
      { ...common, type: 'selectMultipleAnswers', answers: { correct: { a: block }, incorrect: {}, distractors: {} } },
      { ...common, type: 'matchBlocks', pairs: { first: { left: block, right: text('right', 'Right') } } },
      { ...common, type: 'answerWithText', correctAnswers: ['Answer'], placeholder: 'Write' },
      { ...common, type: 'answerWithNumber', correctAnswers: [1, 2], placeholder: 'Number' },
      { ...common, type: 'orderSequence', sequence: [block] },
      { ...common, type: 'buildAnswerWithBlocks', correctSequence: [block], distractors: [], placeholder: 'Build' },
      {
        ...common,
        type: 'fillBlanksWithBlocks',
        slots: [{ selector: 'first', correctAnswer: block }],
        distractors: [],
        placeholder: 'Choose',
      },
      {
        ...common,
        type: 'fillBlanksWithText',
        slots: [{ selector: 'first', correctAnswers: ['Answer'] }],
        placeholder: 'Fill',
      },
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
    rerender(
      <QuestionRenderer
        messages={enUiKitMessages}
        questions={[{ ...one, id: 'another-id', question: [text('other', 'Replacement prompt')] }]}
      />,
    );
    expect(screen.queryByText('What is the answer?')).toBeNull();
    expect(screen.getByText('Replacement prompt')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Yes' })).toHaveAttribute('aria-pressed', 'false');
  });
});

const quizSettings = (
  layout: 'stack' | 'stepper',
  timeLimitSeconds?: number,
): Quiz_Parameters<'response', Locale_Languages> => ({
  selection: { mode: 'all' },
  layout: { mode: layout, showProgress: true },
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
  results: { visibility: 'immediate', showScore: true },
  screen: {},
  ...(timeLimitSeconds === undefined ? {} : { timeLimitSeconds }),
});

describe('Quiz Section presentation', () => {
  it('supports stepper layout with one visible question and per-question progress', () => {
    const second = {
      ...one,
      id: 'question-2',
      question: [text('q2', 'Another question')] as [ReturnType<typeof text>],
    };
    render(
      <QuestionRenderer messages={enUiKitMessages} questions={[one, second]} parameters={quizSettings('stepper')} />,
    );
    expect(screen.getByRole('list', { name: enUiKitMessages.lesson.questionProgress.navigation })).toBeVisible();
    expect(screen.getByText('What is the answer?')).toBeVisible();
    expect(screen.getByText('Another question')).not.toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Another question')).toBeVisible();
    expect(screen.getByText('What is the answer?')).not.toBeVisible();
  });

  it('ends the whole Quiz on timeout and reports a failed attempt', () => {
    vi.useFakeTimers();
    try {
      const onComplete = vi.fn();
      render(
        <QuestionRenderer
          messages={enUiKitMessages}
          questions={[one]}
          parameters={quizSettings('stack', 2)}
          onComplete={onComplete}
        />,
      );
      expect(screen.getByRole('timer')).toHaveTextContent('00:02');
      act(() => vi.advanceTimersByTime(2000));
      expect(screen.getByRole('timer')).toHaveTextContent('00:00');
      expect(onComplete).toHaveBeenCalledWith({ passed: false, timedOut: true, correct: 0, total: 1 });
      expect(screen.getByRole('button', { name: 'Check' })).toBeDisabled();
    } finally {
      vi.useRealTimers();
    }
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
