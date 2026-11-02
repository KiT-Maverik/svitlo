import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { anxietyRelatedDifficulties_Skill_Data, clinicallySignificantNeurodevelopmentalConditions_Skill_Data, compulsiveAndRepetitivePatterns_Skill_Data, depressiveDifficulties_Skill_Data, traumaRelatedResponses_Skill_Data } from './skills';

export const patternsOfPsychologicalDifficulty_SkillGroup_Data = buildSkillGroupConfig({
  slug: "patternsOfPsychologicalDifficulty",
  id: "e22d532a-720c-4ca0-920a-caaeffd7fdbd",
  name: {
    en: "Patterns of Psychological Difficulty",
  },
  skills: {
    anxietyRelatedDifficulties: anxietyRelatedDifficulties_Skill_Data,
    clinicallySignificantNeurodevelopmentalConditions: clinicallySignificantNeurodevelopmentalConditions_Skill_Data,
    compulsiveAndRepetitivePatterns: compulsiveAndRepetitivePatterns_Skill_Data,
    depressiveDifficulties: depressiveDifficulties_Skill_Data,
    traumaRelatedResponses: traumaRelatedResponses_Skill_Data,
  },
  description: {
    methodological: "Clinical categories summarize heterogeneous symptom patterns; they should not be inferred from a few ordinary behaviors or applied as labels to peers.",
    frontend: {
      en: "Learn about broad patterns of difficulty without diagnosing people from everyday traits.",
    },
  },
});
