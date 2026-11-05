import { Box, Button, Container, Stack, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container component="main" maxWidth="md" sx={{ py: { xs: 4, sm: 8 } }}>
      <Stack spacing={4}>
        <Box>
          <Typography component="h1" variant="h2" sx={{ fontWeight: 800 }}>
            Світло · Playground
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Перевіряйте універсальні навчальні компоненти, навігацію та інтерактивні запитання.
          </Typography>
        </Box>
        <Stack direction="row" sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" href="/uk/lesson/d3048d21-8690-5255-b62c-984c69ac272c">
            Відкрити урок «Як рухається світло»
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
