import { z } from 'zod';

import { languageCode_Schema } from '#schemas';

/**
 * Editorial handoffs are not Engine Config fields. Keep this metadata in
 * authoring nodes and exclude it before calling define*.
 *
 * These are the sole Zod definitions for production metadata; the editor JSON
 * schemas are generated from them, not maintained independently.
 */
const prose = z.string().min(1);
const notes = {
  purpose: prose.optional(),
  productionNotes: prose.optional(),
};

const courseMethodology_Schema = z.strictObject({
  purpose: prose,
  audience: prose,
  approach: prose,
  depth: prose.optional(),
  accessibility: prose.optional(),
  scope: prose.optional(),
  entryConditions: prose.optional(),
  sourceNotes: prose.optional(),
});

export const yamlProduction_Schemas = {
  course: z.strictObject({
    documentLanguage: languageCode_Schema,
    methodology: courseMethodology_Schema,
    openDecisions: z.record(z.string(), prose).optional(),
    productionNotes: prose.optional(),
  }),
  module: z.strictObject({ methodology: prose.optional(), ...notes }),
  chapter: z.strictObject({ methodology: prose.optional(), ...notes }),
  episode: z.strictObject({ methodology: prose.optional(), ...notes }),
  lesson: z.strictObject({
    documentLanguage: languageCode_Schema,
    methodology: prose.optional(),
    audience: prose.optional(),
    quizRequired: z.boolean().optional(),
    flashcardsRequired: z.boolean().optional(),
    ...notes,
  }),
  lessonReference: z.strictObject({
    objective: prose.optional(),
    matchingRationale: prose.optional(),
    sequenceReason: prose.optional(),
    methodology: prose.optional(),
    ...notes,
  }),
  section: z.strictObject({
    pedagogicalIntent: prose.optional(),
    ...notes,
  }),
  questStage: z.strictObject({
    storyboard: prose.optional(),
    specification: prose.optional(),
    ...notes,
  }),
  questTask: z.strictObject({
    specification: prose.optional(),
    ...notes,
  }),
  scene: z.strictObject({
    specification: prose,
    ...notes,
  }),
  image: z.strictObject({
    prompt: prose,
    purpose: prose,
    productionNotes: prose.optional(),
  }),
  audio: z.strictObject({
    specification: prose.optional(),
    script: prose.optional(),
    ...notes,
  }),
  video: z.strictObject({
    specification: prose.optional(),
    storyboard: prose.optional(),
    ...notes,
  }),
  subtitles: z.strictObject({
    script: prose.optional(),
    specification: prose.optional(),
    ...notes,
  }),
  question: z.strictObject({
    evidenceIntent: prose.optional(),
    rationale: prose.optional(),
  }),
  flashcard: z.strictObject({
    rationale: prose.optional(),
    productionNotes: prose.optional(),
  }),
  block: z.strictObject({
    specification: prose.optional(),
    ...notes,
  }),
} as const;
