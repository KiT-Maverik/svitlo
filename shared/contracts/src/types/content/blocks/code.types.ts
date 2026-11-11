import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages, Locale_Options } from '../locale.types';

type ContentBlock_Code_Definition = ContentBlock_Definition_Meta<'code'>;

type ContentBlock_Code_Source<SupportedLanguages extends Locale_Languages> =
  /** The publisher reads this source and places its text into the response. */
  | { fileLocation: Locale_Options<SupportedLanguages>; code?: never }
  | { code: Locale_Options<SupportedLanguages>; fileLocation?: never };

type ContentBlock_Code_Data<SupportedLanguages extends Locale_Languages> = ContentBlock_Data_Meta<'code'> &
  ContentBlock_Code_Source<SupportedLanguages> & {
    language: string;
    title?: Locale_Options<SupportedLanguages>;
    variables?: { id: string; value: Locale_Options<SupportedLanguages> }[];
  };

export type ContentBlock_Code_Response = ContentBlock_Response_Meta<'code'> & {
  /** Display-only source text. %_%UPPER_SNAKE_CASE%_% markers use localized variables below. */
  code: string;
  language: string;
  title?: string;
  variables?: { id: string; value: string }[];
};

export type ContentBlock_Code<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = {
  definition: ContentBlock_Code_Definition;
  data: ContentBlock_Code_Data<SupportedLanguages>;
  response: ContentBlock_Code_Response;
}[ConfigType];
