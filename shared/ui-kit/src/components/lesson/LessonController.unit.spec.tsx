import { useEffect } from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';
import LearningLayout from '../layout/LearningLayout/LearningLayout';
import type { LessonLearningLayoutProps } from '../layout/LearningLayout/createLessonLearningLayout';
import { Lesson, type LessonView } from './Lesson';
import { useLessonActions, type LessonActions } from './LessonController';
import { useLessonEventBus } from './LessonEvents';

const observed: LessonActions[] = [];
const observedEvents: string[] = [];
let releaseTestBlocker: (() => void) | undefined;

function TestLayout({ messages, ...props }: LessonLearningLayoutProps) {
  const actions = useLessonActions();
  const bus = useLessonEventBus();
  useEffect(() => bus.subscribe(id => { observedEvents.push(id); }), [bus]);
  observed.push(actions);
  return (
    <>
      <button onClick={() => actions.updateTopBar({ title: 'Updated heading' })}>Update heading</button>
      <button onClick={() => (releaseTestBlocker = actions.blockNext('test-owner'))}>Block Next</button>
      <button onClick={() => releaseTestBlocker?.()}>Release Next</button>
      <button onClick={() => actions.updateSectionParams({ allowNavigation: true })}>Enable navigation</button>
      <LearningLayout {...props} locale="en-US" messages={messages.learningLayout} />
    </>
  );
}

function response(required: boolean, allowNavigation = true): LessonView {
  return {
    id: 'lesson-test',
    title: 'Light lesson',
    locale: { code: 'en' },
    parameters: { sections: { allowNavigation, allowSkipping: true, showIndexes: true } },
    sections: [
      {
        id: 'intro',
        type: 'theory',
        navigationLabel: 'Introduction',
        skippable: true,
        content: [
          {
            type: 'checkpoint',
            id: 'checkpoint-1',
            slug: 'check-one',
            title: 'Check your knowledge',
            requireCompletion: required,
            items: [
              {
                question: 'What is light?',
                check: true,
                answer: [{ type: 'text', id: 'answer-1', value: 'Radiation' }],
              },
            ],
          },
        ],
        questions: [],
      },
      {
        id: 'summary',
        type: 'theory',
        navigationLabel: 'Summary',
        content: [{ type: 'text', id: 'summary-text', slug: 'summary-text', value: 'Second section content' }],
        questions: [],
      },
    ],
  } as unknown as LessonView;
}

function showLesson(required = true, allowNavigation = true, editableSectionParams: readonly 'allowNavigation'[] = []) {
  observed.length = 0;
  releaseTestBlocker = undefined;
  return render(
    <Lesson
      response={response(required, allowNavigation)}
      href="/en/lesson/lesson-test"
      messages={enUiKitMessages}
      layout={TestLayout}
      editableSectionParams={editableSectionParams}
    />,
  );
}

describe('LessonController scoped state and navigation', () => {
  it('blocks Next and direct forward navigation until required checkpoints are completed', () => {
    showLesson();
    const bottom = screen.getByRole('navigation', { name: enUiKitMessages.learningLayout.navigation.bottom });
    const steps = screen.getByRole('navigation', { name: enUiKitMessages.lesson.steps.navigation });
    const next = within(bottom).getByRole('button', {
      name: new RegExp(enUiKitMessages.learningLayout.actions.next, 'i'),
    });
    expect(next).toBeDisabled();
    expect(
      within(bottom).getByRole('button', { name: new RegExp(enUiKitMessages.learningLayout.actions.skip, 'i') }),
    ).toBeEnabled();
    expect(within(steps).getByRole('button', { name: /Summary/i })).toBeDisabled();

    fireEvent.click(screen.getByText('What is light?'));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(next).toBeEnabled();
    expect(within(steps).getByRole('button', { name: /Summary/i })).toBeEnabled();
    fireEvent.click(next);
    expect(screen.getByText('Second section content')).toBeVisible();

    fireEvent.click(
      within(bottom).getByRole('button', { name: new RegExp(enUiKitMessages.learningLayout.actions.previous, 'i') }),
    );
    fireEvent.click(screen.getByText('What is light?'));
    expect(screen.getByRole('button', { name: enUiKitMessages.checkpoint.checked })).toBeDisabled();
  });

  it('allows skipping an unanswered checkpoint without leaking its gate to the next section', () => {
    const base = response(true);
    const value = {
      ...base,
      sections: [
        ...base.sections,
        {
          id: 'outro',
          type: 'theory',
          navigationLabel: 'Outro',
          content: [{ type: 'text', id: 'outro-text', slug: 'outro-text', value: 'Final section' }],
          questions: [],
        },
      ],
    } as unknown as LessonView;
    observed.length = 0;
    render(
      <Lesson response={value} href="/en/lesson/lesson-test" messages={enUiKitMessages} layout={TestLayout} />,
    );
    const bottom = screen.getByRole('navigation', { name: enUiKitMessages.learningLayout.navigation.bottom });
    const next = within(bottom).getByRole('button', {
      name: new RegExp(enUiKitMessages.learningLayout.actions.next, 'i'),
    });
    const skip = within(bottom).getByRole('button', {
      name: new RegExp(enUiKitMessages.learningLayout.actions.skip, 'i'),
    });
    const back = within(bottom).getByRole('button', {
      name: new RegExp(enUiKitMessages.learningLayout.actions.previous, 'i'),
    });

    expect(next).toBeDisabled();
    expect(skip).toBeEnabled();
    fireEvent.click(skip);
    expect(screen.getByText('Second section content')).toBeVisible();
    expect(next).toBeEnabled();
    fireEvent.click(back);
    expect(screen.getByText('What is light?')).toBeVisible();
    expect(next).toBeDisabled();
    expect(skip).toBeEnabled();
    fireEvent.click(skip);
    expect(next).toBeEnabled();
    fireEvent.click(next);
    expect(screen.getByText('Final section')).toBeVisible();
  });

  it('removes a checkpoint blocker when leaving its section backward', () => {
    const base = response(true);
    const value = {
      ...base,
      sections: [
        {
          id: 'welcome',
          type: 'theory',
          navigationLabel: 'Welcome',
          content: [{ type: 'text', id: 'welcome-text', slug: 'welcome-text', value: 'Welcome section' }],
          questions: [],
        },
        ...base.sections,
      ],
    } as unknown as LessonView;
    observed.length = 0;
    render(
      <Lesson
        response={value}
        href="/en/lesson/lesson-test"
        messages={enUiKitMessages}
        layout={TestLayout}
      />,
    );
    const bottom = screen.getByRole('navigation', { name: enUiKitMessages.learningLayout.navigation.bottom });
    const next = within(bottom).getByRole('button', {
      name: new RegExp(enUiKitMessages.learningLayout.actions.next, 'i'),
    });
    const back = within(bottom).getByRole('button', {
      name: new RegExp(enUiKitMessages.learningLayout.actions.previous, 'i'),
    });

    expect(next).toBeEnabled();
    fireEvent.click(next);
    expect(screen.getByText('What is light?')).toBeVisible();
    expect(next).toBeDisabled();
    fireEvent.click(back);
    expect(screen.getByText('Welcome section')).toBeVisible();
    expect(next).toBeEnabled();
    fireEvent.click(next);
    expect(next).toBeDisabled();
  });

  it('keeps Next blocked until every required checkpoint releases its own gate', () => {
    const base = response(true);
    const firstSection = base.sections[0];
    if (firstSection.type === 'quiz') throw new Error('Expected regular Section');
    const first = firstSection.content[0];
    if (first.type !== 'checkpoint') throw new Error('Expected checkpoint fixture');
    const value = {
      ...base,
      sections: [
        {
          ...base.sections[0],
          content: [
            first,
            {
              ...first,
              id: 'checkpoint-2',
              slug: 'check-two',
              title: 'Second checkpoint',
              items: [
                {
                  question: 'What is a ray?',
                  check: true,
                  answer: [{ type: 'text', id: 'answer-2', value: 'A model of light' }],
                },
              ],
            },
          ],
        },
        ...base.sections.slice(1),
      ],
    } as unknown as LessonView;
    observed.length = 0;
    render(
      <Lesson
        response={value}
        href="/en/lesson/lesson-test"
        messages={enUiKitMessages}
        layout={TestLayout}
      />,
    );
    const bottom = screen.getByRole('navigation', { name: enUiKitMessages.learningLayout.navigation.bottom });
    const next = within(bottom).getByRole('button', {
      name: new RegExp(enUiKitMessages.learningLayout.actions.next, 'i'),
    });
    expect(next).toBeDisabled();

    fireEvent.click(screen.getByText('What is light?'));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(next).toBeDisabled();
    fireEvent.click(screen.getByText('What is a ray?'));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(next).toBeEnabled();
  });

  it('supports independently registered Next blockers through the lesson actions context', () => {
    showLesson(false);
    const bottom = screen.getByRole('navigation', { name: enUiKitMessages.learningLayout.navigation.bottom });
    const next = within(bottom).getByRole('button', {
      name: new RegExp(enUiKitMessages.learningLayout.actions.next, 'i'),
    });
    const skip = within(bottom).getByRole('button', {
      name: new RegExp(enUiKitMessages.learningLayout.actions.skip, 'i'),
    });

    expect(next).toBeEnabled();
    fireEvent.click(screen.getByRole('button', { name: 'Block Next' }));
    expect(next).toBeDisabled();
    expect(skip).toBeEnabled();
    fireEvent.click(screen.getByRole('button', { name: 'Release Next' }));
    expect(next).toBeEnabled();
  });

  it('keeps actions stable when a sibling state changes', () => {
    showLesson(false);
    const before = observed.at(-1);
    fireEvent.click(screen.getByRole('button', { name: 'Update heading' }));
    expect(observed.at(-1)).toBe(before);
    expect(before?.getTopBar().title).toBe('Updated heading');
  });

  it('only accepts parameter overrides explicitly allowed by the host', () => {
    showLesson(false, false);
    const steps = screen.getByRole('navigation', { name: enUiKitMessages.lesson.steps.navigation });
    const summary = within(steps).getByRole('button', { name: /Summary/i });
    expect(summary).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Enable navigation' }));
    expect(summary).toBeDisabled();
  });

  it('updates stepper navigation when a parameter is editable', () => {
    showLesson(false, false, ['allowNavigation']);
    const steps = screen.getByRole('navigation', { name: enUiKitMessages.lesson.steps.navigation });
    const summary = within(steps).getByRole('button', { name: /Summary/i });
    expect(summary).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Enable navigation' }));
    expect(summary).toBeEnabled();
  });
});

describe('multiple Quiz Sections', () => {
  const question = (id: string) => ({
    id: 'question-' + id,
    type: 'selectOneAnswer' as const,
    assessmentMethod: 'retrieval' as const,
    restrictions: [],
    question: [{ id: 'prompt-' + id, type: 'text' as const, value: 'Question ' + id }] as [{ id: string; type: 'text'; value: string }],
    answers: {
      correct: { yes: { id: 'yes-' + id, type: 'text' as const, value: 'Yes' } },
      incorrect: { no: { id: 'no-' + id, type: 'text' as const, value: 'No' } },
      distractors: {},
    },
  });
  const params = (isBlocker: boolean) => ({
    isBlocker,
    selection: { mode: 'all' as const },
    layout: { mode: 'stack' as const },
    feedbackMode: 'immediate' as const,
    interaction: {
      retries: 0, showErrors: true, showCorrectAnswers: true,
      allowExplanations: true, allowDeferring: false,
      allowQuestionNavigation: false, skippable: false,
    },
    results: { visibility: 'immediate' as const, showScore: true },
    screen: {},
  });
  const quiz = (id: string) => ({
    id, slug: id, title: id, navigationLabel: id, type: 'quiz' as const,
    parameters: params(true), questions: [question(id)],
  });
  const fixture = {
    id: 'multi-quiz-lesson',
    title: 'Multiple quizzes',
    locale: { code: 'en' as const },
    parameters: { sections: { allowNavigation: true, allowSkipping: true, showIndexes: true } },
    sections: [
      quiz('quiz-first'),
      quiz('quiz-second'),
      { id: 'summary', slug: 'summary', type: 'theory' as const,
        title: 'Summary', navigationLabel: 'Summary',
        content: [{ type: 'text' as const, id: 'summary', value: 'Quiz sections finished' }],
      },
    ],
  } as LessonView;


  it('allows advancing past a nonblocking Quiz without completing it', () => {
    const optional = { ...quiz('optional'), parameters: params(false) };
    const view = { ...fixture, sections: [optional, quiz('required'), fixture.sections[2]] } as LessonView;
    render(<Lesson response={view} href="/en/lesson/nonblocking" messages={enUiKitMessages} layout={TestLayout} />);
    const bottom = screen.getByRole('navigation', { name: enUiKitMessages.learningLayout.navigation.bottom });
    const next = () => within(bottom).getByRole('button', {
      name: new RegExp(enUiKitMessages.learningLayout.actions.next, 'i'),
    });
    expect(next()).toBeEnabled();
    fireEvent.click(next());
    expect(screen.getByText('Question required')).toBeVisible();
    expect(next()).toBeDisabled();
  });

  it('gates each Quiz independently until attempted, regardless of score', async () => {
    observedEvents.length = 0;
    render(
      <Lesson response={fixture} href="/en/lesson/multi-quiz-lesson"
        messages={enUiKitMessages} layout={TestLayout} />,
    );
    const bottom = screen.getByRole('navigation', { name: enUiKitMessages.learningLayout.navigation.bottom });
    const next = () => within(bottom).getByRole('button', {
      name: new RegExp(enUiKitMessages.learningLayout.actions.next, 'i'),
    });
    expect(next()).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'No' }));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    await waitFor(() => expect(observedEvents).toContain('quizCompleted'));
    await waitFor(() => expect(next()).toBeEnabled());
    fireEvent.click(next());
    expect(screen.getByText('Question quiz-second')).toBeVisible();
    expect(next()).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    await waitFor(() => expect(next()).toBeEnabled());
    fireEvent.click(next());
    expect(screen.getByText('Quiz sections finished')).toBeVisible();
  });
});
