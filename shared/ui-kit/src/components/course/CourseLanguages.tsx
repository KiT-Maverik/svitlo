'use client';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DEFAULT_SUPPORTED_LANGUAGES, type LanguageCode } from '+@svitlo/contracts/localization';
import { Flag } from '../widgets/Flag';

/** The interface locale wins when available; fallback priorities follow, without duplicates. */
export function sortCourseLanguages(
  languages: readonly LanguageCode[],
  interfaceLanguage?: LanguageCode,
): LanguageCode[] {
  const unique = [...new Set(languages)];
  const preferences = [interfaceLanguage, 'en', 'uk', 'qm'].filter(
    (language): language is LanguageCode => language !== undefined,
  );
  const first = [...new Set(preferences)].filter(language => unique.includes(language));
  return [...first, ...unique.filter(language => !first.includes(language))];
}

export type CourseLanguagesProps = {
  languages: readonly LanguageCode[];
  interfaceLanguage?: LanguageCode;
  label: string;
  /** Show the four highest-priority languages, plus a count of the remaining ones. */
  compact?: boolean;
};

export function CourseLanguages({ languages, interfaceLanguage, label, compact = false }: CourseLanguagesProps) {
  const sorted = sortCourseLanguages(languages, interfaceLanguage);
  if (sorted.length === 0) return null;

  const visible = compact ? sorted.slice(0, 4) : sorted;
  const hidden = compact ? sorted.slice(4) : [];
  const languageName = (code: LanguageCode) =>
    DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === code)?.nativeName ?? code;

  return (
    <Stack role="group" aria-label={label} spacing={0.75} sx={{ minWidth: 0 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Stack direction="row" sx={{ gap: 0.75, flexWrap: 'wrap', minWidth: 0 }}>
        {visible.map(code => {
          const definition = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === code);
          return (
            <Chip
              key={code}
              size="small"
              variant="outlined"
              sx={{ maxWidth: '100%' }}
              label={
                <Stack component="span" direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                  {definition && <Flag locale={definition.locale} width={18} height={12} />}
                  <span lang={definition?.locale} dir={definition?.direction}>
                    {languageName(code)}
                  </span>
                </Stack>
              }
            />
          );
        })}
        {hidden.length > 0 && (
          <Chip
            size="small"
            variant="outlined"
            label={'+' + hidden.length}
            title={hidden.map(languageName).join(', ')}
            aria-label={label + ': ' + hidden.map(languageName).join(', ')}
          />
        )}
      </Stack>
    </Stack>
  );
}
