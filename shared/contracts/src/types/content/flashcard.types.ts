import type { ContentBlock } from './blocks';
import type { ContentEntity_ConfigType } from './entity.types';

type Flashcard_Definition = {
  type: 'flashcard';
};

type Flashcard_Data = {
  id: string;
  isDefault?: true;
  front: readonly ContentBlock<'data'>[];
  back: readonly ContentBlock<'data'>[];
  hint: readonly ContentBlock<'data'>[];
  tags: readonly string[];
  flags: readonly string[];
};

type Flashcard_Response = {
  id: string;
  isDefault?: true;
  front: readonly ContentBlock<'response'>[];
  back: readonly ContentBlock<'response'>[];
  hint: readonly ContentBlock<'response'>[];
  tags: readonly string[];
  flags: readonly string[];
};

export type Flashcard<ConfigType extends ContentEntity_ConfigType> = {
  definition: Flashcard_Definition;
  data: Flashcard_Data;
  response: Flashcard_Response;
}[ConfigType];
