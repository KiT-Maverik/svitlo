import { z } from 'zod';
import { assessmentMethods_AssessmentMethod_Ids } from '@svitlo/contracts/content';
import { defineStructured, localizedMap, resolvedProps } from '../structured';
import type { DefinitionLanguages, TaggedDefinition } from '../structured';

const canonicalIds = Object.values(assessmentMethods_AssessmentMethod_Ids) as [
  (typeof assessmentMethods_AssessmentMethod_Ids)[keyof typeof assessmentMethods_AssessmentMethod_Ids],
  ...(typeof assessmentMethods_AssessmentMethod_Ids)[keyof typeof assessmentMethods_AssessmentMethod_Ids][],
];
export const assessmentMethodSchema = <L extends DefinitionLanguages>(languages: L) =>
  z.strictObject({
    type: z.literal('assessmentMethod'),
    id: z.enum(canonicalIds),
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
