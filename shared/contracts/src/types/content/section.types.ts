import type { ContentEntity_ConfigType } from './entity.types';
import type { Locale_Languages, Locale_Options } from './locale.types';
import type { ContentBlock } from './blocks';

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

type Section_Definition<SupportedLanguages extends Locale_Languages> = {
  type: Section_Type;
  content: readonly ContentBlock<'definition', SupportedLanguages>[];
};

type Section_Data<SupportedLanguages extends Locale_Languages> = {
  id: string;
  slug: string;
  type: Section_Type;
  title: Locale_Options<SupportedLanguages>;
  navigationLabel: Locale_Options<SupportedLanguages>;
  skippable?: true;
  content: readonly ContentBlock<'data', SupportedLanguages>[];
};

type Section_Response<SupportedLanguages extends Locale_Languages> = {
  id: string;
  slug: string;
  type: Section_Type;
  title: string;
  navigationLabel: string;
  skippable?: true;
  content: readonly ContentBlock<'response', SupportedLanguages>[];
};

export type Section<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  definition: Section_Definition<SupportedLanguages>;
  data: Section_Data<SupportedLanguages>;
  response: Section_Response<SupportedLanguages>;
}[ConfigType];
