import type { LanguageCode, Locale_Languages, StyledText_Rules } from '@svitlo/contracts';

import type { ContentBlock_Meta } from '../contentBlocks.types';

type Params = {
  styling?: StyledText_Rules;
  wrap?: {
    enabled?: true;
    /** MUI TypographyProps, checked by the authoring app before serialization. */
    typographyProps?: unknown;
  };
};

type Locale<Mode extends 'authored' | 'resolved', SupportedLanguages extends Locale_Languages = Locale_Languages> = {
  value: Mode extends 'authored'
    ? string | (Record<SupportedLanguages[number], string> & Partial<Record<LanguageCode, string>>)
    : string;
};

export type ContentBlock_Text_Config<SupportedLanguages extends Locale_Languages> =
  ContentBlock_Meta<'text'> & Locale<'authored', SupportedLanguages> & { params: Params };

export type ContextBlock_Text_Props = ContentBlock_Meta<'text'> & Locale<'resolved'> & {
  params: Params & { disabled?: true };
};
