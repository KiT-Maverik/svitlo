import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishUniformFromNonuniformMotion_Skill_Data, recognizeManifestationsOfInertiaInMotion_Skill_Data } from './skills';

export const inertiaAndChangesInMotion_SkillGroup_Data = buildSkillGroupConfig({
  slug: "inertiaAndChangesInMotion",
  id: "792cf094-e170-4767-ba9c-8dae2abf47f2",
  name: {
    en: "Inertia and Changes in Motion",
  },
  skills: {
    distinguishUniformFromNonuniformMotion: distinguishUniformFromNonuniformMotion_Skill_Data,
    recognizeManifestationsOfInertiaInMotion: recognizeManifestationsOfInertiaInMotion_Skill_Data,
  },
  description: {
    methodological: "A body may continue moving after an applied action ceases, while changes in motion are associated with interaction; accessible models do not require equations of motion.",
    frontend: {
      en: "Discover inertia and how it relates to changes in motion.",
    },
  },
});
