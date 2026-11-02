import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const density_Skill_Data = buildSkillConfig({
  slug: "density",
  id: "b424289a-219a-41c2-ac62-9d93ee8c60c1",
  name: {
    en: "Density",
  },
  description: {
    methodological: "Relate sample mass and volume to an intensive property and use it to distinguish plausible materials.",
    frontend: {
      en: "Use mass and volume to reason about a material's density.",
    },
  },
});
