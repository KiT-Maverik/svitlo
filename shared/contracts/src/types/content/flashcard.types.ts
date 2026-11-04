import type { Locale_Languages } from './locale.types';
import type { ContentBlock } from './blocks';
import type { ContentEntity_ConfigType } from './entity.types';

type Flashcard_Definition = {
  type: 'flashcard';
};

type Flashcard_Data<SupportedLanguages extends Locale_Languages> = {
  id: string;
  isDefault?: true;
  front: readonly ContentBlock<'data', SupportedLanguages>[];
  back: readonly ContentBlock<'data', SupportedLanguages>[];
  hint: readonly ContentBlock<'data', SupportedLanguages>[];
  tags: readonly string[];
  flags: readonly string[];
};

type Flashcard_Response<SupportedLanguages extends Locale_Languages> = {
  id: string;
  isDefault?: true;
  front: readonly ContentBlock<'response', SupportedLanguages>[];
  back: readonly ContentBlock<'response', SupportedLanguages>[];
  hint: readonly ContentBlock<'response', SupportedLanguages>[];
  tags: readonly string[];
  flags: readonly string[];
};

export type Flashcard<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  definition: Flashcard_Definition;
  data: Flashcard_Data<SupportedLanguages>;
  response: Flashcard_Response<SupportedLanguages>;
}[ConfigType];
