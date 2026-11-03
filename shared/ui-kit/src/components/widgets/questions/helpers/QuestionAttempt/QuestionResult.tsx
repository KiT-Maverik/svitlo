'use client';

import { Box, Fade, Paper } from '@mui/material';
import { Markdown } from '../../../ContentBlockRenderer/blocks/Markdown/Markdown';
import { uk } from '../../messages';
export function QuestionResult({
  explanation,
  visible,
  onClose,
}: {
  explanation: string;
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <Box
      role="status"
      aria-label={uk.checkResult}
      aria-live="polite"
      aria-atomic="true"
      sx={{ maxWidth: '100%', textAlign: 'center' }}
    >
      <Fade in={visible} timeout={220} mountOnEnter unmountOnExit>
        <Box
          onClick={onClose}
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            p: { xs: 1, sm: 2 },
            bgcolor: 'background.paper',
          }}
        >
          <Paper
            elevation={0}
            onClick={event => event.stopPropagation()}
            sx={{
              width: '100%',
              maxWidth: 720,
              minWidth: 0,
              maxHeight: '100%',
              overflowY: 'auto',
              p: { xs: 2, sm: 3 },
              textAlign: 'start',
              border: 0,
              boxShadow: 'none',
              bgcolor: 'background.paper',
            }}
          >
            <Markdown id="question-result-explanation" type="markdown" locale={{ code: "uk" }} text={explanation} />
          </Paper>
        </Box>
      </Fade>
    </Box>
  );
}
