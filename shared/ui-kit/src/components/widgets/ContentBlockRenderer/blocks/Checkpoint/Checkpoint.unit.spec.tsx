import { enUiKitMessages } from '../../../../../testing/uiKitMessages.unit.fx';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ContentBlock_Checkpoint_Response, Locale_Languages } from '@svitlo/engine/content';
import { ContentLanguageContext } from '../../ContentLanguageContext';

import { Checkpoint } from './Checkpoint';

const response: ContentBlock_Checkpoint_Response<Locale_Languages> = {
  id: 'checkpoint-1',
  type: 'checkpoint',
  title: 'Check your knowledge',
  headingLevel: 3,
  items: [{
    question: 'What is light?',
    answer: [{ id: 'answer-1', type: 'text', value: 'Electromagnetic radiation' }],
    check: true,
  }],
};

describe('Checkpoint content block', () => {
  it('renders a nested answer and confirms a checked item', () => {
    render(<Checkpoint messages={enUiKitMessages.checkpoint} {...response} renderNested={block => <span>{block.type}: {block.id}</span>} />);
    expect(screen.getByRole('heading', { name: 'Check your knowledge', level: 3 })).toBeInTheDocument();
    fireEvent.click(screen.getByText('What is light?'));
    expect(screen.getByText('text: answer-1')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(screen.getByRole('button', { name: 'Checked' })).toBeDisabled();
  });

  it('does not show confirmation when checks are disabled', () => {
    render(<Checkpoint messages={enUiKitMessages.checkpoint} {...response} items={[{ ...response.items[0], check: undefined }]} renderNested={() => null} />);
    fireEvent.click(screen.getByText('What is light?'));
    expect(screen.queryByRole('button', { name: 'Check' })).toBeNull();
  });
});


describe('Checkpoint configuration and accessibility', () => {
  it('enables confirmation for all items and keeps their state independent', () => {
    render(<Checkpoint messages={enUiKitMessages.checkpoint}
      {...response}
      enableChecks
      items={[
        { ...response.items[0], check: undefined },
        { question: 'What is a ray?', answer: [{ id: 'answer-2', type: 'text', value: 'A model of light' }] },
      ]}
      renderNested={block => <span>{block.id}</span>}
    />);
    fireEvent.click(screen.getByText('What is light?'));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(screen.getByRole('button', { name: 'Checked' })).toBeDisabled();

    fireEvent.click(screen.getByText('What is a ray?'));
    expect(screen.getByText('answer-2')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Check' })).toBeEnabled();
  });

  it('uses right-to-left direction and clamps the item heading level at six', () => {
    render(<ContentLanguageContext.Provider value="ar"><Checkpoint messages={enUiKitMessages.checkpoint}
      {...response}
      title="اختبر معلوماتك"
      headingLevel={6}
      showIndices={false}
      showChevron={false}
      showIcon
      renderAsGroup={false}
      renderNested={() => null}
    /></ContentLanguageContext.Provider>);
    const title = screen.getByRole('heading', { name: 'اختبر معلوماتك', level: 6 });
    expect(title.closest('section')).toHaveAttribute('dir', 'rtl');
    expect(screen.queryByText('01')).toBeNull();
    expect(screen.getByText('What is light?')).toHaveAttribute('dir', 'rtl');
  });
});
