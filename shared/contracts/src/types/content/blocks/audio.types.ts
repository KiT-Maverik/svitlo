import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages, Locale_Options } from '../locale.types';

type ContentBlock_Audio_Definition = ContentBlock_Definition_Meta<'audio'>;

type Audio_Fallback<Value> = {
  offline?: Value;
  unavailable?: Value;
  playbackError?: Value;
  retry?: Value;
};

type ContentBlock_Audio_Data<SupportedLanguages extends Locale_Languages> = ContentBlock_Data_Meta<'audio'> & {
  fileLocation: Locale_Options<SupportedLanguages>;
  title: Locale_Options<SupportedLanguages>;
  description?: Locale_Options<SupportedLanguages>;
  fallback?: Audio_Fallback<Locale_Options<SupportedLanguages>>;
};

export type ContentBlock_Audio_Response = ContentBlock_Response_Meta<'audio'> & {
  fileLocation: string;
  title: string;
  description?: string;
  fallback?: Audio_Fallback<string>;
};

export type ContentBlock_Audio<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  definition: ContentBlock_Audio_Definition;
  data: ContentBlock_Audio_Data<SupportedLanguages>;
  response: ContentBlock_Audio_Response;
}[ConfigType];
