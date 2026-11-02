import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { basicRegressionModel_Skill_Data, economicForecastUncertainty_Skill_Data, policyEffectEvaluation_Skill_Data } from './skills';

export const empiricalConclusionsAndForecasts_SkillGroup_Data = buildSkillGroupConfig({
  slug: "empiricalConclusionsAndForecasts",
  id: "974326e9-0747-41a5-af31-2f2fc4b93eeb",
  name: {
    en: "Емпіричні висновки та прогнози",
  },
  skills: {
    basicRegressionModel: basicRegressionModel_Skill_Data,
    economicForecastUncertainty: economicForecastUncertainty_Skill_Data,
    policyEffectEvaluation: policyEffectEvaluation_Skill_Data,
  },
  description: {
    methodological: "Policy evaluation and forecasting rely on evidence, explicit assumptions, and uncertainty assessment.",
    frontend: {
      en: "Explore how economists draw conclusions and make uncertain forecasts.",
    },
  },
});
