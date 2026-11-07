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

  it('keeps the themed fade separate from the horizontally scrolling navigation controls', () => {
    render(<LessonSteps navigationLabel="Lesson steps" steps={steps} currentStep={0} />);
    const navigation = screen.getByRole('navigation', { name: 'Lesson steps' });

    expect(navigation.parentElement).toHaveClass('svitlo-theme-stepper');
    expect(navigation.parentElement).not.toHaveAttribute('role', 'navigation');
    expect(navigation.querySelectorAll('button')).toHaveLength(steps.length);
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

  it('keeps the active section visible when many steps overflow horizontally', () => {
    const longSteps = Array.from({ length: 8 }, (_, index) => ({
      id: `step-${index + 1}`,
      title: `Step ${index + 1}`,
    }));
    const rectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this.tagName === 'NAV') return { left: 0, right: 320 } as DOMRect;
      if (this.getAttribute('aria-current') === 'step') return { left: 620, right: 720 } as DOMRect;
      return { left: 0, right: 0 } as DOMRect;
    });

    try {
      render(<LessonSteps navigationLabel="Lesson steps" steps={longSteps} currentStep={6} />);
      const navigation = screen.getByRole('navigation', { name: 'Lesson steps' });
      expect(screen.getAllByRole('button')).toHaveLength(8);
      expect(screen.getByRole('button', { name: '7. Step 7' })).toHaveAttribute('aria-current', 'step');
      expect(navigation.scrollLeft).toBe(510);
    } finally {
      rectSpy.mockRestore();
    }
  });

  it('preserves non-active step elements across rapid navigation and gate changes', () => {
    const baseProps = { navigationLabel: 'Lesson steps', steps, allowNavigation: true };
    const { rerender } = render(
      <LessonSteps {...baseProps} currentStep={0} canNavigateTo={step => step === 0} />,
    );
    const originalButtons = screen.getAllByRole('button');
    expect(originalButtons[1]).toBeDisabled();

    // Section changes can also register and release navigation blockers.
    // The step strip must not unmount or replace the non-active labels.
    for (const currentStep of [1, 2, 1, 0]) {
      rerender(
        <LessonSteps
          {...baseProps}
          currentStep={currentStep}
          canNavigateTo={step => step <= currentStep}
        />,
      );
      const currentButtons = screen.getAllByRole('button');
      currentButtons.forEach((button, index) => expect(button).toBe(originalButtons[index]));
      expect(currentButtons[currentStep]).toHaveAttribute('aria-current', 'step');
    }

    rerender(<LessonSteps {...baseProps} currentStep={0} canNavigateTo={() => false} />);
    expect(screen.getAllByRole('button')[1]).toBeDisabled();
    expect(screen.getAllByRole('button')[1]).toBe(originalButtons[1]);
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
