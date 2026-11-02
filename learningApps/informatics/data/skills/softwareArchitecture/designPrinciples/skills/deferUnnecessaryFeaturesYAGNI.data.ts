import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const deferUnnecessaryFeaturesYAGNI_Skill_Data = buildSkillConfig({
  slug: "deferUnnecessaryFeaturesYAGNI",
  id: "a2bf67f0-ca2c-40d4-b3a7-6286b3d00147",
  name: {
    en: "Defer Unnecessary Features (YAGNI)",
  },
  description: {
    methodological: "Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.",
    frontend: {
      en: "Avoid implementing features that are only imagined future possibilities.",
    },
  },
});
