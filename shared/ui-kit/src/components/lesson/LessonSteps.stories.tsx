import type { Meta, StoryObj } from '@storybook/react';
import { LessonSteps } from './LessonSteps';

const meta = {
  title: 'Lesson/Steps',
  component: LessonSteps,
  args: {
    navigationLabel: 'Lesson steps',
    currentStep: 1,
    showStepNumbers: true,
    allowNavigation: true,
    steps: [
      { id: 'theory', title: 'Theory' },
      { id: 'practice', title: 'Practice' },
      { id: 'quiz', title: 'Quiz' },
    ],
  },
} satisfies Meta<typeof LessonSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutNumbers: Story = { args: { showStepNumbers: false } };
export const ReadOnly: Story = { args: { allowNavigation: false } };
export const ManySections: Story = {
  args: {
    currentStep: 6,
    steps: Array.from({ length: 10 }, (_, index) => ({
      id: `section-${index + 1}`,
      title: `Section ${index + 1}`,
    })),
  },
};
