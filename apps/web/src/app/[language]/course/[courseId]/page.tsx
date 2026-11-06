import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { flattenCourseToc, loadCourseToc } from '@/lib/courseResources';

type Props = { params: Promise<{ language: string; courseId: string }> };

async function Content({ params }: Props) {
  const { language, courseId } = await params;
  const descriptor = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  if (!descriptor) notFound();
  let toc;
  try { toc = await loadCourseToc(courseId, descriptor.language); }
  catch { notFound(); }
  const entries = flattenCourseToc(toc, language);
  return (
    <Container component="main" maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2 }}>{toc.title}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Playground Course · Modules, Chapters, Episodes and Lessons
      </Typography>
      <Stack spacing={1} component="nav" aria-label="Course table of contents">
        {entries.map(item => (
          <Box key={item.id} id={item.id} sx={{ pl: item.depth * 3 }}>
            <Button component={Link} href={item.href} variant="text" sx={{ justifyContent: 'flex-start', textAlign: 'start' }}>
              {item.title}
            </Button>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
export default function CoursePage(props: Props) {
  return <Suspense fallback={<div role="status" aria-busy="true">Loading course…</div>}><Content {...props} /></Suspense>;
}
