import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/contracts/localization';
import { Container, Stack, Typography } from '@mui/material';
import { geographyHomeCopy } from '@/i18n/homeCopy';

type Props = { params: Promise<{ locale: string }> };
async function getCopy(params: Props['params']) {
  const { locale } = await params;
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === locale);
  if (!language) notFound();
  return geographyHomeCopy[language.language];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [title, description] = await getCopy(params);
  return { title, description };
}
export default async function LocaleHomePage({ params }: Props) {
  const [title, description] = await getCopy(params);
  return (
    <Container component="main" maxWidth="md" sx={{ py: { xs: 5, sm: 10 } }}>
      <Stack spacing={3}>
        <Typography component="h1" variant="h2" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Stack>
    </Container>
  );
}
