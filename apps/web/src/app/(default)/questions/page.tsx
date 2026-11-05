import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, Stack } from '@mui/material';
import { QuestionsDemo } from '@/components/pages/QuestionsDemo/QuestionsDemo';
import { loadUiKitMessages } from '@/lib/uiKit/loadUiKitMessages';
import { questionsDemo } from '@/generated/textbookDemo';

export const metadata: Metadata = { title: 'Інтерактивні запитання — Світло' };

export default async function QuestionsPage() {
  // Only textbooks that explicitly export example questions expose this demo route.
  if (!questionsDemo) notFound();
  const messages = await loadUiKitMessages('uk-UA');
  return (
    <Container component="main" maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Stack spacing={3}>
        <Link href="/">← Світло</Link>
        <QuestionsDemo questions={questionsDemo} messages={messages} />
      </Stack>
    </Container>
  );
}
