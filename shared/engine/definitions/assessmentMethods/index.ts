import { z } from 'zod';
import { defineStructured, localizedMap, resolvedProps } from '../structured';
import type { DefinitionLanguages, TaggedDefinition } from '../structured';

export const assessmentMethodSchema = <L extends DefinitionLanguages>(languages: L) =>
  z.strictObject({
    type: z.literal('assessmentMethod'),
    id: z.uuid(),
    title: localizedMap(languages),
    description: localizedMap(languages),
  });

export function defineAssessmentMethod<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof assessmentMethodSchema<L>>>,
) {
  return defineStructured('assessmentMethod', source, assessmentMethodSchema<L>, resolvedProps('assessmentMethod'), [
    'title',
    'description',
  ]);
}

export type AssessmentMethodDefinition = TaggedDefinition<'assessmentMethod'>;
