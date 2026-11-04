import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { LanguageCode } from '../../languages';
import type { New_Locale_Options, Locale_ResponseParams } from '../locale.types';

type ContentBlock_Youtube_Definition = ContentBlock_Definition_Meta<'youtube'>;

type Youtube_Fallback<Value> = {
  offline?: Value;
  unavailable?: Value;
  retry?: Value;
};

type Youtube_Display<Value> =
  | { mode: 'link'; title?: Value; hint?: Value }
  | ({ mode: 'embed' } & (
      | { title: Value; hint?: Value }
      | { title?: Value; hint: Value }
    ));

type ContentBlock_Youtube_Data<SupportedLanguages extends LanguageCode> = ContentBlock_Data_Meta & {
  href: New_Locale_Options<SupportedLanguages>;
  fallback?: Youtube_Fallback<New_Locale_Options<SupportedLanguages>>;
} & Youtube_Display<New_Locale_Options<SupportedLanguages>>;

export type ContentBlock_Youtube_Response = ContentBlock_Response_Meta<'youtube'> & Locale_ResponseParams & {
  href: string;
  fallback?: Youtube_Fallback<string>;
} & Youtube_Display<string>;

export type ContentBlock_Youtube<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  definition: ContentBlock_Youtube_Definition;
  data: ContentBlock_Youtube_Data<SupportedLanguages>;
  response: ContentBlock_Youtube_Response;
}[ConfigType];
