import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { clarifyAContestedConcept_Skill_Data, distinguishNecessaryFromSufficientConditions_Skill_Data, testADefinitionWithACounterexample_Skill_Data, useAThoughtExperimentToExamineAConcept_Skill_Data } from './skills';

export const conceptualAnalysis_SkillGroup_Data = buildSkillGroupConfig({
  slug: "conceptualAnalysis",
  id: "59dba4e3-0c6d-475d-a150-ddb85f287dde",
  name: {
    en: "Conceptual Analysis",
  },
  skills: {
    clarifyAContestedConcept: clarifyAContestedConcept_Skill_Data,
    distinguishNecessaryFromSufficientConditions: distinguishNecessaryFromSufficientConditions_Skill_Data,
    testADefinitionWithACounterexample: testADefinitionWithACounterexample_Skill_Data,
    useAThoughtExperimentToExamineAConcept: useAThoughtExperimentToExamineAConcept_Skill_Data,
  },
  description: {
    methodological: "Careful discussion depends on tracking the boundaries of concepts, especially when ordinary words cover multiple cases. These abilities refine meanings rather than merely memorize technical vocabulary.",
    frontend: {
      en: "Explore how clear definitions and carefully chosen examples improve philosophical thinking.",
    },
  },
});
