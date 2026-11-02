import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const useRandomnessInAModel_Skill_Data = buildSkillConfig({
  slug: "useRandomnessInAModel",
  id: "1001292a-eb4b-4cfa-a344-550818b82fdb",
  name: {
    en: "Use Randomness in a Model",
  },
  description: {
    methodological: "Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.",
    frontend: {
      en: "Add random choices to a model while defining which outcomes can occur.",
    },
  },
});
