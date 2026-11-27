import { assessmentMethod_Data_Schema, type AssessmentMethod_Data } from '@svitlo/engine/runtime';

/** Invariant and locale-specific JSON shapes published under data/uiKit/assessmentMethods/. */
export type AssessmentMethodBase = Pick<AssessmentMethod_Data, 'id' | 'slug'>;
export type AssessmentMethodLocalized = Pick<AssessmentMethod_Data, 'title' | 'description'>;

/** Combine independently loaded JSON resources; no authored data is imported at runtime. */
export function resolveAssessmentMethod(
  base: AssessmentMethodBase,
  localized: AssessmentMethodLocalized,
): AssessmentMethod_Data {
  return assessmentMethod_Data_Schema.parse({ ...base, ...localized });
}
