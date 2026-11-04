import type { Meta, StoryObj } from '@storybook/nextjs';
import { Text } from './Text';

const meta = {
  title: 'Content blocks/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'Text with optional inline markers, styled fragments and a configurable MUI Typography wrapper.' } },
  },
  args: {
    id: 'text-example',
    type: 'text',

    value: 'Light travels in a straight line.',
  },
  argTypes: { id: { control: false }, type: { control: false }, styling: { control: 'object' }, wrap: { control: 'object' } },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const StyledFragments: Story = {
  args: {
    value: 'A {{id: wave; value: light wave}} can be described by its {{id: speed; value: speed}}.',
    styling: [
      { id: 'wave', applyStyle: ['bold', 'highlight'], tone: 'info' },
      { id: 'speed', applyStyle: ['variable', 'underscore'], applyColor: '#1565c0' },
    ],
  },
};

export const Heading: Story = {
  args: { value: 'How light moves', wrap: { typographyProps: { component: 'h3', variant: 'h5' } } },
};

export const WithoutWrapper: Story = {
  args: { value: 'Inline content without a paragraph', wrap: { enabled: false } },
};
