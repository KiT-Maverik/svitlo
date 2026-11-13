import { enUiKitMessages } from '../../../../../testing/uiKitMessages.unit.fx';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ContentBlock_Checkpoint_Props, ContentBlock_Text_Props } from '@svitlo/engine/runtime';
import { ContentLanguageContext } from '../../ContentLanguageContext';

import { Checkpoint } from './Checkpoint';

const textBlock = (id: string, value: string): ContentBlock_Text_Props => ({
  id,
  slug: 'textBlock',
  type: 'text',
  params: {},
  locale: { value },
});

const response: ContentBlock_Checkpoint_Props = {
  id: 'checkpoint-1',
  slug: 'checkpoint',
  type: 'checkpoint',
  params: { headingLevel: 3 },
  locale: { title: 'Check your knowledge' },
  content: [
    {
      id: 'checkpoint-item-1',
      slug: 'checkpointItem',
      type: 'checkpointItem',
      question: textBlock('question-1', 'What is light?'),
      answer: [textBlock('answer-1', 'Electromagnetic radiation')],
      check: true,
    },
  ],
};

describe('Checkpoint content block', () => {
  it('renders a nested answer and confirms a checked item', () => {
    render(
      <Checkpoint
        messages={enUiKitMessages.checkpoint}
        {...response}
        renderNested={block =>
          block.type === 'text' && block.id === 'question-1' ? (
            <span>{block.locale.value}</span>
          ) : (
            <span>{block.type}: {block.id}</span>
          )
        }
      />,
    );
    expect(screen.getByRole('heading', { name: 'Check your knowledge', level: 3 })).toBeInTheDocument();
    fireEvent.click(screen.getByText('What is light?'));
    expect(screen.getByText('text: answer-1')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(screen.getByRole('button', { name: 'Checked' })).toBeDisabled();
  });

  it('does not show confirmation when checks are disabled', () => {
    render(
      <Checkpoint
        messages={enUiKitMessages.checkpoint}
        {...response}
        content={[{ ...response.content[0], check: undefined }]}
        renderNested={block => (block.type === 'text' ? block.locale.value : null)}
      />,
    );
    fireEvent.click(screen.getByText('What is light?'));
    expect(screen.queryByRole('button', { name: 'Check' })).toBeNull();
  });
});

describe('Checkpoint configuration and accessibility', () => {
  it('enables confirmation for all items and keeps their state independent', () => {
    render(
      <Checkpoint
        messages={enUiKitMessages.checkpoint}
        {...response}
        params={{ ...response.params, enableChecks: true }}
        content={[
          { ...response.content[0], check: undefined },
          {
            id: 'checkpoint-item-2',
            slug: 'checkpointItem2',
            type: 'checkpointItem',
            question: textBlock('question-2', 'What is a ray?'),
            answer: [textBlock('answer-2', 'A model of light')],
          },
        ]}
        renderNested={block =>
          block.type === 'text' && block.id.startsWith('question-') ? block.locale.value : <span>{block.id}</span>
        }
      />,
    );
    fireEvent.click(screen.getByText('What is light?'));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(screen.getByRole('button', { name: 'Checked' })).toBeDisabled();

    fireEvent.click(screen.getByText('What is a ray?'));
    expect(screen.getByText('answer-2')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Check' })).toBeEnabled();
  });

  it('uses right-to-left direction and clamps the item heading level at six', () => {
    render(
      <ContentLanguageContext.Provider value="ar">
        <Checkpoint
          messages={enUiKitMessages.checkpoint}
          {...response}
          locale={{ ...response.locale, title: 'اختبر معلوماتك' }}
          params={{
            ...response.params,
            headingLevel: 6,
            showIndices: false,
            showChevron: false,
            showIcon: true,
            renderAsGroup: false,
          }}
          renderNested={block => (block.type === 'text' ? block.locale.value : null)}
        />
      </ContentLanguageContext.Provider>,
    );
    const title = screen.getByRole('heading', { name: 'اختبر معلوماتك', level: 6 });
    expect(title.closest('section')).toHaveAttribute('dir', 'rtl');
    expect(screen.queryByText('01')).toBeNull();
    expect(screen.getByText('What is light?').closest('[dir]')).toHaveAttribute('dir', 'rtl');
  });
});
