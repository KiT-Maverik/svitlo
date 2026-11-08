import { z } from 'zod';

import {locale_All_Schema, localeText_Schema} from '#schemas';

const assessmentMethod_Base_Schema = z.strictObject({
  id: z.uuid(),
  slug: z.string().min(1),
});

export const assessmentMethod_Config_Schema = z.strictObject({
  description: locale_All_Schema,
  title: locale_All_Schema,
}).and(assessmentMethod_Base_Schema);

export type AssessmentMethod_Config = z.infer<typeof assessmentMethod_Config_Schema>;

export const assessmentMethod_Props_Schema = z.strictObject({
  description: localeText_Schema,
  title: localeText_Schema,
}).and(assessmentMethod_Base_Schema);

export type AssessmentMethod_Props = z.infer<typeof assessmentMethod_Props_Schema>;

export function defineAssessmentMethod(config: AssessmentMethod_Config) {
  const { id, description, slug, title } = config;

  const base: Partial<AssessmentMethod_Config> = {
    id,
    slug,
  } as const;

  if (typeof title === 'string') base.title = title;
  if (typeof description === 'string') base.description = description;

  return {
    config: {
      base,
      locales: () => {
        const result = {};

        if (typeof title !== 'string') result.title = title;
        if (typeof description !== 'string') result.description = title;

        return result
      },
      test: {
        config: () => assessmentMethod_Config_Schema.safeParse(config).success,
        props: (props: unknown) => assessmentMethod_Props_Schema.safeParse(props).success,
      },
    },
  };
}

export type AssessmentMethod_Configurator = ReturnType<typeof defineAssessmentMethod>;
