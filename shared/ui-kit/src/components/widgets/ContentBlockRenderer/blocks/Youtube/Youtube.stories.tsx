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
          'A validated HTTPS YouTube link or privacy-enhanced embedded player. Embeds require an accessible title or hint and an internet connection.',
      },
    },
  },
  args: {
    messages: enUiKitMessages.youtube,
    id: 'youtube-example',
    type: 'youtube',

    href: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
    mode: 'link',
    title: 'YouTube IFrame API demonstration',
    hint: 'Opens in a new tab.',
  },
  argTypes: {
    id: { control: false },
    type: { control: false },
    mode: { control: 'radio', options: ['link', 'embed'] },
    fallback: { control: 'object' },
  },
} satisfies Meta<typeof Youtube>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Embedded: Story = {
  args: {
    mode: 'embed',
    title: 'YouTube player demonstration',
    hint: 'The embedded video loads only when online.',
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
    mode: 'embed',

    title: 'Відеодемонстрація',
    hint: 'Для завантаження потрібне з’єднання.',
    fallback: { offline: 'Немає доступу до інтернету.', unavailable: 'Відео недоступне.', retry: 'Повторити' },
  },
};
