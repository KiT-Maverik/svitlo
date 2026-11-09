import { z } from 'zod';

/** Known Assessment Method slugs mirrored from UI Kit's assessment method labels.
 * Keep this list synchronized until Assessment Method authorship has a shared source.
 * Do not depend on the retired contract ID registry.
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
