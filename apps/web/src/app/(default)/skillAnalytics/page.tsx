import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SkillAnalyticsPage } from '@/components/pages/SkillsMindMap/SkillAnalyticsPage';
import { loadUiKitMessages } from '@/lib/uiKit/loadUiKitMessages';
import { textbook } from '@/generated/textbook';

export const metadata: Metadata = { title: `Аналітика навичок — ${textbook.title}` };

export default async function Page() {
  const domainSlugs = textbook.skillAnalyticsDomains;
  if (!domainSlugs?.length) notFound();
  const initialMessages = await loadUiKitMessages('uk-UA');
  return <SkillAnalyticsPage domainSlugs={domainSlugs} initialMessages={initialMessages} />;
}
