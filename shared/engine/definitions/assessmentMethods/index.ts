import { z } from 'zod';

import { locale_All_Schema } from '#schemas';

import { defineStructured, resolvedProps } from '../structured';
import type { TaggedDefinition } from '../structured';

export const assessmentMethodSchema = z.strictObject({
  type: z.literal('assessmentMethod'),
  slug: z.string().min(1),
  id: z.uuid(),
  title: locale_All_Schema,
  description: locale_All_Schema,
});

export function defineAssessmentMethod(source: z.input<typeof assessmentMethodSchema>) {
  return defineStructured('assessmentMethod', source, () => assessmentMethodSchema, resolvedProps('assessmentMethod'), [
    'title',
    'description',
  ]);
}

export type AssessmentMethodDefinition = TaggedDefinition<'assessmentMethod'>;
