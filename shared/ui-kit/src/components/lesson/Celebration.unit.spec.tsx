import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Celebration } from './Celebration';

const messages = {
  steps: { navigation: 'Lesson steps' },
  celebration: {
    title: 'Completed', description: 'All steps complete.', correctAnswers: 'Correct:',
    scoreTemplate: '{score} of {total}', note: 'Review the material.', home: 'Home',
  },
  questionProgress: {
    navigation: 'Question status',
    status: {
      correct: 'Correct answer', incorrect: 'Incorrect answer',
      unanswered: 'Not answered yet', deferred: 'Deferred',
    },
  },
};

describe('Celebration', () => {
  it('renders serialized score templates without locale-dependent JavaScript functions', () => {
    render(<Celebration score={3} total={5} messages={messages} homeHref="/home" />);
    expect(screen.getByRole('heading', { name: 'Completed' })).toBeVisible();
    expect(screen.getByText('3 of 5')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
  });
});
