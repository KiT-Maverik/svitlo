import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ThreeSlotLayout from './ThreeSlotLayout';

const panel = (label: string) => (
  <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper' }}>
    <Typography variant="body2">{label}</Typography>
  </Box>
);

const meta = {
  title: 'Layouts/ThreeSlotLayout',
  component: ThreeSlotLayout,
  tags: ['autodocs'],
  args: {
    axis: 'vertical',
    slots: {
      start: panel('Start: height from content'),
      center: panel('Center: fills remaining space'),
      end: panel('End: anchored to bottom'),
    },
    slotProps: {
      root: { sx: { height: 420, maxWidth: 360, border: 1, borderColor: 'divider' } },
      center: { sx: { justifyContent: 'center', alignItems: 'center' } },
    },
    gap: 1,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Axis-neutral three-slot CSS Grid. Start and end use intrinsic content size; center fills the remaining track. No slot owns a scrollbar. Configure center alignment with slotProps.center.sx.',
      },
    },
  },
} satisfies Meta<typeof ThreeSlotLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalCentered: Story = {};

export const VerticalTopAligned: Story = {
  args: {
    slotProps: {
      root: { sx: { height: 420, maxWidth: 360, border: 1, borderColor: 'divider' } },
      center: { sx: { justifyContent: 'flex-start' } },
    },
  },
};

export const VerticalBottomAligned: Story = {
  args: {
    slotProps: {
      root: { sx: { height: 420, maxWidth: 360, border: 1, borderColor: 'divider' } },
      center: { sx: { justifyContent: 'flex-end' } },
    },
  },
};

export const Horizontal: Story = {
  args: {
    axis: 'horizontal',
    slots: { start: panel('Start'), center: panel('Flexible center'), end: panel('End') },
    slotProps: { root: { sx: { height: 100, maxWidth: 800, border: 1, borderColor: 'divider' } } },
  },
};

export const HorizontalRTL: Story = {
  args: {
    axis: 'horizontal',
    slots: { start: panel('Logical start — right'), center: panel('Center'), end: panel('Logical end — left') },
    slotProps: { root: { dir: 'rtl', sx: { height: 100, maxWidth: 800, border: 1, borderColor: 'divider' } } },
  },
};
