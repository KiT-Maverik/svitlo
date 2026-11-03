import type { ContentEntity_ConfigType } from './entity.types';
import type { Locale_Config, Locale_ResponseParams } from './locale.types';
import type { ContentBlock, ContentBlock_Catalog } from './blocks';

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
};

type Section_Data = {
  id: string;
  slug: string;
  type: Section_Type;
  title: Locale_Config;
  navigationLabel: Locale_Config;
  skippable?: true;
  content: ContentBlock_Catalog<'data'>;
};

type Section_Response = Locale_ResponseParams & {
  id: string;
  slug: string;
  type: Section_Type;
  title: string;
  navigationLabel: string;
  skippable?: true;
  /** Canonical playback order; no separate order metadata or catalog lookup. */
  content: readonly ContentBlock<'response'>[];
};

export type Section<ConfigType extends ContentEntity_ConfigType> = {
  definition: Section_Definition;
  data: Section_Data;
  response: Section_Response;
}[ConfigType];
