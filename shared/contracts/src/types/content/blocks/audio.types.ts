import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Config, Locale_ResponseParams } from '../locale.types';

type ContentBlock_Audio_Definition = ContentBlock_Definition_Meta<'audio'>;

type ContentBlock_Audio_Data = ContentBlock_Data_Meta & {
  fileLocation: Locale_Config;
  title: Locale_Config;
  description: Locale_Config;
};

type ContentBlock_Audio_Response = ContentBlock_Response_Meta<'audio'> & Locale_ResponseParams & {
  fileLocation: string;
  title: string;
  description: string;
};

export type ContentBlock_Audio<ConfigType extends ContentEntity_ConfigType> = {
  definition: ContentBlock_Audio_Definition;
  data: ContentBlock_Audio_Data;
  response: ContentBlock_Audio_Response;
}[ConfigType];
