import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { arches_Skill_Data, beams_Skill_Data, columns_Skill_Data, foundations_Skill_Data, structuralBracing_Skill_Data, trusses_Skill_Data } from './skills';

export const structuralElements_SkillGroup_Data = buildSkillGroupConfig({
  slug: "structuralElements",
  id: "18633aac-eac9-45dd-be1d-625881c5ed90",
  name: {
    en: "Structural Elements",
  },
  skills: {
    arches: arches_Skill_Data,
    beams: beams_Skill_Data,
    columns: columns_Skill_Data,
    foundations: foundations_Skill_Data,
    structuralBracing: structuralBracing_Skill_Data,
    trusses: trusses_Skill_Data,
  },
  description: {
    methodological: "Characteristic forms route forces differently; a safe structure is not just a visually plausible shape.",
    frontend: {
      en: "Learn how different structural parts transfer forces into the ground.",
    },
  },
});
