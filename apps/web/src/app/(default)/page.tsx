import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { textbook } from '@/generated/textbook';

export default function Home() {
  return (
    <Container component="main" maxWidth="md" sx={{ py: { xs: 4, sm: 8 } }}>
      <Stack spacing={4}>
        <Box>
          <Typography component="h1" variant="h2" sx={{ fontWeight: 800 }}>
            {textbook.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Перевіряйте універсальні навчальні компоненти, навігацію та інтерактивні запитання.
          </Typography>
        </Box>
        <Stack direction="row" sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" href={`/uk/lesson/${textbook.featuredLessonId}`}>
            {textbook.featuredLessonLabel}
          </Button>
          <Button variant="outlined" href="/questions">
            Інтерактивні запитання
          </Button>
          <Button variant="contained" color="secondary" href="/skillAnalytics">
            Аналітика навичок
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
