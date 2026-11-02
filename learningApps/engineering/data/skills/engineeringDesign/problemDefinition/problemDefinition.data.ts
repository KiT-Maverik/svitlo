import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { definePerformanceCriteria_Skill_Data, formulateADesignProblem_Skill_Data, identifyAnEngineeringNeed_Skill_Data, identifyDesignConstraints_Skill_Data, prioritizeRequirements_Skill_Data } from './skills';

export const problemDefinition_SkillGroup_Data = buildSkillGroupConfig({
  slug: "problemDefinition",
  id: "46cb574c-7fea-4737-b7d9-7f8105e5752f",
  name: {
    en: "Problem Definition",
  },
  skills: {
    definePerformanceCriteria: definePerformanceCriteria_Skill_Data,
    formulateADesignProblem: formulateADesignProblem_Skill_Data,
    identifyAnEngineeringNeed: identifyAnEngineeringNeed_Skill_Data,
    identifyDesignConstraints: identifyDesignConstraints_Skill_Data,
    prioritizeRequirements: prioritizeRequirements_Skill_Data,
  },
  description: {
    methodological: "A clear brief distinguishes what needs to change, how success will be measured and which resources or conditions constrain possible solutions.",
    frontend: {
      en: "Discover how clear requirements begin a successful design.",
    },
  },
});
