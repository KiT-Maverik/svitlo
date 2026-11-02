import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const effectsOfDemandChanges_Skill_Data = buildSkillConfig({
  slug: "effectsOfDemandChanges",
  id: "079ee920-92c3-4cc7-be95-488a6e88ea57",
  name: {
    en: "Наслідки зміни попиту",
  },
  description: {
    methodological: "Predict the direction of changes in equilibrium price and quantity after a demand shift under stated supply conditions.",
    frontend: {
      en: "Predict what happens to price when demand rises or falls.",
    },
  },
});
