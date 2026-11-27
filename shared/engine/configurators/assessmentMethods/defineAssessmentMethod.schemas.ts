import { z } from 'zod';

import { localizationSwitch } from '../contentBlocks/contentBlock.schemas';
import { assessmentMethodSlug_Schema } from '../questions/assessmentMethod.schemas';

function createAssessmentMethodSchema<Mode extends keyof typeof localizationSwitch>(mode: Mode) {
  const localized = localizationSwitch[mode];

  return z.object({
    id: z.uuid(),
    slug: assessmentMethodSlug_Schema,
    description: localized,
    title: localized,
  });
}

export const assessmentMethod_Config_Schema = createAssessmentMethodSchema('config');
export type AssessmentMethod_Config = z.infer<typeof assessmentMethod_Config_Schema>;

export const assessmentMethod_Data_Schema = createAssessmentMethodSchema('data');
export type AssessmentMethod_Data = z.infer<typeof assessmentMethod_Data_Schema>;
