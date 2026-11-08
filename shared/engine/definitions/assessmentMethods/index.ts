import { z } from 'zod';

import { locale_All_Schema } from '#schemas';

import { defineStructured, resolvedProps } from '../structured';
import type { TaggedDefinition } from '../structured';

export const assessmentMethodSchema = z.strictObject({
  description: locale_All_Schema,
  id: z.uuid(),
  slug: z.string().min(1),
  title: locale_All_Schema,
  collection: z.literal('assessmentMethod'),
});

export function defineAssessmentMethod(source: z.input<typeof assessmentMethodSchema>) {
  return defineStructured('assessmentMethod', source, () => assessmentMethodSchema, resolvedProps('assessmentMethod'), [
    'title',
    'description',
  ]);
}

export type AssessmentMethodDefinition = TaggedDefinition<'assessmentMethod'>;
