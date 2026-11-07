import Navbar, { type NavbarProps } from './Navbar';

export default function BottomNavbar(props: NavbarProps) {
  const sx = props.slotProps?.root?.sx ?? [];
  return (
    <Navbar
      {...props}
      slotProps={{
        ...props.slotProps,
        root: {
          ...props.slotProps?.root,
          sx: [
            {
              borderTop: 1,
              borderColor: 'divider',
              pb: 'env(safe-area-inset-bottom)',
              // MUI Button normally transitions its foreground color separately from the
              // background, which briefly hides disabled Back/Skip text on theme changes.
              '& .MuiButton-root': {
                transitionProperty: 'box-shadow',
                transitionDuration: '150ms',
              },
              '@media (prefers-reduced-motion: reduce)': {
                '& .MuiButton-root': { transition: 'none' },
              },
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ],
        },
      }}
    />
  );
}
