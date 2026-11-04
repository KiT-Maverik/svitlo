import type { StyledText_Rules } from '../../text.types';

import type {LanguageCode} from "@/types/languages";

import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { New_Locale_Options, Locale_ResponseParams } from '../locale.types';
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

export type ContentBlock_Text_Data<SupportedLanguages extends LanguageCode = LanguageCode> = ContentBlock_Data_Meta & ContentBlock_Text_Presentation & {
  value: New_Locale_Options<SupportedLanguages>;
};

export type ContentBlock_Text_Response = ContentBlock_Response_Meta<'text'> & Locale_ResponseParams & ContentBlock_Text_Presentation & {
  value: string;
};

export type ContentBlock_Text<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  definition: ContentBlock_Text_Definition;
  data: ContentBlock_Text_Data<SupportedLanguages>;
  response: ContentBlock_Text_Response;
}[ConfigType];
