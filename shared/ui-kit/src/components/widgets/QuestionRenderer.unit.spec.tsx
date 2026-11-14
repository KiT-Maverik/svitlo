import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type {
  ContentBlock_Text_Props,
  Question_SelectOneAnswer_Props,
  QuizSection_Props,
} from '@svitlo/engine/runtime';
import type { QuestionResponse } from '#types/questions';
import { QuestionRenderer } from './questions/response/QuestionRenderer';
import { parseQuestionNumber } from './questions/AnswerWithNumber/AnswerWithNumber';
import { questionBlockLabel } from './questions/response/QuestionContent';
import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';

const uuid = (index: number) => '00000000-0000-4000-8000-' + String(index).padStart(12, '0');
const text = (slug: string, value: string): ContentBlock_Text_Props => ({
  id: uuid(Array.from(slug).reduce((sum, char) => sum + char.charCodeAt(0), 1)),
  slug: slug.replace(/-([a-z])/gu, (_, letter: string) => letter.toUpperCase()),
  type: 'text',
  params: {},
  locale: { value },
});
const common = {
  id: uuid(1),
  slug: 'question1',
  params: { assessmentMethod: 'retrieval' as const, restrictions: [] },
  locale: {},
  content: { question: [text('prompt', 'What is the answer?')] satisfies [ContentBlock_Text_Props] },
};
const one: Question_SelectOneAnswer_Props = {
  ...common,
  type: 'selectOneAnswer',
  content: {
    ...common.content,
    answers: {
      correct: { yes: text('yes', 'Yes') },
      incorrect: { no: text('no', 'No') },
      distractors: {},
    },
    hint: [text('hint', 'Helpful hint')],
    explanation: [text('explanation', 'Because it is yes.')],
  },
};

describe('QuestionRenderer — published Engine Props', () => {
  it('renders nothing for an empty array', () => {
    const { container } = render(<QuestionRenderer messages={enUiKitMessages} questions={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders prompts, hints, choices and explanations without reshaping the Props', () => {
    render(<QuestionRenderer messages={enUiKitMessages} questions={[one]} />);
    expect(screen.getByText('What is the answer?')).toBeVisible();
    fireEvent.click(screen.getByText('Hint'));
    expect(screen.getByText('Helpful hint')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(screen.getByRole('status')).toHaveTextContent('Correct!');
    fireEvent.click(screen.getByText('Explanation'));
    expect(screen.getByText('Because it is yes.')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders all nine canonical Question Props variants with independent attempts', () => {
    const block = text('answer', 'Answer');
    const definitions: QuestionResponse[] = [
      one,
      {
        ...common,
        type: 'selectMultipleAnswers',
        content: {
          ...common.content,
          answers: { correct: { a: block }, incorrect: {}, distractors: {} },
        },
      },
      {
        ...common,
        type: 'matchBlocks',
        content: {
          ...common.content,
          pairs: { first: { left: block, right: text('right', 'Right') } },
        },
      },
      { ...common, type: 'answerWithText', locale: { correctAnswers: ['Answer'], placeholder: 'Write' } },
      {
        ...common,
        type: 'answerWithNumber',
        params: { ...common.params, correctAnswers: [1, 2] },
        locale: { placeholder: 'Number' },
      },
      { ...common, type: 'orderSequence', content: { ...common.content, sequence: [block] } },
      {
        ...common,
        type: 'buildAnswerWithBlocks',
        content: {
          ...common.content,
          correctSequence: [block],
          distractors: [],
        },
        locale: { placeholder: 'Build' },
      },
      {
        ...common,
        type: 'fillBlanksWithBlocks',
        content: {
          ...common.content,
          slots: [{ selector: 'first', correctAnswer: block }],
          distractors: [],
        },
        locale: { placeholder: 'Choose' },
      },
      {
        ...common,
        type: 'fillBlanksWithText',
        locale: {
          slots: [{ selector: 'first', correctAnswers: ['Answer'] }],
          placeholder: 'Fill',
        },
      },
    ];
    const questions = definitions.map((question, index) => ({
      ...question,
      id: uuid(index + 1),
      slug: 'question' + (index + 1),
    }));
    const { container } = render(<QuestionRenderer messages={enUiKitMessages} questions={questions} />);
    expect(within(container).getAllByRole('region')).toHaveLength(9);
    expect(within(container).getAllByRole('button', { name: 'Check' })).toHaveLength(9);
  });

  it('signals completion only after every question has been checked', async () => {
    const onComplete = vi.fn();
    const another: Question_SelectOneAnswer_Props = {
      ...one,
      id: uuid(2),
      slug: 'question2',
      content: { ...one.content, question: [text('secondPrompt', 'Another question')] },
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
        questions={[
          {
            ...one,
            id: uuid(80),
            slug: 'replacementQuestion',
            content: { ...one.content, question: [text('other', 'Replacement prompt')] },
          },
        ]}
      />,
    );
    expect(screen.queryByText('What is the answer?')).toBeNull();
    expect(screen.getByText('Replacement prompt')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Yes' })).toHaveAttribute('aria-pressed', 'false');
  });
});

const quizSettings = (layout: 'stack' | 'stepper', timeLimitSeconds?: number): QuizSection_Props['params'] => ({
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
    const second: Question_SelectOneAnswer_Props = {
      ...one,
      id: uuid(2),
      slug: 'question2',
      content: { ...one.content, question: [text('q2', 'Another question')] },
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

  it('ends the Quiz on timeout and reports a failed attempt', () => {
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

describe('accessible Question labels', () => {
  it('resolves an accessible media label for the selected content language', () => {
    const block = {
      id: uuid(101),
      slug: 'audioChoice',
      type: 'video' as const,
      params: {},
      locale: {
        fileLocation: '/recording.mp4',
        poster: '/poster.png',
        label: 'Recording',
        title: { en: 'Recording', uk: 'Запис' },
      },
    };
    expect(questionBlockLabel(block, 'uk')).toBe('Запис');
    expect(() => questionBlockLabel(block, 'ar')).toThrow('Missing localized content at video.title for ar');
  });

  it('rejects subtitles as question labels until a synchronized media renderer exists', () => {
    expect(() =>
      questionBlockLabel({
        id: uuid(102),
        slug: 'captions',
        type: 'subtitles',
        params: {},
        locale: { fileLocation: '/captions.en.vtt' },
      }),
    ).toThrow('Subtitles cannot be used as standalone question labels');
  });

  it('strips Markdown syntax from a choice label using canonical locale Props', () => {
    expect(
      questionBlockLabel({
        id: uuid(100),
        slug: 'markdownChoice',
        type: 'markdown',
        params: {},
        locale: { value: '**Important** and `code`' },
      }),
    ).toBe('Important and code');
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
