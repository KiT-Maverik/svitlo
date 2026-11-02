import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { achaemenidEmpire_Skill_Data, achaemenidExpansion_Skill_Data, ancientIranianReligions_Skill_Data, medianConfederations_Skill_Data } from './skills';

export const ancientIranianStates_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ancientIranianStates",
  id: "4694dad0-424a-4770-b50f-81694bb1a79d",
  name: {
    en: "Іранські держави",
  },
  skills: {
    achaemenidEmpire: achaemenidEmpire_Skill_Data,
    achaemenidExpansion: achaemenidExpansion_Skill_Data,
    ancientIranianReligions: ancientIranianReligions_Skill_Data,
    medianConfederations: medianConfederations_Skill_Data,
  },
  description: {
    methodological: "States on the Iranian plateau and nearby territories governed diverse populations through administrative systems.",
    frontend: {
      en: "Explore ancient states formed around the Iranian plateau.",
    },
  },
});
