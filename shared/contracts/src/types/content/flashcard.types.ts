import type { Locale_Languages } from './locale.types';
import type { ContentBlock } from './blocks';
import type { ContentEntity_ConfigType } from './entity.types';

/**
 * Closed, stable semantic relation vocabulary.
 * The value determines directionality; callers must not author a contradictory directed flag.
 */
export const FLASHCARD_RELATION_TYPES = {
  reverse: 'symmetric',
  equivalent: 'symmetric',
  contrast: 'symmetric',
  complementary: 'symmetric',
  prerequisite: 'directed',
  partOf: 'directed',
  exampleOf: 'directed',
  causes: 'directed',
  precedes: 'directed',
} as const;

export type FlashcardRelationType = keyof typeof FLASHCARD_RELATION_TYPES;

/** A mirrored edge on a card. source/target describe its role in a directed relation. */
export type FlashcardRelation = {
  /** Same stable edge key on both connected cards. */
  relationshipId: string;
  type: FlashcardRelationType;
  /** The other card's actual ID, not an authoring slug or array position. */
  relatedFlashcardId: string;
  /** peer for symmetric types; source/target for directed types. */
  position: 'peer' | 'source' | 'target';
};

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
  /** Mirrored, indexed links; optional for legacy Flashcards. */
  relationships?: readonly FlashcardRelation[];
};

type Flashcard_Response<SupportedLanguages extends Locale_Languages> = {
  id: string;
  isDefault?: true;
  front: readonly ContentBlock<'response', SupportedLanguages>[];
  back: readonly ContentBlock<'response', SupportedLanguages>[];
  hint: readonly ContentBlock<'response', SupportedLanguages>[];
  tags: readonly string[];
  flags: readonly string[];
  /** Mirrored, indexed links; optional for legacy Flashcards. */
  relationships?: readonly FlashcardRelation[];
};

export type Flashcard<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  definition: Flashcard_Definition;
  data: Flashcard_Data<SupportedLanguages>;
  response: Flashcard_Response<SupportedLanguages>;
}[ConfigType];
