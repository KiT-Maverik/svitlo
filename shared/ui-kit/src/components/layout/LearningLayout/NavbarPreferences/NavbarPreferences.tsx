'use client';

import type { NavbarPreferences_Locale } from '../../../../../data/locale/navbarPreferences';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { DEFAULT_SUPPORTED_LANGUAGES, type Locale } from '@svitlo/engine/runtime';
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
  lessonLanguages?: readonly Locale[];
  onLessonLocaleChange?: (locale: Locale) => void;
  volumeControl?: ReactNode;
};

function LocaleSelector({
  locale,
  onLocaleChange,
  label,
  availableLocales,
}: {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  label: string;
  availableLocales?: readonly Locale[];
}) {
  const options = availableLocales ? locales.filter(item => availableLocales.includes(item.locale)) : locales;
  return (
    <Select
      size="small"
      fullWidth
      sx={{ minWidth: 0, width: '100%', '& .MuiSelect-select': { minWidth: 0 } }}
      value={locale}
      inputProps={{ 'aria-label': label }}
      renderValue={value => {
        const selected = options.find(option => option.locale === value);
        return selected ? (
          <Box
            component="span"
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, minWidth: 0, maxWidth: '100%' }}
          >
            <Flag locale={selected.locale} width={20} height={14} />
            <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selected.nativeName}
            </Box>
          </Box>
        ) : (
          value
        );
      }}
      onChange={event => {
        const selected = options.find(option => option.locale === event.target.value);
        if (selected) onLocaleChange(selected.locale);
      }}
    >
      {options.map(option => (
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

/** Media and language controls; the theme switch is in the shared navbar. */
export default function NavbarPreferences({
  locale,
  messages,
  onLocaleChange,
  lessonLocale,
  lessonLanguages,
  onLessonLocaleChange,
  volumeControl,
}: NavbarPreferencesProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%', minWidth: 0 }}>
      {volumeControl}
      {volumeControl && <Divider />}
      {lessonLocale && onLessonLocaleChange && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
          <Typography variant="body2" component="h3" sx={{ fontWeight: 700 }}>
            {messages.lessonLanguage}
          </Typography>
          <LocaleSelector
            locale={lessonLocale}
            onLocaleChange={onLessonLocaleChange}
            label={messages.lessonLanguage}
            availableLocales={lessonLanguages}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
        <Typography variant="body2" component="h3" sx={{ fontWeight: 700 }}>
          {messages.language}
        </Typography>
        <LocaleSelector locale={locale} onLocaleChange={onLocaleChange} label={messages.language} />
      </Box>
    </Box>
  );
}
