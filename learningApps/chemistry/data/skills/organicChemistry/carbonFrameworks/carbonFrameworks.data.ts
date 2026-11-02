import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { alkanes_Skill_Data, alkenes_Skill_Data, alkynes_Skill_Data, aromaticCompounds_Skill_Data, hydrocarbons_Skill_Data, stereoisomerism_Skill_Data, structuralIsomerism_Skill_Data } from './skills';

export const carbonFrameworks_SkillGroup_Data = buildSkillGroupConfig({
  slug: "carbonFrameworks",
  id: "9af143a7-8353-4c3f-911d-5714cd3d84e1",
  name: {
    en: "Carbon Frameworks",
  },
  skills: {
    alkanes: alkanes_Skill_Data,
    alkenes: alkenes_Skill_Data,
    alkynes: alkynes_Skill_Data,
    aromaticCompounds: aromaticCompounds_Skill_Data,
    hydrocarbons: hydrocarbons_Skill_Data,
    stereoisomerism: stereoisomerism_Skill_Data,
    structuralIsomerism: structuralIsomerism_Skill_Data,
  },
  description: {
    methodological: "Carbon's bonding versatility permits chains, rings and varied structural representations for compounds containing carbon.",
    frontend: {
      en: "Understand how carbon forms chains, rings and varied molecular structures.",
    },
  },
});
