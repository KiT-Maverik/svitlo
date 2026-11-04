import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages, Locale_Options } from '../locale.types';

type ContentBlock_Markdown_Definition = ContentBlock_Definition_Meta<'markdown'>;

type ContentBlock_Markdown_Data<SupportedLanguages extends Locale_Languages> = ContentBlock_Data_Meta<'markdown'> & {
  locales: Locale_Options<SupportedLanguages>;
};

export type ContentBlock_Markdown_Response = ContentBlock_Response_Meta<'markdown'> & {
  text: string;
};

export type ContentBlock_Markdown<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  definition: ContentBlock_Markdown_Definition;
  data: ContentBlock_Markdown_Data<SupportedLanguages>;
  response: ContentBlock_Markdown_Response;
}[ConfigType];
