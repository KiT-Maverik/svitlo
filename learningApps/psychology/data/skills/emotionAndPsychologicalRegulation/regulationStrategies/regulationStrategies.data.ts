import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { attentionalRegulation_Skill_Data, cognitiveReappraisal_Skill_Data, expressiveSuppression_Skill_Data, regulationStrategyFlexibility_Skill_Data, seekingAppropriateSupport_Skill_Data } from './skills';

export const regulationStrategies_SkillGroup_Data = buildSkillGroupConfig({
  slug: "regulationStrategies",
  id: "64452da3-8f8b-42e5-a746-8093742e330f",
  name: {
    en: "Regulation Strategies",
  },
  skills: {
    attentionalRegulation: attentionalRegulation_Skill_Data,
    cognitiveReappraisal: cognitiveReappraisal_Skill_Data,
    expressiveSuppression: expressiveSuppression_Skill_Data,
    regulationStrategyFlexibility: regulationStrategyFlexibility_Skill_Data,
    seekingAppropriateSupport: seekingAppropriateSupport_Skill_Data,
  },
  description: {
    methodological: "People can influence attention, interpretation, expression, or behavior in response to emotion, with different strategies fitting different circumstances.",
    frontend: {
      en: "Explore strategies for responding to difficult emotional experiences.",
    },
  },
});
