import { enUiKitMessages } from '../../../../../testing/uiKitMessages.unit.fx';
import type { Meta, StoryObj } from '@storybook/nextjs';
import type { ContentBlock_Checkpoint_Response, Locale_Languages } from '@svitlo/engine/content';
import { ContentLanguageContext } from '../../ContentLanguageContext';
import { ContentBlockRenderer } from '../../ContentBlockRenderer';

function CheckpointStory(props: ContentBlock_Checkpoint_Response<Locale_Languages>) {
  // Use the real dispatcher so the answers render as regular content blocks.
  return <ContentBlockRenderer messages={enUiKitMessages} messages={enUiKitMessages} blocks={[props]} />;
}

const meta = {
  title: 'Content blocks/Checkpoint',
  component: CheckpointStory,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'Expandable questions with nested answers, optional confirmation buttons, and configurable indices, icons and layout.' } },
  },
  args: {
    id: 'checkpoint-example',
    type: 'checkpoint',
    title: 'Check your knowledge',
    headingLevel: 2,
    showIndices: true,
    showChevron: true,
    showIcon: false,
    enableChecks: false,
    renderAsGroup: true,
    items: [
      { question: 'How does light travel?',
        answer: [{ id: 'answer-light', type: 'text', value: 'In a straight line through a uniform medium.' }] },
      { question: 'What can a prism do to white light?',
        answer: [{ id: 'answer-prism', type: 'text', value: 'Separate it into different colors.' }] },
    ],
  },
  argTypes: {
    id: { control: false },
    type: { control: false },
    items: { control: 'object' },
    headingLevel: { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6] },
    indexPosition: { control: 'radio', options: ['left', 'right'] },
    iconPosition: { control: 'radio', options: ['left', 'right'] },
    chevronPosition: { control: 'radio', options: ['left', 'right'] },
  },
} satisfies Meta<typeof CheckpointStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithChecks: Story = {
  args: { enableChecks: true, showIcon: true },
};

export const SeparateItems: Story = {
  args: { renderAsGroup: false, showIndices: false, showIcon: true, iconPosition: 'right' },
};

export const RightToLeft: Story = {
  decorators: [(StoryComponent) => <ContentLanguageContext.Provider value="ar"><StoryComponent /></ContentLanguageContext.Provider>],
  args: {
    title: 'اختبر معلوماتك',
    enableChecks: true,
    items: [{
      question: 'كيف ينتقل الضوء في وسط متجانس؟',
      answer: [{ id: 'arabic-answer', type: 'text', value: 'ينتقل الضوء في خطوط مستقيمة.' }],
    }],
  },
};
