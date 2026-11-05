import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getLocaleDirection, type Locale } from '@svitlo/engine/localization';
import type { LessonResponse } from '@svitlo/engine/lesson';
import type { UiKit_Global } from '@svitlo/ui-kit';
import { Lesson } from '@svitlo/ui-kit/lesson';
import { createLessonLearningLayout } from '@svitlo/ui-kit/learning-layout';
import { SceneLocaleProvider } from '@svitlo/ui-kit/scene-locale';
import { resolveScene } from '@svitlo/playground/scenes';
import { loadPublishedLesson, loadPublishedUiKitMessages } from '@svitlo/adapter-electron';
import { changeLessonLocale, initialLessonRoute, lessonHref, type LessonRoute } from './routing';

const themes = {
  ltr: createTheme({ cssVariables: { colorSchemeSelector: 'data' }, colorSchemes: { light: true, dark: true }, direction: 'ltr' }),
  rtl: createTheme({ cssVariables: { colorSchemeSelector: 'data' }, colorSchemes: { light: true, dark: true }, direction: 'rtl' }),
};

type RouteContextValue = { locale: Locale; setLocale: (locale: Locale) => void };
const RouteContext = createContext<RouteContextValue | null>(null);

function useDesktopLocale(): RouteContextValue {
  const value = useContext(RouteContext);
  if (!value) throw new Error('Lesson route provider is missing');
  return value;
}

/** Exactly the same reusable Lesson UI/layout as Web, with only host-specific locale routing. */
const LessonLayout = createLessonLearningLayout({ useLocale: useDesktopLocale });

type DataState =
  | { status: 'loading' }
  | { status: 'ready'; response: LessonResponse; messages: UiKit_Global<'response'> }
  | { status: 'error'; error: string };

function readRoute(): LessonRoute | null {
  return initialLessonRoute(window.location.pathname);
}

export default function App() {
  const [route, setRoute] = useState<LessonRoute | null>(readRoute);
  const [data, setData] = useState<DataState>({ status: 'loading' });

  useEffect(() => {
    if (route && window.location.pathname !== lessonHref(route)) {
      window.history.replaceState(null, '', lessonHref(route));
    }
  }, [route]);

  useEffect(() => {
    const onPopState = () => setRoute(readRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!route) return;
    let active = true;
    setData({ status: 'loading' });
    Promise.all([
      loadPublishedLesson(route.lessonId, route.language),
      loadPublishedUiKitMessages<UiKit_Global<'response'>>(route.locale),
    ]).then(
      ([response, messages]) => {
        if (active) setData({ status: 'ready', response, messages });
      },
      error => {
        if (active) setData({ status: 'error', error: String(error) });
      },
    );
    return () => { active = false; };
  }, [route?.language, route?.locale, route?.lessonId]);

  const bindings = useMemo<RouteContextValue | null>(() => route && ({
    locale: route.locale,
    setLocale: (locale: Locale) => {
      const next = changeLessonLocale(route, locale);
      window.history.replaceState(null, '', lessonHref(next));
      setRoute(next);
    },
  }), [route]);

  const direction = route ? getLocaleDirection(route.locale) : 'ltr';
  useEffect(() => {
    document.documentElement.lang = route?.locale ?? 'uk-UA';
    document.documentElement.dir = direction;
  }, [route?.locale, direction]);

  return (
    <ThemeProvider theme={themes[direction]}>
      <CssBaseline />
      {!route ? (
        <main role="alert" className="desktop-message">
          <h1>Unsupported lesson route</h1>
          <a href="/">Open Playground</a>
        </main>
      ) : data.status === 'loading' ? (
        <main role="status" aria-busy="true" className="desktop-message">Loading lesson…</main>
      ) : data.status === 'error' ? (
        <main role="alert" className="desktop-message">
          <h1>Could not open the packaged lesson</h1>
          <p>{data.error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </main>
      ) : (
        <RouteContext.Provider value={bindings!}>
          <SceneLocaleProvider locale={route.locale}>
            <Lesson
              key={lessonHref(route)}
              response={data.response}
              href={lessonHref(route)}
              messages={data.messages}
              layout={LessonLayout}
              sceneRegistry={resolveScene}
            />
          </SceneLocaleProvider>
        </RouteContext.Provider>
      )}
    </ThemeProvider>
  );
}
