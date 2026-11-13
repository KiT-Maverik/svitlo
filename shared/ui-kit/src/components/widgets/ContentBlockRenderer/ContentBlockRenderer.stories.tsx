import { enUiKitMessages } from '../../../testing/uiKitMessages.unit.fx';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ContentBlockRenderer } from './ContentBlockRenderer';
import type { ContentBlockRendererProps } from './types';

const textBlock = (id: string, value: string) => ({
  id, slug: 'textBlock', type: 'text' as const, params: {}, locale: { value },
});
const mixedBlocks: NonNullable<ContentBlockRendererProps['blocks']> = [
  textBlock('intro', 'Light travels in straight lines through a uniform medium.'),
  {
    id: 'example',
    slug: 'example',
    type: 'code',
    params: { language: 'javascript', codeAsText: 'const speedOfLight = 299_792_458;\\nconsole.log(speedOfLight);' },
  },
  {
    id: 'markdown-note',
    slug: 'markdownNote',
    type: 'markdown',
    params: {},
    locale: { value: '## Key idea\\n\\n**Speed** is a distance divided by time.' },
  },
  textBlock('summary', 'Now check your understanding.'),
];

const meta = {
  title: 'Content blocks/Renderer',
  component: ContentBlockRenderer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Renders an ordered sequence of published content responses. The scene block is still in development and is intentionally omitted from these examples.',
      },
    },
  },
  args: { messages: enUiKitMessages, blocks: mixedBlocks },
  argTypes: {
    blocks: { control: 'object', description: 'Ordered, tagged content-block responses.' },
    sceneRegistry: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof ContentBlockRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Empty: Story = { args: { blocks: [] } };

export const NestedCheckpoint: Story = {
  args: {
    blocks: [
      {
        id: 'knowledge-check',
        slug: 'knowledgeCheck',
        type: 'checkpoint',
        params: { enableChecks: true },
        locale: { title: 'Check your knowledge' },
        content: [
          {
            id: 'knowledge-item-1',
            slug: 'knowledgeItemOne',
            type: 'checkpointItem',
            question: textBlock('question-one', 'How does light travel through a uniform medium?'),
            answer: [textBlock('answer-one', 'In straight lines.')],
          },
          {
            id: 'knowledge-item-2',
            slug: 'knowledgeItemTwo',
            type: 'checkpointItem',
            question: textBlock('question-two', 'What is the approximate speed of light in a vacuum?'),
            answer: [textBlock('answer-two', 'About 300,000 km/s.')],
          },
        ],
      },
    ],
  },
};
