import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CoursePage } from './CoursePage';
import { CoursesPage } from './CoursesPage';
import type { CourseMessages, CourseOutlineItem, CoursePreview } from './types';

const messages: CourseMessages = {
  catalogEyebrow: 'Discover',
  catalogTitle: 'Courses',
  catalogDescription: 'Explore a course.',
  explore: 'Explore course',
  lessons: 'lessons',
  modules: 'modules',
  emptyCatalog: 'No courses available',
  backToCatalog: 'All courses',
  contents: 'Course outline',
  about: 'About',
  highlights: 'What you will learn',
  startCourse: 'Start learning',
  previewOnly: 'Preview only',
  noContents: 'No outline yet',
  module: 'Module',
  chapter: 'Chapter',
  lesson: 'Lesson',
  episode: 'Episode',
};

const course: CoursePreview = {
  id: 'light',
  title: 'Journey of Light',
  description: 'An introduction to light.',
  category: 'Physics',
  level: 'Beginner',
  lessons: 2,
  modules: 1,
  highlights: ['Light travels'],
};

const outline: readonly CourseOutlineItem[] = [{
  id: 'first-module',
  type: 'module',
  title: 'Light Lab',
  children: [{
    id: 'first-chapter',
    type: 'chapter',
    title: 'Introduction',
    children: [
      { id: 'lesson-a', type: 'lesson', title: 'What is light?', href: '/en/course/light/lesson/lesson-a' },
      { id: 'episode-a', type: 'episode', title: 'A short story', href: '/en/course/light/episode/episode-a' },
    ],
  }],
}];

describe('course pages', () => {
  it('renders a navigable catalog with a course card', () => {
    render(<CoursesPage courses={[{ course, href: '/en/course/light' }]} messages={messages} />);
    expect(screen.getByRole('heading', { name: 'Courses', level: 1 })).toBeVisible();
    expect(screen.getByRole('link', { name: /Explore course: Journey of Light/ })).toHaveAttribute('href', '/en/course/light');
  });

  it('handles an empty catalog', () => {
    render(<CoursesPage courses={[]} messages={messages} />);
    expect(screen.getByRole('status')).toHaveTextContent('No courses available');
  });

  it('renders the nested course outline and links to available lessons/episodes', () => {
    render(<CoursePage course={course} outline={outline} catalogHref="/en/courses" messages={messages} />);
    expect(screen.getByRole('heading', { name: 'Journey of Light', level: 1 })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Course outline', level: 2 })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Light Lab', level: 3 })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Introduction', level: 4 })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Start learning' })).toHaveAttribute('href', '/en/course/light/lesson/lesson-a');
    expect(screen.getByRole('link', { name: 'All courses' })).toHaveAttribute('href', '/en/courses');
    expect(screen.getByRole('link', { name: /What is light/ })).toHaveAttribute('href', '/en/course/light/lesson/lesson-a');
    expect(screen.getByRole('link', { name: /A short story/ })).toHaveAttribute('href', '/en/course/light/episode/episode-a');
  });

  it('does not advertise fake navigation for a preview-only course', () => {
    render(<CoursePage course={course} outline={[{ id: 'lesson', type: 'lesson', title: 'Coming later' }]} catalogHref="/en/courses" messages={messages} />);
    expect(screen.getByText('Preview only')).toBeVisible();
    expect(screen.queryByRole('link', { name: 'Start learning' })).toBeNull();
    expect(screen.queryByRole('link', { name: /Coming later/ })).toBeNull();
  });

  it('renders a useful empty outline', () => {
    render(<div dir="rtl"><CoursePage course={course} outline={[]} catalogHref="/ar/courses" messages={messages} /></div>);
    expect(screen.getByRole('status')).toHaveTextContent('No outline yet');
  });
});
