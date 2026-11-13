import { useEffect } from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type {
  Lesson_Props,
  ContentBlock_Text_Props,
  ContentBlock_Checkpoint_Props,
  QuizSection_Props,
} from '@svitlo/engine';
import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';
import LearningLayout from '../layout/LearningLayout/LearningLayout';
import type { LessonLearningLayoutProps } from '../layout/LearningLayout/createLessonLearningLayout';
import { Lesson } from './Lesson';
import { useLessonActions, type LessonActions } from './LessonController';
import { useLessonEventBus } from './LessonEvents';

const uuid = (number: number) => `663572e7-bd85-4516-86e2-${number.toString(16).padStart(12, '0')}`;
const text = (number: number, value: string): ContentBlock_Text_Props => ({
  id: uuid(number),
  slug: 'text' + number,
  type: 'text',
  params: {},
  locale: { value },
});
const checkpoint = (required: boolean): ContentBlock_Checkpoint_Props => ({
  id: uuid(10),
  slug: 'checkpoint',
  type: 'checkpoint',
  params: { requireCompletion: required, enableChecks: true },
  locale: { title: 'Check your knowledge' },
  content: [
    {
      id: uuid(11),
      slug: 'item',
      type: 'checkpointItem',
      check: true,
      question: text(12, 'What is light?'),
      answer: [text(13, 'Radiation')],
    },
  ],
});

function fixture(required: boolean, allowNavigation = true): Lesson_Props {
  return {
    id: uuid(1),
    slug: 'light',
    type: 'lesson',
    skills: [],
    params: {
      requireQuiz: false,
      languages: ['en', 'uk'],
      sections: { allowNavigation, allowSkipping: true, showIndexes: true },
    },
    locale: { title: 'Light lesson' },
    section: [
      {
        id: uuid(2),
        slug: 'intro',
        type: 'content',
        params: { skippable: true },
        locale: { title: 'Introduction', navigationLabel: 'Introduction' },
        content: [checkpoint(required)],
      },
      {
        id: uuid(3),
        slug: 'summary',
        type: 'content',
        params: {},
        locale: { title: 'Summary', navigationLabel: 'Summary' },
        content: [text(14, 'Second section content')],
      },
    ],
    questions: {},
    flashcards: [],
  };
}

const observed: LessonActions[] = [];
const received: string[] = [];
let releaseBlocker: (() => void) | undefined;
function TestLayout({ messages, ...props }: LessonLearningLayoutProps) {
  const actions = useLessonActions();
  const bus = useLessonEventBus();
  useEffect(
    () =>
      bus.subscribe(eventId => {
        received.push(eventId);
      }),
    [bus],
  );
  observed.push(actions);
  return (
    <>
      <button onClick={() => actions.updateTopBar({ title: 'Updated heading' })}>Update heading</button>
      <button onClick={() => (releaseBlocker = actions.blockNext('test'))}>Block Next</button>
      <button onClick={() => releaseBlocker?.()}>Release Next</button>
      <button onClick={() => actions.updateSectionParams({ allowNavigation: true })}>Enable navigation</button>
      <output data-testid="lesson-languages">{props.supportedLessonLanguages?.join(',')}</output>
      <LearningLayout {...props} locale="en-US" messages={messages.learningLayout} />
    </>
  );
}
function showLesson(response = fixture(true), editableSectionParams: readonly 'allowNavigation'[] = []) {
  observed.length = 0;
  received.length = 0;
  releaseBlocker = undefined;
  return render(
    <Lesson
      response={response}
      language="en"
      href="/en/lesson/light"
      layout={TestLayout}
      messages={enUiKitMessages}
      editableSectionParams={editableSectionParams}
    />,
  );
}
function navigationButton(action: 'next' | 'previous' | 'skip') {
  const bottom = screen.getByRole('navigation', { name: enUiKitMessages.learningLayout.navigation.bottom });
  return within(bottom).getByRole('button', {
    name: new RegExp(enUiKitMessages.learningLayout.actions[action], 'i'),
  });
}

describe('Engine Props Lesson Controller', () => {
  it('reads supported languages and title from assembled Engine Props', () => {
    showLesson();
    expect(screen.getByTestId('lesson-languages').textContent?.split(',')).toEqual(['en-US', 'uk-UA']);
    expect(observed.at(-1)?.getTopBar().title).toBe('Light lesson');
  });

  it('blocks Next until a required Engine Checkpoint Item is complete', () => {
    showLesson();
    expect(navigationButton('next')).toBeDisabled();
    fireEvent.click(screen.getByText('What is light?'));
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.checkpoint.check }));
    expect(navigationButton('next')).toBeEnabled();
    fireEvent.click(navigationButton('next'));
    expect(screen.getByText('Second section content')).toBeVisible();
    fireEvent.click(navigationButton('previous'));
    expect(screen.getByRole('button', { name: enUiKitMessages.checkpoint.checked })).toBeDisabled();
  });

  it('allows an optional Section to skip its unfinished Checkpoint', () => {
    showLesson();
    expect(navigationButton('next')).toBeDisabled();
    expect(navigationButton('skip')).toBeEnabled();
    fireEvent.click(navigationButton('skip'));
    expect(screen.getByText('Second section content')).toBeVisible();
  });

  it('never skips a Section when either Lesson or Section disallows skipping', () => {
    for (const mode of ['lesson', 'section']) {
      const response = fixture(true);
      if (mode === 'lesson') response.params.sections.allowSkipping = false;
      else response.section[0].params.skippable = false;
      const rendered = showLesson(response);
      expect(navigationButton('skip')).toBeDisabled();
      rendered.unmount();
    }
  });

  it('keeps separately registered Next blockers stable across state changes', () => {
    showLesson(fixture(false));
    expect(navigationButton('next')).toBeEnabled();
    fireEvent.click(screen.getByRole('button', { name: 'Block Next' }));
    expect(navigationButton('next')).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Release Next' }));
    expect(navigationButton('next')).toBeEnabled();
    const previous = observed.at(-1);
    fireEvent.click(screen.getByRole('button', { name: 'Update heading' }));
    expect(observed.at(-1)).toBe(previous);
  });

  it('only accepts editable Section parameters explicitly granted by the host', () => {
    const initial = fixture(false, false);
    const view = showLesson(initial);
    const stepper = screen.getByRole('navigation', { name: enUiKitMessages.lesson.steps.navigation });
    const summary = within(stepper).getByRole('button', { name: /Summary/i });
    expect(summary).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Enable navigation' }));
    expect(summary).toBeDisabled();
    view.unmount();

    showLesson(initial, ['allowNavigation']);
    const permitted = within(
      screen.getByRole('navigation', { name: enUiKitMessages.lesson.steps.navigation }),
    ).getByRole('button', { name: /Summary/i });
    fireEvent.click(screen.getByRole('button', { name: 'Enable navigation' }));
    expect(permitted).toBeEnabled();
  });

  it('hides disabled Engine Sections from the active stepper', () => {
    const source = fixture(false);
    source.section[1].params.disabled = true;
    showLesson(source);
    expect(
      screen.getByRole('navigation', { name: enUiKitMessages.lesson.steps.navigation }).querySelectorAll('button'),
    ).toHaveLength(1);
  });

  it('keeps media preferences scoped to a Lesson session', () => {
    showLesson(fixture(false));
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.learningLayout.actions.openSettings }));
    expect(screen.getByRole('slider', { name: 'Volume' })).toHaveAttribute('aria-valuenow', '100');
  });

  it('completes a blocking Engine Quiz after a Question attempt', async () => {
    const response = fixture(false);
    const question = {
      id: uuid(26),
      slug: 'whatIsLight',
      type: 'selectOneAnswer' as const,
      params: { assessmentMethod: 'retrieval' as const, restrictions: [] },
      locale: {},
      content: {
        question: [text(27, 'Question about light')] as [ContentBlock_Text_Props],
        answers: {
          correct: { radiation: text(28, 'Radiation') },
          incorrect: { sound: text(29, 'Sound') },
          distractors: {},
        },
      },
    };
    const quiz: QuizSection_Props = {
      id: uuid(24),
      slug: 'quiz',
      type: 'quiz',
      params: {
        isBlocker: true,
        selection: { mode: 'all', questionSlugs: ['whatIsLight'] },
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
      },
      locale: { title: 'Quiz', navigationLabel: 'Quiz' },
      content: [],
    };
    response.questions = { selectOneAnswer: [question] };
    response.section = [quiz, response.section[1]];
    showLesson(response);
    expect(navigationButton('next')).toBeDisabled();
    fireEvent.click(screen.getByRole('radio', { name: /Radiation/i }));
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.questionFrame.check }));
    await waitFor(() => expect(navigationButton('next')).toBeEnabled());
    expect(received).toContain('quizCompleted');
    fireEvent.click(navigationButton('next'));
    expect(screen.getByText('Second section content')).toBeVisible();
  });
});
