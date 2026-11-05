import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Container } from '@mui/material';
import { SkillLearningClient } from '@/components/pages/SkillsMindMap/SkillLearningClient';
import { textbook } from '@/generated/textbook';

export const metadata: Metadata = { title: `Прокачати навичку — ${textbook.title}` };

export default function SkillLearningPage({ params }: { params: Promise<{ skillId: string }> }) {
  return (
    <Suspense fallback={<Container component="main" maxWidth="md" sx={{ py: { xs: 2, md: 4 } }} />}>
      <SkillLearningContent params={params} />
    </Suspense>
  );
}

async function SkillLearningContent({ params }: { params: Promise<{ skillId: string }> }) {
  const { skillId } = await params;
  return (
    <Container component="main" maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <Box sx={{ fontSize: 14, mb: 2 }}>
        <Link href="/skillAnalytics">← Аналітика навичок</Link>
      </Box>
      <SkillLearningClient skillId={skillId} domainSlugs={textbook.skillAnalyticsDomains} />
    </Container>
  );
}
