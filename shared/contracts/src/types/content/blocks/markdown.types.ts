import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { LanguageCode } from '../../languages';
import type { Locale_Options } from '../locale.types';

type ContentBlock_Markdown_Definition = ContentBlock_Definition_Meta<'markdown'>;

type ContentBlock_Markdown_Data<SupportedLanguages extends LanguageCode> = ContentBlock_Data_Meta & {
  locales: Locale_Options<SupportedLanguages>;
};

export type ContentBlock_Markdown_Response = ContentBlock_Response_Meta<'markdown'> & {
  text: string;
};

export type ContentBlock_Markdown<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  definition: ContentBlock_Markdown_Definition;
  data: ContentBlock_Markdown_Data<SupportedLanguages>;
  response: ContentBlock_Markdown_Response;
}[ConfigType];
