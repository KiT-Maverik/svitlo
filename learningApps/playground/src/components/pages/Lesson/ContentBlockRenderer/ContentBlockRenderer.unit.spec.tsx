import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ContentBlockResponse } from './ContentBlockRenderer';
import { ContentBlockRenderer } from './ContentBlockRenderer';

const locale = { code: 'en' as const };
const blocks: ContentBlockResponse[] = [
  { id: 'intro', type: 'text', locale, value: 'Introduction' },
  { id: 'diagram', type: 'image', locale, src: '/diagram.png', alt: 'Light diagram', width: 800, height: 450 },
  { id: 'summary', type: 'text', locale, value: 'Summary' },
];

describe('lesson content block renderer', () => {
  it('renders the ordered array supplied by the lesson response', () => {
    const { container } = render(<ContentBlockRenderer blocks={blocks} />);
    expect([...container.querySelectorAll('p, img')].map(element => element.textContent || element.getAttribute('alt')))
      .toEqual(['Introduction', 'Light diagram', 'Summary']);
  });

  it('renders nothing for a section without content blocks', () => {
    const { container } = render(<ContentBlockRenderer blocks={[]} />);
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByText('Introduction')).toBeNull();
  });
});
