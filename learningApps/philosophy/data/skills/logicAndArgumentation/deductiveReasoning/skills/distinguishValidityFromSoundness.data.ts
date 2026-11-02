import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishValidityFromSoundness_Skill_Data = buildSkillConfig({
  slug: "distinguishValidityFromSoundness",
  id: "dac1c7e0-93fa-4aac-afe8-8dcb3cfbdf28",
  name: {
    en: "Distinguish validity from soundness",
  },
  description: {
    methodological: "Recognize that a sound deductive argument requires both a valid inference and true premises.",
    frontend: {
      en: "Understand why a logically valid argument can still have false premises.",
    },
  },
});
