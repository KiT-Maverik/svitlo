import { z } from 'zod';

/** Canonical Engine-owned Assessment Method slug tuple.
 * UI Kit definitions, the shared Configurator and every Question validator
 * consume this tuple rather than independently maintaining accepted names.
 */
export const assessmentMethodSlugs = [
  'retrieval',
  'interpretation',
  'application',
  'classification',
  'relationshipMapping',
  'representationTranslation',
  'missingInformationInference',
  'structuralAnalysis',
  'patternGeneralization',
  'analogicalReasoning',
  'knowledgeTransfer',
  'prediction',
  'errorDiagnosis',
  'verification',
  'justification',
  'knowledgeConstruction',
] as const;

export type AssessmentMethodSlug = (typeof assessmentMethodSlugs)[number];

export const assessmentMethodSlug_Schema = z.enum(assessmentMethodSlugs);
