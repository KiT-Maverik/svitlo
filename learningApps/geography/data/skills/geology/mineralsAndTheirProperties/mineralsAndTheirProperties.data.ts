import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { characterizeMineralsUsingDiagnosticPhysicalProperties_Skill_Data, explainWhatMakesANaturalSolidAMineral_Skill_Data, identifyMineralsUsingMultipleDiagnosticProperties_Skill_Data } from './skills';

export const mineralsAndTheirProperties_SkillGroup_Data = buildSkillGroupConfig({
  slug: "mineralsAndTheirProperties",
  id: "eb59662a-1d88-4418-92e3-73f5dbb93ddb",
  name: {
    en: "Minerals and Their Properties",
  },
  skills: {
    characterizeMineralsUsingDiagnosticPhysicalProperties: characterizeMineralsUsingDiagnosticPhysicalProperties_Skill_Data,
    explainWhatMakesANaturalSolidAMineral: explainWhatMakesANaturalSolidAMineral_Skill_Data,
    identifyMineralsUsingMultipleDiagnosticProperties: identifyMineralsUsingMultipleDiagnosticProperties_Skill_Data,
  },
  description: {
    methodological: "A mineral is a naturally occurring crystalline substance with characteristic structure and material properties. Its identity is inferred using complementary evidence such as scratch resistance, streak, luster and cleavage rather than relying on color or one test in isolation.",
    frontend: {
      en: "Explore how physical properties help describe and identify minerals.",
    },
  },
});
