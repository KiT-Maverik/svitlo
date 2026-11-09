import { assessmentMethod_Props_Schema, type AssessmentMethod_Props } from '@svitlo/engine';

/** Invariant and locale-specific JSON shapes published under data/ui-kit/assessment-methods/. */
export type AssessmentMethodBase = Pick<AssessmentMethod_Props, 'id' | 'slug'>;
export type AssessmentMethodLocalized = Pick<AssessmentMethod_Props, 'title' | 'description'>;

/** Combine independently loaded JSON resources; no authored data is imported at runtime. */
export function resolveAssessmentMethod(
  base: AssessmentMethodBase,
  localized: AssessmentMethodLocalized,
): AssessmentMethod_Props {
  return assessmentMethod_Props_Schema.parse({ ...base, ...localized });
}
