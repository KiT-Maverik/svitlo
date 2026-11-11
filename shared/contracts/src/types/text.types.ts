import type { NonEmptyArray } from './misc.types';

export type StyledTextStyle = 'highlight' | 'bold' | 'cursive' | 'underscore' | 'crossed' | 'variable';

export type HighlightTone = 'neutral' | 'info' | 'warning' | 'success';

export interface StyledText_Rule {
  applyStyle: NonEmptyArray<StyledTextStyle>;
  applyColor?: string;
  tone?: HighlightTone;
}

/** Text variable identifiers are camelCase object keys, not fields in array entries. */
export type StyledText_Rules = Record<string, StyledText_Rule>;
