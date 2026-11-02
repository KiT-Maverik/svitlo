import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { buildAnAbstractSystemModel_Skill_Data, decomposeAProblem_Skill_Data, generalizeARepeatedMethod_Skill_Data, identifyEssentialObjectProperties_Skill_Data } from './skills';

export const decompositionAndAbstraction_SkillGroup_Data = buildSkillGroupConfig({
  slug: "decompositionAndAbstraction",
  id: "0aced4cc-9732-4bc2-ad8e-59febc0d78db",
  name: {
    en: "Decomposition and Abstraction",
  },
  skills: {
    buildAnAbstractSystemModel: buildAnAbstractSystemModel_Skill_Data,
    decomposeAProblem: decomposeAProblem_Skill_Data,
    generalizeARepeatedMethod: generalizeARepeatedMethod_Skill_Data,
    identifyEssentialObjectProperties: identifyEssentialObjectProperties_Skill_Data,
  },
  description: {
    methodological: "Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.",
    frontend: {
      en: "Learn to simplify problems by identifying their essential parts and relationships.",
    },
  },
});
