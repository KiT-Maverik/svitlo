import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Config, Locale_ResponseParams } from '../locale.types';

type ContentBlock_Markdown_Definition = ContentBlock_Definition_Meta<'markdown'>;

type ContentBlock_Markdown_Data = ContentBlock_Data_Meta & {
  locales: Locale_Config;
};

type ContentBlock_Markdown_Response = ContentBlock_Response_Meta<'markdown'> & Locale_ResponseParams & {
  text: string;
};

export type ContentBlock_Markdown<ConfigType extends ContentEntity_ConfigType> = {
  definition: ContentBlock_Markdown_Definition;
  data: ContentBlock_Markdown_Data;
  response: ContentBlock_Markdown_Response;
}[ConfigType];
