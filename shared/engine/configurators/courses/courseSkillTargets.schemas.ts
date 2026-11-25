import { z } from 'zod';

/** One target-ID contract for Course, Module and Chapter. */
export const uniqueSkillTargetIds_Schema = z
  .array(z.uuid())
  .refine(values => new Set(values.map(value => value.toLowerCase())).size === values.length, 'IDs must be unique');
export const courseSkillTargets_Schema = z.strictObject({
  skills: uniqueSkillTargetIds_Schema.optional(),
  skillGroups: uniqueSkillTargetIds_Schema.optional(),
  skillDomains: uniqueSkillTargetIds_Schema.optional(),
});
export const coursePrerequisiteTargets_Schema = courseSkillTargets_Schema.extend({
  courses: uniqueSkillTargetIds_Schema.optional(),
});
