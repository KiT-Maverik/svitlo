import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LessonNavigationProvider, useLessonNavigation } from './LessonNavigation';

function Actions() {
  const { progress, dispatch } = useLessonNavigation();
  return <>
    <span>Section {progress.step}</span>
    <button onClick={() => dispatch({ type: 'next' })}>Next</button>
    <button onClick={() => dispatch({ type: 'back' })}>Back</button>
    <button onClick={() => dispatch({ type: 'visit', step: 2 })}>Quiz</button>
  </>;
}

describe('lesson section navigation', () => {
  it('opens the first section and navigates only in memory', () => {
    render(<LessonNavigationProvider sectionCount={3}><Actions /></LessonNavigationProvider>);
    expect(screen.getByText('Section 0')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Section 1')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('Section 0')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Quiz' }));
    expect(screen.getByText('Section 2')).toBeVisible();
  });
});
