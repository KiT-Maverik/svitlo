import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const chooseAModelForATask_Skill_Data = buildSkillConfig({
  slug: "chooseAModelForATask",
  id: "424a062d-9f9b-4c98-a182-fd62eb82574f",
  name: {
    en: "Choose a Model for a Task",
  },
  description: {
    methodological: "Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.",
    frontend: {
      en: "Choose a model based on task quality, speed, cost, privacy and available memory.",
    },
  },
});
