import { z } from 'zod';

import { validateSlugAddressedContainer, type SafePlacementMap } from '../../_shared__configurators/slugAddressedContainer/slugAddressedContainer.utils';

import { deepStrict_Schema, languageCode_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { ageRange_Schema, gradeRange_Schema } from '../../_shared__configurators/audienceRange.schemas';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import type { ConfiguratorChild } from '../../../types/configuratorChild';
import type { Assessment_Configurator } from '../../assessments/defineAssessment/defineAssessment';
import type { Assessment_Data } from '../../assessments/defineAssessment/defineAssessment.schemas';
import type { Assessment_Draft_Configurator } from '../../assessments/defineAssessment/defineAssessmentDraft';
import type { Configurator_Mode } from '../../configurator.schemas';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { Episode_Configurator } from '../../episodes/defineEpisode/defineEpisode';
import type { Episode_Data, Episode_Draft_Data } from '../../episodes/defineEpisode/defineEpisode.schemas';
import type { Lesson_Configurator } from '../../lessons/defineLesson/defineLesson';
import type { Lesson_Data, Lesson_Draft_Data } from '../../lessons/defineLesson/defineLesson.schemas';
import {
  coursePrerequisiteTargets_Schema,
  courseSkillTargets_Schema,
  uniqueSkillTargetIds_Schema,
} from '../courseSkillTargets.schemas';
import type { Chapter_Configurator } from '../defineChapter/defineChapter';
import type { Chapter_Data } from '../defineChapter/defineChapter.schemas';
import type {
  Assessment_Stub_Configurator,
  Episode_Stub_Configurator,
  Lesson_Stub_Configurator,
} from '../defineCourseChildStubs/defineCourseChildStubs';
import type { Module_Configurator } from '../defineModule/defineModule';
import type { Module_Data } from '../defineModule/defineModule.schemas';

/** Course audience and educational-standard references describe scope, never certification. */

const params = paramsBase_Schema.shape.params.extend({
  languages: z
    .array(languageCode_Schema)
    .nonempty()
    .refine(values => new Set(values).size === values.length, 'Course languages must be unique'),
  scenarioMode: z.enum(['none', 'story']).optional(),
  /** Skills actually intended to be taught; distinct from entry requirements. */
  outcomes: courseSkillTargets_Schema.optional(),
  /** Optional jurisdiction-dependent target learners; no assumed universal grade. */
  age: ageRange_Schema.optional(),
  grade: gradeRange_Schema.optional(),
  /** References to reviewed EducationStandard UUIDs; no automatic compliance claim. */
  educationStandards: uniqueSkillTargetIds_Schema.optional(),
  prerequisites: coursePrerequisiteTargets_Schema.optional(),
});
const identity = identityBase_Schema.extend({
  type: z.literal('course'),
  params,
});
const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode],
  description: localizationSwitch[mode],
  prerequisitesText: localizationSwitch[mode].optional(),
  outcomesText: localizationSwitch[mode].optional(),
});
export type Course_Locale<Mode extends Configurator_Mode> = z.infer<z.ZodObject<ReturnType<typeof locale<Mode>>>>;
export type Course_Child = ConfiguratorChild<
  | Module_Configurator
  | Chapter_Configurator
  | Lesson_Configurator
  | Episode_Configurator
  | Assessment_Configurator
  | Assessment_Draft_Configurator
  | Lesson_Stub_Configurator
  | Episode_Stub_Configurator
  | Assessment_Stub_Configurator
>;
export type Course_Child_Data =
  Module_Data | Chapter_Data | Lesson_Data | Episode_Data | Assessment_Data | Lesson_Draft_Data | Episode_Draft_Data;

export const course_Metadata_Config_Schema = identity.extend({
  ...addUnifiedLocale(locale('config')),
});
export const course_Config_Schema = course_Metadata_Config_Schema.extend({
  children: z.array(z.string()),
}).catchall(z.unknown()).superRefine((value, context) => {
  for (const issue of validateSlugAddressedContainer(value, ['module', 'chapter', 'lesson', 'episode', 'assessment'])) {
    context.addIssue({ code: 'custom', path: issue.path, message: issue.message });
  }
});
export type Course_Config = z.infer<typeof course_Config_Schema>;

export type Course_Metadata_Overrides = {
  params?: DeepPartial<Omit<Course_Config['params'], 'languages'>>;
  locale?: DeepPartial<Course_Config['locale']>;
};
/**
 * Zod 4 deepPartial() cannot descend into refined object schemas. Reconstruct
 * only the audience objects from the SAME Config fields before deriving sparse
 * overrides; effective merged Course Config is still parsed against the
 * original refined age/grade ranges by the Course Build validation lifecycle.
 */
const partializableParams_Schema = course_Config_Schema.shape.params.omit({ languages: true }).extend({
  age: z.strictObject(ageRange_Schema.shape).optional(),
  grade: z.strictObject(gradeRange_Schema.shape).optional(),
});
export const course_Override_Config_Schema: z.ZodType<Course_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: partializableParams_Schema,
      locale: course_Config_Schema.shape.locale,
    }),
  ),
);
export type Course_Overrides<
  Items extends Record<string, Course_Child> = Record<string, Course_Child>,
  Added extends Record<string, Course_Child> = {},
> = Course_Metadata_Overrides & {
  /** Complete replacement order when adding, removing or reordering placements. */
  children?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
} & {
  [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false;
} & Added & SafePlacementMap<Added> & { [Key in Extract<keyof Items, keyof Added>]?: never };

export const course_Data_Schema = identity
  .extend({
    ...addUnifiedLocale(locale('data')),
    children: z.array(z.string()),
  })
  // Dynamic placement keys are validated at this boundary; never recursively
  // reparse child-owned internal content or treat semantic roles as children.
  .catchall(z.unknown())
  .superRefine((value, context) => {
    for (const issue of validateSlugAddressedContainer(value, ['module', 'chapter', 'lesson', 'episode', 'assessment'])) {
      context.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
  });
export type Course_Data = z.infer<typeof course_Data_Schema>;
