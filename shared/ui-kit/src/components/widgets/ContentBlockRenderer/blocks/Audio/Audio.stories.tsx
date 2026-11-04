import type { Meta, StoryObj } from '@storybook/nextjs';
import { Audio } from './Audio';
import { ContentLanguageContext } from '../../ContentLanguageContext';

const meta = {
  title: 'Content blocks/Audio',
  component: Audio,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'Native audio playback, optional caption, and localized error/retry states. Audio files may be cached for offline playback.' } },
  },
  args: {
    id: 'audio-example',
    type: 'audio',

    fileLocation: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    title: 'Animal sounds',
    description: 'Play the audio recording.',
  },
  argTypes: {
    id: { control: false },
    type: { control: false },

    fileLocation: { control: 'text' },
    fallback: { control: 'object' },
  },
} satisfies Meta<typeof Audio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Localized: Story = {
  decorators: [(StoryComponent) => <ContentLanguageContext.Provider value="uk"><StoryComponent /></ContentLanguageContext.Provider>],
  args: { title: 'Звуки тварин', description: 'Прослухайте аудіозапис.' },
};

export const MissingFile: Story = {
  args: {
    fileLocation: '/storybook-audio-not-found.mp3',
    fallback: {
      unavailable: 'The recording could not be loaded.',
      offline: 'Connect to the internet to load this recording.',
      playbackError: 'Playback failed.',
      retry: 'Retry audio',
    },
  },
};
