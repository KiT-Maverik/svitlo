import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';

/** Only locale normalization is shared with browser code; Skill JSON is loaded by Next.js. */
export function resolveSkillLanguage(value: string): string {
  const entry = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.locale === value || item.language === value);
  if (!entry) throw new Error('Непідтримувана мова Skills: ' + value);
  return entry.language;
}
