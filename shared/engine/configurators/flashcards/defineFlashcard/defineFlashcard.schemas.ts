import { z } from 'zod';

import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators';
import type { Configurator_Mode } from '../../configurator.schemas';
import { contentBlockLocalizationSwitch, type ContentBlock_Configurator, type ContentBlock_Props } from '../../contentBlocks';

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

const relationship_Schema = z.strictObject({
  relationshipId: z.string().min(1),
  type: z.enum(flashcardRelationshipTypes),
  relatedFlashcardId: z.uuid(),
  position: z.enum(flashcardRelationshipPositions),
});
export type Flashcard_Relationship = z.infer<typeof relationship_Schema>;

const flagSchema = <Mode extends Configurator_Mode>(mode: Mode) =>
  z.discriminatedUnion('type', [
    z.strictObject({ type: z.literal('list'), count: z.number().int().min(2) }),
    z.strictObject({ type: z.literal('warning') }),
    z.strictObject({ type: z.literal('acronym'), value: contentBlockLocalizationSwitch[mode] }),
    z.strictObject({
      type: z.literal('custom'),
      value: contentBlockLocalizationSwitch[mode],
      color: z.enum(flashcardFlagColors),
      icon: z.enum(flashcardFlagIcons).optional(),
    }),
  ]);

export type Flashcard_Flag_Config = z.infer<ReturnType<typeof flagSchema<'config'>>>;
export type Flashcard_Flag_Props = z.infer<ReturnType<typeof flagSchema<'props'>>>;

export type Flashcard_OrderedContent<Item> = {
  items: Record<string, Item>;
  order: string[];
};

/** Child ContentBlocks are their own configurators; Zod validates Flashcard metadata only. */
type Flashcard_Content<Item> = {
  front: Flashcard_OrderedContent<Item>;
  back: Flashcard_OrderedContent<Item>;
  hint?: Flashcard_OrderedContent<Item>;
};

function createFlashcardSchema<Mode extends Configurator_Mode>(mode: Mode) {
  return identityBase_Schema.extend({
    type: z.literal('flashcard'),
    parameters: paramsBase_Schema.shape.params.extend({
      tags: z.array(z.string()),
      flags: z.strictObject({
        items: z.record(z.string(), flagSchema(mode)),
        order: z.array(z.string()),
      }),
      relationships: z
        .strictObject({
          items: z.record(z.string(), relationship_Schema),
          order: z.array(z.string()),
        })
        .optional(),
    }),
  });
}

export const flashcard_Config_Schema = createFlashcardSchema('config');
export type Flashcard_Config = z.infer<typeof flashcard_Config_Schema> & {
  content: Flashcard_Content<ContentBlock_Configurator | false>;
};

export const flashcard_Props_Schema = createFlashcardSchema('props');
export type Flashcard_Props = z.infer<typeof flashcard_Props_Schema> & {
  content: Flashcard_Content<ContentBlock_Props>;
};

/** Check the configurator boundary without parsing or rebuilding its child ContentBlocks. */
export const flashcardConfigurator_Schema = z.custom<{
  readonly id: string;
  readonly slug: string;
  readonly type: 'flashcard';
  readonly config: {
    readonly base: { readonly id: string; readonly slug: string; readonly type: 'flashcard' };
    readonly locales: () => unknown;
  };
}>(
  value => {
    if (value === null || typeof value !== 'object' || !('config' in value)) return false;
    const candidate = value as Record<string, unknown>;
    const config = candidate.config;
    if (config === null || typeof config !== 'object' || !('base' in config) || !('locales' in config))
      return false;
    const base = config.base;
    return (
      typeof config.locales === 'function' &&
      base !== null &&
      typeof base === 'object' &&
      'id' in base &&
      'slug' in base &&
      'type' in base &&
      base.id === candidate.id &&
      base.slug === candidate.slug &&
      base.type === 'flashcard' &&
      candidate.type === 'flashcard'
    );
  },
  { message: 'Expected defineFlashcard configurator, not authored Flashcard data' },
);
