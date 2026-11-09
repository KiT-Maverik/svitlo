/** Canonical Assessment Method slugs referenced by authored and published questions.
 * UUIDs and localized definitions live only in UI Kit's authored definitions.
 * This runtime tuple is required to validate Question.assessmentMethod in Engine.
 */
export const ASSESSMENT_METHOD_KEYS = [
  'analogicalReasoning',
  'application',
  'classification',
  'errorDiagnosis',
  'interpretation',
  'justification',
  'knowledgeConstruction',
  'knowledgeTransfer',
  'missingInformationInference',
  'patternGeneralization',
  'prediction',
  'relationshipMapping',
  'representationTranslation',
  'retrieval',
  'structuralAnalysis',
  'verification',
] as const;

export type AssessmentMethodKey = (typeof ASSESSMENT_METHOD_KEYS)[number];
