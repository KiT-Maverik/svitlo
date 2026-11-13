import type { Meta, StoryObj } from '@storybook/nextjs';
import { Text } from './Text';

const meta = {
  title: 'Content blocks/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Text with optional inline markers, styled fragments and a configurable MUI Typography wrapper.',
      },
    },
  },
  args: {
    id: 'text-example',
    slug: 'textExample',
    type: 'text',
    params: {},
    locale: { value: 'Light travels in a straight line.' },
  },
  argTypes: {
    id: { control: false },
    slug: { control: false },
    type: { control: false },
    params: { control: 'object' },
    locale: { control: 'object' },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const StyledFragments: Story = {
  args: {
    locale: {
      value: 'A %_%id: wave; value: light wave%_% can be described by its %_%id: speed; value: speed%_%.',
    },
    params: {
      variables: {
        wave: { applyStyle: ['bold', 'highlight'], tone: 'info' },
        speed: { applyStyle: ['variable', 'underscore'], applyColor: '#1565c0' },
      },
    },
  },
};

export const Heading: Story = {
  args: {
    locale: { value: 'How light moves' },
    params: { wrap: { enabled: true, typographyProps: { component: 'h3', variant: 'h5' } } },
  },
};

export const DefaultTypography: Story = {
  args: { locale: { value: 'Plain text with the default paragraph wrapper' } },
};
