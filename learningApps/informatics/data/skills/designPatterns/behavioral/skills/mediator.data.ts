import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const mediator_Skill_Data = buildSkillConfig({
  slug: "mediator",
  id: "1eefdde3-93db-4c4b-ba1d-1a7d9e64ceef",
  name: {
    en: "Mediator",
  },
  description: {
    methodological: "Move interactions between several components into a mediator so each component need not depend directly on every other one.",
    frontend: {
      en: "Coordinate component interactions through a central mediator.",
    },
  },
});
