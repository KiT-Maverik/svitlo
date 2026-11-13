import type { Meta, StoryObj } from '@storybook/nextjs';
import type { ContentBlock_Text_Props, Question_SelectOneAnswer_Props } from '@svitlo/engine/runtime';
import { enUiKitMessages } from '../../../../testing/uiKitMessages.unit.fx';
import { SelectOneAnswer } from './SelectOneAnswer';

const text = (slug: string, value: string): ContentBlock_Text_Props => ({
  id: '00000000-0000-4000-8000-' + Array.from(slug).reduce((sum, char) => sum + char.charCodeAt(0), 1).toString(16).padStart(12, '0'),
  slug,
  type: 'text',
  params: {},
  locale: { value },
});
const response: Question_SelectOneAnswer_Props = {
  type: 'selectOneAnswer',
  id: '00000000-0000-4000-8000-000000000001',
  slug: 'oneStory',
  params: { assessmentMethod: 'retrieval', restrictions: [] },
  locale: {},
  content: {
    question: [text('prompt', 'Which planet is closest to the Sun?')],
    answers: {
      correct: { mercury: text('mercury', 'Mercury') },
      incorrect: { earth: text('earth', 'Earth') },
      distractors: { mars: text('mars', 'Mars') },
    },
    hint: [text('hint', 'It is the innermost planet.')],
    explanation: [text('explanation', 'Mercury is closest to the Sun.')],
  },
};

const meta = {
  title: 'Questions/Select one answer',
  component: SelectOneAnswer,
  tags: ['autodocs'],
  args: { response, messages: enUiKitMessages },
} satisfies Meta<typeof SelectOneAnswer>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
