import type { Meta, StoryObj } from '@storybook/react';
import { Celebration } from './Celebration';
import { lesson } from '../../../data/locale/lesson';

const meta = {
  title: 'Lesson/Celebration',
  component: Celebration,
  args: {
    score: 7,
    total: 9,
    messages: lesson.uk,
    homeHref: '/uk',
  },
} satisfies Meta<typeof Celebration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Completed: Story = {};
export const PerfectScore: Story = { args: { score: 9, total: 9 } };
export const RightToLeft: Story = {
  args: { messages: lesson.ar, homeHref: '/ar' },
  decorators: [
    Story => (
      <div dir="rtl" lang="ar-SA">
        <Story />
      </div>
    ),
  ],
};
