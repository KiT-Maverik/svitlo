import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Config, Locale_ResponseParams } from '../locale.types';

type ContentBlock_Image_Definition = ContentBlock_Definition_Meta<'image'>;

type ContentBlock_Image_Data = ContentBlock_Data_Meta & {
  locales: Locale_Config;
  alt: Locale_Config;
};

type ContentBlock_Image_Response = ContentBlock_Response_Meta<'image'> & Locale_ResponseParams & {
  src: string;
  alt: string;
};

export type ContentBlock_Image<ConfigType extends ContentEntity_ConfigType> = {
  definition: ContentBlock_Image_Definition;
  data: ContentBlock_Image_Data;
  response: ContentBlock_Image_Response;
}[ConfigType];
