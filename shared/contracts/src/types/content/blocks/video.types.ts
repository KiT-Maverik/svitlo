import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { LanguageCode } from '../../languages';
import type { New_Locale_Options, Locale_ResponseParams } from '../locale.types';

type ContentBlock_Video_Definition = ContentBlock_Definition_Meta<'video'>;

type Video_Fallback<Value> = {
  offline?: Value;
  unavailable?: Value;
  playbackError?: Value;
  retry?: Value;
};

type ContentBlock_Video_Data<SupportedLanguages extends LanguageCode> = ContentBlock_Data_Meta & {
  fileLocation: New_Locale_Options<SupportedLanguages>;
  poster: New_Locale_Options<SupportedLanguages>;
  title?: New_Locale_Options<SupportedLanguages>;
  fallback?: Video_Fallback<New_Locale_Options<SupportedLanguages>>;
};

export type ContentBlock_Video_Response = ContentBlock_Response_Meta<'video'> & Locale_ResponseParams & {
  fileLocation: string;
  poster: string;
  title?: string;
  fallback?: Video_Fallback<string>;
};

export type ContentBlock_Video<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  definition: ContentBlock_Video_Definition;
  data: ContentBlock_Video_Data<SupportedLanguages>;
  response: ContentBlock_Video_Response;
}[ConfigType];
