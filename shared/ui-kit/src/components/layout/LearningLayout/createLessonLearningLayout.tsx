'use client';

import type { ElementType } from 'react';
import type { Locale } from '@svitlo/engine/localization';
import type { UiKit_Global } from '@svitlo/engine/content';
import LearningLayout, { type LearningLayoutProgress, type LearningLayoutProps } from './LearningLayout';
import NavbarPreferences from './NavbarPreferences/NavbarPreferences';

export type LessonLearningLayoutProps = Pick<
  LearningLayoutProps,
  'children' | 'topics' | 'skippableSteps' | 'quizStep'
> & { messages: UiKit_Global<'response'> };

export type LessonLearningLayoutBindings = {
  /** Supplied by the consuming app; the UI Kit never imports Next.js hooks. */
  usePathname: () => string;
  useLocale: () => { locale: Locale; setLocale: (locale: Locale) => void };
  useLessonProgress: () => {
    progress: LearningLayoutProgress;
    dispatch: (action: { type: 'back' | 'next' | 'skip' }) => void;
  };
  /** Resolve theme from the app's MUI provider instance, not the UI Kit bundle. */
  useColorScheme: () => {
    mode?: 'light' | 'dark' | 'system';
    systemMode?: 'light' | 'dark';
    setMode: (mode: 'light' | 'dark') => void;
  };
  linkComponent?: ElementType;
};

/** Bind app-owned hooks once, without duplicating layout and navigation logic. */
export function createLessonLearningLayout(bindings: LessonLearningLayoutBindings) {
  function LessonLearningLayout({ children, topics, skippableSteps, quizStep, messages }: LessonLearningLayoutProps) {
    const { locale, setLocale } = bindings.useLocale();
    const pathname = bindings.usePathname();
    const { progress, dispatch } = bindings.useLessonProgress();
    const { mode, systemMode, setMode } = bindings.useColorScheme();

    return (
      <LearningLayout
        locale={locale}
        messages={messages.learningLayout}
        pathname={pathname}
        progress={progress}
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
