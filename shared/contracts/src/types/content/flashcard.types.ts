import type { ContentBlock } from './blocks';
import type { ContentEntity_ConfigType } from './entity.types';
import type { LanguageCode } from '../languages';

type Flashcard_Definition = {
  type: 'flashcard';
};

type Flashcard_Data<SupportedLanguages extends LanguageCode> = {
  id: string;
  isDefault?: true;
  front: readonly ContentBlock<'data', SupportedLanguages>[];
  back: readonly ContentBlock<'data', SupportedLanguages>[];
  hint: readonly ContentBlock<'data', SupportedLanguages>[];
  tags: readonly string[];
  flags: readonly string[];
};

type Flashcard_Response = {
  id: string;
  isDefault?: true;
  front: readonly ContentBlock<'response', LanguageCode>[];
  back: readonly ContentBlock<'response', LanguageCode>[];
  hint: readonly ContentBlock<'response', LanguageCode>[];
  tags: readonly string[];
  flags: readonly string[];
};

export type Flashcard<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode> = {
  definition: Flashcard_Definition;
  data: Flashcard_Data<SupportedLanguages>;
  response: Flashcard_Response;
}[ConfigType];
