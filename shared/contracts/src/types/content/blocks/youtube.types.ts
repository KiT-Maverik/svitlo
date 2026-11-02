import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Config, Locale_ResponseParams } from '../locale.types';

type ContentBlock_Youtube_Mode = 'link' | 'embed';

type ContentBlock_Youtube_Definition = ContentBlock_Definition_Meta<'youtube'>;

type ContentBlock_Youtube_Data = ContentBlock_Data_Meta & {
  href: Locale_Config;
  hint?: Locale_Config;
  mode: ContentBlock_Youtube_Mode;
  title?: Locale_Config;
};

type ContentBlock_Youtube_Response = ContentBlock_Response_Meta<'youtube'> & Locale_ResponseParams & {
  href: string;
  hint?: string;
  mode: ContentBlock_Youtube_Mode;
  title?: string;
};

export type ContentBlock_Youtube<ConfigType extends ContentEntity_ConfigType> = {
  definition: ContentBlock_Youtube_Definition;
  data: ContentBlock_Youtube_Data;
  response: ContentBlock_Youtube_Response;
}[ConfigType];
