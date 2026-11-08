'use client';

import type { LearningLayout_Locale } from '../../../../data/locale/learningLayout';

import { useEffect, useState, type ReactNode, type ElementType, type Dispatch, type SetStateAction } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TopNavbar from '../Navigation/TopNavbar';
import BottomNavbar from '../Navigation/BottomNavbar';
import { type Locale } from '@svitlo/contracts/localization';
import { getLocaleDirection } from '@svitlo/engine';
import ThreeSlotLayout from '../ThreeSlotLayout';
import ProfileMenu, { type LearningProfile } from './ProfileMenu';
import CourseTopicList, { type Topic } from './CourseTopicList';

export type { Topic } from './CourseTopicList';
export type LearningLayoutProgress = {
  ready: boolean;
  step: number;
  lastStep: number;
  testDone: boolean;
};
export interface LearningLayoutProps {
  children: ReactNode;
  topics: readonly Topic[];
  skippableSteps?: readonly boolean[];
  locale: Locale;
  messages: LearningLayout_Locale;
  pathname: string;
  progress: LearningLayoutProgress;
  actions: { back: () => void; next: () => void; skip: () => void };
  /** Optional preference controls rendered in the settings drawer. */
  preferences?: ReactNode;
  /** Host-bound switch appears just before the Quick Settings button in the navbar. */
  themeControl?: ReactNode;
  profile?: LearningProfile;
  profiles?: readonly LearningProfile[];
  onProfileChange?: (profileId: string) => void;
  onLogout?: () => void;
  /** Profile-settings destination; defaults to a placeholder hash. */
  profileSettingsHref?: string;
  /** Optional page-specific controls inside the existing right settings drawer. */
  settingsContent?: ReactNode | ((actions: { closeSettings: () => void }) => ReactNode);
  /** Non-lesson pages can reuse the navbar and sidebars without lesson navigation. */
  showBottomNavbar?: boolean;
  contentLoading?: boolean;
  contentError?: boolean;
  onRetryContent?: () => void;
  linkComponent?: ElementType;
  renderTopBar?: (props: LearningLayoutTopBarProps) => ReactNode;
  renderBottomBar?: (props: LearningLayoutBottomBarProps) => ReactNode;
  /** Fifth sibling region: portalled reactions do not add a layout row. */
  renderEventHost?: () => ReactNode;
}

export type LearningLayoutTopBarProps = Pick<
  LearningLayoutProps,
  | 'messages'
  | 'preferences'
  | 'themeControl'
  | 'linkComponent'
  | 'profile'
  | 'profiles'
  | 'onProfileChange'
  | 'onLogout'
  | 'profileSettingsHref'
> & {
  open: boolean;
  settingsOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;
  lessonTitle?: string;
};

export type LearningLayoutBottomBarProps = Pick<
  LearningLayoutProps,
  'messages' | 'progress' | 'actions' | 'skippableSteps' | 'contentLoading'
> & {
  direction: 'ltr' | 'rtl';
  nextDisabled?: boolean;
  backDisabled?: boolean;
  skipDisabled?: boolean;
};

/** Default chrome stays reusable outside lessons; controller-owned slots can wrap it in independent contexts. */
export function LearningLayoutTopBar({
  messages,
  linkComponent,
  profile,
  profiles,
  onProfileChange,
  onLogout,
  profileSettingsHref,
  themeControl,
  open,
  settingsOpen,
  setOpen,
  setSettingsOpen,
  lessonTitle,
}: LearningLayoutTopBarProps) {
  return (
    <TopNavbar
      aria-label={messages.navigation.top}
      slots={{
        left: (
          <>
            <IconButton
              aria-label={open ? messages.actions.closeTopics : messages.actions.openTopics}
              aria-expanded={open}
              aria-controls={open ? 'learning-sidebar' : undefined}
              onClick={() => {
                setOpen(value => !value);
                setSettingsOpen(false);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component={linkComponent ?? 'a'}
              href="/"
              sx={{ color: 'text.primary', fontWeight: 800, fontSize: 20, textDecoration: 'none' }}
            >
              {messages.brand}
            </Typography>
            {lessonTitle && (
              <Typography
                component="span"
                variant="body2"
                title={lessonTitle}
                sx={{
                  display: { xs: 'none', md: 'block' },
                  color: 'text.primary',
                  maxWidth: 280,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {lessonTitle}
              </Typography>
            )}
          </>
        ),
        right: (
          <>
            {themeControl}
            <IconButton
              aria-label={settingsOpen ? messages.actions.closeSettings : messages.actions.openSettings}
              aria-expanded={settingsOpen}
              aria-controls={settingsOpen ? 'settings-sidebar' : undefined}
              onClick={() => {
                setSettingsOpen(value => !value);
                setOpen(false);
              }}
            >
              <SettingsOutlinedIcon />
            </IconButton>
            <ProfileMenu
              messages={messages}
              profile={profile}
              profiles={profiles}
              onProfileChange={onProfileChange}
              onLogout={onLogout}
              settingsHref={profileSettingsHref}
              onOpen={() => {
                setOpen(false);
                setSettingsOpen(false);
              }}
            />
          </>
        ),
      }}
    />
  );
}

export function LearningLayoutBottomBar({
  messages,
  progress,
  actions,
  skippableSteps = [],
  contentLoading = false,
  direction,
  nextDisabled = false,
  backDisabled = false,
  skipDisabled = false,
}: LearningLayoutBottomBarProps) {
  return (
    <BottomNavbar
      aria-label={messages.navigation.bottom}
      slots={{
        center: (
          <>
            <Button
              variant="contained"
              disabled={backDisabled || contentLoading || !progress.ready || progress.step === 0}
              onClick={actions.back}
            >
              {direction === 'rtl' ? '→' : '←'} {messages.actions.previous}
            </Button>
            <Button
              variant="contained"
              disabled={nextDisabled || contentLoading || !progress.ready || progress.step >= progress.lastStep}
              onClick={actions.next}
            >
              {messages.actions.next} {direction === 'rtl' ? '←' : '→'}
            </Button>
          </>
        ),
        right: (
          <Button
            variant="outlined"
            disabled={
              skipDisabled ||
              contentLoading ||
              !progress.ready ||
              progress.step >= progress.lastStep ||
              !skippableSteps[progress.step]
            }
            onClick={actions.skip}
          >
            {messages.actions.skip}
          </Button>
        ),
      }}
      slotProps={{ root: { sx: { px: { xs: 1, sm: 2 } } } }}
    />
  );
}

export default function LearningLayout({
  children,
  topics,
  skippableSteps = [],
  locale,
  messages,
  pathname,
  progress,
  actions,
  preferences,
  themeControl,
  profile,
  profiles,
  onProfileChange,
  onLogout,
  profileSettingsHref,
  settingsContent,
  showBottomNavbar = true,
  contentLoading = false,
  contentError = false,
  onRetryContent,
  linkComponent,
  renderTopBar,
  renderBottomBar,
  renderEventHost,
}: LearningLayoutProps) {
  const direction = getLocaleDirection(locale);
  const topicsAnchor = direction === 'rtl' ? 'right' : 'left';
  const settingsAnchor = direction === 'rtl' ? 'left' : 'right';
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  useEffect(() => {
    if (!open && !settingsOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setSettingsOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, settingsOpen]);

  return (
    <Box
      dir={direction}
      lang={locale}
      className="svitlo-theme-surface"
      sx={{
        height: '100dvh',
        display: 'grid',
        gridTemplateRows: showBottomNavbar ? 'auto minmax(0, 1fr) auto' : 'auto minmax(0, 1fr)',
        overflow: 'hidden',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      {renderTopBar ? (
        renderTopBar({
          messages,
          preferences,
          themeControl,
          linkComponent,
          profile,
          profiles,
          onProfileChange,
          onLogout,
          profileSettingsHref,
          open,
          settingsOpen,
          setOpen,
          setSettingsOpen,
        })
      ) : (
        <LearningLayoutTopBar
          messages={messages}
          preferences={preferences}
          themeControl={themeControl}
          linkComponent={linkComponent}
          profile={profile}
          profiles={profiles}
          onProfileChange={onProfileChange}
          onLogout={onLogout}
          profileSettingsHref={profileSettingsHref}
          open={open}
          settingsOpen={settingsOpen}
          setOpen={setOpen}
          setSettingsOpen={setSettingsOpen}
        />
      )}

      <Box sx={{ position: 'relative', minHeight: 0, overflow: 'hidden' }}>
        <Fade in={open || settingsOpen} timeout={{ enter: 225, exit: 195 }} unmountOnExit>
          <Box
            component="button"
            aria-label={messages.actions.closeSidebar}
            tabIndex={-1}
            onClick={() => {
              setOpen(false);
              setSettingsOpen(false);
            }}
            sx={{
              position: 'absolute',
              inset: 0,
              border: 0,
              bgcolor: theme => alpha(theme.palette.common.black, 0.25),
              zIndex: 1100,
              cursor: 'pointer',
              pointerEvents: open || settingsOpen ? 'auto' : 'none',
              '@media (prefers-reduced-motion: reduce)': { transition: 'none !important' },
            }}
          />
        </Fade>
        <Drawer
          anchor={topicsAnchor}
          variant="persistent"
          open={open}
          slotProps={{
            // MUI mirrors Slide internally for RTL, but the Paper still uses the
            // physical anchor. Set the direction explicitly so it enters from
            // that edge rather than crossing the screen.
            transition: { direction: topicsAnchor === 'left' ? 'right' : 'left' },
            paper: {
              sx: {
                position: 'absolute',
                width: 'min(320px, calc(100vw - 48px))',
                height: '100%',
                display: 'flex',
                overflow: 'hidden',
              },
            },
          }}
        >
          <Box
            id="learning-sidebar"
            component="nav"
            aria-label={messages.navigation.topics}
            sx={{
              width: '100%',
              height: '100%',
              minHeight: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              overscrollBehavior: 'contain',
            }}
          >
            <ThreeSlotLayout
              axis="vertical"
              slots={{
                start: (
                  <Typography
                    component="h2"
                    sx={{ px: 3, pt: 2, fontSize: 13, fontWeight: 700, color: 'text.secondary', userSelect: 'none' }}
                  >
                    {messages.topicsTitle}
                  </Typography>
                ),
                center: (
                  <Box sx={{ minWidth: 0, px: 1 }}>
                    <CourseTopicList
                      topics={topics}
                      pathname={pathname}
                      linkComponent={linkComponent}
                      onNavigate={() => setOpen(false)}
                    />
                  </Box>
                ),
              }}
              slotProps={{ root: { sx: { minHeight: '100%', height: 'auto' } } }}
            />
          </Box>
        </Drawer>
        <Drawer
          anchor={settingsAnchor}
          variant="persistent"
          open={settingsOpen}
          slotProps={{
            transition: { direction: settingsAnchor === 'left' ? 'right' : 'left' },
            paper: {
              sx: {
                position: 'absolute',
                width: { xs: '100%', sm: 'min(320px, calc(100vw - 48px))' },
                height: '100%',
                display: 'flex',
                overflow: 'hidden',
              },
            },
          }}
        >
          <Box
            id="settings-sidebar"
            component="aside"
            aria-label={messages.navigation.settings}
            sx={{
              height: '100%',
              width: '100%',
              minHeight: 0,
              minWidth: 0,
              overflowX: 'hidden',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              boxSizing: 'border-box',
            }}
          >
            <ThreeSlotLayout
              axis="vertical"
              slots={{
                start: (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 1,
                      borderBottom: 1,
                      borderColor: 'divider',
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      component="h2"
                      sx={{ flex: 1, minWidth: 0, px: 1, fontSize: 18, fontWeight: 700, textAlign: 'start' }}
                    >
                      {messages.settingsTitle}
                    </Typography>
                    <IconButton
                      aria-label={messages.actions.closeSettingsPanel}
                      onClick={() => setSettingsOpen(false)}
                      sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ),
                center: (
                  <Box sx={{ minWidth: 0, px: 2 }}>
                    {!preferences && !settingsContent && (
                      <Typography color="text.secondary">{messages.settingsDescription}</Typography>
                    )}
                  </Box>
                ),
                end:
                  preferences || settingsContent ? (
                    <Box
                      sx={{
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box',
                        px: 2,
                        pt: 1,
                        pb: 2,
                      }}
                    >
                      {preferences}
                      {preferences && settingsContent && <Divider sx={{ my: 2 }} />}
                      {typeof settingsContent === 'function'
                        ? settingsContent({ closeSettings: () => setSettingsOpen(false) })
                        : settingsContent}
                    </Box>
                  ) : undefined,
              }}
              slotProps={{
                root: { sx: { minHeight: '100%', height: 'auto' } },
                center: { sx: { justifyContent: 'flex-start' } },
              }}
            />
          </Box>
        </Drawer>
        <Box
          component="main"
          id="learning-content"
          tabIndex={-1}
          aria-busy={contentLoading || undefined}
          inert={contentLoading || undefined}
          sx={{
            height: '100%',
            overflowY: 'auto',
            scrollbarGutter: 'stable both-edges',
            overscrollBehavior: 'contain',
          }}
        >
          {children}
        </Box>
        <Fade in={contentLoading} timeout={{ enter: 0, exit: 350 }} unmountOnExit>
          <Box
            role={contentError ? 'alert' : 'status'}
            aria-live={contentError ? 'assertive' : 'polite'}
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 1200,
              display: 'grid',
              placeContent: 'center',
              justifyItems: 'center',
              gap: 3,
              px: 3,
              textAlign: 'center',
              bgcolor: 'background.default',
              '@media (prefers-reduced-motion: reduce)': { transition: 'none !important' },
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                display: 'flex',
                gap: 1.5,
                '& span': {
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  animation: 'lessonLoadingPulse 1.2s ease-in-out infinite',
                },
                '& span:nth-of-type(2)': { animationDelay: '0.15s' },
                '& span:nth-of-type(3)': { animationDelay: '0.3s' },
                '@keyframes lessonLoadingPulse': {
                  '0%, 60%, 100%': { opacity: 0.35, transform: 'translateY(0)' },
                  '30%': { opacity: 1, transform: 'translateY(-8px)' },
                },
                '@media (prefers-reduced-motion: reduce)': {
                  '& span': { animation: 'none', opacity: 0.75 },
                },
              }}
            >
              <span />
              <span />
              <span />
            </Box>
            <Typography variant="h6" component="span">
              {contentError ? messages.preparingLessonError : messages.preparingLesson}
            </Typography>
            {contentError && onRetryContent && (
              <Button variant="contained" onClick={onRetryContent}>
                {messages.actions.retry}
              </Button>
            )}
          </Box>
        </Fade>
      </Box>

      {showBottomNavbar &&
        (renderBottomBar ? (
          renderBottomBar({
            messages,
            progress,
            actions,
            skippableSteps,
            contentLoading,
            direction,
          })
        ) : (
          <LearningLayoutBottomBar
            messages={messages}
            progress={progress}
            actions={actions}
            skippableSteps={skippableSteps}
            contentLoading={contentLoading}
            direction={direction}
          />
        ))}
      {renderEventHost?.()}
    </Box>
  );
}
