import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';

import { localizationSwitch } from '../contentBlocks/contentBlock.schemas';

function createAssessmentMethodSchema<Mode extends keyof typeof localizationSwitch>(mode: Mode) {
  const localized = localizationSwitch[mode];

  return z.object({
    id: z.uuid(),
    slug: z.string().min(1),
    description: localized,
    title: localized,
  });
}

export const assessmentMethod_Config_Schema = createAssessmentMethodSchema('config');
export type AssessmentMethod_Config = z.infer<typeof assessmentMethod_Config_Schema>;

export const assessmentMethod_Props_Schema = createAssessmentMethodSchema('props');
export type AssessmentMethod_Props = z.infer<typeof assessmentMethod_Props_Schema>;

/** Sparse, deep-strict, identity-free metadata patch. */
export type AssessmentMethod_Overrides = DeepPartial<Pick<AssessmentMethod_Config, 'title' | 'description'>>;
export const assessmentMethod_Override_Config_Schema: z.ZodType<AssessmentMethod_Overrides> = z.deepPartial(
  deepStrict_Schema(assessmentMethod_Config_Schema.omit({ id: true, slug: true })),
);

