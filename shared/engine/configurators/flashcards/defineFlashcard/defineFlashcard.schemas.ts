import { z } from 'zod';
import {
  contentBlockConfigurator_Schema,
  contentBlockLocalizationSwitch,
  contentBlockResolved_Schema,
} from '../../contentBlocks/contentBlock.schemas';

export const flashcardRelationshipTypes = [
  'reverse', 'equivalent', 'contrast', 'complementary', 'prerequisite',
  'partOf', 'exampleOf', 'causes', 'precedes',
] as const;

const relationship_Schema = z.strictObject({
  relationshipId: z.string(),
  type: z.enum(flashcardRelationshipTypes),
  relatedFlashcardId: z.string(),
  position: z.enum(['peer', 'source', 'target']),
});

function createFlashcardSchema<Mode extends keyof typeof contentBlockLocalizationSwitch>(mode: Mode) {
  const localized = contentBlockLocalizationSwitch[mode];
  const block = { config: contentBlockConfigurator_Schema, props: contentBlockResolved_Schema }[mode];
  const flags = z.discriminatedUnion('type', [
    z.strictObject({ type: z.literal('list'), count: z.number().int().nonnegative() }),
    z.strictObject({ type: z.literal('warning') }),
    z.strictObject({ type: z.literal('acronym'), value: localized }),
    z.strictObject({
      type: z.literal('custom'),
      value: localized,
      color: z.enum(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
      icon: z.enum(['list', 'warning', 'acronym', 'info', 'star', 'bookmark', 'lightbulb', 'code', 'check']).optional(),
    }),
  ]);
  return z.strictObject({
    type: z.literal('flashcard'),
    id: z.uuid(),
    isDefault: z.literal(true).optional(),
    front: z.array(block),
    back: z.array(block),
    hint: z.array(block),
    tags: z.array(z.string()),
    flags: z.array(flags),
    relationships: z.array(relationship_Schema).optional(),
  });
}

export const flashcard_Config_Schema = createFlashcardSchema('config');
export type Flashcard_Config = z.infer<typeof flashcard_Config_Schema>;

export const flashcard_Props_Schema = createFlashcardSchema('props');
export type Flashcard_Props = z.infer<typeof flashcard_Props_Schema>;

export const flashcardConfigurator_Schema = z.custom<{
  readonly config: {
    readonly base: { readonly type: 'flashcard'; readonly id: string };
    readonly locales: () => object;
  };
}>(
  value => {
    if (value === null || typeof value !== 'object' || !('config' in value)) return false;
    const config = value.config;
    if (config === null || typeof config !== 'object' || !('base' in config) || !('locales' in config)) return false;
    const base = config.base;
    return (
      typeof config.locales === 'function' &&
      base !== null && typeof base === 'object' &&
      'type' in base && base.type === 'flashcard' &&
      'id' in base && typeof base.id === 'string'
    );
  },
  { message: 'Expected defineFlashcard configurator, not authored Flashcard data' },
);
