import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { QuestionProgress } from './QuestionProgress';

const messages = {
  steps: { navigation: 'Lesson steps' },
  celebration: {
    title: 'Completed',
    description: 'All steps complete.',
    correctAnswers: 'Correct:',
    scoreTemplate: '{score} of {total}',
    note: 'Review the material.',
    home: 'Home',
  },
  questionProgress: {
    navigation: 'Question status',
    status: {
      correct: 'Correct answer',
      incorrect: 'Incorrect answer',
      unanswered: 'Not answered yet',
      deferred: 'Deferred',
    },
  },
};

describe('QuestionProgress', () => {
  it('uses provided localized accessible labels', () => {
    render(<QuestionProgress statuses={['correct', 'incorrect']} currentIndex={0} messages={messages} />);
    expect(screen.getByRole('list', { name: 'Question status' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1. Correct answer' })).toHaveAttribute('aria-current', 'step');
  });
  it('uses injected navigation rather than a Next.js router', () => {
    const onNavigate = vi.fn();
    render(
      <QuestionProgress
        statuses={['deferred', 'unanswered']}
        currentIndex={0}
        allowNavigation
        messages={messages}
        onNavigate={onNavigate}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '2. Not answered yet' }));
    expect(onNavigate).toHaveBeenCalledWith(1);
  });
});
