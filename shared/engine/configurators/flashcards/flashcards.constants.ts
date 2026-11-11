export const flashcardRelationshipTypes = [
  'reverse',
  'equivalent',
  'contrast',
  'complementary',
  'prerequisite',
  'partOf',
  'exampleOf',
  'causes',
  'precedes',
] as const;
export type Flashcard_Relationship_Type = (typeof flashcardRelationshipTypes)[number];

export const flashcardRelationshipPositions = ['peer', 'source', 'target'] as const;
export type Flashcard_Relationship_Position = (typeof flashcardRelationshipPositions)[number];

export const flashcardFlagTypes = ['list', 'warning', 'acronym', 'custom'] as const;
export type Flashcard_Flag_Type = (typeof flashcardFlagTypes)[number];

export const flashcardFlagColors = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'] as const;
export type Flashcard_Flag_Color = (typeof flashcardFlagColors)[number];

export const flashcardFlagIcons = [
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
export type Flashcard_Flag_Icon = (typeof flashcardFlagIcons)[number];
