/** Pure five-field observation model. It never infers astronomical truth from free text. */
export const recordFieldKeys = ['what', 'when', 'where', 'how', 'conditions'] as const;
export type RecordField = (typeof recordFieldKeys)[number];
export type SourceMode = 'own' | 'example';
export type RecordFields = Record<RecordField, string>;

export interface RecordLabels {
  what: string;
  when: string;
  where: string;
  how: string;
  conditions: string;
  unknown: string;
  other: string;
  morning: string;
  day: string;
  evening: string;
  dateOfSource: string;
  timeNotGiven: string;
  sourceWashington: string;
  photoCaption: string;
  moon: string;
  clouds: string;
  clear: string;
  cloudy: string;
  ownEyes: string;
  read: string;
  heard: string;
}
export type RecordIssue =
  | 'missingWhat'
  | 'missingWhen'
  | 'missingSource'
  | 'missingMethod'
  | 'missingConditions'
  | 'wrongSource';

export function initialRecord(mode: SourceMode, labels: RecordLabels): RecordFields {
  return mode === 'example'
    ? {
        what: labels.moon,
        when: labels.dateOfSource,
        where: labels.sourceWashington,
        how: labels.photoCaption,
        conditions: labels.unknown,
      }
    : { what: '', when: '', where: '', how: '', conditions: '' };
}

/** Only evidence-supported NASA facts appear as preset answers. User text is not automatically judged. */
export function recordSuggestions(mode: SourceMode, field: RecordField, l: RecordLabels): string[] {
  const own: Record<RecordField, string[]> = {
    what: [l.moon, l.clouds],
    when: [l.morning, l.day, l.evening, l.unknown],
    where: [],
    how: [l.ownEyes],
    conditions: [l.clear, l.cloudy, l.unknown],
  };
  const nasa: Record<RecordField, string[]> = {
    what: [l.moon],
    when: [l.dateOfSource],
    where: [l.sourceWashington],
    how: [l.photoCaption],
    conditions: [l.unknown],
  };
  return (mode === 'example' ? nasa : own)[field];
}

/** Formative completeness only, never scientific scoring or a declaration of mastery. */
export function recordIssue(mode: SourceMode, value: RecordFields, l: RecordLabels): RecordIssue | null {
  if (!value.what.trim() || value.what.trim() === l.unknown) return 'missingWhat';
  if (!value.when.trim()) return 'missingWhen';
  if (!value.where.trim() || value.where.trim() === l.unknown) return 'missingSource';
  if (!value.how.trim() || value.how.trim() === l.unknown) return 'missingMethod';
  if (mode === 'example' && (value.how.trim() === l.ownEyes || value.how.trim() === l.heard))
    return 'wrongSource';
  if (!value.conditions.trim()) return 'missingConditions';
  return null;
}

export function textualRecord(fields: RecordFields, labels: RecordLabels): string {
  return recordFieldKeys.map(key => labels[key] + ' ' + (fields[key] || labels.unknown)).join('\n');
}
