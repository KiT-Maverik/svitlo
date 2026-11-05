import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ContentBlockResponse } from './ContentBlockRenderer';
import { ContentBlockRenderer } from './ContentBlockRenderer';
import { enUiKitMessages } from '../../../../../../../shared/ui-kit/src/testing/uiKitMessages.unit.fx';

const blocks: ContentBlockResponse[] = [
  { id: 'intro', type: 'text', value: 'Introduction' },
  { id: 'diagram', type: 'image', src: '/diagram.png', alt: 'Light diagram', width: 800, height: 450 },
  { id: 'summary', type: 'text', value: 'Summary' },
];

describe('lesson content block renderer', () => {
  it('renders the ordered array supplied by the lesson response', () => {
    const { container } = render(<ContentBlockRenderer messages={enUiKitMessages} blocks={blocks} />);
    expect([...container.querySelectorAll('p, img')].map(element => element.textContent || element.getAttribute('alt')))
      .toEqual(['Introduction', 'Light diagram', 'Summary']);
  });

  it('renders nothing for a section without content blocks', () => {
    const { container } = render(<ContentBlockRenderer messages={enUiKitMessages} blocks={[]} />);
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByText('Introduction')).toBeNull();
  });
});
