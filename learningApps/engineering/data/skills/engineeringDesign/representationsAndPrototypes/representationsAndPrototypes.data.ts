import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { buildAFunctionalPrototype_Skill_Data, createADimensionedDrawing_Skill_Data, createAFunctionalBlockDiagram_Skill_Data, designRationale_Skill_Data, interpretTechnicalSystemSchematics_Skill_Data } from './skills';

export const representationsAndPrototypes_SkillGroup_Data = buildSkillGroupConfig({
  slug: "representationsAndPrototypes",
  id: "97e9e61b-3066-4efa-a68f-fafcbcc59b39",
  name: {
    en: "Representations and Prototypes",
  },
  skills: {
    buildAFunctionalPrototype: buildAFunctionalPrototype_Skill_Data,
    createADimensionedDrawing: createADimensionedDrawing_Skill_Data,
    createAFunctionalBlockDiagram: createAFunctionalBlockDiagram_Skill_Data,
    designRationale: designRationale_Skill_Data,
    interpretTechnicalSystemSchematics: interpretTechnicalSystemSchematics_Skill_Data,
  },
  description: {
    methodological: "Technical representations communicate geometry, operation and interfaces. A model is useful when it preserves properties that matter to the question being investigated.",
    frontend: {
      en: "Discover how drawings and prototypes communicate a technical concept.",
    },
  },
});
