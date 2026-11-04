import type { Meta, StoryObj } from '@storybook/nextjs';
import { Image } from './Image';

const diagram = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">' +
  '<rect width="800" height="450" fill="#eef4ff"/>' +
  '<circle cx="180" cy="225" r="78" fill="#facc15"/>' +
  '<path d="M280 225H690" stroke="#2563eb" stroke-width="12" stroke-linecap="round"/>' +
  '<path d="M660 194L700 225L660 256" fill="none" stroke="#2563eb" stroke-width="12"/>' +
  '<text x="400" y="130" text-anchor="middle" font-family="sans-serif" font-size="32" fill="#1e3a8a">Light travels in a straight line</text>' +
  '</svg>',
);

const meta = {
  title: 'Content blocks/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'Next.js image block with intrinsic or fill layout, accessible alt text, captions, and a retry state when loading fails.' } },
  },
  args: {
    id: 'image-example',
    type: 'image',

    src: diagram,
    alt: 'A ray of light travels from a yellow source to the right.',
    caption: 'Diagram: straight-line propagation of light.',
    width: 800,
    height: 450,
    unoptimized: true,
  },
  argTypes: {
    id: { control: false },
    type: { control: false },
    src: { control: 'text' },
    fallback: { control: 'object' },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FillCover: Story = {
  args: {
    fill: true,
    aspectRatio: 16 / 9,
    objectFit: 'cover',
    width: undefined,
    height: undefined,
  },
};

export const MissingImage: Story = {
  args: {
    src: '/storybook-image-not-found.png',
    fallback: { unavailable: 'This diagram cannot be loaded.', retry: 'Try loading again' },
  },
};
