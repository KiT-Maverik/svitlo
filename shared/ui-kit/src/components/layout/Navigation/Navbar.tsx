import type { ReactNode } from 'react';
import type { BoxProps } from '@mui/material/Box';
import ThreeSlotLayout from '../ThreeSlotLayout';
import { testId } from './Navbar.constants';

export type NavbarProps = {
  'aria-label': string;
  slots?: { left?: ReactNode; center?: ReactNode; right?: ReactNode };
  slotProps?: {
    root?: Omit<BoxProps, 'children' | 'component'>;
    left?: Omit<BoxProps, 'children' | 'component'>;
    center?: Omit<BoxProps, 'children' | 'component'>;
    right?: Omit<BoxProps, 'children' | 'component'>;
  };
};

/** Semantic navigation wrapper around the shared horizontal three-zone grid. */
export default function Navbar({ slots = {}, slotProps = {}, 'aria-label': label }: NavbarProps) {
  const { sx: rootSx = [], className: rootClassName, ...rootProps } = slotProps.root ?? {};
  const { sx: leftSx = [], ...leftProps } = slotProps.left ?? {};
  const { sx: centerSx = [], ...centerProps } = slotProps.center ?? {};
  const { sx: rightSx = [], ...rightProps } = slotProps.right ?? {};
  const sxArray = (value: typeof rootSx) => (Array.isArray(value) ? value : [value]);

  return (
    <ThreeSlotLayout
      axis="horizontal"
      component="nav"
      keepEmptySlots
      gap={1}
      slots={{ start: slots.left, center: slots.center, end: slots.right }}
      slotProps={{
        root: {
          ...rootProps,
          'aria-label': label,
          className: ['svitlo-theme-chrome', rootClassName].filter(Boolean).join(' '),
          sx: [
            { px: 2, minHeight: 64, bgcolor: 'background.paper' },
            ...sxArray(rootSx),
          ],
        },
        start: {
          ...leftProps,
          'data-testid': testId.slots.left,
          sx: [{ justifyContent: 'flex-start', gap: 1 }, ...sxArray(leftSx)],
        },
        center: {
          ...centerProps,
          'data-testid': testId.slots.center,
          sx: [{ justifyContent: 'center', gap: 1 }, ...sxArray(centerSx)],
        },
        end: {
          ...rightProps,
          'data-testid': testId.slots.right,
          sx: [{ justifyContent: 'flex-end', gap: 1 }, ...sxArray(rightSx)],
        },
      }}
    />
  );
}
