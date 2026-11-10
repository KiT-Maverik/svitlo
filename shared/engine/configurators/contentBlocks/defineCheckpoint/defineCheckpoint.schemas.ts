import { z } from 'zod';

import {
  createContentBlockBaseSchema,
  localizationSwitch,
  contentBlockConfigurator_Schema,
  contentBlockResolved_Schema,
} from '../_shared';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared';

const contentBlockBase = createContentBlockBaseSchema('checkpoint');

const child = {
  config: contentBlockConfigurator_Schema,
  props: contentBlockResolved_Schema,
} as const;

// Checkpoint child answers belong to params, while translated questions belong to locale.
// Potential future extraction: indexed child/locale projection, once array merge semantics are finalized.
const params = <Mode extends Configurator_Mode>(mode: Mode) =>
  contentBlockBase.shape.params.extend({
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
    items: z.array(z.object({
      answer: z.tuple([child[mode]], child[mode]),
      check: z.literal(true).optional(),
    })),
  });

const checkpointBase = <Mode extends Configurator_Mode>(mode: Mode) =>
  contentBlockBase.extend({ params: params(mode) });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode],
  items: z.array(z.object({ question: localizationSwitch[mode] })),
});
export type ContentBlock_Checkpoint_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

const hasMatchingItems = (value: { params: { items: unknown[] }; locale: { items: unknown[] } }) =>
  value.params.items.length === value.locale.items.length;

export const checkpoint_Config_Schema = checkpointBase('config')
  .extend(addUnifiedLocale(locale('config')))
  .refine(hasMatchingItems, { message: 'Checkpoint params.items and locale.items must have equal length' });
export type ContentBlock_Checkpoint_Config = z.infer<typeof checkpoint_Config_Schema>;

export const checkpoint_Props_Schema = checkpointBase('props')
  .extend(addUnifiedLocale(locale('props')))
  .refine(hasMatchingItems, { message: 'Checkpoint params.items and locale.items must have equal length' });
export type ContentBlock_Checkpoint_Props = z.infer<typeof checkpoint_Props_Schema>;
