import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { colligativeProperties_Skill_Data, concentrationComparisons_Skill_Data, dilution_Skill_Data, massFraction_Skill_Data, molarConcentration_Skill_Data } from './skills';

export const concentration_SkillGroup_Data = buildSkillGroupConfig({
  slug: "concentration",
  id: "79942f4b-8faa-4f03-a35d-41bbc7b10d7e",
  name: {
    en: "Concentration",
  },
  skills: {
    colligativeProperties: colligativeProperties_Skill_Data,
    concentrationComparisons: concentrationComparisons_Skill_Data,
    dilution: dilution_Skill_Data,
    massFraction: massFraction_Skill_Data,
    molarConcentration: molarConcentration_Skill_Data,
  },
  description: {
    methodological: "A solution's composition can be represented in several quantitatively distinct ways, each with an appropriate denominator.",
    frontend: {
      en: "Learn different ways to describe how much material a solution contains.",
    },
  },
});
