import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Config, Locale_ResponseParams } from '../locale.types';

type ContentBlock_Video_Definition = ContentBlock_Definition_Meta<'video'>;

type ContentBlock_Video_Data = ContentBlock_Data_Meta & {
  fileLocation: Locale_Config;
  poster: Locale_Config;
};

type ContentBlock_Video_Response = ContentBlock_Response_Meta<'video'> & Locale_ResponseParams & {
  fileLocation: string;
  poster: string;
};

export type ContentBlock_Video<ConfigType extends ContentEntity_ConfigType> = {
  definition: ContentBlock_Video_Definition;
  data: ContentBlock_Video_Data;
  response: ContentBlock_Video_Response;
}[ConfigType];
