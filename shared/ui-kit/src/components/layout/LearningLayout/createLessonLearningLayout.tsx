'use client';

import type { UiKitMessages } from '#types/uiKitMessages';

import { useMemo, type ElementType } from 'react';
import type { Locale } from '@svitlo/engine/localization';
import LearningLayout, { type LearningLayoutProps } from './LearningLayout';
import NavbarPreferences from './NavbarPreferences/NavbarPreferences';
import { useColorScheme } from '@mui/material/styles';

export type LessonLearningLayoutProps = Pick<
  LearningLayoutProps,
  | 'children'
  | 'topics'
  | 'skippableSteps'
  | 'quizStep'
  | 'pathname'
  | 'contentLoading'
  | 'contentError'
  | 'onRetryContent'
  | 'progress'
  | 'actions'
  | 'renderTopBar'
  | 'renderBottomBar'
> & { messages: UiKitMessages };

export type LessonLearningLayoutBindings = {
  /** Supplied by the consuming app; the UI Kit never imports Next.js hooks. */
  useLocale: () => { locale: Locale; setLocale: (locale: Locale) => void };
  linkComponent?: ElementType;
};

/** Bind app-owned hooks once, without duplicating layout and navigation logic. */
export function createLessonLearningLayout(bindings: LessonLearningLayoutBindings) {
  function LessonLearningLayout({
    children,
    topics,
    skippableSteps,
    quizStep,
    pathname,
    messages,
    contentLoading,
    contentError,
    onRetryContent,
    progress,
    actions,
    renderTopBar,
    renderBottomBar,
  }: LessonLearningLayoutProps) {
    const { locale, setLocale } = bindings.useLocale();
    const { mode, systemMode, setMode } = useColorScheme();

    const preferences = useMemo(
      () => (
        <NavbarPreferences
          messages={messages.navbarPreferences}
          locale={locale}
          onLocaleChange={setLocale}
          mode={mode}
          systemMode={systemMode}
          onThemeChange={setMode}
        />
      ),
      [messages.navbarPreferences, locale, setLocale, mode, systemMode, setMode],
    );
    return (
      <LearningLayout
        locale={locale}
        messages={messages.learningLayout}
        pathname={pathname}
        progress={progress}
        contentLoading={contentLoading}
        contentError={contentError}
        onRetryContent={onRetryContent}
        topics={topics}
        skippableSteps={skippableSteps}
        quizStep={quizStep}
        actions={actions}
        renderTopBar={renderTopBar}
        renderBottomBar={renderBottomBar}
        preferences={preferences}
        linkComponent={bindings.linkComponent}
      >
        {children}
      </LearningLayout>
    );
  }
  LessonLearningLayout.displayName = 'LessonLearningLayout';
  return LessonLearningLayout;
}
