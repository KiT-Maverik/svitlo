'use client';

import type { UiKitMessages } from '#types/uiKitMessages';

import { useMemo, type ElementType } from 'react';
import type { Locale } from '@svitlo/contracts/localization';
import LearningLayout, { type LearningLayoutProps } from './LearningLayout';
import NavbarPreferences from './NavbarPreferences/NavbarPreferences';
import ThemeSwitch from './NavbarPreferences/ThemeSwitch';
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
> & { messages: UiKitMessages; supportedLessonLanguages?: readonly Locale[] };

export type LessonLearningLayoutBindings = {
  /** Supplied by the consuming app; the UI Kit never imports Next.js hooks. */
  useLocale: () => {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    lessonLocale?: Locale;
    setLessonLocale?: (locale: Locale) => void;
  };
  linkComponent?: ElementType;
  /** Host-provided hook must resolve the same MUI context instance as its ThemeProvider. */
  useColorScheme?: () => {
    mode: 'light' | 'dark' | 'system' | undefined;
    systemMode: 'light' | 'dark' | undefined;
    setMode: (mode: 'light' | 'dark') => void;
  };
};

/** Bind app-owned hooks once, without duplicating layout and navigation logic. */
export function createLessonLearningLayout(bindings: LessonLearningLayoutBindings) {
  const useBoundColorScheme = bindings.useColorScheme ?? useColorScheme;

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
    supportedLessonLanguages,
  }: LessonLearningLayoutProps) {
    const { locale, setLocale, lessonLocale, setLessonLocale } = bindings.useLocale();
    const { mode, systemMode, setMode } = useBoundColorScheme();
    const volumeControl = typeof settingsContent === 'function' ? undefined : settingsContent;

    const preferences = useMemo(
      () => (
        <NavbarPreferences
          messages={messages.navbarPreferences}
          locale={locale}
          onLocaleChange={setLocale}
          lessonLocale={lessonLocale}
          lessonLanguages={supportedLessonLanguages}
          onLessonLocaleChange={setLessonLocale}
          volumeControl={volumeControl}
        />
      ),
      [
        messages.navbarPreferences,
        locale,
        setLocale,
        lessonLocale,
        supportedLessonLanguages,
        setLessonLocale,
        volumeControl,
      ],
    );
    const themeControl = (
      <ThemeSwitch
        label={messages.navbarPreferences.theme.dark}
        mode={mode}
        systemMode={systemMode}
        onThemeChange={setMode}
      />
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
        themeControl={themeControl}
        profile={profile}
        profiles={profiles}
        onProfileChange={onProfileChange}
        onLogout={onLogout}
        profileSettingsHref={profileSettingsHref}
        settingsContent={typeof settingsContent === 'function' ? settingsContent : undefined}
        linkComponent={bindings.linkComponent}
      >
        {children}
      </LearningLayout>
    );
  }
  LessonLearningLayout.displayName = 'LessonLearningLayout';
  return LessonLearningLayout;
}
