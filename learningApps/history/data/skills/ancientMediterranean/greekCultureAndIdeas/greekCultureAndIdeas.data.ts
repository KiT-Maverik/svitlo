import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ancientGreekArt_Skill_Data, ancientGreekTheater_Skill_Data, greekPhilosophy_Skill_Data, greekReligionAndMythology_Skill_Data } from './skills';

export const greekCultureAndIdeas_SkillGroup_Data = buildSkillGroupConfig({
  slug: "greekCultureAndIdeas",
  id: "f5e5caa8-dff9-4db1-ad33-7d6fcb46f407",
  name: {
    en: "Культура та інтелектуальні традиції",
  },
  skills: {
    ancientGreekArt: ancientGreekArt_Skill_Data,
    ancientGreekTheater: ancientGreekTheater_Skill_Data,
    greekPhilosophy: greekPhilosophy_Skill_Data,
    greekReligionAndMythology: greekReligionAndMythology_Skill_Data,
  },
  description: {
    methodological: "Greek religion, philosophy, and art varied across communities and periods rather than forming one fixed culture.",
    frontend: {
      en: "Discover the diversity of ancient Greek beliefs, thought and art.",
    },
  },
});
