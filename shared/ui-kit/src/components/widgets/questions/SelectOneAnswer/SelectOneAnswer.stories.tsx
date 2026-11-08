import type { Meta, StoryObj } from '@storybook/nextjs';
import type { Question_SelectOneAnswer, Locale_Languages } from '@svitlo/contracts/content';
import { enUiKitMessages } from '../../../../testing/uiKitMessages.unit.fx';
import { SelectOneAnswer } from './SelectOneAnswer';

const text = (id: string, value: string) => ({ id, type: 'text' as const, value });
const response: Question_SelectOneAnswer<'response', Locale_Languages> = {
  type: 'selectOneAnswer',
  id: 'one-story',
  assessmentMethod: 'retrieval',
  restrictions: [],
  question: [text('prompt', 'Which planet is closest to the Sun?')],
  answers: {
    correct: { mercury: text('mercury', 'Mercury') },
    incorrect: { earth: text('earth', 'Earth') },
    distractors: { mars: text('mars', 'Mars') },
  },
  hint: [text('hint', 'It is the innermost planet.')],
  explanation: [text('explanation', 'Mercury is closest to the Sun.')],
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
