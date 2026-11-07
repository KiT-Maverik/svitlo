import type { SlideProps } from '@mui/material/Slide';

// Drawer uses Slide by default, but its transition slot omits Slide's direction prop.
declare module '@mui/material/Drawer' {
  interface DrawerTransitionSlotPropsOverrides {
    direction?: SlideProps['direction'];
  }
}
