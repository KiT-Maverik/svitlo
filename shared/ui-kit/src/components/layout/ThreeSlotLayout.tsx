import type { ElementType, ReactNode } from 'react';
import Box, { type BoxProps } from '@mui/material/Box';
import { testId } from './ThreeSlotLayout.constants';

export type ThreeSlotAxis = 'horizontal' | 'vertical';
export type ThreeSlotName = 'start' | 'center' | 'end';
export type ThreeSlotZoneProps = Omit<BoxProps, 'children' | 'component'>;

export type ThreeSlotLayoutProps = {
  /** Uses logical start/end: horizontal order mirrors automatically under dir="rtl". */
  axis: ThreeSlotAxis;
  slots: { start?: ReactNode; center?: ReactNode; end?: ReactNode };
  slotProps?: { root?: ThreeSlotZoneProps } & Partial<Record<ThreeSlotName, ThreeSlotZoneProps>>;
  /** A semantic element for the grid root, such as nav, aside or div. */
  component?: ElementType;
  /** MUI spacing units. Defaults to no imposed space between slots. */
  gap?: number;
  /** Reserve empty edge slots if a consumer requires stable containers. */
  keepEmptySlots?: boolean;
};

/**
 * Single source of truth for three-zone layout in both axes.
 *
 * Edge tracks are content-sized. The center track gets all remaining space.
 * Slots never create a scroll container: a consumer can scroll an outer
 * boundary if content cannot physically fit in the available viewport.
 * slotProps.center.sx can set justifyContent / alignItems independently.
 */
export default function ThreeSlotLayout({
  axis,
  slots,
  slotProps = {},
  component = 'div',
  gap = 0,
  keepEmptySlots = false,
}: ThreeSlotLayoutProps) {
  const hasStart = keepEmptySlots || slots.start != null;
  const hasEnd = keepEmptySlots || slots.end != null;
  const tracks = [hasStart ? 'auto' : '', 'minmax(0, 1fr)', hasEnd ? 'auto' : ''].filter(Boolean).join(' ');
  const { sx: rootSx = [], ...rootProps } = slotProps.root ?? {};
  const vertical = axis === 'vertical';

  return (
    <Box
      component={component}
      data-testid={testId.container}
      data-axis={axis}
      {...rootProps}
      sx={[
        {
          display: 'grid',
          gridTemplateRows: vertical ? tracks : 'minmax(0, 1fr)',
          gridTemplateColumns: vertical ? 'minmax(0, 1fr)' : tracks,
          width: '100%',
          height: vertical ? '100%' : undefined,
          minWidth: 0,
          minHeight: 0,
          boxSizing: 'border-box',
          gap,
        },
        ...(Array.isArray(rootSx) ? rootSx : [rootSx]),
      ]}
    >
      {(['start', 'center', 'end'] as const).map(name => {
        if (name === 'start' && !hasStart) return null;
        if (name === 'end' && !hasEnd) return null;
        const { sx = [], ...props } = slotProps[name] ?? {};
        return (
          <Box
            key={name}
            data-testid={testId.slots[name]}
            {...props}
            sx={[
              {
                display: 'flex',
                flexDirection: vertical ? 'column' : 'row',
                alignItems: vertical ? 'stretch' : 'center',
                justifyContent: vertical ? 'flex-start' : name === 'center' ? 'center' : 'flex-start',
                minWidth: 0,
                minHeight: 0,
                maxWidth: '100%',
                boxSizing: 'border-box',
              },
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
          >
            {slots[name]}
          </Box>
        );
      })}
    </Box>
  );
}
