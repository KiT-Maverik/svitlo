import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListOutlined from '@mui/icons-material/ListOutlined';
import PriorityHighOutlined from '@mui/icons-material/PriorityHighOutlined';
import ChatBubbleOutlineOutlined from '@mui/icons-material/ChatBubbleOutlineOutlined';
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
    labels: { control: 'object', description: 'Службові мітки, які показуються під питанням.' },
    initialRevealed: { control: 'boolean', description: 'Початковий стан картки у Playground.' },
    disabled: { control: 'boolean' },
  },
  args: {
    messages: ukUiKitMessages.flashcard,
    question: 'Як поширюється світло в прозорому однорідному середовищі?',
    answer: 'Прямолінійно.',
    labels: [
      { icon: <ListOutlined />, label: '6', color: 'info' },
      { icon: <PriorityHighOutlined />, label: 'Увага', color: 'warning' },
      { icon: <ChatBubbleOutlineOutlined />, label: 'PaRFUME', color: 'secondary' },
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
  args: { labels: [] },
};
