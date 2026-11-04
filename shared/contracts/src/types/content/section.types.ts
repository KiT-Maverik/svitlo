import type { ContentEntity_ConfigType } from './entity.types';
import type { LanguageCode } from '../languages';
import type { Locale_Options, Locale_ResponseParams } from './locale.types';
import type { ContentBlock_Catalog, ContentBlock_Reference } from './blocks';

/** Presentation categories; individual sections still choose their content blocks. */
export const SECTION_TYPES = [
  'theory',
  'practice',
  'codingTask',
  'learningFlow',
  'quiz',
  'flashcards',
  'scenario', // App-level scripted insertions; no renderer is defined yet.
] as const;

export type Section_Type = (typeof SECTION_TYPES)[number];

type Section_Definition = {
  type: Section_Type;
  content: ContentBlock_Catalog<'definition'>;
  order?: readonly ContentBlock_Reference[];
};

type Section_Data<SupportedLanguages extends LanguageCode> = {
  id: string;
  slug: string;
  type: Section_Type;
  title: Locale_Options<SupportedLanguages>;
  navigationLabel: Locale_Options<SupportedLanguages>;
  skippable?: true;
  content: ContentBlock_Catalog<'data', SupportedLanguages>;
  order?: readonly ContentBlock_Reference[];
};

type Section_Response = Locale_ResponseParams & {
  id: string;
  slug: string;
  type: Section_Type;
  title: string;
  navigationLabel: string;
  skippable?: true;
  content: ContentBlock_Catalog<'response'>;
  order?: readonly ContentBlock_Reference[];
};

export type Section<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  definition: Section_Definition;
  data: Section_Data<SupportedLanguages>;
  response: Section_Response;
}[ConfigType];
