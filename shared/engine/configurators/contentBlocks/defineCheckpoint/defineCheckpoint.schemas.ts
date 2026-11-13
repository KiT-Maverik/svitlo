import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';

import { createContentBlockBaseSchema, localizationSwitch } from '../contentBlock.schemas';

import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { checkpointItem_Props_Schema } from './defineCheckpointItem/defineCheckpointItem.schemas';
import type {
  ContentBlock_CheckpointItem_Configurator,
  ContentBlock_CheckpointItem_Props,
} from './defineCheckpointItem';

export type { Checkpoint_Allowed_Configurator, Checkpoint_Allowed_Props } from './defineCheckpointItem';

const contentBlockBase = createContentBlockBaseSchema('checkpoint');

const params = contentBlockBase.shape.params.extend({
  headingLevel: z.number().int().min(1).max(6).optional(),
  showIndices: z.boolean().optional(),
  showChevron: z.boolean().optional(),
  showIcon: z.boolean().optional(),
  indexPosition: z.enum(['left', 'right']).optional(),
  iconPosition: z.enum(['left', 'right']).optional(),
  chevronPosition: z.enum(['left', 'right']).optional(),
  enableChecks: z.boolean().optional(),
  requireCompletion: z.boolean().optional(),
  renderAsGroup: z.boolean().optional(),
});

const checkpointBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode],
});
export type ContentBlock_Checkpoint_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

type OrderedContent<Item> = { items: Record<string, Item>; order: string[] };

export type Checkpoint_Config_Item = ContentBlock_CheckpointItem_Configurator;
export type Checkpoint_Props_Item = ContentBlock_CheckpointItem_Props;

export const checkpoint_Config_Schema = checkpointBase.extend({
  ...addUnifiedLocale(locale('config')),
  content: z.object({
    // The parent validate() owns child kind, identity, Build API and order checks.
    // Do not reuse the renderable ContentBlock guard: checkpointItem is not a UI block type.
    items: z.record(z.string(), z.custom<ContentBlock_CheckpointItem_Configurator>()),
    order: z.array(z.string()),
  }),
});
export type ContentBlock_Checkpoint_Config = z.infer<typeof checkpoint_Config_Schema>;

/** Only schema-owned metadata fields may be overridden; collection rules are contextual. */
export type Checkpoint_Metadata_Overrides = DeepPartial<Pick<ContentBlock_Checkpoint_Config, 'params' | 'locale'>>;
export const checkpoint_Override_Config_Schema: z.ZodType<Checkpoint_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: checkpoint_Config_Schema.shape.params,
      locale: checkpoint_Config_Schema.shape.locale,
    }),
  ),
);

export type Checkpoint_Overrides<
  Items extends Record<string, ContentBlock_CheckpointItem_Configurator>,
  Added extends Record<string, ContentBlock_CheckpointItem_Configurator> = {},
> = Checkpoint_Metadata_Overrides & {
  content?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};

export type ContentBlock_Checkpoint_PropsBase = z.infer<typeof checkpointBase> & {
  locale?: DeepPartial<ContentBlock_Checkpoint_Locale<'props'>>;
  content: ReturnType<ContentBlock_CheckpointItem_Configurator['build']['props']>['base'][];
};

/** Runtime Props contain the fully ordered collection, never authoring maps. */
export const checkpoint_Props_Schema = checkpointBase.extend({
  ...addUnifiedLocale(locale('props')),
  content: z.array(checkpointItem_Props_Schema).min(1),
});
export type ContentBlock_Checkpoint_Props = Omit<z.infer<typeof checkpoint_Props_Schema>, 'content'> & {
  content: ContentBlock_CheckpointItem_Props[];
};
