import type { Locale_Languages, Locale_Options } from './locale.types';
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

/** Serializable palette choices supported by the Flashcard's MUI Chip. */
export const FLASHCARD_FLAG_COLORS = [
  'default',
  'primary',
  'secondary',
  'error',
  'info',
  'success',
  'warning',
] as const;
export type FlashcardFlagColor = (typeof FLASHCARD_FLAG_COLORS)[number];

/** Serializable icon names, not React components or dynamically imported paths. */
export const FLASHCARD_FLAG_ICONS = [
  'list',
  'warning',
  'acronym',
  'info',
  'star',
  'bookmark',
  'lightbulb',
  'code',
  'check',
] as const;
export type FlashcardFlagIcon = (typeof FLASHCARD_FLAG_ICONS)[number];

/**
 * Built-in flags have a stable visual meaning. Custom flags provide an
 * author-defined chip label, one palette color and an optional icon.
 * Only the label text requires localization; colors and icon keys are invariant.
 */
export type FlashcardFlag<ConfigType extends 'data' | 'response', Languages extends Locale_Languages> =
  | { type: 'list'; count: number }
  | { type: 'warning' }
  | { type: 'acronym'; value: ConfigType extends 'data' ? Locale_Options<Languages> : string }
  | {
      type: 'custom';
      value: ConfigType extends 'data' ? Locale_Options<Languages> : string;
      color: FlashcardFlagColor;
      icon?: FlashcardFlagIcon;
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
  flags: readonly FlashcardFlag<'data', SupportedLanguages>[];
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
  flags: readonly FlashcardFlag<'response', SupportedLanguages>[];
  /** Mirrored, indexed links; optional for legacy Flashcards. */
  relationships?: readonly FlashcardRelation[];
};

export type Flashcard<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  definition: Flashcard_Definition;
  data: Flashcard_Data<SupportedLanguages>;
  response: Flashcard_Response<SupportedLanguages>;
}[ConfigType];
