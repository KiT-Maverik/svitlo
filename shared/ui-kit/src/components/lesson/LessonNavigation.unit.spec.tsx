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
    <button onClick={() => dispatch({ type: 'skip' })}>Skip</button>
    <button onClick={() => dispatch({ type: 'visit', step: -1 })}>Invalid</button>
    <button onClick={() => dispatch({ type: 'testDone' })}>Complete</button>
    <span>Completed: {String(progress.testDone)}</span>
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

  it('clamps next/back/skip and rejects invalid visits', () => {
    render(<LessonNavigationProvider sectionCount={3}><Actions /></LessonNavigationProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('Section 0')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Skip' }));
    expect(screen.getByText('Section 1')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Quiz' }));
    expect(screen.getByText('Section 2')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Skip' }));
    fireEvent.click(screen.getByRole('button', { name: 'Invalid' }));
    expect(screen.getByText('Section 2')).toBeVisible();
  });

  it('records quiz completion without moving beyond the final section', () => {
    render(<LessonNavigationProvider sectionCount={3}><Actions /></LessonNavigationProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Quiz' }));
    fireEvent.click(screen.getByRole('button', { name: 'Complete' }));
    expect(screen.getByText('Completed: true')).toBeVisible();
    expect(screen.getByText('Section 2')).toBeVisible();
  });

  it('requires a navigation provider for the lesson', () => {
    const priorError = console.error;
    console.error = () => undefined;
    try {
      expect(() => render(<Actions />)).toThrow('LessonNavigationProvider is required');
    } finally {
      console.error = priorError;
    }
  });
});
