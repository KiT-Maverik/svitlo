'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@svitlo/engine/localization';
import type { UiKitMessages } from '@svitlo/ui-kit';
import Link from 'next/link';
import { Box, Container } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { LearningLayout, NavbarPreferences } from '@svitlo/ui-kit/learning-layout';
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
  domainSlugs,
  initialMessages,
}: {
  domainSlugs: readonly string[];
  initialMessages: UiKitMessages;
}) {
  const { locale, setLocale, ready, localeError } = useSkillsPageSettings();
  const { mode, systemMode, setMode } = useColorScheme();
  const [resource, setResource] = useState<{ locale: Locale; messages: UiKitMessages }>(() => ({
    locale: 'uk-UA',
    messages: initialMessages,
  }));
  const [resourceError, setResourceError] = useState<{ locale: Locale; message: string } | null>(null);

  useEffect(() => {
    if (resource.locale === locale) return;
    const controller = new AbortController();
    void fetch('/data/ui-kit/' + encodeURIComponent(locale) + '.json', { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json() as Promise<UiKitMessages>;
      })
      .then(messages => {
        if (!controller.signal.aborted) {
          setResource({ locale, messages });
          setResourceError(null);
        }
      })
      .catch(error => {
        if (!controller.signal.aborted)
          setResourceError({ locale, message: error instanceof Error ? error.message : String(error) });
      });
    return () => controller.abort();
  }, [locale, resource.locale]);

  if (resource.locale !== locale) {
    const currentError = resourceError?.locale === locale ? resourceError.message : null;
    return (
      <Box role={currentError ? 'alert' : 'status'} aria-busy={!currentError}>
        {currentError ? 'Не вдалося завантажити переклад інтерфейсу: ' + currentError : 'Завантаження інтерфейсу…'}
      </Box>
    );
  }
  const messages = resource.messages;

  // The page-scoped provider owns the switches and the active locale, while
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
      showBottomNavbar={false}
      preferences={
        <NavbarPreferences
          messages={messages.navbarPreferences}
          locale={locale}
          onLocaleChange={setLocale}
          mode={mode}
          systemMode={systemMode}
          onThemeChange={setMode}
        />
      }
      settingsContent={({ closeSettings }) => <SkillsPagePreferences onFitToScreen={closeSettings} />}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1480px', py: { xs: 2, sm: 4 }, px: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 2, fontSize: 14 }}>
          <Link href="/">← {textbook.title}</Link>
        </Box>
        {ready && (localeError ? <Box role="alert">{localeError}</Box> : <SkillsMindMap domainSlugs={domainSlugs} />)}
      </Container>
    </LearningLayout>
  );
}

export function SkillAnalyticsPage({
  domainSlugs,
  initialMessages,
}: {
  domainSlugs: readonly string[];
  initialMessages: UiKitMessages;
}) {
  return (
    <SkillsPageSettingsProvider>
      <SkillAnalyticsContent domainSlugs={domainSlugs} initialMessages={initialMessages} />
    </SkillsPageSettingsProvider>
  );
}
