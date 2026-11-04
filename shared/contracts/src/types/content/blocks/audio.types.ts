import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { LanguageCode } from '../../languages';
import type { Locale_Options, Locale_ResponseParams } from '../locale.types';

type ContentBlock_Audio_Definition = ContentBlock_Definition_Meta<'audio'>;

type Audio_Fallback<Value> = {
  offline?: Value;
  unavailable?: Value;
  playbackError?: Value;
  retry?: Value;
};

type ContentBlock_Audio_Data<SupportedLanguages extends LanguageCode> = ContentBlock_Data_Meta & {
  fileLocation: Locale_Options<SupportedLanguages>;
  title: Locale_Options<SupportedLanguages>;
  description?: Locale_Options<SupportedLanguages>;
  fallback?: Audio_Fallback<Locale_Options<SupportedLanguages>>;
};

export type ContentBlock_Audio_Response = ContentBlock_Response_Meta<'audio'> & Locale_ResponseParams & {
  fileLocation: string;
  title: string;
  description?: string;
  fallback?: Audio_Fallback<string>;
};

export type ContentBlock_Audio<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  definition: ContentBlock_Audio_Definition;
  data: ContentBlock_Audio_Data<SupportedLanguages>;
  response: ContentBlock_Audio_Response;
}[ConfigType];
