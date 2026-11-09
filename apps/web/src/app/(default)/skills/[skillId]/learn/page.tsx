import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Box, Container } from '@mui/material';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/contracts/localization';
import { SkillLearningClient } from '@/components/pages/SkillsMindMap/SkillLearningClient';
import { flattenSkillNodes } from '@/components/pages/SkillsMindMap/skillsMindMap.utils';
import { loadPublishedSkills } from '@/lib/skillResources';
import { textbook } from '@/generated/textbook';

export const metadata: Metadata = { title: `Прокачати навичку — ${textbook.title}` };

type Props = {
  params: Promise<{ skillId: string }>;
  searchParams: Promise<{ lang?: string }>;
};
export default function SkillLearningPage(props: Props) {
  return (
    <Suspense fallback={<Container component="main" maxWidth="md" sx={{ py: { xs: 2, md: 4 } }} />}>
      <SkillLearningContent {...props} />
    </Suspense>
  );
}
async function SkillLearningContent({ params, searchParams }: Props) {
  const { skillId } = await params;
  const domainSlugs = textbook.skillAnalyticsDomains;
  if (!domainSlugs?.length) notFound();
  const language = (await searchParams).lang ?? 'uk';
  if (!DEFAULT_SUPPORTED_LANGUAGES.some(item => item.language === language)) notFound();
  const domains = await loadPublishedSkills(language, domainSlugs);
  const node = flattenSkillNodes(domains).find(item => item.kind === 'skill' && item.id === skillId) ?? null;
  return (
    <Container component="main" maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <Box sx={{ fontSize: 14, mb: 2 }}>
        <Link href="/skillAnalytics">← Аналітика навичок</Link>
      </Box>
      <SkillLearningClient node={node} language={language} />
    </Container>
  );
}
