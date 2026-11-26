import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import { disability_Schema } from '../../../schemas/disabilities.schemas';
import type { Configurator_Mode } from '../../configurator.schemas';
import {
  localizationSwitch as contentBlockLocalizationSwitch,
  primitiveContentBlockResolved_Schema,
} from '../../contentBlocks/contentBlock.schemas';
import type {
  ContentBlock_Primitive_Configurator,
  ContentBlock_Primitive_Props,
} from '../../contentBlocks/contentBlock.types';
import {
  flashcardSide_Config_Schema,
  type FlashcardSide_Overrides,
} from '../defineFlashcardSide/defineFlashcardSide.schemas';

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

export const flashcardRelationship_Schema = z.strictObject({
  relationshipId: z.string().min(1),
  type: z.enum(flashcardRelationshipTypes),
  relatedFlashcardId: z.uuid(),
  position: z.enum(flashcardRelationshipPositions),
});
export type Flashcard_Relationship = z.infer<typeof flashcardRelationship_Schema>;

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
export const flashcardFlag_Config_Schema = flagSchema('config');
export type Flashcard_Flag_Config = z.infer<typeof flashcardFlag_Config_Schema>;
export type Flashcard_Flag_Props = z.infer<ReturnType<typeof flagSchema<'props'>>>;

/** Restrict retrieval modes, not learners. */
export const flashcardDisabilities_Schema = z
  .array(disability_Schema)
  .refine(values => new Set(values).size === values.length, 'Duplicate Flashcard disability restriction');

export const flashcard_Config_Schema = identityBase_Schema
  .extend({
    parameters: paramsBase_Schema.shape.params.extend({
      tags: z.array(z.string()),
      disabilities: flashcardDisabilities_Schema.optional(),
      flags: z.array(flashcardFlag_Config_Schema),
      relationships: z
        .strictObject({
          items: z.record(z.string(), flashcardRelationship_Schema),
          order: z.array(z.string()),
        })
        .optional(),
    }),
    // Preserve the structural Config shape for YAML/editor schema generation.
    // defineFlashcard validates that these values are built side configurators.
    content: z.strictObject({
      front: z.object(flashcardSide_Config_Schema.shape),
      back: z.object(flashcardSide_Config_Schema.shape),
      hint: z.object(flashcardSide_Config_Schema.shape).optional(),
    }),
  })
  .strict();
export type Flashcard_Config = z.infer<typeof flashcard_Config_Schema>;

const resolvedBlocks = z.array(primitiveContentBlockResolved_Schema);
export const flashcard_Props_Schema = identityBase_Schema.extend({
  type: z.literal('flashcard'),
  parameters: paramsBase_Schema.shape.params.extend({
    tags: z.array(z.string()),
    disabilities: flashcardDisabilities_Schema,
    flags: z.array(flagSchema('props')),
    relationships: z.array(flashcardRelationship_Schema).optional(),
  }),
  content: z.strictObject({
    front: resolvedBlocks.min(1),
    back: resolvedBlocks.min(1),
    hint: resolvedBlocks.optional(),
  }),
});
export type Flashcard_Props = Omit<z.infer<typeof flashcard_Props_Schema>, 'content'> & {
  content: { front: ContentBlock_Primitive_Props[]; back: ContentBlock_Primitive_Props[]; hint?: ContentBlock_Primitive_Props[] };
};

export type Flashcard_PropsBase = Pick<Flashcard_Props, 'id' | 'slug' | 'type'> & {
  parameters: Omit<Flashcard_Props['parameters'], 'flags'> & {
    flags: DeepPartial<Flashcard_Flag_Props>[];
  };
  content: {
    front: ReturnType<ContentBlock_Primitive_Configurator['build']['props']>['base'][];
    back: ReturnType<ContentBlock_Primitive_Configurator['build']['props']>['base'][];
    hint?: ReturnType<ContentBlock_Primitive_Configurator['build']['props']>['base'][];
  };
};

/** Strictly derive ordinary metadata patch validation from the Config schema. */
export type Flashcard_Metadata_Overrides = DeepPartial<
  Pick<Flashcard_Config['parameters'], 'disabled' | 'tags' | 'disabilities'>
>;
export const flashcard_Override_Metadata_Schema: z.ZodType<{ parameters?: Flashcard_Metadata_Overrides }> =
  z.deepPartial(
    deepStrict_Schema(
      z.object({
        parameters: flashcard_Config_Schema.shape.parameters.omit({ flags: true, relationships: true }),
      }),
    ),
  );

type IdentitySafePatch<Value, Immutable extends keyof Value> = DeepPartial<Omit<Value, Immutable>>;
export type Flashcard_Named_Overrides<
  Items extends Record<string, object>,
  Added extends Record<string, object>,
  Immutable extends keyof Items[keyof Items],
> = {
  items?: { [Key in keyof Items]?: IdentitySafePatch<Items[Key], Extract<Immutable, keyof Items[Key]>> | false };
  additionalItems?: Added & { [Key in keyof Items]?: never };
  order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
};

export type Flashcard_Overrides<
  Front extends Record<string, ContentBlock_Primitive_Configurator>,
  Back extends Record<string, ContentBlock_Primitive_Configurator>,
  Hint extends Record<string, ContentBlock_Primitive_Configurator>,
  Relationships extends Record<string, Flashcard_Relationship>,
  AddedFront extends Record<string, ContentBlock_Primitive_Configurator> = {},
  AddedBack extends Record<string, ContentBlock_Primitive_Configurator> = {},
  AddedHint extends Record<string, ContentBlock_Primitive_Configurator> = {},
  AddedRelationships extends Record<string, Flashcard_Relationship> = {},
> = {
  parameters?: Flashcard_Metadata_Overrides & {
    /** Replace the full, unordered array. Flags do not have stable slug/order identities. */
    flags?: Flashcard_Flag_Config[];
    relationships?: Flashcard_Named_Overrides<Relationships, AddedRelationships, 'type' | 'relationshipId'>;
  };
  content?: {
    front?: FlashcardSide_Overrides<Front, AddedFront>;
    back?: FlashcardSide_Overrides<Back, AddedBack>;
    hint?: FlashcardSide_Overrides<Hint, AddedHint>;
  };
};

/** Check the new public Build boundary without invoking Flashcard's child configurators. */
export const flashcardConfigurator_Schema = z.custom<{
  readonly id: string;
  readonly slug: string;
  readonly type: 'flashcard';
  readonly build: { readonly props: () => unknown; readonly overrides: (patch: never) => unknown };
}>(
  value =>
    value !== null &&
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'flashcard' &&
    'id' in value &&
    typeof value.id === 'string' &&
    'slug' in value &&
    typeof value.slug === 'string' &&
    'build' in value &&
    value.build !== null &&
    typeof value.build === 'object' &&
    'props' in value.build &&
    typeof value.build.props === 'function' &&
    'overrides' in value.build &&
    typeof value.build.overrides === 'function',
  { message: 'Expected defineFlashcard Build configurator, not authored Flashcard data' },
);
