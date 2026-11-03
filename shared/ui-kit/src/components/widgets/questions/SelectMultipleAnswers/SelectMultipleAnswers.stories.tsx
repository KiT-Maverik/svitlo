import type { Meta, StoryObj } from '@storybook/nextjs';
import type { Question_SelectMultipleAnswers } from '@svitlo/engine/content';
import { SelectMultipleAnswers } from './SelectMultipleAnswers';

const locale = { code: 'en' as const };
const text = (id: string, value: string) => ({ id, type: 'text' as const, locale, value });
const response: Question_SelectMultipleAnswers<'response'> = {
  type: 'selectMultipleAnswers', id: 'multiple-story', locale,
  assessmentMethod: 'retrieval', restrictions: [],
  question: [text('prompt', 'Select the prime numbers.')],
  answers: {
    correct: { two: text('two', '2'), five: text('five', '5') },
    incorrect: { four: text('four', '4') },
    distractors: { six: text('six', '6') },
  },
  explanation: [text('explanation', '2 and 5 are prime numbers.')],
};

const meta = {
  title: 'Questions/Select multiple answers',
  component: SelectMultipleAnswers,
  tags: ['autodocs'],
  args: { response },
} satisfies Meta<typeof SelectMultipleAnswers>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
