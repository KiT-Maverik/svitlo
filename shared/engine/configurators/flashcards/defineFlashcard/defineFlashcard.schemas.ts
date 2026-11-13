import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';

import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators';
import type { Configurator_Mode } from '../../configurator.schemas';
import {
  localizationSwitch as contentBlockLocalizationSwitch,
  contentBlockResolved_Schema,
} from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks/contentBlock.types';

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

export type Flashcard_OrderedContent<Item> = { items: Record<string, Item>; order: string[] };
type Flashcard_Content<Item> = {
  front: Flashcard_OrderedContent<Item>;
  back: Flashcard_OrderedContent<Item>;
  hint?: Flashcard_OrderedContent<Item>;
};
const authoredBlocks = z.strictObject({
  items: z.record(z.string(), z.custom<ContentBlock_Configurator>()),
  order: z.array(z.string()),
});

export const flashcard_Config_Schema = identityBase_Schema.extend({
  type: z.literal('flashcard'),
  parameters: paramsBase_Schema.shape.params.extend({
    tags: z.array(z.string()),
    flags: z.strictObject({
      items: z.record(z.string(), flashcardFlag_Config_Schema),
      order: z.array(z.string()),
    }),
    relationships: z
      .strictObject({
        items: z.record(z.string(), flashcardRelationship_Schema),
        order: z.array(z.string()),
      })
      .optional(),
  }),
  content: z.strictObject({
    front: authoredBlocks,
    back: authoredBlocks,
    hint: authoredBlocks.optional(),
  }),
});
export type Flashcard_Config = z.infer<typeof flashcard_Config_Schema>;

const resolvedBlocks = z.array(contentBlockResolved_Schema);
export const flashcard_Props_Schema = identityBase_Schema.extend({
  type: z.literal('flashcard'),
  parameters: paramsBase_Schema.shape.params.extend({
    tags: z.array(z.string()),
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
  content: { front: ContentBlock_Props[]; back: ContentBlock_Props[]; hint?: ContentBlock_Props[] };
};

export type Flashcard_PropsBase = Pick<Flashcard_Props, 'id' | 'slug' | 'type'> & {
  parameters: Omit<Flashcard_Props['parameters'], 'flags'> & {
    flags: DeepPartial<Flashcard_Flag_Props>[];
  };
  content: {
    front: ReturnType<ContentBlock_Configurator['build']['props']>['base'][];
    back: ReturnType<ContentBlock_Configurator['build']['props']>['base'][];
    hint?: ReturnType<ContentBlock_Configurator['build']['props']>['base'][];
  };
};

/** Strictly derive ordinary metadata patch validation from the Config schema. */
export type Flashcard_Metadata_Overrides = DeepPartial<Pick<Flashcard_Config['parameters'], 'disabled' | 'tags'>>;
export const flashcard_Override_Metadata_Schema: z.ZodType<{ parameters?: Flashcard_Metadata_Overrides }> =
  z.deepPartial(
    deepStrict_Schema(
      z.object({
        parameters: flashcard_Config_Schema.shape.parameters.omit({ flags: true, relationships: true }),
      }),
    ),
  );

export type Flashcard_Item_Overrides<
  Items extends Record<string, ContentBlock_Configurator>,
  Added extends Record<string, ContentBlock_Configurator> = {},
> = {
  items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
  additionalItems?: Added & { [Key in keyof Items]?: never };
  order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
};
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
  Front extends Record<string, ContentBlock_Configurator>,
  Back extends Record<string, ContentBlock_Configurator>,
  Hint extends Record<string, ContentBlock_Configurator>,
  Flags extends Record<string, Flashcard_Flag_Config>,
  Relationships extends Record<string, Flashcard_Relationship>,
  AddedFront extends Record<string, ContentBlock_Configurator> = {},
  AddedBack extends Record<string, ContentBlock_Configurator> = {},
  AddedHint extends Record<string, ContentBlock_Configurator> = {},
  AddedFlags extends Record<string, Flashcard_Flag_Config> = {},
  AddedRelationships extends Record<string, Flashcard_Relationship> = {},
> = {
  parameters?: Flashcard_Metadata_Overrides & {
    flags?: Flashcard_Named_Overrides<Flags, AddedFlags, 'type'>;
    relationships?: Flashcard_Named_Overrides<Relationships, AddedRelationships, 'type' | 'relationshipId'>;
  };
  content?: {
    front?: Flashcard_Item_Overrides<Front, AddedFront>;
    back?: Flashcard_Item_Overrides<Back, AddedBack>;
    hint?: Flashcard_Item_Overrides<Hint, AddedHint>;
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
