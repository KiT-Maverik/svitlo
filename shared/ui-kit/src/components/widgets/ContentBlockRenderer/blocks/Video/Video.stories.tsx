import type { Meta, StoryObj } from '@storybook/nextjs';
import { Video } from './Video';

const poster = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">' +
  '<rect width="640" height="360" fill="#173b61"/><circle cx="320" cy="180" r="60" fill="#ffffff"/>' +
  '<path d="M303 142L365 180L303 218Z" fill="#173b61"/>' +
  '</svg>',
);

const meta = {
  title: 'Content blocks/Video',
  component: Video,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'Native video playback with an optional title, poster, and localized fallback/retry behavior.' } },
  },
  args: {
    id: 'video-example',
    type: 'video',
    locale: { code: 'en' },
    fileLocation: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster,
    title: 'Flower video',
  },
  argTypes: { id: { control: false }, type: { control: false }, fallback: { control: 'object' } },
} satisfies Meta<typeof Video>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithoutTitle: Story = { args: { title: undefined } };

export const MissingFile: Story = {
  args: {
    fileLocation: '/storybook-video-not-found.mp4',
    fallback: {
      unavailable: 'The video is unavailable.',
      offline: 'This video needs a connection.',
      playbackError: 'The video could not be played.',
      retry: 'Retry video',
    },
  },
};
