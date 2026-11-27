import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import { validateSlugAddressedContainer } from '../../_shared__configurators';
import { primitiveContentBlockTypes } from '../../contentBlocks/contentBlock.constants';
import { disability_Schema } from '../../../schemas/disabilities.schemas';
import type { Configurator_Mode } from '../../configurator.schemas';
import {
  localizationSwitch as contentBlockLocalizationSwitch,
  primitiveContentBlockResolved_Schema,
} from '../../contentBlocks/contentBlock.schemas';
import type {
  ContentBlock_Primitive_Configurator,
  ContentBlock_Primitive_Data,
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
export type Flashcard_Flag_Data = z.infer<ReturnType<typeof flagSchema<'data'>>>;

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

const resolvedSide = z.looseObject({ children: z.array(z.string()) }).superRefine((side, ctx) => {
  for (const issue of validateSlugAddressedContainer(side, primitiveContentBlockTypes)) {
    ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
  }
  for (const key of side.children) {
    if (typeof key === 'string' && !primitiveContentBlockResolved_Schema.safeParse(side[key]).success) {
      ctx.addIssue({ code: 'custom', path: [key], message: 'Invalid Flashcard side ContentBlock Data' });
    }
  }
});
export const flashcard_Data_Schema = identityBase_Schema.extend({
  type: z.literal('flashcard'),
  parameters: paramsBase_Schema.shape.params.extend({
    tags: z.array(z.string()),
    disabilities: flashcardDisabilities_Schema,
    flags: z.array(flagSchema('data')),
    relationships: z.array(flashcardRelationship_Schema).optional(),
  }),
  content: z.strictObject({
    front: resolvedSide.refine(value => value.children.length > 0, 'Flashcard front must not be empty'),
    back: resolvedSide.refine(value => value.children.length > 0, 'Flashcard back must not be empty'),
    hint: resolvedSide.optional(),
  }),
});
export type Flashcard_Data = z.infer<typeof flashcard_Data_Schema>;

export type Flashcard_DataBase = Pick<Flashcard_Data, 'id' | 'slug' | 'type'> & {
  parameters: Omit<Flashcard_Data['parameters'], 'flags'> & {
    flags: DeepPartial<Flashcard_Flag_Data>[];
  };
  content: {
    front: ReturnType<import('../defineFlashcardSide/defineFlashcardSide').FlashcardSide_Configurator['build']['data']>['base'];
    back: ReturnType<import('../defineFlashcardSide/defineFlashcardSide').FlashcardSide_Configurator['build']['data']>['base'];
    hint?: ReturnType<import('../defineFlashcardSide/defineFlashcardSide').FlashcardSide_Configurator['build']['data']>['base'];
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
  readonly build: { readonly data: () => unknown; readonly overrides: (patch: never) => unknown };
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
    'data' in value.build &&
    typeof value.build.data === 'function' &&
    'overrides' in value.build &&
    typeof value.build.overrides === 'function',
  { message: 'Expected defineFlashcard Build configurator, not authored Flashcard data' },
);
