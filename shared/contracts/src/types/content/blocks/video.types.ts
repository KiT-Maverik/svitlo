import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages, Locale_Options } from '../locale.types';

type ContentBlock_Video_Definition = ContentBlock_Definition_Meta<'video'>;

type Video_Fallback<Value> = {
  offline?: Value;
  unavailable?: Value;
  playbackError?: Value;
  retry?: Value;
};

type ContentBlock_Video_Data<SupportedLanguages extends Locale_Languages> = ContentBlock_Data_Meta<'video'> & {
  fileLocation: Locale_Options<SupportedLanguages>;
  poster: Locale_Options<SupportedLanguages>;
  title?: Locale_Options<SupportedLanguages>;
  /** Accessible name, independent from the optional visible title. */
  label: Locale_Options<SupportedLanguages>;
  fallback?: Video_Fallback<Locale_Options<SupportedLanguages>>;
};

export type ContentBlock_Video_Response = ContentBlock_Response_Meta<'video'> & {
  fileLocation: string;
  poster: string;
  title?: string;
  label: string;
  fallback?: Video_Fallback<string>;
};

export type ContentBlock_Video<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = {
  definition: ContentBlock_Video_Definition;
  data: ContentBlock_Video_Data<SupportedLanguages>;
  response: ContentBlock_Video_Response;
}[ConfigType];
