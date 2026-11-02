import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const state_Skill_Data = buildSkillConfig({
  slug: "state",
  id: "ce70dbb8-6b09-4580-9f2d-ff83597d5e4b",
  name: {
    en: "State",
  },
  description: {
    methodological: "Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.",
    frontend: {
      en: "Change how an object reacts according to its current state.",
    },
  },
});
