'use client';

import { useEffect, useState, type ReactNode, type ElementType } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TopNavbar from '../Navigation/TopNavbar';
import BottomNavbar from '../Navigation/BottomNavbar';
import { getLocaleDirection, type Locale } from '@svitlo/engine/localization';
import VerticalSpace from '#widgets/VerticalSpace/VerticalSpace';
import type { UiKit_Component } from '@svitlo/contracts/ui-kit';

export type Topic = { id: string; title: string; href: string };
export type LearningLayoutProgress = {
  ready: boolean;
  step: number;
  lastStep: number;
  testDone: boolean;
  skipped: readonly string[];
  quizSectionId?: string;
};
export interface LearningLayoutProps {
  children: ReactNode;
  topics: readonly Topic[];
  skippableSteps?: readonly boolean[];
  quizStep?: number;
  locale: Locale;
  messages: UiKit_Component<'learningLayout', 'response'>;
  pathname: string;
  progress: LearningLayoutProgress;
  actions: { back: () => void; next: () => void; skip: () => void };
  preferences?: ReactNode;
  /** Optional page-specific controls inside the existing right settings drawer. */
  settingsContent?: ReactNode | ((actions: { closeSettings: () => void }) => ReactNode);
  /** Non-lesson pages can reuse the navbar and sidebars without lesson navigation. */
  showBottomNavbar?: boolean;
  linkComponent?: ElementType;
}

export default function LearningLayout({
  children,
  topics,
  skippableSteps = [],
  quizStep,
  locale,
  messages,
  pathname,
  progress,
  actions,
  preferences,
  settingsContent,
  showBottomNavbar = true,
  linkComponent,
}: LearningLayoutProps) {
  const direction = getLocaleDirection(locale);
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
      sx={{
        height: '100dvh',
        display: 'grid',
        gridTemplateRows: showBottomNavbar ? 'auto minmax(0, 1fr) auto' : 'auto minmax(0, 1fr)',
        overflow: 'hidden',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
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
            </>
          ),
          right: (
            <>
              {preferences}
              <Tooltip title={messages.tooltips.profile}>
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                  <IconButton aria-label={messages.actions.profile} disabled>
                    <AccountCircleOutlinedIcon />
                  </IconButton>
                </Box>
              </Tooltip>
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
              <Tooltip title={messages.tooltips.logout}>
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                  <IconButton aria-label={messages.actions.logout} disabled>
                    <LogoutIcon />
                  </IconButton>
                </Box>
              </Tooltip>
            </>
          ),
        }}
      />

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
          anchor={direction === 'rtl' ? 'right' : 'left'}
          variant="persistent"
          open={open}
          slotProps={{
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
            sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}
          >
            <VerticalSpace
              top={
                <Typography
                  component="h2"
                  sx={{ px: 3, pt: 2, fontSize: 13, fontWeight: 700, color: 'text.secondary' }}
                >
                  {messages.topicsTitle}
                </Typography>
              }
              center={
                <Box sx={{ height: '100%', overflowY: 'auto', overscrollBehavior: 'contain', px: 1 }}>
                  <List disablePadding>
                    {topics.map(topic => (
                      <ListItemButton
                        key={topic.id}
                        component={linkComponent ?? 'a'}
                        href={`${topic.href}?lang=${locale}`}
                        selected={pathname === topic.href}
                        aria-current={pathname === topic.href ? 'page' : undefined}
                        onClick={() => setOpen(false)}
                        sx={{ borderRadius: 2 }}
                      >
                        <ListItemText primary={topic.title} />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              }
            />
          </Box>
        </Drawer>
        <Drawer
          anchor={direction === 'rtl' ? 'left' : 'right'}
          variant="persistent"
          open={settingsOpen}
          slotProps={{
            paper: {
              sx: { position: 'absolute', width: 'min(320px, calc(100vw - 48px))', height: '100%', overflow: 'hidden' },
            },
          }}
        >
          <Box
            id="settings-sidebar"
            component="aside"
            aria-label={messages.navigation.settings}
            sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderBottom: 1,
                borderColor: 'divider',
                flexShrink: 0,
              }}
            >
              <Typography component="h2" sx={{ flex: 1, px: 1, fontSize: 18, fontWeight: 700 }}>
                {messages.settingsTitle}
              </Typography>
              <IconButton aria-label={messages.actions.closeSettingsPanel} onClick={() => setSettingsOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', p: 2 }}>
              {typeof settingsContent === 'function'
                ? settingsContent({ closeSettings: () => setSettingsOpen(false) })
                : (settingsContent ?? <Typography color="text.secondary">{messages.settingsDescription}</Typography>)}
            </Box>
          </Box>
        </Drawer>
        <Box
          component="main"
          id="learning-content"
          tabIndex={-1}
          sx={{
            height: '100%',
            overflowY: 'auto',
            scrollbarGutter: 'stable both-edges',
            overscrollBehavior: 'contain',
          }}
        >
          {children}
        </Box>
      </Box>

      {showBottomNavbar && (
        <BottomNavbar
          aria-label={messages.navigation.bottom}
          slots={{
            center: (
              <>
                <Button variant="contained" disabled={!progress.ready || progress.step === 0} onClick={actions.back}>
                  {direction === 'rtl' ? '→' : '←'} {messages.actions.previous}
                </Button>
                <Button
                  variant="contained"
                  disabled={
                    !progress.ready ||
                    progress.step >= progress.lastStep ||
                    (progress.step === quizStep &&
                      !progress.testDone &&
                      !progress.skipped.includes(progress.quizSectionId ?? ''))
                  }
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
                  !progress.ready ||
                  !skippableSteps[progress.step] ||
                  (progress.step === (quizStep ?? progress.lastStep) &&
                    (progress.testDone ||
                      Boolean(progress.quizSectionId && progress.skipped.includes(progress.quizSectionId))))
                }
                onClick={actions.skip}
              >
                {messages.actions.skip}
              </Button>
            ),
          }}
          slotProps={{ root: { sx: { px: { xs: 1, sm: 2 } } } }}
        />
      )}
    </Box>
  );
}
