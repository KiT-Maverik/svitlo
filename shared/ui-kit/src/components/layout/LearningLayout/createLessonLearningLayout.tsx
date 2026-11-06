'use client';

import type { ElementType } from 'react';
import type { Locale } from '@svitlo/engine/localization';
import type { UiKit_Global } from '@svitlo/engine/content';
import LearningLayout, { type LearningLayoutProps } from './LearningLayout';
import NavbarPreferences from './NavbarPreferences/NavbarPreferences';
import { useColorScheme } from '@mui/material/styles';
import { useLessonNavigation } from '../../lesson/LessonNavigation';

export type LessonLearningLayoutProps = Pick<
  LearningLayoutProps,
  'children' | 'topics' | 'skippableSteps' | 'quizStep' | 'pathname' | 'contentLoading'
> & { messages: UiKit_Global<'response'> };

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
  }: LessonLearningLayoutProps) {
    const { locale, setLocale } = bindings.useLocale();
    const { progress, dispatch } = useLessonNavigation();
    const { mode, systemMode, setMode } = useColorScheme();

    return (
      <LearningLayout
        locale={locale}
        messages={messages.learningLayout}
        pathname={pathname}
        progress={progress}
        contentLoading={contentLoading}
        topics={topics}
        skippableSteps={skippableSteps}
        quizStep={quizStep}
        actions={{
          back: () => dispatch({ type: 'back' }),
          next: () => dispatch({ type: 'next' }),
          skip: () => dispatch({ type: 'skip' }),
        }}
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
        linkComponent={bindings.linkComponent}
      >
        {children}
      </LearningLayout>
    );
  }
  LessonLearningLayout.displayName = 'LessonLearningLayout';
  return LessonLearningLayout;
}
