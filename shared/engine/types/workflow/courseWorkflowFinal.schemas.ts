import { z } from 'zod';

import { assessment_Config_Schema } from '../../configurators/assessments/defineAssessment/defineAssessment.schemas';
import { chapter_Metadata_Config_Schema } from '../../configurators/courses/defineChapter/defineChapter.schemas';
import { course_Metadata_Config_Schema } from '../../configurators/courses/defineCourse/defineCourse.schemas';
import { module_Metadata_Config_Schema } from '../../configurators/courses/defineModule/defineModule.schemas';
import type { Lesson_Configurator } from '../../configurators/lessons/defineLesson/defineLesson';
import { lesson_Config_Schema } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import type { CourseLessonSourcePatch } from './courseLessonSourcePatch.types';
import { lessonProductionAssessmentRequirements_Schema } from './lessonAssessment.types';
import { workflowLanguages_Schema } from './workflowLanguages.schemas';

const rationale = z.string().min(1);
/** The reader accepts only inert JSON-safe authored Config patches. Exact
 * nested Configurator validation is delegated to the trusted real Lesson
 * Build API, not duplicated in this editorial Stage schema.
 */
const plainConfig_Schema = z.record(z.string(), z.json());
const sourcePatch_Schema = z.custom<CourseLessonSourcePatch<Lesson_Configurator>>(
  value => plainConfig_Schema.safeParse(value).success,
);
const uid = z.uuid();
/**
 * A Stage config keeps authored placement keys at its root. Parse every
 * unknown key as a child, then require exact membership in children. This
 * makes the Zod boundary authoritative even though TypeScript cannot infer
 * arbitrary Stage draft keys from a non-generic satisfies annotation.
 */
const stagedPlacements = <T extends z.ZodObject, Child extends z.ZodType>(metadata: T, child: Child) =>
  metadata
    .extend({ children: z.array(z.string()) })
    .catchall(z.unknown())
    .superRefine((value, ctx) => {
      const own = new Set([...Object.keys(metadata.shape), 'children']);
      const keys = Object.keys(value).filter(key => !own.has(key));
      const order = value.children;
      if (
        keys.length !== order.length ||
        new Set(order).size !== order.length ||
        order.some(key => !Object.hasOwn(value, key) || own.has(key))
      ) {
        ctx.addIssue({ code: 'custom', path: ['children'], message: 'Every direct Course child must be ordered exactly once' });
      }
      for (const key of keys) {
        if (!/^[A-Za-z][A-Za-z0-9]*$/.test(key) ||
            ['content', 'items', 'order', 'additionalItems', 'constructor', 'prototype', '__proto__'].includes(key)) {
          ctx.addIssue({ code: 'custom', path: [key], message: 'Unsafe or reserved Course placement key' });
          continue;
        }
        const parsed = child.safeParse(value[key]);
        if (!parsed.success) {
          for (const issue of parsed.error.issues)
            ctx.addIssue({ code: 'custom', path: [key, ...issue.path], message: issue.message });
        }
      }
    });

const unitProduction = z.strictObject({
  methodology: rationale,
  outcomes: z.object({
    skills: z.array(uid).optional(),
    skillGroups: z.array(uid).optional(),
    skillDomains: z.array(uid).optional(),
  }),
  prerequisites: z.object({
    skills: z.array(uid).optional(),
    skillGroups: z.array(uid).optional(),
    skillDomains: z.array(uid).optional(),
    courses: z.array(uid).optional(),
  }),
  depth: rationale,
  sequenceReason: rationale,
});
const unitParams = module_Metadata_Config_Schema.shape.params.partial();
const placement = z.strictObject({
  type: z.literal('lesson'),
  slug: rationale,
  skills: z.array(uid).nonempty(),
});
const assessment = lessonProductionAssessmentRequirements_Schema.strict();
const proposal = z.strictObject({
  methodology: rationale,
  objective: rationale,
  depth: rationale,
  sequenceReason: rationale,
  assessmentEvidence: rationale,
  assessment,
  sourceEvidence: z.string().optional(),
});
const newLesson = z.strictObject({
  config: placement.extend({
    params: lesson_Config_Schema.shape.params
      .omit({ languages: true, sections: true })
      .partial()
      .extend({ languages: z.never().optional() })
      .optional(),
    locale: lesson_Config_Schema.shape.locale,
  }),
  production: proposal.extend({ kind: z.literal('new') }),
});
const existingLesson = z.strictObject({
  config: placement,
  production: z.strictObject({
    kind: z.literal('existing'),
    existing: z.strictObject({ id: uid }),
    matching: z.strictObject({
      methodologySourcePath: rationale,
      sourceSha: z.string().regex(/^[a-f0-9]{40}$/i),
      matchingRationale: rationale,
      languageEvidence: rationale,
    }),
    assessment,
    overrideRationale: z.string().optional(),
    /** Inert, canonical Lesson named export; resolved only by trusted code. */
    sourceExportName: z.string().regex(/^[A-Za-z][A-Za-z0-9]*$/),
    sourcePatch: sourcePatch_Schema.optional(),
  }),
});
const episodeSlot = z.strictObject({
  config: z.strictObject({ type: z.literal('episode') }),
  production: z.strictObject({ focus: rationale, purpose: rationale }),
});
/** Stage 2 reserves only the Assessment's placement, source-language title,
 * educational purpose and upstream Lesson placements/UUIDs. Its own Quiz
 * and Questions are not fabricated by Course materialization.
 */
const lessonPlacementPath = z.string().regex(/^[A-Za-z][A-Za-z0-9]*(?:\/[A-Za-z][A-Za-z0-9]*){0,2}$/);
const assessmentSlot = z.strictObject({
  config: assessment_Config_Schema.pick({ type: true, locale: true }),
  production: z.strictObject({
    purpose: rationale,
    lessonDependencies: z
      .array(z.union([lessonPlacementPath, uid]))
      .nonempty()
      .refine(values => new Set(values).size === values.length, 'Assessment Lesson dependencies must be unique'),
  }),
});

const chapter = z.strictObject({
  config: stagedPlacements(
    chapter_Metadata_Config_Schema.pick({ type: true, slug: true, locale: true }).extend({
      params: chapter_Metadata_Config_Schema.shape.params.partial().optional(),
    }),
    z.union([newLesson, existingLesson, episodeSlot, assessmentSlot]),
  ),
  production: unitProduction,
});
const module_Schema = z.strictObject({
  config: stagedPlacements(
    module_Metadata_Config_Schema.pick({ type: true, slug: true, locale: true }).extend({
      params: unitParams.optional(),
    }),
    z.union([chapter, newLesson, existingLesson, episodeSlot, assessmentSlot]),
  ),
  production: unitProduction,
});

/** Review approval, imported dependencies and provenance are verified separately. */
export const courseWorkflowStage3_Schema = z.strictObject({
  config: stagedPlacements(course_Metadata_Config_Schema.pick({ id: true, type: true, slug: true }).extend({
    params: course_Metadata_Config_Schema.shape.params
      .omit({ languages: true, scenarioMode: true })
      .partial()
      .extend({ languages: z.never().optional(), scenarioMode: z.never().optional() })
      .optional(),
    locale: course_Metadata_Config_Schema.shape.locale.partial().optional(),
  }), z.union([module_Schema, chapter, newLesson, existingLesson, episodeSlot, assessmentSlot])),
  production: z.strictObject({
    languages: workflowLanguages_Schema,
    methodology: z.strictObject({
      purpose: rationale,
      audience: rationale,
      approach: rationale,
      depth: rationale,
      accessibility: rationale,
      scope: rationale,
      entryConditions: rationale,
      sourceNotes: rationale,
    }),
    outcomes: z.strictObject({ explanation: rationale }),
    prerequisites: z.strictObject({ explanation: rationale }),
    standardsAlignment: z.array(
      z.strictObject({
        standardId: uid,
        status: z.enum(['intended', 'partial', 'verified']),
        evidence: rationale,
        version: z.string().optional(),
        sourceUrl: z.string().optional(),
        jurisdiction: z.string().optional(),
      }),
    ),
    openDecisions: z.record(z.string(), z.string()),
  }),
});
