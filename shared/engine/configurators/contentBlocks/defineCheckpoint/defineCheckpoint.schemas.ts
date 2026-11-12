import { z } from 'zod';

import { createContentBlockBaseSchema, localizationSwitch } from '../_shared__contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';
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

/** false is valid only in Checkpoint collection overrides, never initial content. */
export type Checkpoint_Config_Item = ContentBlock_CheckpointItem_Configurator | false;
export type Checkpoint_Props_Item = ContentBlock_CheckpointItem_Props;

type Content<Item> = { content: OrderedContent<Item> };

/** Nested content is a TypeScript contract; Zod validates Checkpoint metadata. */
export const checkpoint_Config_Schema = checkpointBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Checkpoint_Config = z.infer<typeof checkpoint_Config_Schema> & Content<Checkpoint_Config_Item>;

export const checkpoint_Props_Schema = checkpointBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Checkpoint_Props = z.infer<typeof checkpoint_Props_Schema> & Content<Checkpoint_Props_Item>;
