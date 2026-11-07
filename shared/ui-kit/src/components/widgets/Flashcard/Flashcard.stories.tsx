import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Flashcard, type FlashcardProps } from './Flashcard';
import { ukUiKitMessages } from '../../../testing/uiKitMessages.unit.fx';

type StoryProps = Omit<FlashcardProps, 'revealed' | 'onReveal' | 'onRate'> & { initialRevealed?: boolean };

function FlashcardStory({ initialRevealed = false, ...props }: StoryProps) {
  const [revealed, setRevealed] = useState(initialRevealed);
  const [rating, setRating] = useState<string | null>(null);
  return (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <Flashcard
        {...props}
        revealed={revealed}
        onReveal={() => {
          setRevealed(true);
          setRating(null);
        }}
        onRate={remembered => setRating(remembered ? 'Пам’ятаю' : 'Не пам’ятаю')}
      />
      {rating && <Typography color="text.secondary">Оцінка: {rating}</Typography>}
    </Stack>
  );
}

const meta = {
  title: 'Widgets/Flashcard',
  component: FlashcardStory,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Самостійна інтерактивна флешкартка: питання, відповідь і дві оцінки запам’ятовування.',
      },
    },
  },
  argTypes: {
    question: { control: 'text' },
    answer: { control: 'text' },
    flags: { control: 'object', description: 'Типізовані мітки з Lesson Data: list, warning, acronym, custom.' },
    labels: { control: 'object', description: 'Додаткові UI-мітки, якщо їх задає хост.' },
    initialRevealed: { control: 'boolean', description: 'Початковий стан картки у Playground.' },
    disabled: { control: 'boolean' },
  },
  args: {
    messages: ukUiKitMessages.flashcard,
    question: 'Як поширюється світло в прозорому однорідному середовищі?',
    answer: 'Прямолінійно.',
    flags: [
      { type: 'list', count: 6 },
      { type: 'warning' },
      { type: 'acronym', value: 'PaRFUME' },
      { type: 'custom', value: 'Важливо', color: 'success', icon: 'star' },
    ],
    initialRevealed: false,
    disabled: false,
  },
} satisfies Meta<typeof FlashcardStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Revealed: Story = {
  args: { initialRevealed: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithoutProgress: Story = {
  args: { flags: [], labels: [] },
};
