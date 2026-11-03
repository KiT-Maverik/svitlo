import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Config, Locale_ResponseParams } from '../locale.types';

type ContentBlock_Code_Definition = ContentBlock_Definition_Meta<'code'>;

type ContentBlock_Code_Source =
  /** The publisher reads this source and places its text into the response. */
  | { fileLocation: Locale_Config; code?: never }
  | { code: Locale_Config; fileLocation?: never };

type ContentBlock_Code_Data = ContentBlock_Data_Meta & ContentBlock_Code_Source & {
  language: string;
  title?: Locale_Config;
  variables?: { id: string; value: Locale_Config }[];
};

export type ContentBlock_Code_Response = ContentBlock_Response_Meta<'code'> & Locale_ResponseParams & {
  /** Display-only source text. Inline {{id}} markers use localized variables below. */
  code: string;
  language: string;
  title?: string;
  variables?: { id: string; value: string }[];
};

export type ContentBlock_Code<ConfigType extends ContentEntity_ConfigType> = {
  definition: ContentBlock_Code_Definition;
  data: ContentBlock_Code_Data;
  response: ContentBlock_Code_Response;
}[ConfigType];
