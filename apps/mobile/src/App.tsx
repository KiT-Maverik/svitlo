import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { Button, Container, Typography, CircularProgress, Box, List, ListItemButton } from '@mui/material';
import {
  SvitloThemeProvider,
  Lesson,
  useLessonNavigation,
  SceneLocaleProvider,
  createLessonLearningLayout,
  type LessonLearningLayoutProps,
  type UiKitMessages,
} from '@svitlo/ui-kit';
import { type Locale } from '@svitlo/contracts/localization';
import { getLocaleDirection, type Lesson_Props } from '@svitlo/engine';
import { registerNativeBackButton, exitNativeApp } from '@svitlo/adapter-capacitor';
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
type LessonData = { response: Lesson_Props; messages: UiKitMessages };
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
        : Promise.all([
            loadLesson(route.id, route.lessonLanguage),
            loadMessages(localeForLanguage(route.language)!),
          ]).then(([response, messages]) => ({ status: 'lesson', data: { response, messages } }));
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
  let content: ReactNode;
  if (state.status === 'loading') {
    content = (
      <Box role="status" aria-busy="true" sx={{ display: 'grid', placeItems: 'center', height: '100%' }}>
        <CircularProgress aria-label="Loading textbook" />
      </Box>
    );
  } else if (state.status === 'error') {
    content = (
      <Container sx={{ pt: 5 }}>
        <Typography role="alert">{state.message}</Typography>
        <Button onClick={() => navigate('/')}>Back to lessons</Button>
      </Container>
    );
  } else if (state.status === 'home') {
    content = (
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
  } else if (route.type === 'lesson') {
    const { response, messages } = state.data;
    content = (
      <LocaleContext.Provider value={localeBinding}>
        <SceneLocaleProvider locale={localeForLanguage(route.lessonLanguage)!}>
          <Lesson
            key={routeKey}
            response={response}
            language={route.lessonLanguage}
            href={lessonHref(route.language, response.id, route.lessonLanguage)}
            messages={messages}
            layout={PersistingLessonLayout}
            sceneRegistry={resolveScene}
          />
        </SceneLocaleProvider>
      </LocaleContext.Provider>
    );
  } else {
    content = null;
  }

  // Keep the MUI theme direction synchronized with the active interface locale.
  return (
    <SvitloThemeProvider direction={getLocaleDirection(activeLocale)} defaultMode="system" noSsr>
      {content}
    </SvitloThemeProvider>
  );
}

export default function App() {
  return <MobileContent />;
}
