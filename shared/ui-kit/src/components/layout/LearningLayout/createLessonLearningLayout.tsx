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
  | 'pathname'
  | 'contentLoading'
  | 'contentError'
  | 'onRetryContent'
  | 'progress'
  | 'actions'
  | 'renderTopBar'
  | 'renderBottomBar'
  | 'renderEventHost'
  | 'profile'
  | 'profiles'
  | 'onProfileChange'
  | 'onLogout'
  | 'profileSettingsHref'
  | 'settingsContent'
> & { messages: UiKitMessages };

export type LessonLearningLayoutBindings = {
  /** Supplied by the consuming app; the UI Kit never imports Next.js hooks. */
  useLocale: () => {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    lessonLocale?: Locale;
    setLessonLocale?: (locale: Locale) => void;
  };
  linkComponent?: ElementType;
};

/** Bind app-owned hooks once, without duplicating layout and navigation logic. */
export function createLessonLearningLayout(bindings: LessonLearningLayoutBindings) {
  function LessonLearningLayout({
    children,
    topics,
    skippableSteps,
    pathname,
    messages,
    contentLoading,
    contentError,
    onRetryContent,
    progress,
    actions,
    renderTopBar,
    renderBottomBar,
    renderEventHost,
    profile,
    profiles,
    onProfileChange,
    onLogout,
    profileSettingsHref,
    settingsContent,
  }: LessonLearningLayoutProps) {
    const { locale, setLocale, lessonLocale, setLessonLocale } = bindings.useLocale();
    const { mode, systemMode, setMode } = useColorScheme();

    const preferences = useMemo(
      () => (
        <NavbarPreferences
          messages={messages.navbarPreferences}
          locale={locale}
          onLocaleChange={setLocale}
          lessonLocale={lessonLocale}
          onLessonLocaleChange={setLessonLocale}
          mode={mode}
          systemMode={systemMode}
          onThemeChange={setMode}
        />
      ),
      [messages.navbarPreferences, locale, setLocale, lessonLocale, setLessonLocale, mode, systemMode, setMode],
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
        actions={actions}
        renderTopBar={renderTopBar}
        renderBottomBar={renderBottomBar}
        renderEventHost={renderEventHost}
        preferences={preferences}
        profile={profile}
        profiles={profiles}
        onProfileChange={onProfileChange}
        onLogout={onLogout}
        profileSettingsHref={profileSettingsHref}
        settingsContent={settingsContent}
        linkComponent={bindings.linkComponent}
      >
        {children}
      </LearningLayout>
    );
  }
  LessonLearningLayout.displayName = 'LessonLearningLayout';
  return LessonLearningLayout;
}
