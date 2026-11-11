import { z } from 'zod';

import { camelCase_Schema } from '#schemas';

export const paramsBase_Schema = z.object({
  params: z.object({
    disabled: z.literal(true).optional(),
  }),
});

/** Shared authored identity for Lesson, Section and ContentBlock configurators. */
export const identityBase_Schema = z.object({
  id: z.uuid(),
  slug: camelCase_Schema,
});
