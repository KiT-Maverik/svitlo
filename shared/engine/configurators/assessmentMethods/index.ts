import { z } from 'zod';

import {locale_All_Schema, localeText_Schema} from '#schemas';

export const createAssessmentMethodSchema = (mode: 'config' | 'props') => z.strictObject({
  description: mode === 'config' ? locale_All_Schema : localeText_Schema,
  id: z.uuid(),
  slug: z.string().min(1),
  title: mode === 'config' ? locale_All_Schema : localeText_Schema,
});

export type AssessmentMethod_Config = z.infer<typeof createAssessmentMethodSchema>;

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
        config: () => createAssessmentMethodSchema('config').safeParse(config).success,
        props: (props: unknown) => createAssessmentMethodSchema('props').safeParse(props).success,
      },
    },
  };
}

export type AssessmentMethod_Definition = ReturnType<typeof defineAssessmentMethod>;
