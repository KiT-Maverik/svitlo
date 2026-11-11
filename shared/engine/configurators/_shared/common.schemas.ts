import { z } from 'zod';

import { camelCase_Schema } from '#schemas';

export const paramsBase_Schema = z.object({
  params: z.object({
    disabled: z.literal(true).optional(),
  }),
});

/** Shared authored identity for the upcoming Lesson/Section configurator migration. */
export const identityBase_Schema = z.object({
  id: z.uuid(),
  slug: camelCase_Schema,
});
