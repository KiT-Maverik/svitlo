import type { Preview } from '@storybook/nextjs-vite';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const preview: Preview = {
  decorators: [
    Story => (
      <>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', p: { xs: 2, sm: 4 }, bgcolor: 'background.default' }}>
          <Story />
        </Box>
      </>
    ),
  ],
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
    docs: { autodocs: 'tag' },
  },
};

export default preview;
