import type { Metadata } from 'next';
import { SkillAnalyticsPage } from '@/components/pages/SkillsMindMap/SkillAnalyticsPage';
import { loadUiKitMessages } from '@/lib/uiKit/loadUiKitMessages';

export const metadata: Metadata = { title: 'Аналітика навичок — Світло Playground' };

export default async function Page() {
  const initialMessages = await loadUiKitMessages('uk-UA');
  return <SkillAnalyticsPage initialMessages={initialMessages} />;
}
