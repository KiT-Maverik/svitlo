import type { ReactNode } from 'react';
import Box, { type BoxProps } from '@mui/material/Box';
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

export default function Navbar({ slots = {}, slotProps = {}, 'aria-label': label }: NavbarProps) {
  const { sx: rootSx = [], className: rootClassName, ...rootProps } = slotProps.root ?? {};
  return (
    <Box
      {...rootProps}
      component="nav"
      aria-label={label}
      className={['svitlo-theme-chrome', rootClassName].filter(Boolean).join(' ')}
      sx={[
        {
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
          alignItems: 'center',
          gap: 1,
          px: 2,
          minHeight: 64,
          bgcolor: 'background.paper',
          userSelect: 'none',
        },
        ...(Array.isArray(rootSx) ? rootSx : [rootSx]),
      ]}
    >
      {(['left', 'center', 'right'] as const).map(section => {
        const { sx = [], ...props } = slotProps[section] ?? {};
        return (
          <Box
            key={section}
            data-testid={testId.slots[section]}
            {...props}
            sx={[
              {
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                minWidth: 0,
                justifyContent: section === 'left' ? 'flex-start' : section === 'right' ? 'flex-end' : 'center',
              },
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
          >
            {slots[section]}
          </Box>
        );
      })}
    </Box>
  );
}
