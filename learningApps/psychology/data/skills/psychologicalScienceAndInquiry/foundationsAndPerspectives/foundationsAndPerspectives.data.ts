import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explanationAndPrediction_Skill_Data, historicalPsychologicalApproaches_Skill_Data, psychologicalPerspectives_Skill_Data, scopeOfPsychologicalScience_Skill_Data } from './skills';

export const foundationsAndPerspectives_SkillGroup_Data = buildSkillGroupConfig({
  slug: "foundationsAndPerspectives",
  id: "4d62993c-1a1a-4abb-a66e-31e39bd7639a",
  name: {
    en: "Foundations and Perspectives",
  },
  skills: {
    explanationAndPrediction: explanationAndPrediction_Skill_Data,
    historicalPsychologicalApproaches: historicalPsychologicalApproaches_Skill_Data,
    psychologicalPerspectives: psychologicalPerspectives_Skill_Data,
    scopeOfPsychologicalScience: scopeOfPsychologicalScience_Skill_Data,
  },
  description: {
    methodological: "Scientific accounts distinguish description, prediction, and causal explanation while combining cognitive, biological, behavioral, and sociocultural perspectives.",
    frontend: {
      en: "Discover different perspectives and scientific goals in psychology.",
    },
  },
});
