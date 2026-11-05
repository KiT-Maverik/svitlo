import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { LessonSteps } from './LessonSteps';

const steps = [
  { id: 'theory', title: 'Theory' },
  { id: 'practice', title: 'Practice' },
  { id: 'quiz', title: 'Quiz' },
];

describe('LessonSteps', () => {
  it('uses the localized UI Kit message as its accessible navigation name', () => {
    render(<LessonSteps navigationLabel="مراحل الدرس" steps={steps} currentStep={0} />);
    expect(screen.getByRole('navigation', { name: 'مراحل الدرس' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1. Theory' })).toBeDisabled();
  });

  it('injects navigation events instead of relying on a framework router', () => {
    const onNavigate = vi.fn();
    render(
      <LessonSteps
        navigationLabel="Lesson steps"
        steps={steps}
        currentStep={0}
        allowNavigation
        onNavigate={onNavigate}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '2. Practice' }));
    expect(onNavigate).toHaveBeenCalledWith(1);
  });

  it('marks the selected and completed steps without changing their order', () => {
    render(
      <LessonSteps
        navigationLabel="Lesson steps"
        steps={steps}
        currentStep={1}
        completedStep={0}
        showStepNumbers={false}
      />,
    );
    expect(screen.getByRole('button', { name: 'Practice' })).toHaveAttribute('aria-current', 'step');
    expect(screen.getByRole('button', { name: 'Theory' })).toHaveAttribute('data-complete', 'true');
  });
});
