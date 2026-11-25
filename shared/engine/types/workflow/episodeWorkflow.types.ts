import { z } from 'zod';

import { episode_Config_Schema } from '../../configurators/episodes/defineEpisode/defineEpisode.schemas';
import { lessonWorkflowOrdinarySection_Schema, workflowOrdered_Schema } from './lessonWorkflow.types';
import { workflowLanguages_Schema } from './workflowLanguages.schemas';

/** Gate-only Course placement evidence. It is not serialized in authored Episode input. */
const episodePlacement_Schema = z.strictObject({
  courseId: episode_Config_Schema.shape.id,
  path: z.string(),
  orderPath: z.array(z.number().int().nonnegative()).readonly(),
  reviewedCourseSourceBlobSha: z.string().regex(/^[a-f0-9]{40}$/i),
});
export type EpisodeWorkflowPlacement = z.infer<typeof episodePlacement_Schema>;

const episodeHandoffConfig_Schema = episode_Config_Schema.pick({ id: true, slug: true, type: true }).strict();
const episodeHandoffProduction_Schema = z.strictObject({
  focus: z.string().refine(value => !!value.trim()),
  purpose: z.string().refine(value => !!value.trim()),
  languages: workflowLanguages_Schema,
});

/** A Course Stage 5 handoff is neither a scenario nor a Configurator. */
export const episodeWorkflowStage1Handoff_Schema = z.strictObject({
  config: episodeHandoffConfig_Schema,
  production: episodeHandoffProduction_Schema,
});
export type EpisodeWorkflowStage1Handoff = z.infer<typeof episodeWorkflowStage1Handoff_Schema>;

const reviewedText_Schema = z.string().refine(value => !!value.trim(), 'Reviewed narrative text is required');
const episodeScenario_Schema = z.strictObject({
  audience: reviewedText_Schema,
  entrySituation: reviewedText_Schema,
  exitSituation: reviewedText_Schema,
  continuity: reviewedText_Schema,
  sceneIntent: reviewedText_Schema,
  interactionIntent: reviewedText_Schema,
  accessibility: reviewedText_Schema,
  narrativeConstraints: reviewedText_Schema,
});
export type EpisodeWorkflowScenario = z.infer<typeof episodeScenario_Schema>;

export const episodeWorkflowStage1_Schema = episodeWorkflowStage1Handoff_Schema.extend({
  production: episodeHandoffProduction_Schema.extend({ scenario: episodeScenario_Schema }),
});
export type EpisodeWorkflowStage1 = z.infer<typeof episodeWorkflowStage1_Schema>;

/** Ordinary Sections reuse Lesson's editorial Block contract, not its ownership.
 * Assessment-only Sections and Build-only Quest are outside Episode production.
 */
export type EpisodeWorkflowSection = z.infer<typeof lessonWorkflowOrdinarySection_Schema>;

const episodeStage2Config_Schema = episodeHandoffConfig_Schema.extend({
  locale: episode_Config_Schema.shape.locale,
  events: z.record(z.string(), z.never()).optional(),
  params: episode_Config_Schema.shape.params
    .omit({ languages: true })
    .extend({ languages: z.never().optional() })
    .strict()
    .optional(),
  section: workflowOrdered_Schema(lessonWorkflowOrdinarySection_Schema).refine(
    value => value.order.length > 0,
    'Episode requires at least one authored Section',
  ),
});

export const episodeWorkflowStage2_Schema = episodeWorkflowStage1_Schema.extend({
  config: episodeStage2Config_Schema,
  production: episodeWorkflowStage1_Schema.shape.production.extend({ specification: reviewedText_Schema }),
});
export type EpisodeWorkflowStage2 = z.infer<typeof episodeWorkflowStage2_Schema>;

/** Review does not create another editorial type or publish Props. */
