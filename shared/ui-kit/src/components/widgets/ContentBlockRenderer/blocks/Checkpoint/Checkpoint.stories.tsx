import { enUiKitMessages } from '../../../../../testing/uiKitMessages.unit.fx';
import type { Meta, StoryObj } from '@storybook/nextjs';
import type { ContentBlock_Checkpoint_Props, ContentBlock_Text_Props } from '@svitlo/engine/runtime';
import { ContentLanguageContext } from '../../ContentLanguageContext';
import { ContentBlockRenderer } from '../../ContentBlockRenderer';

const textBlock = (id: string, value: string): ContentBlock_Text_Props => ({
  id,
  slug: 'textBlock',
  type: 'text',
  params: {},
  locale: { value },
});

function checkpointItem(id: string, question: string, answer: string) {
  return {
    id,
    slug: 'checkpointItem',
    type: 'checkpointItem' as const,
    question: textBlock(id + '-question', question),
    answer: [textBlock(id + '-answer', answer)],
  };
}

function CheckpointStory(props: ContentBlock_Checkpoint_Props) {
  // Use the real dispatcher so the answers render as regular content blocks.
  return <ContentBlockRenderer messages={enUiKitMessages} blocks={[props]} />;
}

const meta = {
  title: 'Content blocks/Checkpoint',
  component: CheckpointStory,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Expandable questions with nested answers, optional confirmation buttons, and configurable indices, icons and layout.',
      },
    },
  },
  args: {
    id: 'checkpoint-example',
    slug: 'checkpointExample',
    type: 'checkpoint',
    params: {
      headingLevel: 2,
      showIndices: true,
      showChevron: true,
      showIcon: false,
      enableChecks: false,
      renderAsGroup: true,
    },
    locale: { title: 'Check your knowledge' },
    content: [
      checkpointItem('item-light', 'How does light travel?', 'In a straight line through a uniform medium.'),
      checkpointItem('item-prism', 'What can a prism do to white light?', 'Separate it into different colors.'),
    ],
  },
  argTypes: {
    id: { control: false },
    slug: { control: false },
    type: { control: false },
    content: { control: 'object' },
    params: { control: 'object' },
    locale: { control: 'object' },
  },
} satisfies Meta<typeof CheckpointStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithChecks: Story = {
  args: { params: { enableChecks: true, showIcon: true } },
};

export const SeparateItems: Story = {
  args: { params: { renderAsGroup: false, showIndices: false, showIcon: true, iconPosition: 'right' } },
};

export const RightToLeft: Story = {
  decorators: [
    StoryComponent => (
      <ContentLanguageContext.Provider value="ar">
        <StoryComponent />
      </ContentLanguageContext.Provider>
    ),
  ],
  args: {
    locale: { title: 'اختبر معلوماتك' },
    params: { enableChecks: true },
    content: [
      checkpointItem('arabic-item', 'كيف ينتقل الضوء في وسط متجانس؟', 'ينتقل الضوء في خطوط مستقيمة.'),
    ],
  },
};
