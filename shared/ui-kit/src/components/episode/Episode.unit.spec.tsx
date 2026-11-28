import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { EpisodeViewProps } from '../../presentation';
import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';
import { Episode } from './Episode';

const response: EpisodeViewProps = {
  id: 'episode',
  slug: 'story',
  type: 'episode',
  params: { languages: ['en'] },
  locale: { title: 'A narrative' },
  section: [
    {
      id: 'intro',
      slug: 'intro',
      type: 'content',
      params: {},
      locale: { title: 'Arrival', navigationLabel: 'Arrival' },
      content: [
        { id: 'scene', slug: 'scene', type: 'scene', params: {}, locale: { value: { title: 'Experiment' } } },
        {
          id: 'checkpoint',
          slug: 'checkpoint',
          type: 'checkpoint',
          params: { requireCompletion: true, enableChecks: true },
          locale: { title: 'Review' },
          content: [
            {
              id: 'item',
              slug: 'item',
              type: 'checkpointItem',
              question: { id: 'question', slug: 'question', type: 'text', params: {}, locale: { value: 'Question?' } },
              answer: [{ id: 'answer', slug: 'answer', type: 'text', params: {}, locale: { value: 'Answer' } }],
            },
          ],
        },
      ],
    },
    {
      id: 'ending',
      slug: 'ending',
      type: 'practice',
      params: {},
      locale: { title: 'Departure', navigationLabel: 'Departure' },
      content: [{ id: 'line', slug: 'line', type: 'text', params: {}, locale: { value: 'Continue the story' } }],
    },
  ],
};
describe('independent Episode controller', () => {
  it('renders actual Scene and gates navigation on required checkpoints, then links next Course activity', () => {
    render(
      <Episode
        response={response}
        language="en"
        href="/episode/story"
        courseHref="/course"
        courseTitle="Course"
        topics={[]}
        nextActivity={{ href: '/lesson/next', title: 'Next activity' }}
        messages={enUiKitMessages}
        sceneRegistry={id =>
          id === 'scene'
            ? ({ locales }) => <span role="img" aria-label={typeof locales === 'object' ? String(locales.title) : ''} />
            : undefined
        }
      />,
    );
    expect(screen.getByRole('heading', { name: 'A narrative' })).toBeVisible();
    expect(screen.getByRole('img', { name: 'Experiment' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    fireEvent.click(screen.getByText('Question?'));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('heading', { name: 'Departure' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Next activity' })).toHaveAttribute('href', '/lesson/next');
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
  });
});
