import { enUiKitMessages } from '../../../../../testing/uiKitMessages.unit.fx';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Youtube } from './Youtube';
import { ContentLanguageContext } from '../../ContentLanguageContext';

const meta = {
  title: 'Content blocks/YouTube',
  component: Youtube,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A validated HTTPS YouTube link or privacy-enhanced embedded player. A required label names the link, iframe and fallback. Optional title is shown as a caption.',
      },
    },
  },
  args: {
    messages: enUiKitMessages.youtube,
    id: 'youtube-example',
    slug: 'youtubeExample',
    type: 'youtube',
    params: { mode: 'link' },
    locale: {
      href: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
      title: 'YouTube link example',
      label: 'Watch the YouTube IFrame API demonstration',
    },
  },
  argTypes: {
    id: { control: false },
    slug: { control: false },
    type: { control: false },
    params: { control: 'object' },
    locale: { control: 'object' },
  },
} satisfies Meta<typeof Youtube>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Embedded: Story = {
  args: {
    params: { mode: 'embed' },
    locale: { ...meta.args.locale, title: 'Embedded player example', label: 'YouTube player demonstration' },
  },
};

export const WithLocalizedFallback: Story = {
  decorators: [
    StoryComponent => (
      <ContentLanguageContext.Provider value="uk">
        <StoryComponent />
      </ContentLanguageContext.Provider>
    ),
  ],
  args: {
    params: { mode: 'embed' },
    locale: {
      ...meta.args.locale,
      title: 'Демонстрація YouTube',
      label: 'Відеодемонстрація',
      fallback: { offline: 'Немає доступу до інтернету.', unavailable: 'Відео недоступне.', retry: 'Повторити' },
    },
  },
};
