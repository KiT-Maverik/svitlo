'use client';

import type { NavbarPreferences_Locale } from '../../../../../data/locale/navbarPreferences';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import Typography from '@mui/material/Typography';
import { DEFAULT_SUPPORTED_LANGUAGES, type Locale } from '@svitlo/engine/localization';
import { Flag } from '#widgets/Flag/Flag';

const nativeNameCollator = new Intl.Collator('en', { sensitivity: 'base' });
const locales = DEFAULT_SUPPORTED_LANGUAGES.map(({ locale, language, nativeName }) => ({
  locale,
  language,
  nativeName,
})).sort((a, b) => nativeNameCollator.compare(a.nativeName, b.nativeName) || a.locale.localeCompare(b.locale));

export type NavbarPreferencesProps = {
  locale: Locale;
  messages: NavbarPreferences_Locale;
  onLocaleChange: (locale: Locale) => void;
  lessonLocale?: Locale;
  onLessonLocaleChange?: (locale: Locale) => void;
  mode?: 'light' | 'dark' | 'system';
  systemMode?: 'light' | 'dark';
  onThemeChange: (mode: 'light' | 'dark') => void;
};

function LocaleSelector({
  locale,
  onLocaleChange,
  label,
}: {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  label: string;
}) {
  return (
    <Select
      size="small"
      fullWidth
      value={locale}
      inputProps={{ 'aria-label': label }}
      renderValue={value => {
        const selected = locales.find(option => option.locale === value);
        return selected ? (
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
            <Flag locale={selected.locale} width={20} height={14} />
            {selected.nativeName}
          </Box>
        ) : (
          value
        );
      }}
      onChange={event => {
        const selected = locales.find(option => option.locale === event.target.value);
        if (selected) onLocaleChange(selected.locale);
      }}
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
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2">{isDark ? messages.theme.dark : messages.theme.light}</Typography>
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
              left: theme => (theme.direction === 'rtl' ? 'auto' : 0),
              right: theme => (theme.direction === 'rtl' ? 0 : 'auto'),
              color: '#B7791F',
              transitionDuration: '220ms',
              '&.Mui-checked': {
                transform: theme => (theme.direction === 'rtl' ? 'translateX(-30px)' : 'translateX(30px)'),
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
    </Box>
  );
}

/** The controls live in the settings drawer, not in the top navigation bar. */
export default function NavbarPreferences({
  locale,
  messages,
  onLocaleChange,
  lessonLocale,
  onLessonLocaleChange,
  mode,
  systemMode,
  onThemeChange,
}: NavbarPreferencesProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body2" component="h3" sx={{ fontWeight: 700 }}>
          {messages.language}
        </Typography>
        <LocaleSelector locale={locale} onLocaleChange={onLocaleChange} label={messages.language} />
      </Box>
      <ThemeSwitch messages={messages} mode={mode} systemMode={systemMode} onThemeChange={onThemeChange} />
      {lessonLocale && onLessonLocaleChange && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" component="h3" sx={{ fontWeight: 700 }}>
            {messages.lessonLanguage}
          </Typography>
          <LocaleSelector
            locale={lessonLocale}
            onLocaleChange={onLessonLocaleChange}
            label={messages.lessonLanguage}
          />
        </Box>
      )}
    </Box>
  );
}
