import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ContentBlockResponse, SceneRegistry } from './types';
import { ContentBlockRenderer } from './ContentBlockRenderer';

const locale = { code: 'en' as const };
const first: ContentBlockResponse = { id: 'first', type: 'text', locale, value: 'First block' };
const last: ContentBlockResponse = { id: 'last', type: 'text', locale, value: 'Last block' };

describe('ContentBlockRenderer', () => {
  it('renders nothing when blocks are absent or empty', () => {
    const { container, rerender } = render(<ContentBlockRenderer />);
    expect(container).toBeEmptyDOMElement();
    rerender(<ContentBlockRenderer blocks={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('dispatches each block in array order', () => {
    const { container } = render(<ContentBlockRenderer blocks={[first, {
      id: 'middle', type: 'markdown', locale, text: '**Middle block**',
    }, last]} />);
    expect([...container.querySelectorAll('p')].map(element => element.textContent))
      .toEqual(['First block', 'Middle block', 'Last block']);
  });

  it('renders checkpoint answers through the same dispatcher', () => {
    render(<ContentBlockRenderer blocks={[{
      id: 'checkpoint', type: 'checkpoint', locale, title: 'Review',
      items: [{ question: 'What is first?', answer: [first] }],
    }]} />);
    fireEvent.click(screen.getByText('What is first?'));
    expect(screen.getByText('First block')).toBeVisible();
  });

  it('continues to resolve scenes from the supplied registry', () => {
    const sceneRegistry: SceneRegistry = {
      diagram: ({ locale: current }) => <div role="img" aria-label={`diagram-${current.code}`} />,
    };
    render(<ContentBlockRenderer blocks={[{
      id: 'diagram', type: 'scene', locale, rendererKey: 'diagram',
      messages: { title: 'Diagram' },
    }]} sceneRegistry={sceneRegistry} />);
    expect(screen.getByRole('img', { name: 'diagram-en' })).toBeVisible();
  });

  it('does not dispatch quiz entries as content blocks', () => {
    const quiz = { id: 'quiz', type: 'quiz', locale } as unknown as ContentBlockResponse;
    expect(() => render(<ContentBlockRenderer blocks={[quiz]} />)).toThrow('requires a supported response.type');
  });
});
