import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';
import LearningLayout from '../layout/LearningLayout/LearningLayout';
import type { LessonLearningLayoutProps } from '../layout/LearningLayout/createLessonLearningLayout';
import { Lesson, type LessonView } from './Lesson';
import { useLessonActions, type LessonActions } from './LessonController';

const observed: LessonActions[] = [];

function TestLayout({ messages, ...props }: LessonLearningLayoutProps) {
  const actions = useLessonActions();
  observed.push(actions);
  return (
    <>
      <button onClick={() => actions.updateTopBar({ title: 'Updated heading' })}>Update heading</button>
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

  it('allows skipping an unanswered checkpoint and restores the gate when navigating back', () => {
    showLesson();
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
    fireEvent.click(back);
    expect(screen.getByText('What is light?')).toBeVisible();
    expect(next).toBeDisabled();
    expect(skip).toBeEnabled();
  });

  it('removes a checkpoint blocker when leaving its section backward', () => {
    const value = response(true);
    value.sections = [
      {
        id: 'welcome',
        type: 'theory',
        navigationLabel: 'Welcome',
        content: [{ type: 'text', id: 'welcome-text', slug: 'welcome-text', value: 'Welcome section' }],
        questions: [],
      },
      ...value.sections,
    ];
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
    const value = response(true);
    const first = value.sections[0].content[0];
    if (first.type !== 'checkpoint') throw new Error('Expected checkpoint fixture');
    value.sections[0].content = [
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
    ];
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
