import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainComputabilityTheory_Skill_Data, explainEarlyElectronicProgramming_Skill_Data, explainTheDevelopmentOfCompilers_Skill_Data, explainTheDevelopmentOfSoftwareReliability_Skill_Data, explainTheEliminationOfNetworkLoops_Skill_Data, explainTheOriginsOfProgramming_Skill_Data } from './skills';

export const keyContributions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "keyContributions",
  id: "202c64c7-e078-4640-94a8-6a9f4e0ac504",
  name: {
    en: "Key Contributions",
  },
  skills: {
    explainComputabilityTheory: explainComputabilityTheory_Skill_Data,
    explainEarlyElectronicProgramming: explainEarlyElectronicProgramming_Skill_Data,
    explainTheDevelopmentOfCompilers: explainTheDevelopmentOfCompilers_Skill_Data,
    explainTheDevelopmentOfSoftwareReliability: explainTheDevelopmentOfSoftwareReliability_Skill_Data,
    explainTheEliminationOfNetworkLoops: explainTheEliminationOfNetworkLoops_Skill_Data,
    explainTheOriginsOfProgramming: explainTheOriginsOfProgramming_Skill_Data,
  },
  description: {
    methodological: "Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.",
    frontend: {
      en: "Explore major contributions to programming, reliability and computer networking.",
    },
  },
});
