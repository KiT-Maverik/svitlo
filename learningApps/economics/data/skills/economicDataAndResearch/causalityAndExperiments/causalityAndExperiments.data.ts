import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { confoundingFactors_Skill_Data, controlAndExperimentalGroups_Skill_Data, correlationAndCausation_Skill_Data } from './skills';

export const causalityAndExperiments_SkillGroup_Data = buildSkillGroupConfig({
  slug: "causalityAndExperiments",
  id: "5fd2d55d-2a2a-4050-87c3-4480f191f878",
  name: {
    en: "Причинність та експерименти",
  },
  skills: {
    confoundingFactors: confoundingFactors_Skill_Data,
    controlAndExperimentalGroups: controlAndExperimentalGroups_Skill_Data,
    correlationAndCausation: correlationAndCausation_Skill_Data,
  },
  description: {
    methodological: "Correlation does not necessarily demonstrate a causal effect; research design must account for alternative explanations.",
    frontend: {
      en: "Discover how economists investigate causes rather than mere associations.",
    },
  },
});
