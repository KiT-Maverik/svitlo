'use client';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

export type ThemeSwitchProps = {
  /** Visual labels and tooltips are deliberately omitted; the control remains accessible. */
  label: string;
  mode?: 'light' | 'dark' | 'system';
  systemMode?: 'light' | 'dark';
  onThemeChange: (mode: 'light' | 'dark') => void;
};

function ThemeThumb() {
  return (
    <Box component="span" className="theme-switch-thumb">
      <WbSunnyRoundedIcon className="theme-switch-icon theme-switch-icon--sun" sx={{ fontSize: 14 }} />
      <DarkModeRoundedIcon className="theme-switch-icon theme-switch-icon--moon" sx={{ fontSize: 14 }} />
    </Box>
  );
}

export default function ThemeSwitch({ label, mode, systemMode, onThemeChange }: ThemeSwitchProps) {
  const isDark = mode === 'dark' || ((mode === 'system' || mode === undefined) && systemMode === 'dark');
  return (
    <Switch
      checked={isDark}
      onChange={(_event, checked) => onThemeChange(checked ? 'dark' : 'light')}
      slotProps={{ input: { 'aria-label': label } }}
      icon={<ThemeThumb />}
      checkedIcon={<ThemeThumb />}
      sx={{
        width: 54,
        height: 30,
        flexShrink: 0,
        cursor: 'pointer',
        userSelect: 'none',
        p: 0,
        overflow: 'visible',
        '& .MuiSwitch-switchBase': {
          p: '4px',
          left: theme => (theme.direction === 'rtl' ? 'auto' : 0),
          right: theme => (theme.direction === 'rtl' ? 0 : 'auto'),
          color: '#B7791F',
          transition: theme =>
            theme.transitions.create(['transform', 'color'], {
              duration: 320,
              easing: theme.transitions.easing.easeInOut,
            }),
          '&.Mui-checked': {
            transform: theme => (theme.direction === 'rtl' ? 'translateX(-24px)' : 'translateX(24px)'),
            color: '#EAF0FF',
            '& + .MuiSwitch-track': {
              bgcolor: '#3B4E7F',
              borderColor: '#6479AB',
              opacity: 1,
            },
          },
          '&.Mui-focusVisible .theme-switch-thumb': {
            outline: '3px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          },
        },
        '& .theme-switch-thumb': {
          width: 22,
          height: 22,
          display: 'grid',
          placeItems: 'center',
          borderRadius: '50%',
          bgcolor: '#FFF7DC',
          boxShadow: '0 1px 4px rgba(32, 41, 63, 0.24)',
          position: 'relative',
          transition: 'background-color 320ms ease-in-out, box-shadow 320ms ease-in-out',
        },
        '& .Mui-checked .theme-switch-thumb': {
          bgcolor: '#202E56',
        },
        '& .theme-switch-icon': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transition: 'opacity 240ms ease-in-out, transform 320ms ease-in-out',
        },
        '& .theme-switch-icon--sun': {
          opacity: 1,
          transform: 'translate(-50%, -50%) rotate(0deg) scale(1)',
        },
        '& .theme-switch-icon--moon': {
          opacity: 0,
          transform: 'translate(-50%, -50%) rotate(-75deg) scale(0.5)',
        },
        '& .Mui-checked .theme-switch-icon--sun': {
          opacity: 0,
          transform: 'translate(-50%, -50%) rotate(75deg) scale(0.5)',
        },
        '& .Mui-checked .theme-switch-icon--moon': {
          opacity: 1,
          transform: 'translate(-50%, -50%) rotate(0deg) scale(1)',
        },
        '& .MuiSwitch-track': {
          bgcolor: '#F1C76B',
          border: '1px solid #D9A83D',
          borderRadius: 15,
          opacity: 1,
          transition: 'background-color 320ms ease-in-out, border-color 320ms ease-in-out',
        },
        '@media (prefers-reduced-motion: reduce)': {
          '& .MuiSwitch-switchBase, & .MuiSwitch-track, & .theme-switch-thumb, & .theme-switch-icon': {
            transition: 'none',
          },
        },
      }}
    />
  );
}
