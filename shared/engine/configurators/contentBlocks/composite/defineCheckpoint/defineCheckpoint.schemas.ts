import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import {
  validateSlugAddressedContainer,
  type SafePlacementMap,
} from '../../../_shared__configurators/slugAddressedContainer/slugAddressedContainer.utils';
import type { Configurator_Mode } from '../../../configurator.schemas';
import { createContentBlockBaseSchema, localizationSwitch } from '../../contentBlock.schemas';
import type {
  ContentBlock_CheckpointItem_Configurator,
} from './defineCheckpointItem';
import { checkpointItem_Data_Schema } from './defineCheckpointItem/defineCheckpointItem.schemas';
import { hasConfiguratorBuildIdentity } from './configuratorBoundary';

export type { Checkpoint_Allowed_Configurator, Checkpoint_Allowed_Data } from './defineCheckpointAnswer';

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

export type Checkpoint_Config_Item = ContentBlock_CheckpointItem_Configurator;

/** A Checkpoint has one ordered collection of Item placements at its root. */
export const checkpoint_Metadata_Config_Schema = checkpointBase.extend({
  ...addUnifiedLocale(locale('config')),
});
export const checkpoint_Config_Schema = checkpoint_Metadata_Config_Schema
  .extend({ children: z.array(z.string()).min(1) })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, ['checkpointItem'])) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
    for (const key of value.children) {
      const child = value[key];
      if (hasConfiguratorBuildIdentity(child, 'checkpointItem')) continue;
      ctx.addIssue({ code: 'custom', path: [key], message: 'Checkpoint requires CheckpointItem configurators with a valid Build API and identity' });
    }
  });
export type ContentBlock_Checkpoint_Config = z.infer<typeof checkpoint_Config_Schema>;

export type Checkpoint_Metadata_Overrides = DeepPartial<
  Pick<ContentBlock_Checkpoint_Config, 'params' | 'locale'>
>;
export const checkpoint_Override_Config_Schema: z.ZodType<Checkpoint_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: checkpoint_Metadata_Config_Schema.shape.params,
      locale: checkpoint_Metadata_Config_Schema.shape.locale,
    }),
  ),
);

export type Checkpoint_Overrides<
  Items extends Record<string, ContentBlock_CheckpointItem_Configurator>,
  Added extends Record<string, ContentBlock_CheckpointItem_Configurator> = {},
> = Checkpoint_Metadata_Overrides & {
  children?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
} & {
  [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false;
} & Added & SafePlacementMap<Added> & {
  [Key in keyof Items & keyof Added]?: never;
};

/** Domain Data stays slug-addressable. UI arrays are a later presenter concern. */
export type ContentBlock_Checkpoint_DataBase = z.infer<typeof checkpointBase> & {
  locale?: DeepPartial<ContentBlock_Checkpoint_Locale<'data'>>;
  children: string[];
  [placementSlug: string]: unknown;
};

export const checkpoint_Data_Schema = checkpointBase
  .extend({
    ...addUnifiedLocale(locale('data')),
    children: z.array(z.string()).min(1),
  })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, ['checkpointItem'])) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
    for (const key of value.children) {
      const parsed = checkpointItem_Data_Schema.safeParse(value[key]);
      if (!parsed.success) {
        ctx.addIssue({ code: 'custom', path: [key], message: 'Invalid CheckpointItem Data' });
      }
    }
  });
export type ContentBlock_Checkpoint_Data = z.infer<typeof checkpoint_Data_Schema>;
