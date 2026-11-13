import type { Meta, StoryObj } from '@storybook/nextjs';
import type { ContentBlock_Text_Props, Question_SelectMultipleAnswers_Props } from '@svitlo/engine/runtime';
import { enUiKitMessages } from '../../../../testing/uiKitMessages.unit.fx';
import { SelectMultipleAnswers } from './SelectMultipleAnswers';

const text = (slug: string, value: string): ContentBlock_Text_Props => ({
  id: '00000000-0000-4000-8000-' + Array.from(slug).reduce((sum, char) => sum + char.charCodeAt(0), 1).toString(16).padStart(12, '0'),
  slug,
  type: 'text',
  params: {},
  locale: { value },
});
const response: Question_SelectMultipleAnswers_Props = {
  type: 'selectMultipleAnswers',
  id: '00000000-0000-4000-8000-000000000001',
  slug: 'multipleStory',
  params: { assessmentMethod: 'retrieval', restrictions: [] },
  locale: {},
  content: {
    question: [text('prompt', 'Select the prime numbers.')],
    answers: {
      correct: { two: text('two', '2'), five: text('five', '5') },
      incorrect: { four: text('four', '4') },
      distractors: { six: text('six', '6') },
    },
    explanation: [text('explanation', '2 and 5 are prime numbers.')],
  },
};

const meta = {
  title: 'Questions/Select multiple answers',
  component: SelectMultipleAnswers,
  tags: ['autodocs'],
  args: { response, messages: enUiKitMessages },
} satisfies Meta<typeof SelectMultipleAnswers>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
