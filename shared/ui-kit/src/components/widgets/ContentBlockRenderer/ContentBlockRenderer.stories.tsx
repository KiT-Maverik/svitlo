import { enUiKitMessages } from '../../../testing/uiKitMessages.unit.fx';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ContentBlockRenderer } from './ContentBlockRenderer';
import type { ContentBlockRendererProps } from './types';

const mixedBlocks: NonNullable<ContentBlockRendererProps['blocks']> = [
  { id: 'intro', type: 'text', value: 'Light travels in straight lines through a uniform medium.' },
  { id: 'example', type: 'code', language: 'javascript', title: 'Example',
    code: 'const speedOfLight = 299_792_458;\nconsole.log(speedOfLight);' },
  { id: 'markdown-note', type: 'markdown', text: '## Key idea\n\n**Speed** is a distance divided by time.' },
  { id: 'summary', type: 'text', value: 'Now check your understanding.' },
];

const meta = {
  title: 'Content blocks/Renderer',
  component: ContentBlockRenderer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Renders an ordered sequence of published content responses. The scene block is still in development and is intentionally omitted from these examples.',
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
    blocks: [{
      id: 'knowledge-check',
      type: 'checkpoint',
      title: 'Check your knowledge',
      enableChecks: true,
      items: [
        { question: 'How does light travel through a uniform medium?',
          answer: [{ id: 'answer-one', type: 'text', value: 'In straight lines.' }] },
        { question: 'What is the approximate speed of light in a vacuum?',
          answer: [{ id: 'answer-two', type: 'text', value: 'About 300,000 km/s.' }] },
      ],
    }],
  },
};
