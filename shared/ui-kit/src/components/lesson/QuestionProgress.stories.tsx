import type { Meta, StoryObj } from '@storybook/react';
import { QuestionProgress } from './QuestionProgress';
import { data as lesson } from '../../../data/locale/lesson';

const meta = {
  title: 'Lesson/Question Progress',
  component: QuestionProgress,
  args: {
    statuses: ['correct', 'incorrect', 'deferred', 'unanswered'],
    currentIndex: 2,
    allowNavigation: true,
    messages: lesson.uk,
  },
} satisfies Meta<typeof QuestionProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MixedAnswers: Story = {};
export const ReadOnly: Story = { args: { allowNavigation: false } };
export const RightToLeft: Story = {
  args: { messages: lesson.ar },
  decorators: [
    Story => (
      <div dir="rtl" lang="ar-SA">
        <Story />
      </div>
    ),
  ],
};
