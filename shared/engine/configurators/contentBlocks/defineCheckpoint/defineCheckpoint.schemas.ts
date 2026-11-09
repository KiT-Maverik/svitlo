import { z } from 'zod';

import {
  contentBlockConfigurator_Schema,
  contentBlockResolved_Schema,
  contentBlockLocalizationSwitch,
  createContentBlockMetaSchema,
} from '../contentBlock.schemas';

function createCheckpointSchema<Mode extends keyof typeof contentBlockLocalizationSwitch>(mode: Mode) {
  const localized = contentBlockLocalizationSwitch[mode];

  const child = { config: contentBlockConfigurator_Schema, props: contentBlockResolved_Schema }[mode];

  return z.object({
    ...createContentBlockMetaSchema('checkpoint').shape,
    title: localized,
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
    items: z.array(
      z.object({
        question: localized,
        answer: z.tuple([child], child),
        check: z.literal(true).optional(),
      }),
    ),
  });
}

export const checkpoint_Config_Schema = createCheckpointSchema('config');
export type ContentBlock_Checkpoint_Config = z.infer<typeof checkpoint_Config_Schema>;

export const checkpoint_Props_Schema = createCheckpointSchema('props');
export type ContentBlock_Checkpoint_Props = z.infer<typeof checkpoint_Props_Schema>;
