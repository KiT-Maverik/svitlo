'use client';

import type { NavbarPreferences_Locale } from '../../../../../data/locale/navbarPreferences';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
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
  const isDark = mode === 'dark' || (mode === 'system' && systemMode === 'dark');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2">{isDark ? messages.theme.dark : messages.theme.light}</Typography>
      <Tooltip title={isDark ? messages.theme.dark : messages.theme.light}>
        <Switch
          checked={isDark}
          disabled={mode === undefined}
          onChange={event => onThemeChange(event.target.checked ? 'dark' : 'light')}
          slotProps={{ input: { 'aria-label': messages.theme.dark } }}
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
