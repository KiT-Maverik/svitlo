import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Config, Locale_ResponseParams } from '../locale.types';

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

type ContentBlock_Youtube_Data = ContentBlock_Data_Meta & {
  href: Locale_Config;
  fallback?: Youtube_Fallback<Locale_Config>;
} & Youtube_Display<Locale_Config>;

type ContentBlock_Youtube_Response = ContentBlock_Response_Meta<'youtube'> & Locale_ResponseParams & {
  href: string;
  fallback?: Youtube_Fallback<string>;
} & Youtube_Display<string>;

export type ContentBlock_Youtube<ConfigType extends ContentEntity_ConfigType> = {
  definition: ContentBlock_Youtube_Definition;
  data: ContentBlock_Youtube_Data;
  response: ContentBlock_Youtube_Response;
}[ConfigType];
