import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';

import { SkillAnalyticsPage } from '@/components/pages/SkillsMindMap/SkillAnalyticsPage';
import { textbook } from '@/generated/textbook';
import { loadPublishedSkills } from '@/lib/skillResources';
import { loadUiKitMessages } from '@/lib/uiKit/loadUiKitMessages';

export const metadata: Metadata = { title: `Аналітика навичок — ${textbook.title}` };

type Props = { searchParams: Promise<{ lang?: string }> };

export default function Page(props: Props) {
  return (
    <Suspense
      fallback={
        <main role="status" aria-busy="true">
          Завантаження навичок…
        </main>
      }
    >
      <SkillAnalyticsServerContent {...props} />
    </Suspense>
  );
}

async function SkillAnalyticsServerContent({ searchParams }: Props) {
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
