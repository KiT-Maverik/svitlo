import { z } from 'zod';

import { camelCase_Schema } from '#schemas';
import {
  createContentBlockBaseSchema,
  localizationSwitch,
  contentBlockConfigurator_Schema,
  contentBlockResolved_Schema,
} from '../_shared';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared';

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

// Keyed items preserve stable identities across localization and reordering.
// The order is explicit; never infer display order from JavaScript object keys.
const content = <Mode extends Configurator_Mode>(mode: Mode) => {
  const child = {
    config: contentBlockConfigurator_Schema,
    props: contentBlockResolved_Schema,
  }[mode];

  return z
    .object({
      items: z.record(
        camelCase_Schema,
        z.object({
          question: localizationSwitch[mode],
          answer: z.tuple([child], child),
          check: z.literal(true).optional(),
        }),
      ),
      order: z.array(camelCase_Schema),
    })
    .superRefine(({ items, order }, context) => {
      const itemSlugs = Object.keys(items);
      const known = new Set(itemSlugs);
      const ordered = new Set<string>();

      for (const [index, slug] of order.entries()) {
        if (ordered.has(slug)) {
          context.addIssue({
            code: 'custom',
            path: ['order', index],
            message: `Duplicate Checkpoint item slug in order: ${slug}`,
          });
        }
        if (!known.has(slug)) {
          context.addIssue({
            code: 'custom',
            path: ['order', index],
            message: `Unknown Checkpoint item slug in order: ${slug}`,
          });
        }
        ordered.add(slug);
      }

      for (const slug of itemSlugs) {
        if (!ordered.has(slug)) {
          context.addIssue({
            code: 'custom',
            path: ['order'],
            message: `Checkpoint item missing from order: ${slug}`,
          });
        }
      }
    });
};

export const checkpoint_Config_Schema = checkpointBase.extend({
  ...addUnifiedLocale(locale('config')),
  content: content('config'),
});
export type ContentBlock_Checkpoint_Config = z.infer<typeof checkpoint_Config_Schema>;

export const checkpoint_Props_Schema = checkpointBase.extend({
  ...addUnifiedLocale(locale('props')),
  content: content('props'),
});
export type ContentBlock_Checkpoint_Props = z.infer<typeof checkpoint_Props_Schema>;
