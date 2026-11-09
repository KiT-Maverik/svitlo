import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/contracts/localization';
import { SkillAnalyticsPage } from '@/components/pages/SkillsMindMap/SkillAnalyticsPage';
import { loadUiKitMessages } from '@/lib/uiKit/loadUiKitMessages';
import { loadPublishedSkills } from '@/lib/skillResources';
import { textbook } from '@/generated/textbook';

export const metadata: Metadata = { title: `Аналітика навичок — ${textbook.title}` };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const domainSlugs = textbook.skillAnalyticsDomains;
  if (!domainSlugs?.length) notFound();
  const language = (await searchParams).lang ?? 'uk';
  const locale = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === language)?.locale;
  if (!locale) notFound();
  const [messages, domains] = await Promise.all([
    loadUiKitMessages(locale),
    loadPublishedSkills(language, domainSlugs),
  ]);
  return <SkillAnalyticsPage domains={domains} language={language} initialMessages={messages} />;
}
