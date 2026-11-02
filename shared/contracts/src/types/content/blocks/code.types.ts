import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Config, Locale_ResponseParams } from '../locale.types';

type ContentBlock_Code_Definition = ContentBlock_Definition_Meta<'code'>;

type ContentBlock_Code_Data = ContentBlock_Data_Meta & {
  fileLocation: Locale_Config;
  codeParams: { selector: string; values: Locale_Config }[];
};

type ContentBlock_Code_Response = ContentBlock_Response_Meta<'code'> & Locale_ResponseParams & {
  fileLocation: string;
  codeParams: { selector: string; value: string }[];
};

export type ContentBlock_Code<ConfigType extends ContentEntity_ConfigType> = {
  definition: ContentBlock_Code_Definition;
  data: ContentBlock_Code_Data;
  response: ContentBlock_Code_Response;
}[ConfigType];
