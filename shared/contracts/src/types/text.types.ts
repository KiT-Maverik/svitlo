import type { NonEmptyArray } from './misc.types';

export type StyledTextStyle = 'highlight' | 'bold' | 'cursive' | 'underscore' | 'crossed' | 'variable';

export type HighlightTone = 'neutral' | 'info' | 'warning' | 'success';

export interface StyledText_Rule {
  id: string;
  applyStyle: NonEmptyArray<StyledTextStyle>;
  applyColor?: string;
  tone?: HighlightTone;
}

export type StyledText_Rules = NonEmptyArray<StyledText_Rule>;
