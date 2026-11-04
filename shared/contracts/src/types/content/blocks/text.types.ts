import type { StyledText_Rules } from '../../text.types';

import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { Locale_Languages, Locale_Options } from '../locale.types';
import type { ContentEntity_ConfigType } from '../entity.types';

type ContentBlock_Text_Definition = ContentBlock_Definition_Meta<'text'>;

export type ContentBlock_Text_Wrap = {
  enabled?: false;
  /** MUI TypographyProps, checked by the authoring app before serialization. */
  typographyProps?: unknown;
};

export type ContentBlock_Text_Presentation = {
  styling?: StyledText_Rules;
  wrap?: ContentBlock_Text_Wrap;
};

export type ContentBlock_Text_Data<SupportedLanguages extends Locale_Languages> = ContentBlock_Data_Meta & ContentBlock_Text_Presentation & {
  value: Locale_Options<SupportedLanguages>;
};

export type ContentBlock_Text_Response = ContentBlock_Response_Meta<'text'> & ContentBlock_Text_Presentation & {
  value: string;
};

export type ContentBlock_Text<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  definition: ContentBlock_Text_Definition;
  data: ContentBlock_Text_Data<SupportedLanguages>;
  response: ContentBlock_Text_Response;
}[ConfigType];
