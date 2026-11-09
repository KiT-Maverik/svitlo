'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { SkillNode } from './skillsMindMap.utils';
import {
  type UiKitMessages,
  useSvitloColorScheme,
  LearningLayout,
  NavbarPreferences,
  ThemeSwitch,
} from '@svitlo/ui-kit';
import Link from 'next/link';
import { Box, Container } from '@mui/material';
import { SkillsMindMap } from './SkillsMindMap';
import { SkillsPagePreferences } from './SkillsPagePreferences';
import { SkillsPageSettingsProvider, useSkillsPageSettings } from './SkillsPageSettingsContext';
import { textbook } from '@/generated/textbook';

const idleProgress = {
  ready: false,
  step: 0,
  lastStep: 0,
  testDone: false,
  skipped: [] as readonly string[],
} as const;
const unusedActions = { back: () => {}, next: () => {}, skip: () => {} };

function SkillAnalyticsContent({
  domains,
  initialMessages,
}: {
  domains: readonly SkillNode[];
  initialMessages: UiKitMessages;
}) {
  const { locale, setLocale, ready, localeError } = useSkillsPageSettings();
  const { mode, systemMode, setMode } = useSvitloColorScheme();
  const messages = initialMessages;

  // The page-scoped provider owns page preferences and locale, while
  // the existing LearningLayout owns the navbar and right settings drawer.
  return (
    <LearningLayout
      messages={messages.learningLayout}
      locale={locale}
      pathname="/skillAnalytics"
      progress={idleProgress}
      actions={unusedActions}
      topics={[{ id: 'skillAnalytics', title: 'Аналітика навичок', href: '/skillAnalytics' }]}
      linkComponent={Link}
      themeControl={
        <ThemeSwitch
          label={messages.navbarPreferences.theme.dark}
          mode={mode}
          systemMode={systemMode}
          onThemeChange={setMode}
        />
      }
      showBottomNavbar={false}
      preferences={
        <NavbarPreferences messages={messages.navbarPreferences} locale={locale} onLocaleChange={setLocale} />
      }
      settingsContent={({ closeSettings }) => <SkillsPagePreferences onFitToScreen={closeSettings} />}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1480px', py: { xs: 2, sm: 4 }, px: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 2, fontSize: 14 }}>
          <Link href="/">← {textbook.title}</Link>
        </Box>
        {ready && (localeError ? <Box role="alert">{localeError}</Box> : <SkillsMindMap domains={domains} />)}
      </Container>
    </LearningLayout>
  );
}

export function SkillAnalyticsPage({
  domains,
  language,
  initialMessages,
}: {
  domains: readonly SkillNode[];
  language: string;
  initialMessages: UiKitMessages;
}) {
  const router = useRouter();
  const onLanguageChange = useCallback(
    (next: string) => router.replace('/skillAnalytics?lang=' + encodeURIComponent(next), { scroll: false }),
    [router],
  );
  return (
    <SkillsPageSettingsProvider initialLanguage={language} onLanguageChange={onLanguageChange}>
      <SkillAnalyticsContent domains={domains} initialMessages={initialMessages} />
    </SkillsPageSettingsProvider>
  );
}
