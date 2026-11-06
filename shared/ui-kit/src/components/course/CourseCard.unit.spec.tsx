import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CourseCard } from './CourseCard';
import type { CoursePreview } from './types';

const course: CoursePreview = {
  id: 'light',
  title: 'Journey of Light',
  description: 'Understand light with experiments.',
  category: 'Physics',
  level: 'Beginner',
  lessons: 3,
  modules: 1,
};

describe('CourseCard', () => {
  it('has one keyboard-accessible link and displays course metadata', () => {
    render(<CourseCard course={course} href="/en/course/light" messages={{ explore: 'Explore course', lessons: 'lessons' }} />);
    expect(screen.getByRole('heading', { name: 'Journey of Light', level: 2 })).toBeVisible();
    const link = screen.getByRole('link', { name: 'Explore course: Journey of Light' });
    expect(link).toHaveAttribute('href', '/en/course/light');
    expect(link).toHaveTextContent('3 lessons');
    expect(link).toHaveTextContent('Physics');
  });
});
