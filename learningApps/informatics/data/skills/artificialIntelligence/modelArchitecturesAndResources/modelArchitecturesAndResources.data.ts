import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chooseAModelForATask_Skill_Data, compareDenseAndMoEModels_Skill_Data, compareModelMemoryRequirements_Skill_Data, compareResponseLatency_Skill_Data, explainQuantization_Skill_Data } from './skills';

export const modelArchitecturesAndResources_SkillGroup_Data = buildSkillGroupConfig({
  slug: "modelArchitecturesAndResources",
  id: "40fb9d60-473d-49d7-a515-11a07e4944b3",
  name: {
    en: "Model Architectures and Resources",
  },
  skills: {
    chooseAModelForATask: chooseAModelForATask_Skill_Data,
    compareDenseAndMoEModels: compareDenseAndMoEModels_Skill_Data,
    compareModelMemoryRequirements: compareModelMemoryRequirements_Skill_Data,
    compareResponseLatency: compareResponseLatency_Skill_Data,
    explainQuantization: explainQuantization_Skill_Data,
  },
  description: {
    methodological: "Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.",
    frontend: {
      en: "Explore how different AI model architectures affect performance and resource needs.",
    },
  },
});
