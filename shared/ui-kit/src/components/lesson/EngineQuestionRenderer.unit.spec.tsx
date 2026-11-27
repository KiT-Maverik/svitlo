import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { AssessmentResourceLoader, ContentBlock_Text_Data, Question_SelectOneAnswer_Data, QuizSection_Data } from '@svitlo/engine/runtime';

import type { QuestionResponse } from '#types/questions';

import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';
import { parseQuestionNumber } from '../widgets/questions/AnswerWithNumber/AnswerWithNumber';
import { questionBlockLabel } from '../widgets/questions/response/QuestionContent';
import { EngineQuestionRenderer, selectQuizQuestions } from './EngineQuestionRenderer';

const uuid = (n: number) => `663572e7-bd85-4516-86e2-${n.toString(16).padStart(12, '0')}`;
const text = (n: number, value: string): ContentBlock_Text_Data => ({
  id: uuid(n),
  slug: 'text' + n,
  type: 'text',
  params: {},
  locale: { value },
});
const base = (n: number) => ({
  id: uuid(n),
  slug: 'question' + n,
  params: { assessmentMethod: 'retrieval' as const, restrictions: [] },
  locale: {},
  content: { question: [text(n + 100, 'Prompt ' + n)] as [ContentBlock_Text_Data] },
});

const choices = {
  correct: { yes: text(201, 'Yes') },
  incorrect: { no: text(202, 'No') },
  distractors: {},
};
const questions: QuestionResponse[] = [
  { ...base(1), type: 'selectOneAnswer', content: { ...base(1).content, answers: choices } },
  { ...base(2), type: 'selectMultipleAnswers', content: { ...base(2).content, answers: choices } },
  {
    ...base(3),
    type: 'matchBlocks',
    content: { ...base(3).content, pairs: { first: { left: text(203, 'Left'), right: text(204, 'Right') } } },
  },
  { ...base(4), type: 'answerWithText', locale: { correctAnswers: ['Answer'], placeholder: 'Write' } },
  {
    ...base(5),
    type: 'answerWithNumber',
    params: { ...base(5).params, correctAnswers: [6.28] },
    locale: { placeholder: 'Number' },
  },
  {
    ...base(6),
    type: 'orderSequence',
    content: { ...base(6).content, sequence: [text(205, 'First'), text(206, 'Second')] },
  },
  {
    ...base(7),
    type: 'buildAnswerWithBlocks',
    content: {
      ...base(7).content,
      correctSequence: [text(207, 'Alpha'), text(208, 'Beta')],
      distractors: [text(209, 'Gamma')],
    },
    locale: { placeholder: 'Build' },
  },
  {
    ...base(8),
    type: 'fillBlanksWithBlocks',
    content: {
      ...base(8).content,
      slots: [{ selector: 'blank', correctAnswer: text(210, 'Target') }],
      distractors: [text(211, 'Other')],
    },
    locale: { placeholder: 'Choose' },
  },
  {
    ...base(9),
    type: 'fillBlanksWithText',
    locale: { slots: [{ selector: 'blank', correctAnswers: ['Answer'] }], placeholder: 'Fill' },
  },
];

function quiz(selected: readonly QuestionResponse[], overrides: Partial<QuizSection_Data['params']> = {}): QuizSection_Data {
  return {
    id: uuid(90),
    slug: 'regressionQuiz',
    type: 'quiz',
    params: {
      isBlocker: true,
      selection: { mode: 'all', questionIds: selected.map(question => question.id) },
      layout: { mode: 'stack' },
      feedbackMode: 'immediate',
      interaction: {
        retries: 0,
        showErrors: true,
        showCorrectAnswers: true,
        allowExplanations: true,
        allowDeferring: false,
        allowQuestionNavigation: false,
        skippable: false,
      },
      results: { visibility: 'immediate', showScore: true },
      screen: {},
      ...overrides,
    },
    locale: { title: 'Quiz', navigationLabel: 'Quiz' },
    content: [],
  };
}

function loader(items: readonly QuestionResponse[] = questions): AssessmentResourceLoader {
  return {
    loadQuestions: async ({ ids }) => ({
      items: items.filter(question => ids.includes(question.id)),
      fallbacks: [],
    }),
    loadFlashcards: async () => ({ items: [], fallbacks: [] }),
  };
}

function mount(selected: readonly QuestionResponse[], onComplete = vi.fn(), resourceLoader = loader(selected), overrides: Partial<QuizSection_Data['params']> = {}) {
  render(
    <EngineQuestionRenderer
      lessonId={uuid(99)}
      language="en"
      assessmentLoader={resourceLoader}
      section={quiz(selected, overrides)}
      messages={enUiKitMessages}
      onComplete={onComplete}
    />,
  );
  return onComplete;
}

function chooseCorrect(type: QuestionResponse['type']) {
  switch (type) {
    case 'selectOneAnswer':
      fireEvent.click(screen.getByRole('radio', { name: 'Yes' }));
      break;
    case 'selectMultipleAnswers':
      fireEvent.click(screen.getByRole('checkbox', { name: 'Yes' }));
      break;
    case 'matchBlocks':
      fireEvent.mouseDown(screen.getByRole('combobox'));
      fireEvent.click(screen.getByRole('option', { name: 'Right' }));
      break;
    case 'answerWithText':
      fireEvent.change(screen.getByRole('textbox'), { target: { value: '  aNsWeR  ' } });
      break;
    case 'answerWithNumber':
      fireEvent.change(screen.getByRole('textbox'), { target: { value: '6,28' } });
      break;
    case 'orderSequence':
      fireEvent.click(screen.getAllByRole('button', { name: '↑' })[1]);
      break;
    case 'buildAnswerWithBlocks':
      fireEvent.click(screen.getByRole('button', { name: 'Alpha' }));
      fireEvent.click(screen.getByRole('button', { name: 'Beta' }));
      break;
    case 'fillBlanksWithBlocks':
      fireEvent.mouseDown(screen.getByRole('combobox'));
      fireEvent.click(screen.getByRole('option', { name: 'Target' }));
      break;
    case 'fillBlanksWithText':
      fireEvent.change(screen.getByRole('textbox'), { target: { value: ' answer ' } });
      break;
  }
}

describe('active Engine Quiz renderer', () => {
  it.each(questions)('grades canonical $type response rather than counting widgets', async question => {
    const complete = mount([question]);
    await screen.findByText('Prompt ' + (questions.indexOf(question) + 1));
    chooseCorrect(question.type);
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.questionFrame.check }));
    await waitFor(() =>
      expect(complete).toHaveBeenCalledWith({ passed: true, correct: 1, total: 1, timedOut: false }),
    );
    expect(complete).toHaveBeenCalledTimes(1);
  });

  it('isolates attempts per UUID and does not complete before both are checked', async () => {
    const second: Question_SelectOneAnswer_Data = { ...(questions[0] as Question_SelectOneAnswer_Data), ...base(10), type: 'selectOneAnswer' };
    const selected = [questions[0], second];
    const complete = mount(selected, vi.fn(), loader(selected), {
      interaction: { ...quiz(selected).params.interaction, retries: 1 },
    });
    await screen.findByText('Prompt 10');
    const radios = screen.getAllByRole('radio', { name: 'No' });
    fireEvent.click(radios[0]);
    fireEvent.click(screen.getAllByRole('button', { name: enUiKitMessages.questionFrame.check })[0]);
    expect(complete).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.questionFrame.retry }));
    const yes = screen.getAllByRole('radio', { name: 'Yes' });
    fireEvent.click(yes[0]);
    fireEvent.click(screen.getAllByRole('button', { name: enUiKitMessages.questionFrame.check })[0]);
    expect(complete).not.toHaveBeenCalled();
    fireEvent.click(yes[1]);
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.questionFrame.check }));
    await waitFor(() => expect(complete).toHaveBeenCalledTimes(1));
    expect(complete).toHaveBeenCalledWith({ passed: true, correct: 2, total: 2, timedOut: false });
  });

  it('exhausts retries and completes an unsuccessful attempt exactly once', async () => {
    const selected = [questions[0]];
    const complete = mount(selected, vi.fn(), loader(selected), {
      interaction: { ...quiz(selected).params.interaction, retries: 1 },
    });
    await screen.findByText('Prompt 1');
    fireEvent.click(screen.getByRole('radio', { name: 'No' }));
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.questionFrame.check }));
    await waitFor(() => expect(complete).toHaveBeenCalledWith({ passed: false, correct: 0, total: 1, timedOut: false }));
    expect(complete).toHaveBeenCalledTimes(1);
    // The Quiz has finished as soon as all answers have been checked. A retry is a
    // local card operation and cannot publish a second completion for that attempt.
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.questionFrame.retry }));
    fireEvent.click(screen.getByRole('radio', { name: 'No' }));
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.questionFrame.check }));
    expect(screen.queryByRole('button', { name: enUiKitMessages.questionFrame.retry })).toBeNull();
    expect(complete).toHaveBeenCalledTimes(1);
  });

  it('applies percentage thresholds independently of a completed attempt', async () => {
    const second: Question_SelectOneAnswer_Data = { ...(questions[0] as Question_SelectOneAnswer_Data), ...base(10), type: 'selectOneAnswer' };
    const selected = [questions[0], second];
    const complete = mount(selected, vi.fn(), loader(selected), {
      grading: { mode: 'percentage', successThreshold: 50 },
    });
    await screen.findByText('Prompt 10');
    const yes = screen.getAllByRole('radio', { name: 'Yes' });
    const no = screen.getAllByRole('radio', { name: 'No' });
    fireEvent.click(yes[0]);
    fireEvent.click(screen.getAllByRole('button', { name: enUiKitMessages.questionFrame.check })[0]);
    fireEvent.click(no[1]);
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.questionFrame.check }));
    await waitFor(() => expect(complete).toHaveBeenCalledWith({ passed: true, correct: 1, total: 2, timedOut: false }));
  });

  it('rejects malformed or absent selected resources and supports loader retry', async () => {
    const selected = [questions[0]];
    const loadQuestions = vi.fn().mockResolvedValueOnce({ items: [], fallbacks: [] }).mockResolvedValueOnce({ items: selected, fallbacks: [] });
    mount(selected, vi.fn(), { ...loader(), loadQuestions });
    expect(await screen.findByRole('alert')).toHaveTextContent(enUiKitMessages.learningLayout.preparingLessonError);
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.learningLayout.actions.retry }));
    expect(await screen.findByText('Prompt 1')).toBeVisible();
    expect(loadQuestions).toHaveBeenCalledTimes(2);
    expect(() => selectQuizQuestions([{ ...questions[0], type: 'notQuestion' } as never], [questions[0].id])).toThrow();
    expect(() => selectQuizQuestions([questions[0], questions[0]], [questions[0].id, uuid(11)])).toThrow('Duplicate');
  });

  it('ends a timed Quiz once and locks answer submission', async () => {
    const selected = [questions[0]];
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      const complete = mount(selected, vi.fn(), loader(selected), { timeLimitSeconds: 2 });
      await screen.findByText('Prompt 1');
      act(() => vi.advanceTimersByTime(2000));
      expect(screen.getByRole('timer')).toHaveTextContent('0:00');
      expect(complete).toHaveBeenCalledWith({ passed: false, correct: 0, total: 1, timedOut: true });
      expect(complete).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('button', { name: enUiKitMessages.questionFrame.check })).toBeDisabled();
    } finally {
      vi.useRealTimers();
    }
  });

  it('scores malformed numeric input as incorrect rather than accepting nonfinite values', async () => {
    const complete = mount([questions[4]]);
    await screen.findByText('Prompt 5');
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Infinity' } });
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.questionFrame.check }));
    await waitFor(() =>
      expect(complete).toHaveBeenCalledWith({ passed: false, correct: 0, total: 1, timedOut: false }),
    );
    expect(parseQuestionNumber('6,28')).toBe(6.28);
    expect(parseQuestionNumber('')).toBeNull();
    expect(parseQuestionNumber('Infinity')).toBeNull();
    expect(parseQuestionNumber('1,2,3')).toBeNull();
  });

  it('preserves localized media and nested Carousel accessible names for published Question blocks', () => {
    const slides = [
      {
        id: uuid(301),
        slug: 'illustration',
        type: 'image' as const,
        params: { fill: true, aspectRatio: 1.5 },
        locale: { src: '/example.svg', alt: 'Illustrated comparison' },
      },
    ];
    const carousel = {
      id: uuid(302),
      slug: 'carousel',
      type: 'carousel' as const,
      params: {},
      locale: { slides },
    };
    expect(questionBlockLabel(carousel)).toBe('Illustrated comparison');
    expect(questionBlockLabel({ ...carousel, locale: { title: 'Compare', slides } })).toBe('Compare');
    expect(questionBlockLabel({
      id: uuid(303),
      slug: 'markdown',
      type: 'markdown',
      params: {},
      locale: { value: '**Important** and `code`' },
    })).toBe('Important and code');
    expect(questionBlockLabel({
      id: uuid(304),
      slug: 'subtitles',
      type: 'subtitles',
      params: {},
      locale: { fileLocation: '/captions.en.vtt' },
    })).toBe('captions.en.vtt');
    expect(questionBlockLabel({
      id: uuid(305),
      slug: 'video',
      type: 'video',
      params: {},
      locale: { fileLocation: '/recording.mp4', poster: '/poster.png', label: 'Recording', title: 'Запис' },
    }, 'uk')).toBe('Запис');
  });

  it('does not advance a nondeferrable stepper before checking its current Question', async () => {
    const selected = [questions[0], { ...(questions[0] as Question_SelectOneAnswer_Data), ...base(10), type: 'selectOneAnswer' as const }];
    mount(selected, vi.fn(), loader(selected), { layout: { mode: 'stepper', showProgress: true } });
    await screen.findByText('Prompt 1');
    expect(screen.getByText('Prompt 10')).not.toBeVisible();
    expect(screen.getByRole('button', { name: enUiKitMessages.learningLayout.actions.next })).toBeDisabled();
    fireEvent.click(screen.getByRole('radio', { name: 'Yes' }));
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.questionFrame.check }));
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.learningLayout.actions.next }));
    expect(screen.getByText('Prompt 10')).toBeVisible();
    expect(screen.getByText('Prompt 1')).not.toBeVisible();
  });
});
