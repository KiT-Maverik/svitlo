import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from 'react';
import { CssBaseline, Button, Container, Typography, CircularProgress, Box, List, ListItemButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DEFAULT_SUPPORTED_LANGUAGES, getLocaleDirection, type Locale } from '@svitlo/engine/localization';
import { Lesson, useLessonNavigation } from '@svitlo/ui-kit/lesson';
import { SceneLocaleProvider } from '@svitlo/ui-kit/scene-locale';
import { createLessonLearningLayout, type LessonLearningLayoutProps } from '@svitlo/ui-kit/learning-layout';
import { registerNativeBackButton, exitNativeApp } from '@svitlo/adapter-capacitor';
import type { LessonResponse } from '@svitlo/engine/lesson';
import type { UiKitMessages } from '@svitlo/ui-kit';
import { textbook, resolveScene } from './generated/textbook';
import { loadLesson, loadLessonIndex, loadMessages, type LessonIndex } from './loadLesson';
import { defaultLanguage, languageForLocale, lessonHref, localeForLanguage, parseRoute } from './routes';

type LocaleBinding = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  lessonLocale: Locale;
  setLessonLocale: (locale: Locale) => void;
};
const LocaleContext = createContext<LocaleBinding | null>(null);
function useLocaleBinding(): LocaleBinding {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('Missing mobile locale context');
  return value;
}
export function navigate(path: string, replace = false) {
  if (replace) window.history.replaceState(null, '', path);
  else window.history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
const MobileLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function MobileLink(
  { onClick, href, ...props },
  ref,
) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      !event.defaultPrevented &&
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.shiftKey &&
      href?.startsWith('/')
    ) {
      event.preventDefault();
      navigate(href);
    }
  };
  return <a {...props} href={href} ref={ref} onClick={handleClick} />;
});
const MobileLessonLayout = createLessonLearningLayout({ useLocale: useLocaleBinding, linkComponent: MobileLink });
function PersistingLessonLayout(props: LessonLearningLayoutProps) {
  const { progress, dispatch } = useLessonNavigation();
  const [restored, setRestored] = useState(false);
  const key = 'svitlo:mobile:lesson:' + props.topics[0]?.id;
  useEffect(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        const saved: unknown = JSON.parse(value);
        if (saved && typeof saved === 'object') {
          const data = saved as { step?: unknown; testDone?: unknown };
          if (
            typeof data.step === 'number' &&
            Number.isInteger(data.step) &&
            data.step >= 0 &&
            data.step <= progress.lastStep
          ) {
            dispatch({ type: 'restore', step: data.step, testDone: data.testDone === true });
          } else if (data.testDone === true) {
            dispatch({ type: 'testDone' });
          }
        }
      }
    } catch {
      /* Storage may be disabled by the host; learning remains available. */
    }
    setRestored(true);
  }, [key, dispatch, progress.lastStep]);
  useEffect(() => {
    if (!restored) return;
    try {
      localStorage.setItem(key, JSON.stringify({ step: progress.step, testDone: progress.testDone }));
    } catch {
      /* Non-fatal local persistence failure. */
    }
  }, [key, progress.step, progress.testDone, restored]);
  return restored ? (
    <MobileLessonLayout {...props} />
  ) : (
    <Box role="status" aria-busy="true">
      Restoring lesson progress…
    </Box>
  );
}
const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data' },
  colorSchemes: { light: true, dark: true },
});

type LessonData = { response: LessonResponse; messages: UiKitMessages };
type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'home'; index: LessonIndex }
  | { status: 'lesson'; data: LessonData };

function MobileContent() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  useEffect(() => {
    const onRoute = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onRoute);
    let disposed = false;
    let disposeNative: (() => void) | undefined;
    void registerNativeBackButton(() => {
      if (window.location.pathname !== '/') navigate('/');
      else void exitNativeApp();
    }).then(dispose => {
      if (disposed) dispose();
      else disposeNative = dispose;
    });
    return () => {
      disposed = true;
      disposeNative?.();
      window.removeEventListener('popstate', onRoute);
    };
  }, []);
  const route = parseRoute(pathname);
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const routeKey = route.type === 'lesson' ? route.id + '/' + route.language + '/' + route.lessonLanguage : route.type;
  useEffect(() => {
    let live = true;
    setState({ status: 'loading' });
    if (route.type === 'not-found') {
      setState({ status: 'error', message: 'This lesson route was not found.' });
      return;
    }
    const task: Promise<LoadState> =
      route.type === 'home'
        ? loadLessonIndex().then(index => ({ status: 'home', index }))
        : Promise.all([loadLesson(route.id, route.lessonLanguage), loadMessages(localeForLanguage(route.language)!)]).then(
            ([response, messages]) => ({ status: 'lesson', data: { response, messages } }),
          );
    void task
      .then(data => {
        if (live) setState(data);
      })
      .catch(error => {
        if (live) setState({ status: 'error', message: String(error) });
      });
    return () => {
      live = false;
    };
  }, [routeKey]);
  const activeLocale = localeForLanguage(route.type === 'lesson' ? route.language : defaultLanguage)!;
  useEffect(() => {
    document.documentElement.lang = activeLocale;
    document.documentElement.dir = getLocaleDirection(activeLocale);
  }, [activeLocale]);
  const localeBinding = useMemo<LocaleBinding>(
    () => ({
      locale: activeLocale,
      lessonLocale: localeForLanguage(route.type === 'lesson' ? route.lessonLanguage : defaultLanguage)!,
      setLocale(next: Locale) {
        if (route.type !== 'lesson') return;
        navigate(lessonHref(languageForLocale(next), route.id, route.lessonLanguage), true);
      },
      setLessonLocale(next: Locale) {
        if (route.type !== 'lesson') return;
        navigate(lessonHref(route.language, route.id, languageForLocale(next)), true);
      },
    }),
    [activeLocale, routeKey],
  );
  if (state.status === 'loading') {
    return (
      <Box role="status" aria-busy="true" sx={{ display: 'grid', placeItems: 'center', height: '100%' }}>
        <CircularProgress aria-label="Loading textbook" />
      </Box>
    );
  }
  if (state.status === 'error') {
    return (
      <Container sx={{ pt: 5 }}>
        <Typography role="alert">{state.message}</Typography>
        <Button onClick={() => navigate('/')}>Back to lessons</Button>
      </Container>
    );
  }
  if (state.status === 'home') {
    return (
      <Container sx={{ py: 4, height: '100%', overflowY: 'auto' }}>
        <Typography variant="h4" component="h1">
          {textbook.title}
        </Typography>
        <Typography sx={{ my: 2 }}>Choose a lesson</Typography>
        <List>
          {state.index.lessons.map(lesson => (
            <ListItemButton
              key={lesson.id}
              component={MobileLink}
              href={lessonHref(
                lesson.languages.includes(defaultLanguage) ? defaultLanguage : lesson.languages[0],
                lesson.id,
              )}
            >
              {lesson.title}
            </ListItemButton>
          ))}
        </List>
      </Container>
    );
  }
  if (route.type !== 'lesson') return null;
  const { response, messages } = state.data;
  return (
    <LocaleContext.Provider value={localeBinding}>
      <SceneLocaleProvider locale={localeForLanguage(route.lessonLanguage)!}>
        <Lesson
          key={routeKey}
          response={response}
          href={lessonHref(route.language, response.id, route.lessonLanguage)}
          messages={messages}
          layout={PersistingLessonLayout}
          sceneRegistry={resolveScene}
        />
      </SceneLocaleProvider>
    </LocaleContext.Provider>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <MobileContent />
    </ThemeProvider>
  );
}
