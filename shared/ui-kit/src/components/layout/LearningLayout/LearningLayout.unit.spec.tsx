import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LearningLayout from './LearningLayout';
import { learningLayout } from '../../../../data/locale/learningLayout';

const uk = learningLayout.uk;

describe('LearningLayout preparation', () => {
  it('covers the learning area while leaving both navigation bars visible', () => {
    render(
      <LearningLayout
        locale="uk-UA"
        messages={uk}
        pathname="/uk/lesson/test"
        progress={{ ready: true, step: 0, lastStep: 1, testDone: false }}
        topics={[]}
        actions={{ back: vi.fn(), next: vi.fn(), skip: vi.fn() }}
        contentLoading
      >
        <p>Вміст уроку</p>
      </LearningLayout>,
    );

    expect(screen.getByRole('navigation', { name: uk.navigation.top })).toBeVisible();
    expect(screen.getByRole('navigation', { name: uk.navigation.bottom })).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent(uk.preparingLesson);
    expect(screen.getByRole('main', { hidden: true })).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('main', { hidden: true })).toHaveAttribute('inert');
    expect(screen.getByRole('button', { name: /Далі/ })).toBeDisabled();
  });

  it('shows an accessible error and offers retry while keeping lesson content inert', () => {
    const retry = vi.fn();
    render(
      <LearningLayout
        locale="uk-UA"
        messages={uk}
        pathname="/uk/lesson/test"
        progress={{ ready: true, step: 0, lastStep: 1, testDone: false }}
        topics={[]}
        actions={{ back: vi.fn(), next: vi.fn(), skip: vi.fn() }}
        contentLoading
        contentError
        onRetryContent={retry}
      >
        <p>Вміст уроку</p>
      </LearningLayout>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(uk.preparingLessonError);
    expect(screen.getByRole('main', { hidden: true })).toHaveAttribute('inert');
    fireEvent.click(screen.getByRole('button', { name: uk.actions.retry }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
