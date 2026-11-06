import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CourseTopicList, { type Topic } from './CourseTopicList';

const topics: Topic[] = [
  {
    id: 'module-a',
    title: 'Module A',
    type: 'module',
    children: [
      {
        id: 'chapter-a',
        title: 'Chapter A',
        type: 'chapter',
        children: [
          { id: 'lesson-a', title: 'Lesson A', type: 'lesson', href: '/uk/course/demo/lesson/en/lesson-a' },
          { id: 'episode-a', title: 'Episode A', type: 'episode', href: '/uk/course/demo/episode/episode-a' },
        ],
      },
      { id: 'lesson-b', title: 'Lesson B', type: 'lesson', href: '/uk/course/demo/lesson/en/lesson-b' },
    ],
  },
  { id: 'lesson-c', title: 'Lesson C', type: 'lesson', href: '/uk/course/demo/lesson/en/lesson-c' },
];

describe('CourseTopicList', () => {
  it('highlights the current leaf and retains regular navigation', () => {
    const navigate = vi.fn();
    render(
      <CourseTopicList
        topics={topics}
        pathname="/uk/course/demo/lesson/en/lesson-a"
        onNavigate={navigate}
      />,
    );

    expect(screen.getByRole('link', { name: 'Lesson A' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Episode A' })).toHaveAttribute(
      'href',
      '/uk/course/demo/episode/episode-a',
    );
    fireEvent.click(screen.getByRole('link', { name: 'Episode A' }));
    expect(navigate).toHaveBeenCalledOnce();
  });

  it('collapses Modules and Chapters independently while keeping siblings available', async () => {
    render(
      <CourseTopicList
        topics={topics}
        pathname="/uk/course/demo/lesson/en/lesson-a"
        onNavigate={vi.fn()}
      />,
    );
    const moduleHeader = screen.getAllByRole('button', { name: 'Module A' })[0]!;
    const chapterHeader = screen.getAllByRole('button', { name: 'Chapter A' })[0]!;
    expect(moduleHeader).toHaveAttribute('aria-expanded', 'true');
    expect(chapterHeader).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(chapterHeader);
    expect(chapterHeader).toHaveAttribute('aria-expanded', 'false');
    await waitFor(() => expect(screen.queryByRole('link', { name: 'Lesson A' })).not.toBeInTheDocument());
    expect(screen.getByRole('link', { name: 'Lesson B' })).toBeVisible();

    fireEvent.click(moduleHeader);
    expect(moduleHeader).toHaveAttribute('aria-expanded', 'false');
    await waitFor(() => expect(screen.queryByRole('link', { name: 'Lesson B' })).not.toBeInTheDocument());
    expect(screen.getByRole('link', { name: 'Lesson C' })).toBeVisible();

    fireEvent.click(moduleHeader);
    expect(screen.getByRole('link', { name: 'Lesson B' })).toBeVisible();
    expect(chapterHeader).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports a plain standalone Lesson link without Course grouping', () => {
    render(
      <CourseTopicList
        topics={[{ id: 'standalone', title: 'Standalone lesson', href: '/uk/lesson/uk/standalone' }]}
        pathname="/uk/lesson/uk/standalone"
        onNavigate={vi.fn()}
      />,
    );
    expect(screen.getByRole('link', { name: 'Standalone lesson' })).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('button', { name: 'Standalone lesson' })).not.toBeInTheDocument();
  });
});
