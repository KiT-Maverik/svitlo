'use client';

import type { NavbarPreferences_Locale } from '../../../../../data/locale/navbarPreferences';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { DEFAULT_SUPPORTED_LANGUAGES, type Locale } from '@svitlo/engine/localization';
import { Flag } from '#widgets/Flag/Flag';

const locales = DEFAULT_SUPPORTED_LANGUAGES.map(({ locale, language, nativeName }) => ({
  locale,
  language,
  nativeName,
}));

export type NavbarPreferencesProps = {
  locale: Locale;
  messages: NavbarPreferences_Locale;
  onLocaleChange: (locale: Locale) => void;
  mode?: 'light' | 'dark' | 'system';
  systemMode?: 'light' | 'dark';
  onThemeChange: (mode: 'light' | 'dark') => void;
};

function LocaleSelector({
  locale,
  onLocaleChange,
  messages,
}: Pick<NavbarPreferencesProps, 'locale' | 'onLocaleChange' | 'messages'>) {
  return (
    <Select
      size="small"
      value={locale}
      inputProps={{ 'aria-label': messages.language }}
      renderValue={value => {
        const selected = locales.find(option => option.locale === value);
        return selected ? (
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
            <Flag locale={selected.locale} width={20} height={14} />
            {selected.language.toUpperCase()}
          </Box>
        ) : (
          value
        );
      }}
      onChange={event => {
        const selected = locales.find(option => option.locale === event.target.value);
        if (selected) onLocaleChange(selected.locale);
      }}
      sx={{ minWidth: 92 }}
    >
      {locales.map(option => (
        <MenuItem key={option.locale} value={option.locale}>
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
            <Flag locale={option.locale} width={20} height={14} />
            {option.nativeName}
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}

function ThemeSwitch({
  messages,
  mode,
  systemMode,
  onThemeChange,
}: Pick<NavbarPreferencesProps, 'messages' | 'mode' | 'systemMode' | 'onThemeChange'>) {
  // MUI's mode is undefined during hydration; the control must remain usable.
  const isDark = mode === 'dark' || ((mode === 'system' || mode === undefined) && systemMode === 'dark');

  return (
    <Tooltip title={isDark ? messages.theme.dark : messages.theme.light}>
      <Switch
        checked={isDark}
        onChange={(_event, checked) => onThemeChange(checked ? 'dark' : 'light')}
        slotProps={{ input: { 'aria-label': messages.theme.dark } }}
        icon={
          <Box component="span" className="theme-switch-thumb">
            <WbSunnyRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
        }
        checkedIcon={
          <Box component="span" className="theme-switch-thumb">
            <DarkModeRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
        }
        sx={{
          width: 68,
          height: 38,
          p: 0,
          overflow: 'visible',
          '& .MuiSwitch-switchBase': {
            p: '5px',
            color: '#B7791F',
            transitionDuration: '220ms',
            '&.Mui-checked': {
              transform: 'translateX(30px)',
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
            width: 28,
            height: 28,
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            bgcolor: '#FFF7DC',
            boxShadow: '0 1px 4px rgba(32, 41, 63, 0.24)',
          },
          '& .Mui-checked .theme-switch-thumb': {
            bgcolor: '#202E56',
          },
          '& .MuiSwitch-track': {
            bgcolor: '#F1C76B',
            border: '1px solid #D9A83D',
            borderRadius: 19,
            opacity: 1,
            transition: 'background-color 220ms ease, border-color 220ms ease',
          },
          '@media (prefers-reduced-motion: reduce)': {
            '& .MuiSwitch-switchBase, & .MuiSwitch-track': { transition: 'none' },
          },
        }}
      />
    </Tooltip>
  );
}

export default function NavbarPreferences({
  locale,
  messages,
  onLocaleChange,
  mode,
  systemMode,
  onThemeChange,
}: NavbarPreferencesProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <LocaleSelector locale={locale} onLocaleChange={onLocaleChange} messages={messages} />
      <ThemeSwitch messages={messages} mode={mode} systemMode={systemMode} onThemeChange={onThemeChange} />
    </Box>
  );
}
