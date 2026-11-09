import { z } from 'zod';

import { localizationSwitch } from '#schemas';

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
